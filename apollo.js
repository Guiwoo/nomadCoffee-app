import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  makeVar,
} from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setContext } from "@apollo/client/link/context";
import { offsetLimitPagination } from "@apollo/client/utilities";
import { onError } from "@apollo/client/link/error";
import { createUploadLink } from "apollo-upload-client";
import { ApolloLink } from "@apollo/client/core";

const TOKEN = "token";

export const isLoggedInVar = makeVar(false);
export const tokenVar = makeVar(``);

export const logUserIn = async (token) => {
  await AsyncStorage.setItem(TOKEN, token);
  isLoggedInVar(true);
  tokenVar(token);
};
export const logUserOut = async () => {
  await AsyncStorage.removeItem(TOKEN);
};

const uploadHttpLink = createUploadLink({
  uri: "https://nomad-backend-guiwoo.herokuapp.com/graphql",
});

const onErrorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    console.log("graphql Error⭐️", graphQLErrors);
  }
  if (networkError) {
    console.log("NetworkError❌", networkError);
  }
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      token: tokenVar(),
    },
  };
});

const client = new ApolloClient({
  //link: authLink.concat(onErrorLink).concat(uploadHttpLink),
  link: ApolloLink.from([authLink, uploadHttpLink]),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          //seeCoffeeShops: offsetLimitPagination(),
          seeCoffeeShops: {
            keyArgs: false,
            merge(existing = [], incoming = []) {
              return [...existing, ...incoming];
            },
          },
        },
      },
    },
  }),
});

export default client;
