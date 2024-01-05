import React from "react";
import "./App.scss";
import { Route, Routes } from "react-router-dom";
import Menu from "./Pages/Menu/Menu";
import Contacts from "./Pages/Contacts/Contacts";
import Layout from "./Components/Layout/Layout";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Menu />} />
          <Route path="contacts" element={<Contacts />} />
          <Route path="*" element={<h1>Not found</h1>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
