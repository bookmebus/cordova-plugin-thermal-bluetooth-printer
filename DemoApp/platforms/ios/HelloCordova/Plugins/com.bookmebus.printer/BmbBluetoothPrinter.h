#import <Cordova/CDVPlugin.h>
#import "AppDelegate.h"

@interface BmbBluetoothPrinter : CDVPlugin {
    BOOL _connected;
    NSMutableArray* _printerArray;
}

- (void)echo:(CDVInvokedUrlCommand *)command;
- (void)getDate:(CDVInvokedUrlCommand *)command;
- (void)printText:(CDVInvokedUrlCommand *)command;
- (void)printImage:(CDVInvokedUrlCommand *)command;
- (void)scanPrinter:(CDVInvokedUrlCommand *)command;
- (void)connectPrinter:(CDVInvokedUrlCommand *)command;

@end
