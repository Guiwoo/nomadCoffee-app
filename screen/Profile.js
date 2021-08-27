import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import React, { useEffect, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  Text,
  TouchableWithoutFeedback,
} from "react-native";
import styled from "styled-components/native";
import { isLoggedInVar, logUserIn } from "../apollo";

const LOG_IN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ok
      token
      error
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
const Logo = styled.Image`
  max-width: 320px;
  height: 300px;
`;
const InputBox = styled.TextInput`
  background-color: white;
  padding: 5px 10px;
  width: 100%;
  margin-bottom: 7px;
  border-radius: 10px;
`;
const Button = styled.TouchableOpacity`
  background-color: #abf0d1;
  padding: 5px 10px;
  width: 100%;
  border-radius: 10px;
  align-items: center;
  margin-bottom: 30px;
  opacity: ${(props) => (props.disabled ? "0.3" : "1")};
`;

export default () => {
  const { register, setValue, handleSubmit, control, formState } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const onCompleted = async (data) => {
    const {
      login: { ok, token },
    } = data;
    if (ok) {
      await logUserIn(token);
    }
  };
  const [loginMutation, { loading }] = useMutation(LOG_IN_MUTATION, {
    onCompleted,
  });
  const onSubmit = (data) => {
    if (!loading) {
      loginMutation({
        variables: {
          ...data,
        },
      });
    }
  };
  const passwordRef = useRef();
  const onNext = (nextOne) => {
    nextOne?.current?.focus();
  };
  const onChange = (arg) => {
    return {
      value: arg.nativeEvent.text,
    };
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <KeyboardAvoidingView
          style={{
            width: "100%",
          }}
          behavior="position"
        >
          <Logo
            resizeMode="contain"
            source={require("../assets/nomadCoffee.png")}
          />
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <InputBox
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
                returnKeyType={"next"}
                autoCapitalize={"none"}
                placeholder="Username"
                onSubmitEditing={() => onNext(passwordRef)}
              />
            )}
            name="username"
            rules={{ required: true }}
          />
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <InputBox
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
                ref={passwordRef}
                secureTextEntry={true}
                returnKeyType={"done"}
                autoCapitalize={"none"}
                placeholder="Password"
                onSubmitEditing={handleSubmit(onSubmit)}
              />
            )}
            name="password"
            rules={{ required: true }}
          />
          <Controller
            control={control}
            render={() => (
              <Button
                disabled={!formState.isValid}
                onPress={handleSubmit(onSubmit)}
              >
                {loading ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text>Log In</Text>
                )}
              </Button>
            )}
          />
        </KeyboardAvoidingView>
      </Container>
    </TouchableWithoutFeedback>
  );
};
