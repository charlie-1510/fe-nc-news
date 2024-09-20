import { ArticleCard } from "./ArticleCard";
import { getArticles } from "./API";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const { topic } = useParams();

  useEffect(() => {
    setLoading(true);
    getArticles(topic).then((data) => {
      if (data.articles) {
        setArticles(data.articles);
        setLoading(false);
      } else {
        alert("There was an error while loading the page");
        location.reload();
      }
    });
  }, [topic]);

  return loading ? (
    <div>
      <h2>Loading ...</h2>
    </div>
  ) : (
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
