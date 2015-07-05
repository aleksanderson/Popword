var path = require('path');
var fs = require('fs');

var Translator = require('../../modules/translator');
var phraseGrabber = require('../../modules/phrase-grabber');

var pjson = require('../../package.json');
var translator = new Translator(pjson.appSettings.yandexDictionaryApikey);

function showTranslation() {

    phraseGrabber.getText()
        .then(function(phrase) {
            return translator.translate(phrase, 'en-ru')
        })
        .then(function(translation) {
            translationWindow.webContents.send('translation-ready', translation.def);
            translationWindow.show();
        })
        .catch(function(err) {
            console.log(err);
        });
};