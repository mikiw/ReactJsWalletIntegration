import "./App.css";
import React from "react";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import  CosmosForm from "./components/CosmosForm";
import  EthereumForm from "./components/EthereumForm";

function App() {
  return (
    // TODO: fix index.js:1 Warning: ReactDOM.render is no longer supported in React 18
    // - test address : cosmos1eg6zph2m4ya6rfztf84qsl233pzulnmtk22maz 
    // - test address: osmo13vtg6907g7gta86unrpc3v2s378rt4pgzkk6e5 
    <div className="App container-fluid">
      <EthereumForm />
      <CosmosForm />
    </div>
  );
}

export default App;
