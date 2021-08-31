import React from "react";
import { ActivityIndicator, View } from "react-native";
//need to do proptypes!

export default ({ loading, children }) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#2c2c2c",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {loading ? <ActivityIndicator color="white" /> : children}
    </View>
  );
};
