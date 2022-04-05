import twitterLogo from "./assets/twitter-logo.svg";
import "./App.css";
import { useWalletContext } from "./WalletContext";
import { useEffect, useState } from "react";

// Constants
const TWITTER_HANDLE = "_buildspace";
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const GALLERY_ITEMS = [
  "https://media0.giphy.com/media/r5E0uV2Facm2c/giphy.gif",
  "https://media2.giphy.com/media/hmnWsVEXvaXZVUsE5W/giphy.gif",
  "https://media1.giphy.com/media/Y4vip84hg9BhdNidTR/giphy.gif",
  "https://media3.giphy.com/media/2csuIJj6TmuKA/giphy.gif",
];

const App = () => {
  const { connectWallet, isConnected } = useWalletContext();
  const [galleryItems, setGalleryItems] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (isConnected) {
      setGalleryItems(GALLERY_ITEMS);
    }
  }, [isConnected]);

  const uploadItem = () => {
    if (inputValue.length > 0) {
      console.log("link:", inputValue);
      setGalleryItems((prev) => [...prev, inputValue]);
      setInputValue("");
    } else {
      console.log("Empty input. Try again.");
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
                <button type="submit" className="cta-button submit-gif-button">
                  Submit
                </button>
              </form>
              <div className="gif-grid">
                {galleryItems.map((gif) => (
                  <div className="gif-item" key={gif}>
                    <img src={gif} alt={gif} />
                  </div>
                ))}
              </div>
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
