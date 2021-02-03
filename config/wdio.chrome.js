var defaults = require("./wdio.shared.conf").config;
var _ = require("lodash");
var path = require("path");

var download_dir = process.cwd() + '/downloads';
console.log("DEEEEBUG: " + download_dir);
var overrides = {
    capabilities: [{

        browserName: 'chrome',
        hostname: '127.0.0.1',
        port: 4449,
        'goog:chromeOptions': {
            prefs: {
                'directory_upgrade': true,
                'prompt_for_download': false,
                'download.default_directory': download_dir,
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