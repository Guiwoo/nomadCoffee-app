import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MycoffeeShop from "../screen/MycoffeeShop";

const Stack = createNativeStackNavigator();

const StackNav = ({ screenName }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {screenName === "MyProfile" ? (
        <Stack.Screen name="MycoffeeShop" component={MycoffeeShop} />
      ) : null}
    </Stack.Navigator>
  );
};

export default StackNav;
