import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { WalletContextProvider } from "./context/WalletContext";

ReactDOM.render(
  <React.StrictMode>
    <WalletContextProvider>
      <App />
    </WalletContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
