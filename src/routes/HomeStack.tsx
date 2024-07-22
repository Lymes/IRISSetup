import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "~navigation/RootStackPrams";
import HomeScreen from "~screens/Home/HomeScreen";

const HomeStack = createNativeStackNavigator<RootStackParamList>();

export const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
    </HomeStack.Navigator>
  );
};
