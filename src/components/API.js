import axios from "axios";

const ncnewsAPI = axios.create({
  baseURL: "https://ncproject-4nhu.onrender.com/api",
});

export const getArticles = () => {
  return ncnewsAPI
    .get("/articles")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error, "error");
      return error;
    });
};

export const getArticle = (article_id) => {
  return ncnewsAPI
    .get(`/articles/${article_id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const getArticleComments = (article_id) => {
  return ncnewsAPI
    .get(`/articles/${article_id}/comments`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const patchVote = (article_id, num) => {
  return ncnewsAPI
    .patch(`/articles/${article_id}`, { "inc_votes": num })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const getUsers = () => {
  return ncnewsAPI
    .get("/users")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error, "error");
      return error;
    });
};

export const postComment = (article_id, username, body) => {
  const data = { username: username, body: body };
  return ncnewsAPI
    .post(`/articles/${article_id}/comments`, data)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const deleteComment = (comment_id) => {
  return ncnewsAPI
    .delete(`/comments/${comment_id}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error, "error");
      return error;
    });
};
