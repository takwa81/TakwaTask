// apolloClient.ts
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const httpLink = new HttpLink({
  uri: "https://27wiegdvzvg6tgbha4bljncevu.appsync-api.eu-west-1.amazonaws.com/graphql",
  headers: {
    "x-api-key": "da2-6gk43wf47vaibfjm2kgol45pa4"
  }
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

export default client;
