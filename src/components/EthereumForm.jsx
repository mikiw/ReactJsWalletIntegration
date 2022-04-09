import React, { useState } from "react";
import { Button, Card } from "react-bootstrap";
import { ethers } from "ethers";

function EthereumForm() {

    // Usetstate for storing wallets details.
    const [EthAddress, setEthAddress] = useState("");  
    const [EthBalance, setEthBalance] = useState(null);
    
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

        // Get blanace in ETH in a right format from MetaMask.
        if(EthAddress) {
            window.ethereum
                .request({ 
                    method: "eth_getBalance", 
                    params: [EthAddress, "latest"] 
                })
                .then((balance) => {
                    setEthBalance(ethers.utils.formatEther(balance));
                });
        }
    };

    return (
        <Card className="text-center row">
            <Card.Header>
                <strong>ETH Balance</strong>
            </Card.Header>
            <Card.Body>
                <Card.Text>
                    <label>
                        Balance of {EthAddress}: {EthBalance} {EthBalance ? ("ETH") : ("")}
                    </label>
                </Card.Text>
                <Button data-testid="meta-mask-button" onClick={buttonHandlerMetaMaskConnect} variant="primary" className="me-2">
                    Connect to MetaMask
                </Button>
                <Button onClick={buttonHandlerMetaMaskBalance} variant="primary">
                    Get balance
                </Button>
            </Card.Body>
        </Card>
    )
}

export default EthereumForm
