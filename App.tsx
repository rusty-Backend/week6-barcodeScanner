import { CameraView, useCameraPermissions, BarcodeScanningResult } from 'expo-camera';
import { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function App() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scannedCode, setScannedCode] = useState<string | null>(null);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to use the camera
        </Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  function handleBarcodeScanned(result: BarcodeScanningResult) {
    setScannedCode(result.data);
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        facing="back"
        onBarcodeScanned={scannedCode ? undefined : handleBarcodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ['ean13', 'ean8'],
        }}
      />

      <View style={styles.resultContainer}>
        {scannedCode ? (
          <>
            <Text style={styles.resultLabel}>Scanned EAN Code:</Text>
            <Text style={styles.resultCode}>{scannedCode}</Text>
            <Button title="Scan Again" onPress={() => setScannedCode(null)} />
          </>
        ) : (
          <Text style={styles.instructions}>
            Point the camera at an EAN barcode
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  resultContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'white',
    padding: 60,
    alignItems: 'center',
    gap: 8,
  },
  resultLabel: {
    fontSize: 16,
    color: '#555',
  },
  resultCode: {
    fontSize: 28,
    fontWeight: 'bold',
    letterSpacing: 2,
    marginBottom: 8,
  },
  instructions: {
    fontSize: 16,
    color: '#555',
    paddingVertical: 8,
  },
});