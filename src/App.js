import { useState } from "react";
import { SystemProgram } from "@solana/web3.js";

import twitterLogo from "./assets/twitter-logo.svg";
import "./App.css";
import {
  baseAccount,
  gifProgram,
  useWalletContext,
} from "./context/WalletContext";
import { useGifs } from "./hooks/use-gifs.hook";
import { useAddGif } from "./hooks/use-add-gif.hook";

// Constants
const TWITTER_HANDLE = "_buildspace";
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const App = () => {
  const { connectWallet, isConnected } = useWalletContext();
  const {
    gifs,
    setGifs,
    refetch: refetchGifs,
    isLoading: isLoadingGifs,
  } = useGifs();
  const { mutate: mutateAddGif } = useAddGif();
  const [inputValue, setInputValue] = useState("");

  const uploadItem = async () => {
    if (inputValue.length === 0) {
      console.log("Empty input. Try again.");
      return;
    }
    try {
      console.log("link:", inputValue);
      await mutateAddGif(inputValue);
      console.log("GIF successfully sent to program", inputValue);

      setGifs((prev) => [...prev, inputValue]);
      setInputValue("");

      await refetchGifs();
    } catch (error) {
      console.log("Error sending GIF:", error);
    }
  };
  const createGifAccount = async () => {
    try {
      console.log("ping");
      await gifProgram.rpc.startStuffOff({
        accounts: {
          baseAccount: baseAccount.publicKey,
          user: gifProgram.provider.wallet.publicKey,
          systemProgram: SystemProgram.programId,
        },
        signers: [baseAccount],
      });
      console.log(
        "Created a new BaseAccount w/ address:",
        baseAccount.publicKey.toString()
      );
      await refetchGifs();
    } catch (error) {
      console.log("Error creating BaseAccount account:", error);
    }
  };

  return (
    <div className="App">
      <div className={isConnected ? "authed-container" : "unauthed-container"}>
        <div
          className={`header-container ${
            isConnected
              ? "authed-header-container"
              : "unauthed-header-container"
          }`}
        >
          <p className="header">🖼 Wanderlust Portal</p>
          <p className="sub-text">
            View your Wanderlust collection in the metaverse ✨
          </p>
          {isConnected ? (
            <div className="connected-container">
              {gifs === null ? (
                <button
                  className="cta-button submit-gif-button"
                  onClick={createGifAccount}
                >
                  Do One-Time Initialization For GIF Program Account
                </button>
              ) : (
                <>
                  <form
                    onSubmit={(event) => {
                      event.preventDefault();
                      uploadItem();
                    }}
                  >
                    <input
                      type="text"
                      placeholder="Enter gif link!"
                      name="link"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                    />
                    <button
                      type="submit"
                      className="cta-button submit-gif-button"
                    >
                      Submit
                    </button>
                  </form>
                  <div className="gif-grid">
                    {isLoadingGifs
                      ? new Array(6)
                          .fill(0)
                          .map(() => <GalleryItemPlaceholder />)
                      : gifs.map((gif) => <GalleryItem item={gif} />)}
                  </div>
                </>
              )}
            </div>
          ) : (
            <button
              className="cta-button connect-wallet-button"
              onClick={connectWallet}
            >
              Connect to Wallet
            </button>
          )}
        </div>
        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built on @${TWITTER_HANDLE}`}</a>
        </div>
      </div>
    </div>
  );
};

function GalleryItemPlaceholder() {
  return <div className="gif-item-placeholder" />;
}

function GalleryItem({ item }) {
  return (
    <div className="gif-item" key={item.gifLink}>
      <img src={item.gifLink} alt={item.gifLink} />
      <div className="author">{item.userAddress.toString()}</div>
    </div>
  );
}

export default App;
