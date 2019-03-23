#!/usr/bin/env node

const notifier = require('node-notifier');
const cheerio = require('cheerio');
const axios = require('axios');
const IO = require('./lib/helpers/io');
const Dir = require('./lib/helpers/dir');
const Utils = require('./lib/helpers/utils');
const similar = require('damerau-levenshtein');
const { exec } = require('child_process');
const { DateTime } = require('luxon');

const defaultConfig = {
    fetchIntervalMins: 15,
    watching: {},
    rss: 'http://www.horriblesubs.info/rss.php?res=720',
    torrentClient: 'transmission-gtk',
    precision: 0.7,
};

async function checkAndUpdate(config, configFile) {
    const icon = Dir.installed('icon.png');
    const precision = config.precision;
    
    let req, $;

    try {
        req = await axios(config.rss);
    } catch(e) {
        Utils.error('Failed attempt to sync.');
        return;
    }
    
    try {
        $ = cheerio.load(req.data);
    } catch (e) {
        Utils.error('Failed attempt to parse the data.');
    }

    const watching = config.watching;
    let updated = false;

    const items = $('item');

    items.each((i, item) => {
        try {
            item = $(item);
            const link = item.find('link')[0].next.data.trim();
            const _title = Utils.title(item.find('title').text());            
            const [title, episode] = Utils.titleEpisode(_title);

            for(let show in watching) {
                let lastEpisode = watching[show];

                let compare = similar(title, show);

                let downloadShow =
                    compare.similarity > precision &&
                    episode > lastEpisode;

                if (downloadShow) {

                    // Download Episode.
                    exec(`${config.torrentClient} ${link}`);

                    notifier.notify({
                        title: 'Ani-me',
                        message: `Episode ${episode} of ${show} was relesed!`,
                        icon: icon,
                    });

                    Utils.success(`[Ani-me] Episode ${episode} of ${show} was relesed!`);

                    config.watching[show] = episode;

                    updated = true;
                }
            }
        } catch (e) {
            Utils.error('Failed attempt to process the data.');
        }
    });

    if (updated) {
        config.lastUpdated = DateTime.local().toFormat('dd/LL/yyyy hh:mm:ss');
        await IO.write(configFile, JSON.stringify(config, null, 4));
    } else {
        notifier.notify({
            title: 'Ani-me',
            message: `No new anime released :(`,
            icon: icon,
        });
    }
}


async function main() {

    const homedir = require('os').homedir();

    const configFile = Dir.concat(homedir, '.ani-me');

    Utils.info(`Reading configuration from ${configFile}`);

    let config;

    try {
        config = 
            Object.assign(
                Object.assign({}, defaultConfig),
                JSON.parse(await IO.read(configFile))
            );

        Utils.success(`Configuration loaded.`);

    } catch(e) {
        /* Default config */
        config = Object.assign({}, defaultConfig);

        Utils.error(`Error parsing config file. Using default configuration.`);
    }

    const fetchIntervalMins =
        config.fetchIntervalMins * 60000;

    await checkAndUpdate(config, configFile);

    setInterval(
        async () => {
            await checkAndUpdate(config, configFile);
        },
        fetchIntervalMins
    );
}

main();