import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { useForm } from "react-hook-form";
import { gql, useLazyQuery } from "@apollo/client";
import KeyBoardLayout from "../component/KeyBoardLayout";
import { FlatList } from "react-native-gesture-handler";

const SearchContainer = styled.View`
  margin-top: 5px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  color: black;
  padding: 5px 10px;
  border-radius: 10px;
`;

const Input = styled.TextInput`
  width: ${(props) => props.width / 1.7}px;
  justify-content: center;
`;
const SearchTouch = styled.TouchableOpacity``;
const SearchText = styled.Text`
  color: black;
`;
const TheIcons = styled(Ionicons)``;

const SEARCH_COFFEE_SHOP = gql`
  query searchCoffeeShop($keyword: String!, $page: Int!) {
    searchCoffeeShop(keyword: $keyword, page: $page) {
      CoffeeShop {
        id
        file
        name
      }
    }
  }
`;
const Container = styled.View`
  background-color: #2c2c2c;
  margin-top: 20px;
  border: #2c2c2c;
  border-top-color: white;
`;
const Title = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: white;
`;
const ResultBox = styled.View`
  margin-top: 20px;
`;
const Photo = styled.Image``;
const ItemBox = styled.View`
  margin-top: 10px;
`;

const Name = styled.Text`
  margin-top: 5px;
  font-size: 25px;
  text-align: center;
  color: white;
  font-weight: 600;
`;

export default ({ navigation }) => {
  const { width } = useWindowDimensions();
  const { register, setValue, handleSubmit, getValues } = useForm();
  const [queryFn, { loading, data, fetchMore, called }] =
    useLazyQuery(SEARCH_COFFEE_SHOP);
  const onValid = ({ keyword }) => {
    queryFn({
      variables: {
        keyword,
        page: 1,
      },
    });
  };
  const SearchInput = () => (
    <View style={{ flex: 1, backgroundColor: "#2c2c2c" }}>
      <Image
        style={{ maxHeight: 40, maxWidth: 300 }}
        resizeMode="contain"
        source={require("../assets/nomadCoffeeFont.png")}
      />
      <SearchContainer
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Input
          width={width}
          placeholder="Search Shops or Category..."
          placeholderTextColor="black"
          autoCapitalize="none"
          returnKeyLabel="Search"
          returnKeyType="search"
          autoCorrect={false}
          onChangeText={(text) => setValue("keyword", text)}
          onSubmitEditing={handleSubmit(onValid)}
        />
        <SearchTouch onPress={handleSubmit(onValid)}>
          <TheIcons name={"search"} size={19} color={"black"} />
        </SearchTouch>
      </SearchContainer>
    </View>
  );
  useEffect(() => {
    navigation.setOptions({
      headerTitle: SearchInput,
    });
    register("keyword");
  }, []);
  const [page, setPage] = useState(1);
  const renderResult = ({ item: result }) => (
    <ItemBox>
      <Photo
        resizeMode="cover"
        style={{ width: width, height: 200 }}
        source={{ uri: result.file }}
      />
      <Name>{result.name}</Name>
    </ItemBox>
  );
  return (
    <KeyBoardLayout>
      <Container>
        <Title>Searching Result!....</Title>
        <ResultBox>
          {loading ? <ActivityIndicator color={"yellow"} /> : null}
          {data?.searchCoffeeShop !== undefined ? (
            data?.searchCoffeeShop?.CoffeeShop.length === 0 ? (
              <Text style={{ color: "white", fontWeight: "700" }}>
                Can not find anythings
              </Text>
            ) : (
              <FlatList
                ItemSeparatorComponent={() => (
                  <View
                    style={{
                      height: 2,
                      width: width,
                      backgroundColor: "white",
                    }}
                  />
                )}
                onEndReachedThreshold={0.1}
                onEndReached={() => {
                  fetchMore({
                    variables: {
                      page: setPage(page + 1),
                    },
                  });
                }}
                showsVerticalScrollIndicator={false}
                data={data?.searchCoffeeShop?.CoffeeShop}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderResult}
              />
            )
          ) : null}
        </ResultBox>
      </Container>
    </KeyBoardLayout>
  );
};

{
  /* <FlatList
              ItemSeparatorComponent={() => (
                <View
                  style={{ height: 2, width: width, backgroundColor: "white" }}
                />
              )}
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl
                  tintColor="white"
                  colors="white"
                  refreshing={refresh}
                  onRefresh={refreshing}
                />
              }
              data={data?.searchCoffeeShop?.CoffeeShop}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderResult}
            /> */
}
