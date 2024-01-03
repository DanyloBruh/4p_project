import React from "react";
import "./App.scss";
import Header from "./Components/Header/Header";
import Menu from "./Pages/Menu/Menu";
import Footer from "./Components/Footer/Footer";

function App() {
  return (
    <div className="App">
      <Header />
      <Menu/>
      <Footer/>
    </div>
  );
}

export default App;
