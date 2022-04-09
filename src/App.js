import "./App.css";
import React, { useState } from "react";
import { ethers } from "ethers";
import "./App.css";
import { Button, Card, Dropdown, DropdownButton } from "react-bootstrap";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { StargateClient } from "@cosmjs/stargate";

function App() {
  
  // Usetstate for storing wallets details.
  const [EthAddress, setEthAddress] = useState("");  
  const [EthBalance, setEthBalance] = useState(null);
  const [CosmosAddress, setCosmosAddress] = useState("");
  const [CosmosBalance, setCosmosBalance] = useState(null);
  const [CosmosCurrency, setCosmosCurrency] = useState(null);

  // Button handler button for handling a request window event for MetaMask.
  const buttonHandlerMetaMaskConnect = () => {

    if (window.ethereum) {

      // Open MetaMask window to read address.
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((res) => setEthAddress(res[0])); // Just take first address for demo purposes.
    } else {
      alert("Metamask extension is not installed.");
    }
  };

  // Button handler button for handling a balance request for MetaMask.
  const buttonHandlerMetaMaskBalance = () => {
    
    // Get blanace in ETH.
    if(EthAddress)
      getEthBalance(EthAddress);
  };

  // Function getEthBalance for getting a balance in a right format.
  const getEthBalance = (address) => {
  
    window.ethereum
      .request({ 
        method: "eth_getBalance", 
        params: [address, "latest"] 
      })
      .then((balance) => {
        setEthBalance(ethers.utils.formatEther(balance));
      });
  };

  // Button handler button for handling a request window event for Keplr.
  const buttonHandlerKeplrConnect = async() => {
  
    if (window.keplr) {

      // TODO: add textbox inputs for that 
      const chainId = "cosmoshub-4"; 
      // const chainId = "osmosis-1"; 

      // Unlock the wallet
      await window.keplr.enable(chainId); 

      // Use offlineSigner to get first wallet and public key.
      // Currently only first address is supported.
      const offlineSigner = await window.getOfflineSigner(chainId);
      const keplrAccounts = await offlineSigner.getAccounts();

      // Set state value as first address 
      setCosmosAddress(keplrAccounts[0].address);

    } else {
      alert("Keplr extension is not installed.");
    }
  };
  
  // Button handler button for handling a balance request for Cosmos SDK wallet as RPC.
  const buttonHandlerKeplrBalance = async() => {

    // TODO: add textbox inputs for that 
    const token = "uatom";
    const rpcEndpoint = "https://rpc.atomscan.com/";
    const exponent = 1e6;
    const tokenName = "ATOM";

    // const token = "uosmo";
    // const rpcEndpoint = "https://rpc-osmosis.blockapsis.com/";
    // const exponent = 1e6;
    // const tokenName = "OSMO";

    // Use StargateClient and RPC because of its lightweight payloads and high performance.
    const client = await StargateClient.connect(rpcEndpoint);

    // TODO: remove after tests
    // test address : cosmos1eg6zph2m4ya6rfztf84qsl233pzulnmtk22maz 
    // test address: osmo13vtg6907g7gta86unrpc3v2s378rt4pgzkk6e5 
    
    // Get balance as Coin.
    // Amount is the number of coins, while denom is the identifier of the coins.
    const balanceAsCoin = await client.getBalance(CosmosAddress, token);
    const balance = parseInt(balanceAsCoin.amount) * 1/exponent;

    // Set state values
    setCosmosBalance(balance);
    setCosmosCurrency(tokenName);
  };
  
  return (
    <div className="App">
      {/* TODO:
          - combobox
          - inputs for token, rpcEndpoint, exponent, tokenName
          - UI / UX, styles, spaces
          - tests
      */}
  
      <Card className="text-center">
        <Card.Header>
          <strong>ETH Balance</strong>
        </Card.Header>
        <Card.Body>
          <Card.Text>
            <label>
              Balance of {EthAddress}: {EthBalance} ETH
            </label>
          </Card.Text>
          <Button onClick={buttonHandlerMetaMaskConnect} variant="primary">
            Connect to MetaMask
          </Button>
          <Button onClick={buttonHandlerMetaMaskBalance} variant="primary">
            Get balance
          </Button>
        </Card.Body>
      </Card>
      <Card className="text-center">
        <Card.Header>
          <strong>Cosmos SDK Balance</strong>
        </Card.Header>
        <Card.Body>
          <DropdownButton
            id="dropdown-cosmos"
            variant="secondary"
            menuVariant="dark"
            title="Dropdown button"
            className="mt-2"
            onSelect={function(evt){console.log(evt)}}
          >
            <Dropdown.Item href="#cosmos" active>Cosmos Hub v4</Dropdown.Item>
            <Dropdown.Item href="#osmosis">Osmosis v1</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item href="#other">Other</Dropdown.Item>
          </DropdownButton>
          <Card.Text>
            <label>
              Available balance of {CosmosAddress}: {CosmosBalance} {CosmosCurrency}
            </label>
          </Card.Text>
          <Button onClick={buttonHandlerKeplrConnect} variant="primary">
            Connect to Keplr
          </Button>
          <Button onClick={buttonHandlerKeplrBalance} variant="primary">
            Get balance
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default App;
