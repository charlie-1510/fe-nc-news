import { useParams } from "react-router-dom";
import { getArticle, getArticleComments } from "./API";
import { useState, useEffect } from "react";
import { Comment } from "./Comment";

export const Article = () => {
  const { article_id } = useParams();
  const [article, setArticle] = useState({});
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getArticle(article_id).then((data) => {
      setArticle(data.article);
    });
    getArticleComments(article_id).then((data) => {
      setComments(data.comments);
    });
  }, []);

  const date = new Date(article.created_at);
  return (
    <div>
      <section className="article">
        <p>
          <b>{article.title}</b>
        </p>
        <img className="articleFullImg" src={article.article_img_url}></img>
        <p>{article.body}</p>
        <p>Author: {article.author}</p>
        <p>Topic: {article.topic}</p>
        <p>article ID: {article.article_id}</p>
        <p>Created: {date.toDateString()}</p>
        <p>Votes: {article.votes}</p>
        <p>Comment Count: {article.comment_count}</p>
      </section>
      <section className="comments">
        {comments.map((comment) => {
          return <Comment key={comment.comment_id} comment={comment} />;
        })}
      </section>
    </div>
  );
};
