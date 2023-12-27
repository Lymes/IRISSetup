import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import {
  Camera,
  CameraPermissionStatus,
  useCameraDevice,
  useCodeScanner,
} from "react-native-vision-camera";

interface QRScannerProps {
  isActive: boolean;
  onFound: (code: string) => void;
}

const QRScanner: React.FC<QRScannerProps> = ({ isActive, onFound }) => {
  const device = useCameraDevice("back", {
    physicalDevices: ["wide-angle-camera"],
  });
  const [cameraPermission, setCameraPermission] =
    useState<CameraPermissionStatus>("not-determined");

  useEffect(() => {
    (async () => {
      console.log("Requesting camera permission...");
      const permission = await Camera.requestCameraPermission();
      setCameraPermission(permission);
    })();
  }, []);

  const codeScanner = useCodeScanner({
    codeTypes: ["qr", "ean-13"],
    onCodeScanned: (codes) => {
      codes.forEach((code) => {
        onFound(code.value || "");
      });
    },
  });

  console.log("Rendering QR scanner screen, isActive:", isActive);

  return (
    <View
      style={{
        width: 300,
        height: 300,
        alignSelf: "center",
        backgroundColor: "black",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {device !== undefined && cameraPermission === "granted" ? (
        <Camera
          device={device}
          isActive={isActive}
          codeScanner={codeScanner}
          resizeMode="cover"
          style={{ width: 300, height: 300 }}
        />
      ) : (
        <Text
          style={{
            color: "white",
          }}
        >
          No camera
        </Text>
      )}
    </View>
  );
};

export default QRScanner;
