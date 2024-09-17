export const ArticleCard = ({ article }) => {
  const date = new Date(article.created_at);
  return (
    <div className="articleCard">
      <img className="articleImg" src={article.article_img_url}></img>
      <b>{article.title}</b>
      {/* <p>Author: {article.author}</p> */}

      <p>Topic: {article.topic}</p>
      {/* <p>article ID: {article.article_id}</p> */}
      {/* <p>Created: {date.toDateString()}</p> */}
      <p>Votes: {article.votes}</p>
      {/* <p>Comment Count: {article.comment_count}</p> */}
    </div>
  );
};
