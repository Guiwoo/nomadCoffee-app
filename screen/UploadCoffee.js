import React, { useEffect, useState } from "react";
import { TouchableOpacity, ScrollView, RefreshControl } from "react-native";
import styled from "styled-components/native";
import KeyBoardLayout from "../component/KeyBoardLayout";
import UploadInput from "../component/UploadInput";

const Container = styled.View`
  flex: 1;
  background-color: #2c2c2c;
  padding: 10px;
  justify-content: center;
`;
const UploadContainer = styled.View`
  justify-content: center;
`;
const UploadText = styled.Text`
  color: white;
  padding: 5px 10px;
  font-size: 20px;
  font-weight: 600;
  text-align: center;
`;
const ImageView = styled.Image``;
const Input = styled.TextInput`
  padding: 10px 20px;
  margin-bottom: 7px;
  color: white;
`;

const FileText = styled.Text`
  padding: 20px;
  margin-bottom: 7px;
  color: white;
  font-size: 15px;
  font-weight: 500;
  opacity: 0.3;
`;

const Button = styled.TouchableOpacity`
  background-color: #abf0d1;
  padding: 10px 10px;
  width: 100%;
  border-radius: 20px;
`;
const ButtonText = styled.Text`
  text-align: center;
`;

export default ({ navigation, route }) => {
  const choosenFile = route?.params?.file;
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    setRefreshing(false);
  };
  return (
    <KeyBoardLayout>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      >
        <UploadContainer>
          <UploadText>Upload</UploadText>
          {route?.params?.file ? (
            <ImageView
              resizeMode="cover"
              style={{ width: 400, height: 250 }}
              source={{ uri: choosenFile }}
            />
          ) : null}
          <TouchableOpacity onPress={() => navigation.navigate("GetPhoto")}>
            <FileText>Choose File or Take a Photo</FileText>
          </TouchableOpacity>
          <UploadInput file={choosenFile} navigation={navigation} />
        </UploadContainer>
      </ScrollView>
    </KeyBoardLayout>
  );
};
