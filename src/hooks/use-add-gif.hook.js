import { useCallback } from "react";
import { baseAccount, gifProgram } from "../context/WalletContext";

export function useAddGif() {
  const mutate = useCallback(async (link) => {
    await gifProgram.rpc.addGift(link, {
      accounts: {
        baseAccount: baseAccount.publicKey,
        user: gifProgram.provider.wallet.publicKey,
      },
    });
  }, []);

  return { mutate };
}
