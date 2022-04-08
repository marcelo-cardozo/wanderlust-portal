import { useCallback, useEffect, useState } from "react";
import {
  baseAccount,
  gifProgram,
  useWalletContext,
} from "../context/WalletContext";

export function useGifs() {
  const [isLoading, setIsLoading] = useState(false);
  const [gifs, setGifs] = useState([]);
  const { isConnected } = useWalletContext();

  const getGifList = useCallback(async () => {
    try {
      setIsLoading(true);
      const account = await gifProgram.account.baseAccount.fetch(
        baseAccount.publicKey
      );

      setIsLoading(false);

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

  return { gifs, setGifs, refetch: getGifList, isLoading };
}
