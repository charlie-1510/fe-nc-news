import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { Navigator } from "./components/Navigator";
import { Articles } from "./components/Articles";
import "./App.css";

function App() {
  return (
    <>
      <div>
        <Header />
        <Navigator />

        <Routes>
          <Route path="/articles" element={<Articles />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
