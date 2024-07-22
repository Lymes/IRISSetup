import { Alert, FlatList, Text, TouchableOpacity, View } from "react-native";
import PrimaryButton from "~components/Buttons/PrimaryButton";
import useBLEScannerHooks from "./useBLEScannerHooks";
import Spinner from "~components/Spinner";

interface BLEScannerProps {
  onConnect: () => void;
}

const BLEScanner: React.FC<BLEScannerProps> = ({ onConnect }) => {
  const {
    style,
    theme,
    peripherals,
    isScanning,
    isConnecting,
    peripheral,
    setPeripheral,
    startScan,
    connect,
  } = useBLEScannerHooks();

  return (
    <>
      <View style={style.scanContainer}>
        <View style={style.logContainer}>
          <FlatList
            data={peripherals}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  setPeripheral(item);
                }}
              >
                <Text
                  numberOfLines={1}
                  style={[
                    style.logText,
                    peripheral === item
                      ? {
                          backgroundColor: theme.colors.primaryBackground,
                        }
                      : {
                          backgroundColor: "transparent",
                        },
                  ]}
                >
                  {item.name || item.advertising.localName}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
        <PrimaryButton
          disabled={isScanning}
          style={style.scanButton}
          title="Scan"
          onPress={startScan}
        />
        <PrimaryButton
          disabled={peripheral === undefined}
          style={style.scanButton}
          title="Connect"
          onPress={async () => {
            if (peripheral !== undefined) {
              try {
                await connect(peripheral);
                onConnect();
              } catch (error) {
                Alert.alert("BLE", `${error}`, [{ text: "OK" }]);
              }
            }
          }}
        />
      </View>
      <Spinner visible={isScanning} textContent={"Scanning..."} />
      <Spinner visible={isConnecting} textContent={"Connecting..."} />
    </>
  );
};

export default BLEScanner;
