'use strict';

var path = require('path');
var app = require('app');
var globalShortcut = require('global-shortcut');
var BrowserWindow = require('browser-window');
var Tray = require('tray');
var Menu = require('menu');

var pjson = require('package.json');
var settings = require('./settings');

//adds debug features like hotkeys for triggering dev tools and reload
require('electron-debug')();

var tray;
var windows = {};

app.dock.hide();

app.on('ready', function () {

    //create translation window
    windows['translation'] = createTranslationWindow();

    //build tray icon and menu
    tray = new Tray(path.resolve(__dirname, 'tray-icon.png'));
    var contextMenu = Menu.buildFromTemplate([
        {
            label: 'Settings',
            type: 'normal',
            click: createSettingsWindow
        },
        {
            label: 'Quit',
            type: 'normal',
            click: app.quit
        }
    ]);
    tray.setToolTip(pjson.name);
    tray.setContextMenu(contextMenu);

    //register global shortcut to show/remove translation window
    globalShortcut.register('cmd+shift+i', toggleWindowDisplay.bind(null, windows['translation']));
    globalShortcut.register('escape', toggleWindowDisplay.bind(null, windows['translation']));
});

function toggleWindowDisplay(window) {
    window.isVisible() ? window.hide() : window.show();
}

function createTranslationWindow() {
    var win = new BrowserWindow({
        width: 300,
        height: 350,
        'always-on-top': true,
        frame: false,
        'min-width': 300,
        'min-height': 350,
        show: false
    });

    win.loadUrl(settings.windows.translation);

    return win;
}

function createSettingsWindow() {
    if(!windows['settings']) {
        var win = windows['settings'] = new BrowserWindow({
            width: 500,
            height: 400,
            resizable: false,
            fullscreen: false,
            title: `${pjson.name} Settings`
        });

        win.on('closed', function() {
            windows['settings'] = null;
        });

        win.loadUrl(settings.windows.settings);
    }
}
