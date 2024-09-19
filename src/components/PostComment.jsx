import { useState } from "react";
import { postComment } from "./API";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

export const PostComment = ({ article_id, setComments, setRefreshPage }) => {
  const [commentInput, setCommentInput] = useState("");
  const [postingComment, setPostingComment] = useState(false);
  const { currentUser } = useContext(UserContext);
  function handleChange(e) {
    setCommentInput(e.target.value);
  }

  function submitForm(e) {
    e.preventDefault();
    setPostingComment(true);
    const newComId = Date.now();
    const body = {
      article_id: article_id,
      author: currentUser.username,
      body: commentInput,
      comment_id: newComId,
      created_at: new Date().toISOString(),
      votes: 0,
    };

    setComments((comments) => {
      return [body, ...comments];
    });
    postComment(article_id, currentUser.username, commentInput).then(
      (response) => {
        if (response.comment_posted) {
          setPostingComment(false);
          setCommentInput("");
          setRefreshPage(Date.now());
        } else {
          alert("There was an error while posting your comment");
          setComments((comments) => {
            return comments.filter((comment) => {
              return comment.comment_id !== newComId;
            });
          });
          setPostingComment(false);
        }
      }
    );
  }

  return (
    <div className="post_comment">
      <h2>Post comment here</h2>
      {currentUser.username ? (
        <form onSubmit={submitForm}>
          <label>
            <input
              className="comment_input"
              placeholder="Type comment here ..."
              onChange={handleChange}
              value={commentInput}
            />
          </label>
          <button disabled={postingComment}>Submit</button>
        </form>
      ) : (
        <p>Please log in to comment</p>
      )}
    </div>
  );
};
