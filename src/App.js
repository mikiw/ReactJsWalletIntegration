import "./App.css";
import React from "react"; // TODO: why this can be removed? Same in forms?
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import CosmosForm from "./components/CosmosForm";
import EthereumForm from "./components/EthereumForm";

function App() {
  return (
    // TODO: 
    // - fix index.js:1 Warning: ReactDOM.render is no longer supported in React 18
    // - check if tests are fine
    <div className="App container-fluid">
      <EthereumForm />
      <CosmosForm />
    </div>
  );
}

export default App;
