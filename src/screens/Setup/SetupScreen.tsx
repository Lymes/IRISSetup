import React from "react";
import {
  Text,
  Keyboard,
  ImageBackground,
  View,
  Alert,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "~navigation/RootStackPrams";
import useSetupScreenHooks from "./useSetupScreenHooks";
import PrimaryButton from "~components/Buttons/PrimaryButton";
import dsgw from "assets/images/dsgw_bg2.png";
import Spinner from "~components/Spinner";
import LicenseCounter from "~components/LicenseViewer/LicenseCounter";

type SetupProps = NativeStackScreenProps<RootStackParamList, "Setup">;

export default function SetupScreen({ navigation }: SetupProps) {
  const {
    contextData,
    style,
    theme,
    isSending,
    license,
    setLicense,
    sendToIris,
  } = useSetupScreenHooks();

  return (
    <View style={style.safeContainer}>
      <LicenseCounter />
      <View style={style.container}>
        <View style={style.logContainer}>
          <FlatList
            data={contextData.cloudData}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  setLicense(item);
                }}
              >
                <Text
                  numberOfLines={1}
                  style={[
                    style.logText,
                    license === item
                      ? {
                          backgroundColor: theme.colors.primaryBackground,
                        }
                      : {
                          backgroundColor: "transparent",
                        },
                  ]}
                >
                  {item.plantId || item.serialNumber}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>

        <PrimaryButton
          style={style.sendButton}
          title="Send to IRIS"
          disabled={license === undefined}
          onPress={async () => {
            try {
              Keyboard.dismiss();
              await sendToIris();
            } catch (error) {
              Alert.alert("IRIS", `${error}`, [{ text: "OK" }]);
            }
          }}
        />
      </View>
      <Spinner visible={isSending} textContent={"Sending..."} />
    </View>
  );
}
