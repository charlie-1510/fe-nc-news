import { ArticleCard } from "./ArticleCard";
import { getArticles } from "./API";
import { useState, useEffect } from "react";

export const Articles = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    getArticles().then((data) => {
      setArticles(data.articles);
    });
  }, []);

  return (
    <div className="articles">
      <h2>This is the Articles page</h2>
      <section className="articleList">
        {articles.map((article) => {
          return <ArticleCard key={article.article_id} article={article} />;
        })}
      </section>
    </div>
  );
};
