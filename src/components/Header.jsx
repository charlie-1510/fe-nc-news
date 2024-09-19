import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

export const Header = () => {
  const { currentUser } = useContext(UserContext);
  return (
    <div className="header">
      <h2>This is the header</h2>
      {currentUser.username ? (
        <p>Currently logged in as: {currentUser.username}</p>
      ) : null}
    </div>
  );
};
