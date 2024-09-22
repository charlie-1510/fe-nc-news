export const User = ({ user, currentUser, handleLoginClick /*, logout */ }) => {
  return (
    <div className="user">
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
        <div class="loginButton">
          <button
            onClick={(e) => {
              e.preventDefault();
              handleLoginClick(user);
            }}
          >
            Login
          </button>
        </div>
      )}
    </div>
  );
};
