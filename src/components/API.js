import axios from "axios";

const ncnewsAPI = axios.create({
  baseURL: "https://ncproject-4nhu.onrender.com/api",
});

export const getArticles = () => {
  return ncnewsAPI.get("/articles", {}).then((response) => {
    return response.data;
  });
};
