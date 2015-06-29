var fs = require('fs');
var path = require('path');
var applescript = require('applescript');

var scriptPath = path.resolve(__dirname, './applescripts/get_selected_text.scpt');
var script = fs.readFileSync(scriptPath, 'utf8');

exports.getText = function() {
    return new Promise(function(resolve, reject) {
        if(process.platform === 'darwin') {
            //if we are on Mac use the applescript to get phrase in the/out of the clipboard
            applescript.execString(script, function(err, result) {
                if (err) return reject(err);
                resolve(result);
            });
        } else {
            //TODO: implement the method of getting the selected text globaly on Windows
            throw new Error('Windows version of the text grabber has yet to be implemented');
        }
    });
};