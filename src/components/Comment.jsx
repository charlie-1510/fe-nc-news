import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";

export const CommentCard = ({ comment, removeComment }) => {
  const [disDelButton, setDisDelButton] = useState(false);
  const { currentUser } = useContext(UserContext);
  const date = new Date(comment.created_at);

  return (
    <div className="comment">
      <p>Author: {comment.author}</p>
      <p>{comment.body}</p>
      <p>Posted on: {date.toDateString()}</p>
      <p>Votes: {comment.votes}</p>
      {comment.author === currentUser.username ? (
        <button
          disabled={disDelButton}
          onClick={() => {
            setDisDelButton(true);
            removeComment(comment.comment_id);
          }}
        >
          delete
        </button>
      ) : null}
    </div>
  );
};
