var path = require('path');
var fs = require('fs');
var BrowserWindow = require('browser-window');
var ipc = require('ipc');
var Translator = require('../../modules/translator');
var phraseGrabber = require('../../modules/phrase-grabber');

var pjson = require('../../package.json');
var translator = new Translator(pjson.appSettings.yandexDictionaryApikey);

var translationWindow;

function TranslationWindow() {

    translationWindow = createTranslationWindow();

    ipc.on('close-translation-window', function() {
        closeTranslation();
    });

    return {
        showTranslation: showTranslation,
        closeTranslation: closeTranslation,
        translator: translator
    }
}

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

function closeTranslation() {
    translationWindow && translationWindow.hide();
};

function createTranslationWindow () {
    var win = new BrowserWindow({
        width: 300,
        height: 350,
        'always-on-top': true,
        frame: false,
        'min-width': 300,
        'min-height': 350,
        show: false

    });

    win.loadUrl(`file://${__dirname}/translation-window.html`);

    return win;
}

module.exports = TranslationWindow;


