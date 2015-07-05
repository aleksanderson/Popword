'use strict';

//loading main styles
require('../node_modules/normalize.css/normalize.css');
require('./sass/main.scss');

import React from 'react';
import Router from 'react-router'
import {Route, Link } from 'react-router';

import Translation from './components/Translation';
import Settings from './components/Settings';

//
//<script type="text/javascript">
//    var ipc = require('ipc');
//
//
//    ipc.on('translation-ready', function(obj) {
//    document.querySelector('#translation-phrase').innerHTML = obj[0].text;
//
//    var translation = '';
//    obj.forEach(function(tr) {
//    translation += '<div>';
//    translation += '<p class="transcription">[' + tr.ts + ']</p>';
//    translation += '<table>';
//    tr.tr.forEach(function(eltr){
//    translation += '<tr><td>' + eltr.text + '</td></tr>';
//});
//    translation += '</table>';
//    translation += '</div>';
//});
//
//    document.querySelector('#translated-phrase').innerHTML = translation;
//});
//
//    window.addEventListener('load', function() {
//    document.querySelector('.boxclose').addEventListener('click', function() {
//        ipc.send('close-translation-window');
//    });
//});
//</script>

var routes = (
    <Route>
        <Route path="translation" handler={Translation} />
        <Route path="settings" handler={Settings} />
    </Route>
);

Router.run(routes, Router.HashLocation, (Root) => {
    React.render(<Root/>, document.body);
});