import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import UploadCoffee from "../screen/UploadCoffee";
import TakeCoffee from "../screen/TakeCoffee";
import ChooseCoffee from "../screen/ChooseCoffee";
import { Image } from "react-native";

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

export default () => {
  return (
    <Stack.Navigator
      screenOptions={{
        presentation: "card",
        headerStyle: {
          backgroundColor: "#2c2c2c",
          shadowColor: "#2c2c2c",
        },
        headerBackTitle: false,
      }}
    >
      <Stack.Screen
        name="UploadCoffee"
        options={{
          headerTitle: () => (
            <Image
              style={{ maxHeight: 40, maxWidth: 300 }}
              resizeMode="contain"
              source={require("../assets/nomadCoffeeFont.png")}
            />
          ),
        }}
        component={UploadCoffee}
      />
      <Stack.Screen
        name="GetPhoto"
        options={{
          headerTitle: "Select Photo",
          headerTintColor: "white",
          headerBackTitleVisible: false,
        }}
      >
        {() => (
          <Tab.Navigator
            tabBarPosition="bottom"
            screenOptions={{
              tabBarStyle: {
                backgroundColor: "#2c2c2c",
              },
              tabBarActiveTintColor: "white",
              tabBarIndicatorStyle: {
                backgroundColor: "yellow",
                top: 0,
              },
            }}
          >
            <Tab.Screen
              name="TakeCoffee"
              options={{
                title: "Select Photo",
              }}
              component={TakeCoffee}
            />
            <Tab.Screen
              name="ChooseCoffee"
              options={{
                title: "Take a Photo",
              }}
              component={ChooseCoffee}
            />
          </Tab.Navigator>
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};
