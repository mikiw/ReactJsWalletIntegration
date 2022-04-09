import React, { useState } from "react";
import { Button, Form, Card } from "react-bootstrap";
import { StargateClient } from "@cosmjs/stargate";

function CosmosForm() {

    // Usetstate for storing wallets details state.
    const [CosmosAddress, setCosmosAddress] = useState("");
    const [CosmosBalance, setCosmosBalance] = useState(null);
    const [CosmosToken, setCosmosToken] = useState(null);

    // Usetstate for storing ComboBox details state.
    const [ChainId, setChainId] = useState("cosmoshub-4")
    const [Token, setToken] = useState("uatom")
    const [RpcEndpoint, setRpcEndpoint] = useState("https://rpc.atomscan.com/")
    const [Exponent, setExponent] = useState(1e6)
    const [TokenName, setTokenName] = useState("ATOM")

    const defaultVariantValues = {
        "cosmoshub-4": { Token: "uatom", RpcEndpoint: "https://rpc.atomscan.com/", Exponent: 1e6, TokenName: "ATOM" },
        "osmosis-1": { Token: "uosmo", RpcEndpoint: "https://rpc-osmosis.blockapsis.com/", Exponent: 1e6, TokenName: "OSMO" },
        "other": { Token: "", RpcEndpoint: "", Exponent: 1e6, TokenName: "" }
    }

    // Button handler button for handling a request window event for Keplr.
    const buttonHandlerKeplrConnect = async() => {

        if (window.keplr) {

            // Unlock the wallet.
            await window.keplr.enable(ChainId); 

            // Use offlineSigner to get first wallet and public key.
            // Currently only first address is supported.
            const offlineSigner = await window.getOfflineSigner(ChainId);
            const keplrAccounts = await offlineSigner.getAccounts();

            // Set state value as first address.
            setCosmosAddress(keplrAccounts[0].address);
        } else {
            alert("Keplr extension is not installed.");
        }
    };

    // Button handler button for handling a balance request for Cosmos SDK wallet as RPC.
    const buttonHandlerKeplrBalance = async() => {

        // Use StargateClient and RPC because of its lightweight payloads and high performance.
        const client = await StargateClient.connect(RpcEndpoint);

        // Get balance as Coin.
        // Amount is the number of coins, while denom is the identifier of the coins.
        const balanceAsCoin = await client.getBalance(CosmosAddress, Token);
        const balance = parseInt(balanceAsCoin.amount) * 1/Exponent;

        // Set state values
        setCosmosBalance(balance);
        setCosmosToken(TokenName);
    };

    const handleSelect = (e) => {

        // Handle change of selection in ComboBox.
        setChainId(e.currentTarget.value)
        setCosmosAddress("");
        setCosmosBalance(null);
        setCosmosToken("");
        
        if(!!defaultVariantValues[e.currentTarget.value]){

            // Set new values.
            setToken(defaultVariantValues[e.currentTarget.value]["Token"])
            setRpcEndpoint(defaultVariantValues[e.currentTarget.value]["RpcEndpoint"])
            setExponent(defaultVariantValues[e.currentTarget.value]["Exponent"])
            setTokenName(defaultVariantValues[e.currentTarget.value]["TokenName"])
        }
    }

    return (
        <Card className="text-center row">
            <Card.Header>
                <strong>Cosmos SDK Balance</strong>
            </Card.Header>
            <Card.Body>
                <Form className="col col-6 mx-auto">

                    <Form.Group className="mb-3" >
                        <Form.Label>Select chain:</Form.Label>
                        <Form.Select onChange={(e) => {handleSelect(e)}} >
                            <option value={"cosmoshub-4"}>Cosmos Hub v4</option>
                            <option value={"osmosis-1"}>Osmosis v1</option>
                            <option value={"other"}>Other</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3" >
                        <Form.Label>RPC endpoint:</Form.Label>
                        <Form.Control type="text" placeholder="" value={RpcEndpoint} onChange={(e) => setRpcEndpoint(e.target.value)}  />
                    </Form.Group>

                    <Form.Group className="mb-3" >
                        <Form.Label>Token:</Form.Label>
                        <Form.Control type="text" placeholder="" value={Token} onChange={(e) => setToken(e.target.value)}  />
                    </Form.Group>

                    <Form.Group className="mb-3" >
                        <Form.Label>Token name:</Form.Label>
                        <Form.Control type="text" placeholder="" value={TokenName} onChange={(e) => setTokenName(e.target.value)}  />
                    </Form.Group>

                    <Form.Group className="mb-3" >
                        <Form.Label>Exponent:</Form.Label>
                        <Form.Control type="number" placeholder="" value={Exponent} onChange={(e) => setExponent(e.target.value)}  />
                    </Form.Group>

                    <Card.Text>
                        <label>
                            Available balance of {CosmosAddress}: {CosmosBalance} {CosmosToken}
                        </label>
                    </Card.Text>

                    <Button data-testid="keplr-button" onClick={buttonHandlerKeplrConnect} variant="primary" className="me-2">
                        Connect to Keplr
                    </Button>

                    <Button onClick={buttonHandlerKeplrBalance} variant="primary">
                        Get balance
                    </Button>

                </Form>
            </Card.Body>
        </Card>
    )
}

export default CosmosForm
