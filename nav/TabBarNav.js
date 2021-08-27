import React, { Profiler } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import Home from "../screen/Home";
import Search from "../screen/Search";
import Profile from "../screen/Profile";
import { isLoggedInVar } from "../apollo";
import MycoffeeShop from "../screen/MycoffeeShop";
import { useReactiveVar } from "@apollo/client";

const Tab = createBottomTabNavigator();

const TabBarNav = () => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#2c2c2c",
          borderTopColor: "rgba(255,255,255,0.3)",
        },
      }}
      initialRouteName="Profile"
    >
      <Tab.Screen
        name="Home"
        options={{
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
        name="Profile"
        options={{
          tabBarIcon: () => (
            <Ionicons name={"person"} size={26} color={"white"} />
          ),
        }}
        component={isLoggedIn ? MycoffeeShop : Profile}
      />
    </Tab.Navigator>
  );
};

export default TabBarNav;
