import "./App.css";
import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import CosmosForm from "./components/CosmosForm";
import EthereumForm from "./components/EthereumForm";

function App() {
  return (
    <div className="App container-fluid">
      <EthereumForm />
      <CosmosForm />
    </div>
  );
}

export default App;
