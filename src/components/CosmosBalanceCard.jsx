import React, { useState, forwardRef, useImperativeHandle } from "react";
import { Button, Card } from "react-bootstrap";
import { StargateClient } from "@cosmjs/stargate";

export const CosmosBalanceCard = forwardRef((props, ref) => {

    // Usetstate for storing wallets details state.
    const [cosmosAddress, setCosmosAddress] = useState("");
    const [cosmosBalance, setCosmosBalance] = useState(null);
    const [cosmosToken, setCosmosToken] = useState(null);
    const {chainId, rpcEndpoint, token, exponent, tokenName} = props

    // Button handler button for handling a request window event for Keplr.
    const buttonHandlerKeplrConnect = async() => {

        if (window.keplr) {

            // Unlock the wallet.
            await window.keplr.enable(chainId); 

            // Use offlineSigner to get first wallet and public key.
            // Currently only first address is supported.
            const offlineSigner = await window.getOfflineSigner(chainId);
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
        const client = await StargateClient.connect(rpcEndpoint);

        // Get balance as Coin.
        // Amount is the number of coins, while denom is the identifier of the coins.
        const balanceAsCoin = await client.getBalance(cosmosAddress, token);
        const balance = parseInt(balanceAsCoin.amount) * 1/exponent;

        // Set state values.
        setCosmosBalance(balance);
        setCosmosToken(tokenName);
    };

    // Clear cosmos balance data.
    useImperativeHandle(ref, () => ({

        handleClearUtils() {
            setCosmosAddress("");
            setCosmosBalance(null);
            setCosmosToken("");
        }
    }));

    return (
        <>
            <Card.Text>
                <label>
                    Available balance of {cosmosAddress}: {cosmosBalance} {cosmosToken}
                </label>
            </Card.Text>

            <Button data-testid="keplr-button" onClick={buttonHandlerKeplrConnect} variant="primary" className="me-2">
                Connect to Keplr
            </Button>

            <Button onClick={buttonHandlerKeplrBalance} variant="primary">
                Get balance
            </Button>
        </>
    )
})
