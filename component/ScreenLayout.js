import React from "react";
import { ActivityIndicator, View } from "react-native";
//need to do proptypes!

export default ({ loading, children }) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#74667F",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {loading ? <ActivityIndicator color="white" /> : children}
    </View>
  );
};
