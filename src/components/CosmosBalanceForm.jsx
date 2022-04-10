import React, { useState, useRef } from "react";
import { Form, Card } from "react-bootstrap";
import { CosmosBalanceCard } from "./CosmosBalanceCard";

function CosmosBalanceForm() {

    // Usetstate for storing ComboBox details state.
    const [chainId, setChainId] = useState("cosmoshub-4")
    const [token, setToken] = useState("uatom")
    const [rpcEndpoint, setRpcEndpoint] = useState("https://rpc.atomscan.com/")
    const [exponent, setExponent] = useState(1e6)
    const [tokenName, setTokenName] = useState("ATOM")

    const defaultVariantValues = {
        "cosmoshub-4": { token: "uatom", rpcEndpoint: "https://rpc.atomscan.com/", exponent: 1e6, tokenName: "ATOM" },
        "osmosis-1": { token: "uosmo", rpcEndpoint: "https://rpc-osmosis.blockapsis.com/", exponent: 1e6, tokenName: "OSMO" },
        "other": { token: "", rpcEndpoint: "", exponent: 1e6, tokenName: "" }
    }

    const balanceRef = useRef();

    const handleSelect = (e) => {

        // Handle change of selection in ComboBox.
        setChainId(e.currentTarget.value)
        balanceRef.current.handleClearUtils()
        
        if(!!defaultVariantValues[e.currentTarget.value]){

            // Set new values.
            setToken(defaultVariantValues[e.currentTarget.value]["token"])
            setRpcEndpoint(defaultVariantValues[e.currentTarget.value]["rpcEndpoint"])
            setExponent(defaultVariantValues[e.currentTarget.value]["exponent"])
            setTokenName(defaultVariantValues[e.currentTarget.value]["tokenName"])
        }
    }

    return (
        <Card className="text-center row">
            <Card.Header>
                <strong>Cosmos SDK Balance</strong>
            </Card.Header>
            <Card.Body>
                <Form className="col col-6 mx-auto" >

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
                        <Form.Control type="text" placeholder="" value={rpcEndpoint} onChange={(e) => setRpcEndpoint(e.target.value)}  />
                    </Form.Group>

                    <Form.Group className="mb-3" >
                        <Form.Label>Token:</Form.Label>
                        <Form.Control type="text" placeholder="" value={token} onChange={(e) => setToken(e.target.value)}  />
                    </Form.Group>

                    <Form.Group className="mb-3" >
                        <Form.Label>Token name:</Form.Label>
                        <Form.Control type="text" placeholder="" value={tokenName} onChange={(e) => setTokenName(e.target.value)}  />
                    </Form.Group>

                    <Form.Group className="mb-3" >
                        <Form.Label>Exponent:</Form.Label>
                        <Form.Control type="number" placeholder="" value={exponent} onChange={(e) => setExponent(e.target.value)}  />
                    </Form.Group>

                    <CosmosBalanceCard 
                        ref={balanceRef} 
                        chainId={chainId}
                        rpcEndpoint={rpcEndpoint} 
                        token={token} 
                        exponent={exponent} 
                        tokenName={tokenName} 
                        />

                </Form>
            </Card.Body>
        </Card>
    )
}

export default CosmosBalanceForm
