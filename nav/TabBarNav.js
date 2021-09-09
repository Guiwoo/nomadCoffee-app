import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import Home from "../screen/Home";
import Search from "../screen/Search";
import Profile from "../screen/Profile";
import { isLoggedInVar } from "../apollo";
import { useReactiveVar } from "@apollo/client";
import StackNav from "./StackNav";
import { Image } from "react-native";
import UploadTab from "./UploadTab";

const Tab = createBottomTabNavigator();

const TabBarNav = () => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#2c2c2c",
          shadowColor: "#2c2c2c",
        },
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#2c2c2c",
          borderTopColor: "rgba(255,255,255,0.3)",
        },
      }}
    >
      <Tab.Screen
        name="Home"
        options={{
          headerTitle: () => (
            <Image
              style={{ maxHeight: 40, maxWidth: 300 }}
              resizeMode="contain"
              source={require("../assets/nomadCoffeeFont.png")}
            />
          ),
          tabBarIcon: () => (
            <Ionicons name={"home"} size={26} color={"white"} />
          ),
        }}
        component={Home}
      />
      <Tab.Screen
        name="Search"
        options={{
          tabBarIcon: () => (
            <Ionicons name={"search"} size={26} color={"white"} />
          ),
        }}
        component={Search}
      />
      <Tab.Screen
        name="Upload"
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <Ionicons name={"cloud-upload-outline"} size={26} color={"white"} />
          ),
        }}
        component={UploadTab}
      />
      <Tab.Screen
        name="Profile"
        options={{
          tabBarIcon: () => (
            <Ionicons name={"person"} size={26} color={"white"} />
          ),
        }}
      >
        {() =>
          isLoggedIn ? <StackNav screenName={"MyProfile"} /> : <Profile />
        }
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default TabBarNav;
