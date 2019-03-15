
# Cordova-Plugin-Bluetooth-Printer for iOS

A Cordova plugin for thermal bluetooth printer for iOS platform which complements an excellent plugin from https://github.com/srehanuddin/Cordova-Plugin-Bluetooth-Printer that only support Android platform
If you need to print in both Android and iOS you might have to use both plugins.

## Support
-   Text
-   Image Printing (todo)

## Example of usage
```ruby
$('#btn-connect')[0].disabled = true
$('#btn-print-text')[0].disabled = true
$('#btn-print-image')[0].disabled = true

$('#btn-scan').on('click', function() {
  BmbBluetoothPrinter.scanPrinter(function(result) {
    console.log("==== Returned printers ==== ", result)
    printerManager.renderDevices(result)
  }, null)
})

$("#btn-print-text").on('click', function() {
  var string = "Test printing text"
  BmbBluetoothPrinter.printText(string, null, null)
})

$("#btn-print-image").on('click', function() {
  var $canvasContent = $("#canvas-content")[0]
  html2canvas($canvasContent, { useCORS: true }).then(function(canvas) {
    var base64 = canvas.toDataURL("image/png")
    base64 = base64.replace(/^data:image\/(png|jpg);base64,/, "");
    console.log("canvas == ", base64)
    BmbBluetoothPrinter.printImage(base64, null, null)
  });
})

$(document.body).delegate('.btn-connect', 'click', function() {
  var index = $(this).data("index")
  console.log("Index == ", index)
  BmbBluetoothPrinter.connectPrinter(index, function(response) {
    console.log("connect success ====")
    $('#btn-print-text')[0].disabled = false
    $('#btn-print-image')[0].disabled = false
   }, null)
})

var printerManager = {
  renderDevices: function (result) {
    var $deviceContainer = $('#device-container')
    var template = $("#device-item").text()
  
    var html = []
    for(var i=0;i<result.length; i++) {
      var name = result[i].split("|")[0]
      var uuid = result[i].split("|")[1]
      $.tmpl( template, { "name": name, "uuid": uuid, "index": i}).appendTo($deviceContainer)
    }

   if(result.length > 0) 
     $('#btn-connect')[0].disabled = false
  }
}
```

## Example app
You can find cordova example app for quick demo and testing in DemoApp sub directory: https://github.com/bookmebus/cordova-plugin-bluetooth-printer/tree/master/DemoApp.

## Contribution
We have no background in Objective-C we are thrilled to do it. In just two days we have it working. The code is not perfect yet but we are looking for contributors to solve this printing issue and open source it to empower others. Please hand up!
