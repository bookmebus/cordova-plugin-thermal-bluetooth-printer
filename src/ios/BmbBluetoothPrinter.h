#import <Cordova/CDVPlugin.h>

@interface BmbBluetoothPrinter : CDVPlugin {
}

- (void)echo:(CDVInvokedUrlCommand *)command;
- (void)getDate:(CDVInvokedUrlCommand *)command;

@end