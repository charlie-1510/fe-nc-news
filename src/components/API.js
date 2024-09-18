import axios from "axios";

const ncnewsAPI = axios.create({
  baseURL: "https://ncproject-4nhu.onrender.com/api",
});

export const getArticles = () => {
  return ncnewsAPI
    .get("/articles", {})
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
    });
};

export const getArticle = (article_id) => {
  return ncnewsAPI
    .get(`/articles/${article_id}`, {})
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
    });
};

export const getArticleComments = (article_id) => {
  return ncnewsAPI
    .get(`/articles/${article_id}/comments`, {})
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
    });
};

export const postVote = (article_id, num) => {
  return ncnewsAPI
    .patch(`/articles/${article_id}`, { "inc_votes": num })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};
