import { useParams } from "react-router-dom";
import { getArticle, getArticleComments, postVote } from "./API";
import { useState, useEffect } from "react";
import { Comment } from "./Comment";

export const Article = () => {
  const { article_id } = useParams();
  const [article, setArticle] = useState({});
  const [comments, setComments] = useState([]);
  const [articleVotes, setArticleVotes] = useState();

  function voteinc(num) {
    setArticleVotes((votes) => {
      return votes + num;
    });
    postVote(article.article_id, num).then((response) => {
      if (response.updated_votes) {
        setArticleVotes(response.updated_votes.votes);
      } else {
        alert("There was an error while voting");
        setArticleVotes((votes) => {
          return votes - num;
        });
      }
    });
  }

  useEffect(() => {
    getArticle(article_id).then((data) => {
      setArticle(data.article);
      setArticleVotes(data.article.votes);
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
        <p>Votes: {articleVotes} </p>
        <button
          onClick={() => {
            voteinc(1);
          }}
        >
          Upvote
        </button>
        <button
          onClick={() => {
            voteinc(-1);
          }}
        >
          Downvote
        </button>
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
