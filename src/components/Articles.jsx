import { ArticleCard } from "./ArticleCard";
import { getArticles } from "./API";
import { useState, useEffect } from "react";
import { useParams, useSearchParams, Navigate, Route } from "react-router-dom";

export const Articles = ({ topics }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("created_at");
  const [order, setOrder] = useState("asc");
  const { topic } = useParams();
  let [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setLoading(true);
    if (
      topic &&
      !topics.some((top) => {
        return top.slug === topic;
      })
    ) {
      window.location.replace("/error");
    } else {
      setSearchParams({ sort_by: sortBy, order: order });
      getArticles(topic, sortBy, order).then((data) => {
        if (data.articles) {
          setArticles(data.articles);
          setLoading(false);
        } else {
          alert("There was an error while loading the page");
          window.location.replace("/error");
        }
      });
    }
  }, [topic, sortBy, order]);

  return loading ? (
    <div>
      <h2>Loading ...</h2>
    </div>
  ) : (
    <div className="articles pageWidth">
      Sort By:
      <select
        onChange={(e) => {
          setSortBy(e.target.value);
        }}
        value={sortBy}
      >
        <option>created_at</option>
        <option>comment_count</option>
        <option>votes</option>
      </select>
      Order:
      <select
        onChange={(e) => {
          setOrder(e.target.value);
        }}
        value={order}
      >
        <option>asc</option>
        <option>desc</option>
      </select>
      <section className="articleList">
        {articles.map((article) => {
          return <ArticleCard key={article.article_id} article={article} />;
        })}
      </section>
    </div>
  );
};
