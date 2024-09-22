import { useParams } from "react-router-dom";
import { getArticle, getArticleComments, patchVote } from "./API";
import { useState, useEffect } from "react";
import { CommentCard } from "./Comment";
import { PostComment } from "./PostComment";
import { deleteComment } from "./API";

export const Article = () => {
  const { article_id } = useParams();
  const [article, setArticle] = useState({});
  const [comments, setComments] = useState([]);
  const [articleVotes, setArticleVotes] = useState();
  const [loading, setLoading] = useState(true);
  const [disUpVoteButton, setDisUpVoteButton] = useState(false);
  const [disDownVoteButton, setDisDownVoteButton] = useState(false);
  const [refreshComments, setRefreshComments] = useState(1);

  function voteinc(num) {
    if (num > 0) {
      if (disDownVoteButton === true) {
        setDisDownVoteButton(false);
      } else {
        setDisUpVoteButton(true);
      }
    } else {
      if (disUpVoteButton === true) {
        setDisUpVoteButton(false);
      } else {
        setDisDownVoteButton(true);
      }
    }
    setArticleVotes((votes) => {
      return votes + num;
    });
    patchVote(article.article_id, num).then((response) => {
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
  function removeComment(comment_id) {
    const deletedComment = comments.filter((comment) => {
      return comment.comment_id === comment_id;
    })[0];
    const delComIndex = comments.indexOf(deletedComment);
    const newComments = comments.filter((comment) => {
      return comment.comment_id !== comment_id;
    });
    setComments(newComments);
    deleteComment(comment_id).then((response) => {
      if (response.status !== 204) {
        alert("There was an error while deleting your comment");
        newComments.splice(delComIndex, 0, deletedComment);
        setComments(newComments);
        setRefreshComments(Date.now());
      }
    });
  }

  useEffect(() => {
    getArticleComments(article_id).then((data) => {
      if (data.comments) {
        setComments(data.comments);
      }
    });
  }, [refreshComments]);

  useEffect(() => {
    setLoading(true);
    getArticle(article_id).then((data) => {
      if (data.article) {
        setArticle(data.article);
        setArticleVotes(data.article.votes);
        setLoading(false);
      } else {
        alert("There was an error while loading the page");
        window.location.replace("/error");
      }
    });
  }, []);

  const date = new Date(article.created_at);
  return loading ? (
    <div>
      <h2>Loading ...</h2>
    </div>
  ) : (
    <div className="articleContainer">
      <section className="article">
        <h1 id="articleHeader">{article.title}</h1>

        <img className="articleFullImg" src={article.article_img_url}></img>
        <p>{article.body}</p>
        <p>Author: {article.author}</p>
        <p>Topic: {article.topic}</p>
        <p>Created: {date.toDateString()}</p>
        <p>Votes: {articleVotes} </p>
        <button
          disabled={disUpVoteButton}
          onClick={() => {
            voteinc(1);
          }}
        >
          Upvote
        </button>
        <button
          disabled={disDownVoteButton}
          onClick={() => {
            voteinc(-1);
          }}
        >
          Downvote
        </button>
        <p>Comment Count: {article.comment_count}</p>
      </section>
      <section className="postComment">
        <PostComment
          article_id={article_id}
          comments={comments}
          setComments={setComments}
          setRefreshPage={setRefreshComments}
        />
      </section>
      <section className="comments">
        {comments.length > 0 ? (
          (comments.sort((a, b) => Date(a.created_at) - Date(b.created_at)),
          comments.map((comment) => {
            return (
              <CommentCard
                key={comment.comment_id}
                comment={comment}
                removeComment={removeComment}
              />
            );
          }))
        ) : (
          <h3>Be the first to comment ...</h3>
        )}
      </section>
    </div>
  );
};
