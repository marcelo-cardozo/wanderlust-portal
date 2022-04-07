import { useCallback, useEffect, useState } from "react";
import {
  baseAccount,
  gifProgram,
  useWalletContext,
} from "../context/WalletContext";

export function useGifs() {
  const [gifs, setGifs] = useState([]);
  const { isConnected } = useWalletContext();

  const getGifList = useCallback(async () => {
    try {
      const account = await gifProgram.account.baseAccount.fetch(
        baseAccount.publicKey
      );

      console.log("Got the account", account);
      setGifs(account.gifs);
    } catch (error) {
      console.log("Error in getGifList: ", error);
      setGifs(null);
    }
  }, []);

  useEffect(() => {
    if (baseAccount && isConnected) {
      console.log("Fetching GIF list...");
      getGifList();
    }
  }, [isConnected]);

  return { gifs, setGifs, refetch: getGifList };
}
