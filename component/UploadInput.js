import { gql, useMutation } from "@apollo/client";
import React, { useEffect, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { ActivityIndicator, View } from "react-native";
import styled from "styled-components/native";
import { ReactNativeFile } from "apollo-upload-client";

const Input = styled.TextInput`
  padding: 10px 20px;
  margin-bottom: 7px;
  color: white;
  font-size: 17px;
  font-weight: 600;
`;

const Button = styled.TouchableOpacity`
  background-color: #abf0d1;
  padding: 10px 10px;
  width: 100%;
  border-radius: 20px;
`;
const ButtonText = styled.Text`
  text-align: center;
  color: black;
  font-size: 18px;
  font-weight: 600;
`;
const ErrorText = styled.Text`
  color: red;
  font-size: 10px;
  font-weight: 600;
`;
const CREATE_COFFEE_SHOP = gql`
  mutation createCoffeeShop(
    $name: String!
    $latitude: String!
    $longitude: String!
    $categoryItem: String
    $file: Upload!
  ) {
    createCoffeeShop(
      name: $name
      latitude: $latitude
      longitude: $longitude
      categoryItem: $categoryItem
      file: $file
    ) {
      ok
      error
    }
  }
`;
const SEE_COFFEE_SHOPS = gql`
  query seeCoffeeShops($page: Int!) {
    seeCoffeeShops(page: $page) {
      id
      name
      user {
        id
        username
        avatarURL
        totalFollowings
      }
      latitude
      longitude
      file
      categories {
        id
        name
      }
    }
  }
`;

const UploadInput = ({ file, navigation }) => {
  const longitudeRef = useRef();
  const latitudeRef = useRef();
  const categoryRef = useRef();
  const [createCoffeeShop, { loading }] = useMutation(CREATE_COFFEE_SHOP, {
    onCompleted: (data) => {
      const {
        createCoffeeShop: { ok, error },
      } = data;
      navigation.navigate("Home");
    },
    refetchQueries: [{ query: SEE_COFFEE_SHOPS, variables: { page: 0 } }],
  });
  const onNext = (nextOne) => {
    nextOne?.current?.focus();
  };
  const {
    control,
    handleSubmit,
    formState: { errors },
    formState,
    reset,
    setValue,
  } = useForm({
    defaultValues: {
      name: "",
      latitude: "",
      longitude: "",
      categoryItem: "",
      file: "",
    },
  });
  const onChange = (arg) => {
    return {
      value: arg.nativeEvent.text,
    };
  };
  const onSubmit = ({ name, latitude, longitude, categoryItem }) => {
    if (!file) {
      return;
    }
    const newFile = new ReactNativeFile({
      uri: file,
      name: `test.jpeg`,
      type: "image/jpeg",
    });
    createCoffeeShop({
      variables: {
        name,
        latitude,
        longitude,
        categoryItem,
        file: newFile,
      },
    });
    reset({
      name: "",
      longitude: "",
      latitude: "",
      categoryItem: "",
    });
  };
  return (
    <View>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input
            placeholder="Name.."
            placeholderTextColor="rgba(255,255,255,0.3)"
            onChangeText={(value) => onChange(value)}
            returnKeyType={"next"}
            value={value}
            autoCorrect={false}
            onSubmitEditing={() => onNext(longitudeRef)}
          />
        )}
        name="name"
        rules={{
          required: "Name is required",
        }}
      />
      {formState.errors?.name?.message ? (
        <ErrorText>{formState.errors?.name?.message}</ErrorText>
      ) : null}
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input
            clearButtonMode="always"
            placeholder="Longitude.."
            placeholderTextColor="rgba(255,255,255,0.3)"
            onChangeText={(value) => onChange(value)}
            returnKeyType={"next"}
            value={value}
            autoCorrect={false}
            onSubmitEditing={() => onNext(latitude)}
          />
        )}
        name="longitude"
        rules={{ required: "Longititu is required & Number" }}
      />
      {formState.errors?.longitude?.message ? (
        <ErrorText>{formState.errors?.longitude?.message}</ErrorText>
      ) : null}
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input
            clearButtonMode="always"
            placeholder="Latitude.."
            placeholderTextColor="rgba(255,255,255,0.3)"
            onChangeText={(value) => onChange(value)}
            returnKeyType={"next"}
            autoCorrect={false}
            value={value}
            onSubmitEditing={() => onNext(categoryRef)}
          />
        )}
        name="latitude"
        rules={{ required: "Latitude is required & Number" }}
      />
      {formState.errors?.latitude?.message ? (
        <ErrorText>{formState.errors?.latitude?.message}</ErrorText>
      ) : null}
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input
            clearButtonMode="always"
            placeholder="Category..   ex)@ice"
            placeholderTextColor="rgba(255,255,255,0.3)"
            onChangeText={(value) => onChange(value)}
            value={value}
            returnKeyType={"done"}
            autoCorrect={false}
            onSubmitEditing={handleSubmit(onSubmit)}
          />
        )}
        name="categoryItem"
        rules={{ required: `Category is required & starts with "@"` }}
      />
      {formState.errors?.categoryItem?.message ? (
        <ErrorText>{formState.errors?.categoryItem?.message}</ErrorText>
      ) : null}
      <Button onPress={handleSubmit(onSubmit)}>
        {loading ? (
          <ActivityIndicator size={"small"} color={"black"} style={{}} />
        ) : (
          <ButtonText>Upload</ButtonText>
        )}
      </Button>
    </View>
  );
};
//<ButtonText>Upload</ButtonText> put on 128
export default UploadInput;
