import { useCallback, useEffect, useState } from "react";
import { baseAccount, useWalletContext } from "./WalletContext";

export function useGifs() {
  const [gifs, setGifs] = useState([]);
  const { isConnected, program } = useWalletContext();

  const getGifList = useCallback(async () => {
    try {
      const account = await program.account.baseAccount.fetch(
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
    if (program && isConnected) {
      console.log("Fetching GIF list...");
      getGifList();
    }
  }, [program, isConnected]);

  return { gifs, setGifs, refetch: getGifList };
}
