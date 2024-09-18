import axios from "axios";

const ncnewsAPI = axios.create({
  baseURL: "https://ncproject-4nhu.onrender.com/api",
});

export const getArticles = () => {
  return ncnewsAPI.get("/articles", {}).then((response) => {
    return response.data;
  });
};

export const getArticle = (article_id) => {
  return ncnewsAPI.get(`/articles/${article_id}`, {}).then((response) => {
    return response.data;
  });
};

export const getArticleComments = (article_id) => {
  return ncnewsAPI
    .get(`/articles/${article_id}/comments`, {})
    .then((response) => {
      return response.data;
    });
};
