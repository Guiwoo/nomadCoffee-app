import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import React from "react";
import { Text, View } from "react-native";
import styled from "styled-components/native";
import ScreenLayout from "../component/ScreenLayout";

const ME_QUERY = gql`
  query me {
    me {
      id
      username
      coffeeShops {
        name
      }
    }
  }
`;

export default () => {
  const { data, loading } = useQuery(ME_QUERY);
  return (
    <ScreenLayout loading={loading}>
      <Text style={{ color: "white" }}>My Profile</Text>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: "white", fontWeight: "600" }}>My Shops</Text>
        {data?.me?.coffeeShops.map((shop, index) => (
          <Text key={index} style={{ color: "white" }}>
            {shop.name}
          </Text>
        ))}
      </View>
    </ScreenLayout>
  );
};
