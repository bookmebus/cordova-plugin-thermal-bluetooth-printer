cordova.define("cordova-plugin-thermal-bluetooth-printer.BluetoothPrinter", function(require, exports, module) {
// Command to add plugin locally
// cordova plugin add --link ../plugins/cordova-plugin-bluetooth-printer/

// Debug
// platforms/ios/www/plugins/com.bookmebus.printer/www/BmbBluetoothPrinter.js

var exec = require('cordova/exec');

var PLUGIN_NAME = "BluetoothPrinter";
var BTPrinter = {
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
  },

  disconnect: function(success, failed){
    exec(success, failed, PLUGIN_NAME, "disconnect", []);
  }
};

module.exports = BTPrinter;

});
