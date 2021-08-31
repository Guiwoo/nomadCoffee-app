import React, { useEffect, useState } from "react";
import { Image, ImageBackground, Text, View } from "react-native";
import useWindowDimensions from "react-native/Libraries/Utilities/useWindowDimensions";
import styled from "styled-components/native";
const ItemBox = styled.View`
  margin: 10px 0;
`;
const Photo = styled.Image`
  margin-left: 20px;
  margin-top: 20px;
  border-radius: 20px;
`;
const Name = styled.Text`
  margin-top: 5px;
  font-size: 25px;
  text-align: center;
  color: white;
  font-weight: 600;
`;
const Category = styled.View`
  margin-top: 15px;
  margin-right: 13px;
  flex-direction: row;
  justify-content: flex-end;
`;
const CategoryText = styled.Text`
  text-align: center;
  font-weight: 500;
  color: white;
  margin-right: 7px;
  font-size: 16px;
`;

//Will get query coffee shops
export default ({ id, name, file, categories }) => {
  const { width, height } = useWindowDimensions();
  return (
    <ItemBox>
      <ImageBackground
        source={{ uri: file }}
        resizeMode="cover"
        style={{
          width,
          height: 500,
        }}
        imageStyle={{ opacity: 0.3 }}
      >
        <Photo
          resizeMode="cover"
          style={{ width: width - 40, height: 400 }}
          source={{ uri: file }}
        />
        <Name>{name}</Name>
        <Category>
          {categories.map((item) => (
            <CategoryText key={item.id}>{item.name}</CategoryText>
          ))}
        </Category>
      </ImageBackground>
    </ItemBox>
  );
};
