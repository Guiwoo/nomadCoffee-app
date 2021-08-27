import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import React from "react";
import { Text, View } from "react-native";
import styled from "styled-components/native";

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

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #2c2c2c;
  padding: 30px;
`;

export default () => {
  const { data, loading } = useQuery(ME_QUERY);
  console.log(data, loading, "me");
  return (
    <Container>
      <Text style={{ color: "white" }}>My Profile</Text>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: "white", fontWeight: "600" }}>My Shops</Text>
        {data?.me?.coffeeShops.map((shop) => (
          <Text style={{ color: "white" }}>{shop.name}</Text>
        ))}
      </View>
    </Container>
  );
};
