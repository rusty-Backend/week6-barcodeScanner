## Week 6 - Barcode reading app with camera

App which lets user to scan ean8 and ean13 barcodes with phone camera and displays the barcode number on the screen after scan. With the "Scan again"-button user can reset the scan and scan again.

Task was fairly straight forward. The documentation provided direct copy-paste template for camera usage and exploring further the documentation we just had to bake in the barcode scanner logic.


## How does the camera scan the barcodes?

Currently CameraView constantly calls onBarcodeScanned function. The barcodeScannerSettings limits the scan only to barcode types ean13 and ean8. When camera hits ean-scan, onBarcodeScanned sets result.data to undefined and saves it to the scannedCode state. When this state is null the camera scans constantly and when it is not null it stops the scanning. Pressing "Scan Again" sets this back to null and starts scanning again.

![Alt text](BarcodeScanner.jpg)
