import { useContext, useState, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import { getUsers } from "./API";
import { User } from "./User";

export const Login = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getUsers().then(({ users }) => {
      if (users.length > 0) {
        setUsers(users);
        setLoading(false);
      } else {
        alert("There was an error while loading the page");
        location.reload();
      }
    });
  }, []);

  const handleLoginClick = (user) => {
    setCurrentUser(user);
  };

  // function logout(e) {
  //   e.preventDefault;
  //   setCurrentUser({});
  // }

  return loading ? (
    <div>
      <h2>Loading ...</h2>
    </div>
  ) : (
    <div className="login pageWidth">
      {users.map((user) => {
        return (
          <User
            key={user.username}
            user={user}
            currentUser={currentUser}
            handleLoginClick={handleLoginClick}
            // logout={logout}
          />
        );
      })}
    </div>
  );
};
