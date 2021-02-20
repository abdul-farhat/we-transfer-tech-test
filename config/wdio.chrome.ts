const defaults = require("./wdio.shared.conf").config;
import _ from "lodash";
import { join } from "path";

const downloadDir = join(process.cwd() + '/downloads');

const overrides = {
    capabilities: [{

        browserName: 'chrome',
        hostname: '127.0.0.1',
        port: 4449,
        'goog:chromeOptions': {
            prefs: {
                'directory_upgrade': true,
                'prompt_for_download': false,
                'download.default_directory': downloadDir,
            },
            args: [
                '--disable-gpu',
                '--no-sandbox',
                '--disable-infobars',
                '--headless',
                '--disable-fre',
                '--no-default-browser-check',
                '--no-first-run',
                '--disable-features=VizDisplayCompositor',
                '--window-size=1920,1080',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage'
            ]
        }
    }],

    specs: [
        './specs/features/**/*.feature',
    ],
};

exports.config = _.defaultsDeep(overrides, defaults);