import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { Camera } from "expo-camera";
import { Alert, Image } from "react-native";
import * as MediaLibrary from "expo-media-library";

const Container = styled.View`
  flex: 1;
  background-color: #2c2c2c;
`;
const Actions = styled.View`
  flex-direction: row;
  position: absolute;
  bottom: 40px;
  right: 130px;
`;
const Shot = styled.TouchableOpacity`
  width: 50px;
  height: 50px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 25px;
  border: 2px solid white;
`;
const SwapCameraButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  margin-left: 10px;
`;
const ZoomButton = styled.TouchableOpacity`
  width: 30px;
  height: 30px;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 15px;
  border: 2px solid white;
  position: absolute;
  bottom: 100px;
  right: 183px;
`;
const ZoomText = styled.Text`
  font-size: 12px;
  font-weight: 600;
  color: white;
`;
const FlashBtn = styled.TouchableOpacity`
  margin-right: 10px;
  justify-content: center;
  align-items: center;
`;
const AfterPhotoContainer = styled.View`
  flex: 1;
`;
const NewContainer = styled.View`
  flex: 0.09;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const AfterPhoto = styled.TouchableOpacity`
  width: 60px;
  flex-direction: row;
  justify-content: center;
  padding: 10px;
  margin-right: 10px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 30px;
  border: 1px solid white;
`;
const AfterPhotoText = styled.Text`
  text-align: center;
  font-size: 10px;
  font-weight: 600;
  color: white;
`;

export default ({ navigation }) => {
  const camera = useRef();
  const [takenPhoto, setTakenPhoto] = useState("");
  const [cameraReady, setCameraReady] = useState(false);
  const [ok, setOk] = useState(false);
  const [zoom, setZoom] = useState(0);
  const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const getPermissions = async () => {
    const { granted } = await Camera.requestCameraPermissionsAsync();
    setOk(granted);
  };
  const onZoomSwitch = () => {
    if (zoom === 0) {
      setZoom(0.5);
    } else if (zoom === 0.5) {
      setZoom(1);
    } else {
      setZoom(0);
    }
  };
  const onCameraSwitch = () => {
    if (cameraType === Camera.Constants.Type.front) {
      setCameraType(Camera.Constants.Type.back);
    } else {
      setCameraType(Camera.Constants.Type.front);
    }
  };
  const onFlashSwitch = () => {
    if (flashMode === Camera.Constants.FlashMode.off) {
      setFlashMode(Camera.Constants.FlashMode.on);
    } else if (flashMode === Camera.Constants.FlashMode.on) {
      setFlashMode(Camera.Constants.FlashMode.auto);
    } else if (flashMode === Camera.Constants.FlashMode.auto) {
      setFlashMode(Camera.Constants.FlashMode.off);
    }
  };
  const takePhoto = async () => {
    if (camera.current && cameraReady) {
      const { uri } = await camera.current.takePictureAsync({
        quality: 1,
        exif: true,
      });
      setTakenPhoto(uri);
    }
  };
  const onCameraReady = () => {
    setCameraReady(true);
  };
  const goToUpload = async (save) => {
    if (save) {
      await MediaLibrary.createAssetAsync(takenPhoto);
    }
    navigation.navigate("UploadCoffee", { file: takenPhoto });
  };
  const onALret = () => {
    Alert.alert("Save Photo", "Save Photo & Upload or Just Upload", [
      {
        text: "Save & Upload",
        onPress: () => goToUpload(true),
      },
      {
        text: "Just Upload",
        onPress: () => goToUpload(false),
      },
    ]);
  };

  useEffect(() => {
    getPermissions();
  }, []);
  const onDissmiss = () => setTakenPhoto("");
  return (
    <Container>
      {takenPhoto === "" ? (
        <Camera
          type={cameraType}
          style={{ flex: 1 }}
          zoom={zoom}
          flashMode={flashMode}
          ref={camera}
          onCameraReady={onCameraReady}
        >
          <ZoomButton onPress={onZoomSwitch}>
            <ZoomText>x{zoom}</ZoomText>
          </ZoomButton>
          <Actions>
            <FlashBtn onPress={onFlashSwitch}>
              <Ionicons
                size={30}
                color={"white"}
                name={
                  flashMode === Camera.Constants.FlashMode.off
                    ? "flash-off"
                    : flashMode === Camera.Constants.FlashMode.on
                    ? "flash"
                    : flashMode === Camera.Constants.FlashMode.auto
                    ? "eye"
                    : ""
                }
              />
            </FlashBtn>
            <Shot onPress={takePhoto} />
            <SwapCameraButton onPress={onCameraSwitch}>
              <Ionicons
                name="camera-reverse-outline"
                size={30}
                color={"white"}
              />
            </SwapCameraButton>
          </Actions>
        </Camera>
      ) : (
        <AfterPhotoContainer>
          <Image source={{ uri: takenPhoto }} style={{ flex: 1 }} />
          <NewContainer>
            <AfterPhoto onPress={onDissmiss}>
              <AfterPhotoText>Retake</AfterPhotoText>
            </AfterPhoto>
            <AfterPhoto onPress={onALret}>
              <AfterPhotoText>Use</AfterPhotoText>
            </AfterPhoto>
          </NewContainer>
        </AfterPhotoContainer>
      )}
    </Container>
  );
};
