export const User = ({ user, currentUser, handleLoginClick, logout }) => {
  return (
    <div className="user">
      <h2>This is a user</h2>
      <p>Name: {user.name}</p>
      <p>Username: {user.username}</p>
      <img className="userImg" src={user.avatar_url}></img>
      {currentUser.username === user.username ? (
        <>
          <p>Logged in</p>
          {/* <button on onClick={logout}>
            Logout
          </button> */}
        </>
      ) : (
        <p>
          <button
            onClick={(e) => {
              e.preventDefault();
              handleLoginClick(user);
            }}
          >
            Login
          </button>
        </p>
      )}
    </div>
  );
};
