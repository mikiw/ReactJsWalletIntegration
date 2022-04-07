import "./App.css";
import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import "./App.css";
import { Button, Card } from "react-bootstrap";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { StargateClient } from "@cosmjs/stargate";

function App() {
  
  // Usetstate for storing wallet details.
  // TODO: use hooks
  const [data, setdata] = useState({
    EthAddress: "bubu",
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
        .then((res) => accountChangeHandler(res[0])); // Just take first address for demo purposes.
    } else {
      alert("Metamask extension is not installed.");
    }
  };

  // Button handler button for handling a request event for Keplr.
  const buttonHandlerKeplr = async() => {
  
    if (window.keplr) {

      // TODO: add textbox inputs for that 
      // const chainId = "cosmoshub-4"; 
      // const token = "uatom";
      // const rpcEndpoint = "https://rpc.atomscan.com/";
      // test address : cosmos1eg6zph2m4ya6rfztf84qsl233pzulnmtk22maz 

      const chainId = "osmosis-1"; 
      const token = "uosmo";
      const rpcEndpoint = "https://rpc-osmosis.blockapsis.com/";
      // test address: osmo13vtg6907g7gta86unrpc3v2s378rt4pgzkk6e5 

      // Unlock the wallet
      await window.keplr.enable(chainId); 

      // Use offlineSigner to get first wallet and public key.
      const offlineSigner = await window.getOfflineSigner(chainId);
      const keplrAccounts = await offlineSigner.getAccounts();

      // Use StargateClient and RPC because of its lightweight payloads and high performance.
      const client = await StargateClient.connect(rpcEndpoint);

      // Get balance.
      const balance = await client.getBalance(keplrAccounts[0].address, token);
      console.log("balance:", balance);
      // TODO: convert to readable form

      console.log("balance readable:", balance);
    } else {
      alert("Keplr extension is not installed.");
    }
  };

  // Function getEthBalance for getting a balance in a right format.
  const getEthBalance = (address) => {
  
    window.ethereum
      .request({ 
        method: "eth_getBalance", 
        params: [address, "latest"] 
      })
      .then((balance) => {
        setdata({
          EthBalance: ethers.utils.formatEther(balance), // TODO: fix state issue.
        });
      });
  };
  
  // Function for getting EthBalance.
  const accountChangeHandler = (account) => {

    setdata({
      EthAddress: account,
    });

    getEthBalance(account);
  };

  useEffect(() => {

    console.log('data', data)
  },[data]);
  
  return (
    <div className="App">
      {/* TODO:
          - 2 buttons one for connect and second for balance?
      */}
  
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
