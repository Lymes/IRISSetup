import {
  View,
  Text,
  ButtonProps,
  TextStyle,
  TouchableOpacity,
} from "react-native";

interface Props extends ButtonProps {
  style?: TextStyle;
}

const PrimaryButton: React.FC<Props> = (props: Props) => {
  return (
    <TouchableOpacity onPress={props.onPress} disabled={props.disabled}>
      <View
        style={[
          props.style,
          {
            justifyContent: "center",
            backgroundColor: props.disabled
              ? "grey"
              : props.style?.backgroundColor,
            borderColor: props.style?.borderColor,
            borderWidth: props.style?.borderWidth,
          },
        ]}
      >
        <Text
          textBreakStrategy="simple"
          style={[
            props.style,
            {
              borderRadius: undefined,
              marginTop: undefined,
              marginBottom: undefined,
              margin: undefined,
              height: undefined,
              textAlignVertical: "center",
              textAlign: "center",
              backgroundColor: "transparent",
              color: props.style?.color,
            },
          ]}
        >
          {props.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default PrimaryButton;
