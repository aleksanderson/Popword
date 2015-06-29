'use strict';

var path = require('path');
var app = require('app');
var globalShortcut = require('global-shortcut');
var Tray = require('tray');
var Menu = require('menu');

var tray;
var translationWindow = require('./windows/translation-window');

//adds debug features like hotkeys for triggering dev tools and reload
require('electron-debug')();

app.on('ready', function () {

    //create translation window
    translationWindow = translationWindow();

    //build tray icon and menu
    tray = new Tray(path.resolve(__dirname, 'tray-icon.png'));
    var contextMenu = Menu.buildFromTemplate([
        {
            label: 'Settings',
            type: 'normal'
        },
        {
            label: 'Quit',
            type: 'normal',
            click: app.quit
        }
    ]);
    tray.setToolTip('Translator');
    tray.setContextMenu(contextMenu);

    //register global shortcut to show/remove translation window
    globalShortcut.register('cmd+shift+i', translationWindow.showTranslation);
    globalShortcut.register('escape', translationWindow.closeTranslation);
});

app.dock.hide();
