import { gql, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { FlatList, RefreshControl } from "react-native";
import styled from "styled-components/native";
import HomeBox from "../component/Home/HomeBox";
import ScreenLayout from "../component/ScreenLayout";

const Container = styled.View`
  background-color: #2c2c2c;
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const SEE_COFFEE_SHOPS = gql`
  query seeCoffeeShops($page: Int!) {
    seeCoffeeShops(page: $page) {
      id
      name
      file
      categories {
        id
        name
      }
    }
  }
`;

export default () => {
  const [refresh, setRefresh] = useState(false);
  const { data, loading, refetch, fetchMore } = useQuery(SEE_COFFEE_SHOPS, {
    variables: {
      page: 0,
    },
  });
  const refreshing = async () => {
    setRefresh(true);
    await refetch();
    setRefresh(false);
  };
  const renderHomeBox = ({ item: seeCoffeeShops }) => {
    return <HomeBox {...seeCoffeeShops} />;
  };
  return (
    <ScreenLayout loading={loading}>
      <FlatList
        onEndReachedThreshold={0.1}
        onEndReached={() => {
          fetchMore({
            variables: {
              page: data.seeCoffeeShops.length,
            },
          });
        }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            tintColor="white"
            colors="white"
            refreshing={refresh}
            onRefresh={refreshing}
          />
        }
        data={data?.seeCoffeeShops}
        renderItem={renderHomeBox}
        keyExtractor={(item) => item.id.toString()}
      />
    </ScreenLayout>
  );
};
