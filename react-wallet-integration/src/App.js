import "./App.css";
import React, { useState } from "react";
import { ethers } from "ethers";
import "./App.css";
import { Button, Card } from "react-bootstrap";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import { StargateClient , SigningStargateClient } from "@cosmjs/stargate";

function App() {
  
  // Usetstate for storing wallet details.
  const [data, setdata] = useState({
    EthAddress: "",
    EthBalance: null,
    CosmosAddress: "",
    CosmosBalance: null,
    CosmosCurrency: "",
  });
  
  // Button handler button for handling a request event for MetaMask.
  const buttonHandlerMetaMask = () => {

    if (window.ethereum) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((res) => accountChangeHandler(res[0])); // Just take first address for a demo.
    } else {
      alert("Metamask extension is not installed.");
    }
  };

  // Button handler button for handling a request event for Keplr
  const buttonHandlerKeplr = async() => {
  
    if (window.keplr) {
      const chainId = "cosmoshub-4"; // Cosmos sdk hub v4 "cosmoshub-4", osmosis "osmosis-1"
      await window.keplr.enable(chainId); // Unlock the wallet
      const offlineSigner = await window.getOfflineSigner(chainId);
      const keplrAccounts = await offlineSigner.getAccounts(); // Get first wallet and public key
      console.log('keplrAccounts:', keplrAccounts);
      // const cosmJS = new StargateClient(
      //   "https://lcd-cosmoshub.keplr.app/rest",
      //   accounts[0].address
      // );

      // TODO chage this to public address
      const mnemonic = "pet ginger salad giant rail brand crew someone sunset inspire pill upper";
      const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic);
      console.log(wallet);

      const rpcEndpoint = "https://rpc.atomscan.com/";
      const client = await SigningStargateClient.connectWithSigner(rpcEndpoint, wallet);
      console.log("client:", client);
      const balance = await client.getBalance(accounts[0].address, 'uatom');
      console.log("balance:", balance);

      // const account = await cosmJS.getAccount(accounts[0].address);
      // console.log('account:', account);

      // const balances = await cosmJS.getAllBalances(accounts[0].address);
      // console.log('balances:', balances);
      
      // const accounts = await offlineSigner.get();
      // console.log(accounts);
      // TODO: finish!
    } else {
      alert("Keplr extension is not installed.");
    }
  };

  // getEthBalance function for getting a balance in a right format
  const getEthBalance = (address) => {
  
    window.ethereum
      .request({ 
        method: "eth_getBalance", 
        params: [address, "latest"] 
      })
      .then((balance) => {
        setdata({
          EthAddress: address, // TODO: why? I don't want that here
          EthBalance: ethers.utils.formatEther(balance),
        });
      });
  };
  
  // Function for getting handling all events
  const accountChangeHandler = (account) => {
    // Setting an address data
    setdata({
      EthAddress: account,
    });

    // Setting a balance
    getEthBalance(account);
  };
  
  return (
    <div className="App">
      {/* Calling all values which we 
       have stored in usestate */}
  
      <Card className="text-center">
        <Card.Header>
          <strong>ETH Balance</strong>
        </Card.Header>
        <Card.Body>
          <Card.Text>
            <label>
              Balance of {data.EthAddress}: {data.EthBalance} ETH
            </label>
          </Card.Text>
          <Button onClick={buttonHandlerMetaMask} variant="primary">
            Connect to MetaMask
          </Button>
        </Card.Body>
      </Card>
      <Card className="text-center">
        <Card.Header>
          <strong>Cosmos SDK Balance</strong>
        </Card.Header>
        <Card.Body>
          <Card.Text>
            <label>
              Balance of {data.CosmosAddress}: {data.CosmosBalance} {data.CosmosCurrency}
            </label>
          </Card.Text>
          <Card.Text>
            <label>
              Balance of {data.CosmosAddress}: {data.CosmosBalance} {data.CosmosCurrency}
            </label>
          </Card.Text>
          <Card.Text>
            <strong>Balance: </strong>
            {data.CosmosAddress}
            {data.Currency}
          </Card.Text>
          <Button onClick={buttonHandlerKeplr} variant="primary">
            Connect to Keplr
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default App;