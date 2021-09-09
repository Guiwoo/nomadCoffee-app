import React, { useEffect, useState } from "react";
import * as MediaLibrary from "expo-media-library";
import styled from "styled-components/native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { Image, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import useWindowDimensions from "react-native/Libraries/Utilities/useWindowDimensions";

const Conatainer = styled.View`
  flex: 1;
  background-color: #2c2c2c;
  padding: 0px 15px;
`;
const TextView = styled.View`
  margin-left: 5px;
  margin-bottom: 3px;
  border-bottom-width: 2px;
  border-bottom-color: rgba(255, 255, 255, 0.6);
`;
const TextInfo = styled.Text`
  color: white;
  font-weight: 500;
  font-size: 17px;
`;
const SelectedContainer = styled.View`
  flex: 1;
  margin-bottom: 40px;
`;
const PhotoListContainer = styled.View`
  flex: 1;
`;
const PhotoContainer = styled.TouchableOpacity``;
const IconContainer = styled.View`
  position: absolute;
  bottom: 5px;
  right: 0px;
`;
const GoNext = styled.TouchableOpacity`
  position: absolute;
  right: 5px;
  top: -3px;
`;
const HeaderRightText = styled.Text`
  font-weight: 600;
  font-size: 18px;
  color: #abf0d1;
`;

export default ({ navigation }) => {
  const NumberFour = 4;
  const { width } = useWindowDimensions();
  const [ok, setOk] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [choosen, setChoosen] = useState("");
  const getPhotos = async () => {
    const { assets: photos } = await MediaLibrary.getAssetsAsync();
    setPhotos(photos);
    setChoosen(photos[0]?.uri);
  };
  const getPermission = async () => {
    const { accessPrivileges, canAskAgain } =
      await MediaLibrary.getPermissionsAsync();
    if (accessPrivileges === "none" && canAskAgain) {
      const { accessPrivileges } = await MediaLibrary.requestPermissionsAsync();
      if (accessPrivileges !== "none") {
        setOk(true);
        getPhotos();
      }
    } else if (accessPrivileges !== "none") {
      const { accessPrivileges } = await MediaLibrary.requestPermissionsAsync();
      setOk(true);
      getPhotos();
    }
  };
  useEffect(() => {
    getPermission();
  }, []);
  const rednerPhoto = ({ item: photo }) => (
    <PhotoContainer onPress={() => previewPhoto(photo.uri)}>
      <Image
        style={{ width: (width - 30) / NumberFour, height: 87.5 }}
        source={{ uri: photo.uri }}
      />
      <IconContainer>
        <Ionicons
          name="checkmark-circle"
          size={20}
          color={photo.uri === choosen ? "#abf0d1" : "white"}
        />
      </IconContainer>
    </PhotoContainer>
  );
  const previewPhoto = (uri) => {
    setChoosen(uri);
  };
  return (
    <Conatainer>
      <SelectedContainer>
        <TextView>
          <TextInfo>Selected</TextInfo>
        </TextView>
        {choosen !== "" ? (
          <Image
            style={{ width: width - 30, height: "100%" }}
            source={{ uri: choosen }}
          />
        ) : null}
      </SelectedContainer>
      <PhotoListContainer>
        <TextView>
          <TextInfo>Photo List</TextInfo>
          <GoNext
            onPress={() =>
              navigation.navigate("UploadCoffee", { file: choosen })
            }
          >
            <HeaderRightText>Next</HeaderRightText>
          </GoNext>
        </TextView>
        <FlatList
          data={photos}
          numColumns={NumberFour}
          keyExtractor={(photo) => photo.id}
          renderItem={rednerPhoto}
        />
      </PhotoListContainer>
    </Conatainer>
  );
};
