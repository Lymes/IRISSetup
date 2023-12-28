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
  const [isInitialized, setInitialized] = useState(false);

  useEffect(() => {
    (async () => {
      console.log("Requesting camera permission...");
      const permission = await Camera.requestCameraPermission();
      setCameraPermission(permission);
    })();
  }, [device]);

  const codeScanner = useCodeScanner({
    codeTypes: ["qr"],
    onCodeScanned: (codes) => {
      codes.forEach((code) => {
        onFound(code.value || "");
      });
    },
  });

  console.log(
    "Rendering QR scanner screen, isActive:",
    isActive && isInitialized
  );

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
          isActive={isActive && isInitialized}
          codeScanner={codeScanner}
          resizeMode="cover"
          enableZoomGesture={true}
          focusable={true}
          style={{ width: 300, height: 300 }}
          onInitialized={() => {
            console.log("Camera is initialized");
            setInitialized(true);
          }}
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
