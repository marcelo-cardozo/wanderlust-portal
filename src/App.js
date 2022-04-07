import twitterLogo from "./assets/twitter-logo.svg";
import "./App.css";
import { baseAccount, useWalletContext } from "./WalletContext";
import { useState } from "react";
import { useGifs } from "./use-gifs.hook";
import { SystemProgram } from "@solana/web3.js";

// Constants
const TWITTER_HANDLE = "_buildspace";
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const App = () => {
  const { connectWallet, isConnected, program } = useWalletContext();
  const { gifs, setGifs, refetch: refetchGifs } = useGifs();
  const [inputValue, setInputValue] = useState("");

  const uploadItem = () => {
    if (inputValue.length > 0) {
      console.log("link:", inputValue);
      setGifs((prev) => [...prev, inputValue]);
      setInputValue("");
    } else {
      console.log("Empty input. Try again.");
    }
  };
  const createGifAccount = async () => {
    try {
      console.log("ping");
      await program.rpc.startStuffOff({
        accounts: {
          baseAccount: baseAccount.publicKey,
          user: program.provider.wallet.publicKey,
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
      <div className={isConnected ? "authed-container" : "container"}>
        <div className="header-container">
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
                    {gifs.map((gif) => (
                      <div className="gif-item" key={gif}>
                        <img src={gif} alt={gif} />
                      </div>
                    ))}
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

export default App;
