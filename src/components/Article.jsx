import { useParams } from "react-router-dom";
import { getArticle } from "./API";
import { useState, useEffect } from "react";

export const Article = () => {
  const { article_id } = useParams();
  const [article, setArticle] = useState({});

  useEffect(() => {
    getArticle(article_id).then((data) => {
      setArticle(data.article);
    });
  }, []);

  const date = new Date(article.created_at);
  return (
    <div className="article">
      <p>
        <b>{article.title}</b>
      </p>
      <img className="articleFullImg" src={article.article_img_url}></img>

      <p>Author: {article.author}</p>

      <p>Topic: {article.topic}</p>
      <p>article ID: {article.article_id}</p>
      <p>Created: {date.toDateString()}</p>
      <p>Votes: {article.votes}</p>
      <p>Comment Count: {article.comment_count}</p>
    </div>
  );
};
