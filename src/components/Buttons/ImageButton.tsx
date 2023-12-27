import {
  Image,
  ImageSourcePropType,
  ImageStyle,
  TouchableOpacity,
  View,
} from 'react-native';

interface Props {
  style?: ImageStyle;
  tint?: string;
  onPress: () => void;
  image: ImageSourcePropType;
}

const ImageButton: React.FC<Props> = ({style, onPress, image}) => {
  return (
    <View
      style={[
        style,
        {
          width: undefined,
          height: undefined,
          backgroundColor: style?.backgroundColor,
          borderColor: style?.borderColor,
          borderWidth: style?.borderWidth,
        },
      ]}>
      <TouchableOpacity onPress={onPress} hitSlop={20}>
        <Image
          style={[
            {
              height: style?.height || 32,
              width: style?.width || 32,
              tintColor: style?.tintColor,
            },
          ]}
          source={image}></Image>
      </TouchableOpacity>
    </View>
  );
};

export default ImageButton;
