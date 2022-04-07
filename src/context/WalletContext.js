import {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
  useCallback,
} from "react";
import { getProvider, idl, programID } from "./WalletContext.helper";
import { Program, web3 } from "@project-serum/anchor";

const WalletContext = createContext({
  currentAccount: undefined,
  connectWallet: undefined,
  isConnected: false,
  walletAddress: undefined,
});

export const baseAccount = (() => {
  try {
    const kp = require("../utils/keypair.json");
    const arr = Object.values(kp._keypair.secretKey);
    const secret = new Uint8Array(arr);
    return web3.Keypair.fromSecretKey(secret);
  } catch (error) {
    alert("Key pair needs to be created first");
  }
})();

export const gifProgram = (() => {
  const provider = getProvider();
  return new Program(idl, programID, provider);
})();

export function WalletContextProvider({ children }) {
  const [currentAccount, setCurrentAccount] = useState();
  const walletAddress = useMemo(
    () => currentAccount?.publicKey.toString(),
    [currentAccount]
  );
  const isConnected = currentAccount != null;

  const connectWallet = useCallback(async () => {
    try {
      const { solana } = window;

      if (!solana) {
        alert("Get Phantom!");
        return;
      }

      const response = await solana.connect();
      console.log("Connected with Public Key:", response.publicKey.toString());
      setCurrentAccount(response);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    const checkIfWalletIsConnected = async () => {
      try {
        const { solana } = window;

        if (!solana) {
          console.log("Make sure you have the Phantom wallet!");
          setCurrentAccount(null);
          return;
        } else {
          if (solana.isPhantom) {
            console.log("Phantom wallet found!", solana);

            const response = await solana.connect({ onlyIfTrusted: true });
            setCurrentAccount(response);
            console.log(
              "Connected with Public Key:",
              response.publicKey.toString()
            );
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    window.addEventListener("load", checkIfWalletIsConnected);
    return () => window.removeEventListener("load", checkIfWalletIsConnected);
  }, []);

  return (
    <WalletContext.Provider
      value={useMemo(
        () => ({
          connectWallet,
          currentAccount,
          walletAddress,
          isConnected,
        }),
        [connectWallet, currentAccount, walletAddress, isConnected]
      )}
    >
      {children}
    </WalletContext.Provider>
  );
}

export function useWalletContext() {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("Component must be a child from WalletContextProvider");
  }
  return context;
}
