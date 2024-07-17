// src/App.js

import React from "react";
import "./App.css";
import Header from "./components/Header";
import AccountInfoCard from "./components/AccountInfoCard";
import AreaCharts from "./components/AreaCharts";
import OrderEntry from "./components/OrderEntry";
import OpenPositionsTable from "./components/OpenPositionsTable";

function App() {
  return (
    <div className="App">
      <Header />
     
      <AreaCharts />
      
    </div>
  );
}

export default App;
