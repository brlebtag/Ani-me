/**
 * Directory manipulation Helper functions
 * 
 * @author Bruno Lebtag <brlebtag@gmail.com>
 * @version 0.0.1
 */
const path = require('path');
const fs = require('fs');
const { promisify } = require('util');

/**
 * Promisify functions.
 */
const mkdir = promisify(fs.mkdir);

const self = {
    /**
     * Join and normalized the informed paths from current path.
     * 
     * @param  {...any} args
     */
    current(...args) {
        return self.concat(process.cwd(), ...args);
    },
    /**
     * Join and normalized the informed paths.
     * 
     * @param  {...any} args 
     */
    concat: function(...args) {
        return args.reduce((curPath, p) => {
            return path.normalize(
                path.join(curPath, p)
            );
        })
    },
    /**
     * Convert a dot format path to current system's path format.
     * 
     * @param {string} path Path in dot format.
     * @returns {string}
     */
    normalize(path) {
        return path.replace('.', path.sep);
    },
    /**
     * Path Separator
     */
    sep() {
        return path.sep;
    },
    /**
     * Path where it was installed.
     * 
     * @param  {...any} args
     * @returns {string}
     */
    installed(...args) {
        return self.concat(__dirname, '../../', ...args);
    }
};

module.exports = self;