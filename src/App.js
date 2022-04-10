import "./App.css";
import React from "react";
import EthereumBalanceCard from "./components/EthereumBalanceCard";
import CosmosBalanceForm from "./components/CosmosBalanceForm";

function App() {
  return (
    <div className="App container-fluid">
      <EthereumBalanceCard />
      <CosmosBalanceForm />
    </div>
  );
}

export default App;
