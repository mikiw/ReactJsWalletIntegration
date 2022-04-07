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

      // Open MetaMask window to read address.
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
      // const chainId = "cosmoshub-4"; 
      // const token = "ATOM";
      // const rpcEndpoint = "https://rpc.atomscan.com/";

      const chainId = "osmosis-1"; 
      const token = "OSMO";
      const rpcEndpoint = "https://rpc-osmosis.blockapsis.com/";

      // Unlock the wallet
      await window.keplr.enable(chainId); 

      // Use offlineSigner to get first wallet and public key.
      // To sign transactions in future we need to use SigningStargateClient and DirectSecp256k1HdWallet or wait for Keplr update.
      const offlineSigner = await window.getOfflineSigner(chainId);
      const keplrAccounts = await offlineSigner.getAccounts();

      // Use StargateClient and RPC because of its lightweight payloads and high performance.
      const client = await StargateClient.connect(rpcEndpoint);

      // Get balance.
      const balance = await client.getBalance(keplrAccounts[0].address, token);
      console.log("balance:", balance);

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
