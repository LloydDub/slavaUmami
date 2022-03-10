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
              <a href="https://twitter.com/LloydDub" target="_blank" rel="noreferrer">
                <img className="nav-social" src="/icons/twitter.svg" alt="" />
              </a>
              {/* <a href="https://discord.com" target="_blank" rel="noreferrer">
                <img className="nav-social" src="/icons/discord.svg" alt="" />
              </a> */}
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
          The Ramen        </a>
          <a className="hide-800" href="/#link4">
          Questions
          </a>
          <div className="social-icons hide-800">
            <a href="https://twitter.com/LloydDub" target="_blank" rel="noreferrer">
              <img className="nav-social" src="/icons/twitter.svg" alt="" />
            </a>
            {/* <a href="https://discord.com" target="_blank" rel="noreferrer">
              <img className="nav-social" src="/icons/discord.svg" alt="" />
            </a> */}
          </div>
        </div>
      </nav>
      <div className="content-wrapper">
        <header className="card" id="link1">
          <div style={{ padding: "0 24px 0 24px 0" }}>
            <h3 className="text-secondary-color">This is</h3>
            <h1 className="pb-3">Slava Umami</h1>
            <p className="text-secondary-color">
            On February 24, 2022 Vladamir Putin ordered the Russian military to 
            attack the independence of the Ukrainian people. Slava Umami is a collection of 888 bowls of ramen cooked up on 
            Solana that aims to nourish the fight for Ukraine's freedom. There is no utility, and no benefit to holders other than providing aid to the nation of Ukraine.
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
<h1>Slava Ukraini!</h1><p>Means glory to Ukraine and is the national salute of Ukrainian people and a symbol of their resistance.
  This resistance to insurmountable odds has inspired this project. The crypto community has rallied, raising millions for the defense of Ukraine.
 But more can be done. Slava Umami means glory to the minds and the motivation of this project is to help raise funds, awareness and provide opportunities for 
 Ukrainian digital artists and developers. 100% of the revenue generated from this project will go to the nation of Ukraine and the defense of its people.
</p>
          <div id="tweetEmbed">
        <TweetEmbed tweetId="1498676695607480327" />
        </div>
        </div>

        <div id="link3" className="container card">
          <h1 className="pb-3">Examples of the Mint</h1>
          <div id="mintPic">
          <img className="mintEg" src="/img/7.gif" alt="" />
           <img className="mintEg" src="/img/25.gif" alt="" />
            <img className="mintEg" src="/img/32.gif" alt="" />
          </div>
        </div>

        <div id="link4" className="container faq">
          <h1 style={{ padding: "0 0 24px 0" }}>FAQ</h1>
          <div>
            <h4>Who are you and why are you doing this?</h4>
            <p>
            My name is Lloyd and I come from Calgary, Canada. I am a new developer and
             am really interested in web3 and block-chain technology. On March 1 2022 
             while scrolling Twitter in complete dismay at the Russian war of aggression
              I saw the above tweet from Mykhailo Fedorov, Vice Prime Minister of Ukraine
               and Minister of Digital Transformation of Ukraine. I had been thinking 
               about a way to help and that tweet inspired me. I am a new developer and 
               I like to make stuff. I am learning and working on a noodle based NFT collection, 
               rather than creating a NFT that adds nothing to the world. I am using what 
               resources I have available to me to launch this project. Half of the minting 
               revenue will be going directly to Ukraine's Solana address as will 100% of secondary
                sales. 100% of the other half of the minting revenue will be used to fund a more robust
                 NFT project, hiring Ukrainian digital artists and developers to continue this project
                  along these lines until Russia's senseless war ends, and the Ukrainian people are secure.
            </p>

            <hr />
          </div>

          <div>
            <h4>Why shouldn't I donate directly?</h4>
            <p>
            That is a way better option. Do that. Do not buy this NFT. 
            If you only have 0.1 Sol to give. Give it directly to Ukraine. 
            But I am hoping this project grows, I am hoping to transfer it to a 
            Ukrainian. The hope is that the project will provide opportunity to people 
            from Ukraine post-conflict. 100% of the revenue will be going to help Ukraine.
             This is my first NFT project. I hope there are more, and I hope this project is the seed for something good.

            </p>

            <hr />
          </div>
          <div>
            <h4>Wen Moon or Lambo?\Will there be staking?</h4>
            <p>
              Never. No utility, no benefit. I expect a floor price of 0. This is to raise money for Ukraine.
            </p>
            
             <p> 50% of the mint is donated directly to the Defense of Ukraine's Solana address.</p>
              <p>The other 50% of the mint will be used to create a more robust and traditional NFT
                 project on Solana and will also be used to hire Ukrainian talent. And 100% of that project's revenue will go to Ukr as well.</p>
             <p> 100% of secondary sales goes to Ukraine's Solana address.</p>
                
            
            <hr />
          </div>

          <div>
            <h4>Who Else Has Helped You?</h4>
            <p>
              A good friend from BC provided the logo for this project. 
              I think it is rad. Also my landlord gave me a break on my rent this month so I can afford the Solana to launch the contract. So that was nice of them.
              When I told them what it was for they did not hesitate to help. I think the world stands with Ukraine.
            </p>

            <hr />
          </div>
          <div>
            <h4>What is next?</h4>
            <p>
              Hopefully this generates enough Solana to make a difference. 
              Please stay tuned via twitter for updates, and to reach out me with questions and concerns.

            </p>

            <hr />
          </div>
          <div>
            <h4>Proof?</h4>
            <p>
              Here is proof of secondary sale distribution, please review the conrtract on Solana.
               Feel free to reach out to me personally on twitter.
                       </p>
                       <img id="Proof" src="/img/secondarySales.png" alt="" />

            <hr />
          </div>
          <div>
            <h4>Anything Else?</h4>
            
             <p> Please consider donating directly.</p>
              <a href="https://how-to-help-ukraine-now.super.site/">A comprehensive list for foreigners to help.</a>
             

            <hr />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
