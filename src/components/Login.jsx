import { useContext, useState, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import { getUsers } from "./API";
import { User } from "./User";

export const Login = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getUsers().then(({ users }) => {
      setUsers(users);
    });
  }, []);

  const handleLoginClick = (user) => {
    setCurrentUser(user);
  };

  function logout(e) {
    e.preventDefault;
    setCurrentUser({});
  }

  return (
    <div className="login">
      {users.map((user) => {
        return (
          <User
            key={user.username}
            user={user}
            currentUser={currentUser}
            handleLoginClick={handleLoginClick}
            logout={logout}
          />
        );
      })}
    </div>
  );
};
