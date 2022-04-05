import twitterLogo from "./assets/twitter-logo.svg";
import "./App.css";
import { useWalletContext } from "./WalletContext";

// Constants
const TWITTER_HANDLE = "_buildspace";
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const App = () => {
  const { currentAccount, connectWallet } = useWalletContext();

  return (
    <div className="App">
      <div className={currentAccount ? "authed-container" : "container"}>
        <div className="header-container">
          <p className="header">🖼 Wanderlust Portal</p>
          <p className="sub-text">
            View your Wanderlust collection in the metaverse ✨
          </p>
          {currentAccount == null ? (
            <button
              className="cta-button connect-wallet-button"
              onClick={connectWallet}
            >
              Connect to Wallet
            </button>
          ) : null}
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
