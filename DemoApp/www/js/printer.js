// $('#btn-connect')[0].disabled = true
$('#btn-print-text')[0].disabled = true
$('#btn-print-image')[0].disabled = true

$('#btn-scan').on('click', function() {
  BTPrinter.scanPrinter(function(result) {
    console.log("==== Returned printers ==== ", result)

    printerManager.renderDevices(result)

  }, null)
})

$("#btn-print-text").on('click', function() {
  var string = "Test printing text"
  BTPrinter.printText(string, null, null)
})

$("#btn-print-image").on('click', function() {
  var $canvasContent = $("#canvas-content")[0]
  html2canvas($canvasContent, { useCORS: true }).then(function(canvas) {
    var base64 = canvas.toDataURL("image/png")
    if(cordova != undefined && cordova.platformId == 'ios')
      base64 = base64.replace(/^data:image\/(png|jpg);base64,/, "");

    BTPrinter.printImage(base64, null, null)
  });
})

$("#btn-disconnect").on('click', function() {
  BTPrinter.disconnect()
})

$(document.body).delegate('.btn-connect', 'click', function() {
  var selectedPrinter = ''
  if(cordova != undefined && cordova.platformId == 'ios')
    selectedPrinter = $(this).data("index")
  else if(cordova != undefined && cordova.platformId == 'android')
    selectedPrinter = $(this).data("item")

  BTPrinter.connectPrinter(selectedPrinter, function(response) {
    console.log("connect success ====")
    $('#btn-print-text')[0].disabled = false
    $('#btn-print-image')[0].disabled = false
  }, function(error) {
    console.log("Connect printer failed == ", error)
  })
})

var printerManager = {
  renderDevices: function (result) {
    var $deviceContainer = $('#device-container')
    var template = $("#device-item").text()
    var html = []
    for(var i=0;i<result.length; i++) {
      var name = result[i].split("|")[0]
      var uuid = result[i].split("|")[1]

      $.tmpl( template, { "name": name, "uuid": uuid, "index": i, "item": result[i]}).appendTo($deviceContainer)
    }
  }
}
