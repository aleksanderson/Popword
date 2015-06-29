var translator = require('yandex-dictionary');

function Translator(apiKey, ui) {
    this.ui = ui || 'en';
    this.translator = translator(apiKey);
}

Translator.prototype.translate = function(phrase, lang) {
    var _this = this;
    return new Promise(function(resolve, reject) {
        _this.translator.lookup(phrase, lang, {ui: _this.ui, flags: 1 }, function(err, translation) {
            if(err) return reject(err);
            resolve(translation);
        });
    });
};

module.exports = Translator;