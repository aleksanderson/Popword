var util = require('util');
var _ = require('lodash');

var common = {

    translationAPIs: {
        yandexDictionaryKey: 'dict.1.1.20150625T210302Z.53fc76b7f5ea0c8b.b2f64ab6f40b5e14781491b679fbe0275bb997a8',
        urbanDictionaryKey: ''
    },

    devServer: 'http://localhost:8080'
};

var settings = {

    development: {
        windows: {
            translation: common.devServer + '/#/translation',
            settings: common.devServer + '/#/settings'
        }
    },

    production: {
        windows: {
            translation: 'file://' + __dirname + '/app/index.html#translation',
            settings: 'file://' + __dirname + '/app/index.html#settings'
        }
    }
};

module.exports = _.extend(common, settings[process.env.NODE_ENV]);