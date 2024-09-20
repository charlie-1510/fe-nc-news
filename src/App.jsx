import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { Navigator } from "./components/Navigator";
import { Articles } from "./components/Articles";
import { Article } from "./components/Article";
import { Login } from "./components/Login";
import { getTopics } from "./components/API";
import "./App.css";

function App() {
  const [topics, setTopics] = useState([]);
  const [topicsReload, setTopicsReload] = useState(1);

  useEffect(() => {
    getTopics().then((data) => {
      if (data.topics) {
        setTopics(data.topics);
      } else {
        setTopicsReload(Date.now());
      }
    });
  }, [topicsReload]);

  return (
    <>
      <div>
        <Header />
        <Navigator topics={topics} />

        <Routes>
          <Route path="/" element={<Articles />} />
          <Route path="/articles/:article_id" element={<Article />} />
          <Route path="/topics/:topic" element={<Articles />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
