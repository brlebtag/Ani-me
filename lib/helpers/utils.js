/**
 * Utilities Helper functions
 * 
 * @author Bruno Lebtag <brlebtag@gmail.com>
 * @version 0.0.1
 */
const cout = console.log;
const cerr = console.error;
const Chalk = require('chalk');
const { trim } = require('lodash');

const self = {
    /**
     * Print values using 'info' color format.
     * 
     * @param  {...any} args
     */
    info(...args) {
        cout(...args.map(arg => Chalk.white(arg)));
    },
    /**
     * Print values using 'warn' color format.
     * 
     * @param  {...any} args
     */
    warn(...args) {
        cout(...args.map(arg => Chalk.yellow(arg)));
    },
    /**
     * Print values using 'error' color format.
     * 
     * @param  {...any} args
     */
    error(...args) {
        cerr(...args.map(arg => Chalk.red(arg)));
    },
    /**
     * Print values using 'debug' color format.
     * 
     * @param  {...any} args
     */
    debug(...args) {
        cout(...args.map(arg => Chalk.blue(arg)));
    },
    /**
     * Print values using 'sucesss' color format.
     * 
     * @param  {...any} args
     */
    success(...args) {
        cout(...args.map(arg => Chalk.green(arg)));
    },
    /**
     * Extract episode number
     */
    titleEpisode(text) {
        const title = text.replace(/\W-\W\d+$/, '');
        let [_, epi] = text.split(title);
        return [title, parseInt(trim(epi, ' -'))];
    },
    /**
     * Titulo
     */
    title(text) {
        return trim(text.replace('[HorribleSubs]', '')
            .replace('[1080p].mkv', '')
            .replace('[720p].mkv', '')
            .replace('[480p].mkv', ''));
    }
};

module.exports = self;