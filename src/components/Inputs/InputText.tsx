import { useState } from "react";
import {
  Pressable,
  View,
  TextInput,
  Image,
  TextInputProps,
} from "react-native";
import eye from "./assets/Eye.png";
import eyeOff from "./assets/Eye_off.png";

const InputText: React.FC<TextInputProps> = (props: TextInputProps) => {
  const [isClear, setClear] = useState(false);
  const handlePress = () => {
    setClear(!isClear);
  };
  return (
    <View
      style={[
        props.style,
        {
          paddingTop: 0,
          paddingBottom: 0,
          paddingLeft: 8,
          paddingRight: 8,
          flexDirection: "row",
          justifyContent: "space-between",
          alignContent: "flex-start",
          elevation: 0,
          gap: 5,
        },
      ]}
    >
      <TextInput
        {...props}
        secureTextEntry={props.secureTextEntry ? !isClear : false}
        textContentType="oneTimeCode"
        style={[
          props.style,
          {
            width: "90%",
            height: undefined,
            margin: undefined,
            marginTop: undefined,
            marginBottom: undefined,
            borderWidth: undefined,
            borderRadius: undefined,
            justifyContent: "center",
            elevation: 0,
          },
          props.secureTextEntry ? { width: "90%" } : { width: "100%" },
        ]}
      />
      {props.secureTextEntry ? (
        <Pressable
          onPress={handlePress}
          style={{
            margin: undefined,
            justifyContent: "center",
          }}
        >
          <Image
            style={{
              width: 22,
              height: 22,
            }}
            source={isClear ? eye : eyeOff}
          />
        </Pressable>
      ) : null}
    </View>
  );
};

export default InputText;
