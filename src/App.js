import "./App.css";
import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
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
