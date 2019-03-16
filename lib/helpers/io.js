/**
 * IO Helper functions
 * 
 * @author Bruno Lebtag <brlebtag@gmail.com>
 * @version 0.0.1
 */
const fs = require('fs');
const { promisify } = require('util');

/**
 * Promisify functions.
 */
const fread = promisify(fs.readFile);
const fopen = promisify(fs.open);
const fwrite = promisify(fs.writeFile);
const fclose = promisify(fs.close);

const self = {
    /**
     * Read the informed path and return the data.
     * 
     * @param {string} path
     */
    async read(path) {
        return await fread(path, 'utf8');
    },
    /**
     * Write the data in the informed path.
     * 
     * @param {string} path
     */
    async write(path, data) {
        const f = await fopen(path, 'w');
        await fwrite(f, data);
        await fclose(f);
    }
};

module.exports = self;