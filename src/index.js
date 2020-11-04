import React from 'react';
import ReactDOM from 'react-dom';
import Client from "./Apollo/Client";
import { ApolloProvider } from "react-apollo-hooks";
import App from './Components/App';

ReactDOM.render(
  <ApolloProvider client={Client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
