// Command to add plugin locally
// cordova plugin add --link ../plugins/cordova-plugin-bluetooth-printer/

// Debug
// platforms/ios/www/plugins/com.bookmebus.printer/www/BmbBluetoothPrinter.js

var exec = require('cordova/exec');

var PLUGIN_NAME = 'BmbBluetoothPrinter';
var BmbBluetoothPrinter = {
  echo: function(phrase, success) {
    exec(success, null, PLUGIN_NAME, 'echo', [phrase]);
  },
  getDate: function(success) {
    exec(success, null, PLUGIN_NAME, 'getDate', []);
  },

  printText: function(printValue, success, failed) {
    exec(success, failed, PLUGIN_NAME, 'printText', [printValue]);
  },

  printImage: function(imageBase64, success, failed) {
    exec(success, failed, PLUGIN_NAME, 'printImage', [imageBase64]);
  },

  scanPrinter: function(success, failed) {
    exec(success, failed, PLUGIN_NAME, 'scanPrinter', []);
  },

  connectPrinter: function(index, success, failed) {
    exec(success, failed, PLUGIN_NAME, 'connectPrinter', [index]);
  }
};

module.exports = BmbBluetoothPrinter;
