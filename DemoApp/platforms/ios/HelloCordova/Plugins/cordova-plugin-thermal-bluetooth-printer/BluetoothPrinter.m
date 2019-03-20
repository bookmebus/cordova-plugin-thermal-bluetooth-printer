/*
In xcode project
 - Drop SDK folder (PrinterSDK/PrinterSDK.h, libPrinterSDK.a) to the root of project
 - In confirm popup dialog don't choose reference
 - Click on Project -> General -> Linked Frameworks and Libraries -> click +
 - In popup dialog choose Add Other.. -> select static library in the above step PrinterSDK/libPrinterSDK.a

*/


#import <UIKit/UIKit.h>
#import <Cordova/CDVAvailability.h>

#import "BluetoothPrinter.h"

#import "PrinterSDK/PrinterSDK.h"

@implementation BluetoothPrinter

- (void)pluginInitialize {
  NSLog(@"Initialize plugin");
    _connected = NO;
}

- (void)connectPrinter:(CDVInvokedUrlCommand *)command {
  NSLog(@"=== Printer array == %@", _printerArray);

  NSString* paramIndex = [command.arguments objectAtIndex:0];
  NSLog(@"===== PARAM INDEX ==== %@", paramIndex);
  int index = [paramIndex intValue];

  NSLog(@"===== Integer index ==== %i", index);

  Printer* printer = [_printerArray objectAtIndex:index];

  NSLog(@"==== printer ==== %@", printer);

   [[PrinterSDK defaultPrinterSDK] connectBT:printer];

    NSString *successMessage = @"Device connect successfully";

  CDVPluginResult *result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:successMessage];
  [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
}

- (void)handlePrinterConnectedNotification:(NSNotification*)notification
{
    if (!_connected)
    {
        double delayInSeconds = 1.0f;
        dispatch_time_t popTime = dispatch_time(DISPATCH_TIME_NOW, (int64_t)(delayInSeconds * NSEC_PER_SEC));
        dispatch_after(popTime, dispatch_get_main_queue(), ^(void)
        {
            [[PrinterSDK defaultPrinterSDK] printTestPaper];
        });
    }

    _connected = YES;

}

- (void)handlePrinterDisconnectedNotification:(NSNotification*)notification
{
    _connected = NO;
    NSLog(@"Printer Status is == %d", _connected);
}


//  If printer is not ON
//  API MISUSE: <CBCentralManager: 0x282cef180> can only accept this command while in the powered on state
- (void)scanPrinter:(CDVInvokedUrlCommand *)command {


  [[PrinterSDK defaultPrinterSDK] scanPrintersWithCompletion:^(Printer* printer)
  {
    if (nil == _printerArray)
    {
        _printerArray = [[NSMutableArray alloc] initWithCapacity:1];
    }

    [_printerArray addObject:printer];

      NSMutableArray *response ;
      response = [[NSMutableArray alloc] initWithCapacity: 1];

    for (int i=0; i<[ _printerArray count]; i++) {
        NSString *uuid = [_printerArray[i] UUIDString];
        NSString *name = [_printerArray[i] name];
        NSString *sep = @"|";
        NSString *item = [[name stringByAppendingString: sep] stringByAppendingString: uuid];
        [response addObject:item];
    }

      NSLog(@"=== Printer Array == %@", _printerArray);



      CDVPluginResult *result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsArray: response];
      [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];

  }];

}

- (void)printText:(CDVInvokedUrlCommand *)command {
  NSLog(@"==== Print Text ====");
  NSString* printValue = [command.arguments objectAtIndex:0];

  [[PrinterSDK defaultPrinterSDK] printText:printValue];
}

- (void)printImage:(CDVInvokedUrlCommand *)command {
  NSLog(@"==== Print Image ====");
  NSString* imageBase64 = [command.arguments objectAtIndex:0];

  NSData* imageData = [[NSData alloc]initWithBase64EncodedString:imageBase64 options:NSDataBase64DecodingIgnoreUnknownCharacters];
  UIImage* image = [UIImage imageWithData: imageData];
  [[PrinterSDK defaultPrinterSDK] printImage:image];

}

- (void)disconnect:(CDVInvokedUrlCommand *)command {
  [[PrinterSDK defaultPrinterSDK] disconnect];
}

@end
