export const CommentCard = ({ comment }) => {
  const date = new Date(comment.created_at);
  return (
    <div className="comment">
      <p>Author: {comment.author}</p>
      <p>{comment.body}</p>
      <p>Posted on: {date.toDateString()}</p>
      <p>Votes: {comment.votes}</p>
    </div>
  );
};
