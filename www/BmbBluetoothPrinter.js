// Command to add plugin locally
// cordova plugin add --link ../plugins/cordova-plugin-bluetooth-printer/

// Debug
// platforms/ios/www/plugins/com.bookmebus.printer/www/BmbBluetoothPrinter.js

var exec = require('cordova/exec');

var PLUGIN_NAME = 'BmbBluetoothPrinter';
var BmbBluetoothPrinter = {
    echo: function(phrase, cb) {
        exec(cb, null, PLUGIN_NAME, 'echo', [phrase]);
    },
    getDate: function(cb) {
        exec(cb, null, PLUGIN_NAME, 'getDate', []);
    }
};

module.exports = BmbBluetoothPrinter;
