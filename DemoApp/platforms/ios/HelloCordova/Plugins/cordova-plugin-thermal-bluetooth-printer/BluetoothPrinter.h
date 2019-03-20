#import <Cordova/CDVPlugin.h>
#import "AppDelegate.h"

@interface BluetoothPrinter : CDVPlugin {
    BOOL _connected;
    NSMutableArray* _printerArray;
}

- (void)printText:(CDVInvokedUrlCommand *)command;
- (void)printImage:(CDVInvokedUrlCommand *)command;
- (void)scanPrinter:(CDVInvokedUrlCommand *)command;
- (void)connectPrinter:(CDVInvokedUrlCommand *)command;
- (void)disconnect:(CDVInvokedUrlCommand *)command;

@end
