import "./App.css";
import { useMemo } from "react";
import TweetEmbed from 'react-tweet-embed'

import Minter from "./Minter";

import * as anchor from "@project-serum/anchor";
import { clusterApiUrl } from "@solana/web3.js";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  getPhantomWallet,
  getSolflareWallet,
  getSolletWallet,
  getMathWallet,
} from "@solana/wallet-adapter-wallets";

import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";

import { WalletDialogProvider } from "@solana/wallet-adapter-material-ui";
import { ThemeProvider, createTheme } from "@material-ui/core";

const theme = createTheme({
  palette: {
    type: "dark",
  },
});

const candyMachineId = process.env.REACT_APP_CANDY_MACHINE_ID
  ? new anchor.web3.PublicKey(process.env.REACT_APP_CANDY_MACHINE_ID)
  : undefined;

const network = process.env.REACT_APP_SOLANA_NETWORK as WalletAdapterNetwork;

const rpcHost = process.env.REACT_APP_SOLANA_RPC_HOST!;
const connection = new anchor.web3.Connection(rpcHost);

const startDateSeed = parseInt(process.env.REACT_APP_CANDY_START_DATE!, 10);

const txTimeout = 30000; // milliseconds (confirm this works for your project)

const App = () => {
  const endpoint = useMemo(() => clusterApiUrl(network), []);

  const wallets = useMemo(
    () => [
      getPhantomWallet(),
      getSolflareWallet(),
      getSolletWallet(),
      getMathWallet(),
    ],
    []
  );

  function toggleMenu() {
    const menu = document.getElementById("mobileNavContainer")!;
    menu.classList.toggle("open-menu");
    console.log("pressed");
  }

  return (
    <div>
      <div id="mobileNavContainer" className="mobile-nav">
        <div className="mobile-nav-close-button">
          <img src="/icons/close.svg" alt="" onClick={toggleMenu} />
        </div>
        <ul>
          <li>
            {/* <img className="mobile-nav-logo" src="/img/slava.png" alt="" /> */}
          </li>
          <li>
            <a href="/#link1" onClick={toggleMenu}>
              Mint
            </a>
          </li>
          <li>
            <a href="/#link2" onClick={toggleMenu}>
              What is it for?
            </a>
          </li>
          <li>
            <a href="/#link3" onClick={toggleMenu}>
              How to help
            </a>
          </li>
          <li>
            <a href="/#link4" onClick={toggleMenu}>
              Questions
            </a>
          </li>
          <li>
            <div className="social-icons">
              <a href="https://twitter.com" target="_blank" rel="noreferrer">
                <img className="nav-social" src="/icons/twitter.svg" alt="" />
              </a>
              <a href="https://discord.com" target="_blank" rel="noreferrer">
                <img className="nav-social" src="/icons/discord.svg" alt="" />
              </a>
            </div>
          </li>
        </ul>
      </div>
      <div className="mobile-menu-button" onClick={toggleMenu}>
        <img src="/icons/menu.svg" alt="" />
      </div>
      <nav>
        <div className="nav-container">
          <img className="nav-logo" src="/img/slava.png" alt="" />
          <a className="hide-800" href="/#link1">
            Mint
          </a>
          <a className="hide-800" href="/#link2">
          What is it for?
          </a>
          <a className="hide-800" href="/#link3">
          How to help         </a>
          <a className="hide-800" href="/#link4">
          Questions
          </a>
          <div className="social-icons hide-800">
            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              <img className="nav-social" src="/icons/twitter.svg" alt="" />
            </a>
            <a href="https://discord.com" target="_blank" rel="noreferrer">
              <img className="nav-social" src="/icons/discord.svg" alt="" />
            </a>
          </div>
        </div>
      </nav>
      <div className="content-wrapper">
        <header className="card" id="link1">
          <div style={{ padding: "0 24px 0 24px 0" }}>
            <h3 className="text-secondary-color">This is</h3>
            <h1 className="pb-3">Slava Umami</h1>
            <p className="text-secondary-color">
              On Feburary 24, 2022 Vladamir Putin ordered the Russian military
               to attack the independence of the Ukrainian people. Slava Umami is a collection of 888 bowls
               of ramen cooked up on Solana that aims to nurish the fight for Ukraine's freedom. There is no utility, and no benefit
               to holders other than providing aid to the nation of Ukraine.
            </p>
          </div>
          <div>
            <ThemeProvider theme={theme}>
              <ConnectionProvider endpoint={endpoint}>
                <WalletProvider wallets={wallets} autoConnect>
                  <WalletDialogProvider>
                    <Minter
                      candyMachineId={candyMachineId}
                      connection={connection}
                      startDate={startDateSeed}
                      txTimeout={txTimeout}
                      rpcHost={rpcHost}
                    />
                  </WalletDialogProvider>
                </WalletProvider>
              </ConnectionProvider>
            </ThemeProvider>
          </div>
        </header>

        <div id="link2" className="container">
          On March 1 2022 while scrolling Twitter in complete dismay at the Russian war of agression I saw this tweet from Mykhailo Fedorov, 
          Vice Prime Minister of Ukraine and Minister of Digital Transformation of Ukraine. I had been thinking about a way to help and that tweet inspired me. I am a new developer and I
          like to make stuff. I am using what resources I have available to me to launch this project. Half of the minting revenue will be going directly to Ukraine's Solana wallet, as will 100% of secondary sales. I
          The other half of minting revenue will be used to fund the next project which will mimic this model until Russia's senseless war ends, and the Ukrainian people are secure.
        <TweetEmbed tweetId="1498676695607480327" />
        </div>

        <div id="link3" className="container card">
          <h1 className="pb-3">Lorem ipsum</h1>
        </div>

        <div id="link4" className="container faq">
          <h1 style={{ padding: "0 0 24px 0" }}>FAQ</h1>
          <div>
            <h4>Lorem ipsum?</h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse id metus id mauris tincidunt posuere. Vivamus neque
              odio, imperdiet vitae.
            </p>

            <hr />
          </div>

          <div>
            <h4>Lorem ipsum?</h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse id metus id mauris tincidunt posuere. Vivamus neque
              odio, imperdiet vitae.
            </p>

            <hr />
          </div>

          <div>
            <h4>Lorem ipsum?</h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse id metus id mauris tincidunt posuere. Vivamus neque
              odio, imperdiet vitae.
            </p>

            <hr />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
