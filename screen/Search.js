import React from "react";
import { Button, Text, View } from "react-native";
import { logUserOut } from "../apollo";

export default () => (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <Text>Search</Text>
    <Button onPress={() => logUserOut()} title="logout" />
  </View>
);
