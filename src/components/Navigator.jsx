import { Link } from "react-router-dom";

export const Navigator = ({ topics }) => {
  return (
    <div className="navigator">
      <h2>This is the navigator</h2>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          {topics.map((topic, index) => {
            return (
              <li key={index}>
                <Link to={`/topics/${topic.slug}`}>
                  {topic.slug.charAt(0).toUpperCase() + topic.slug.slice(1)}
                </Link>
              </li>
            );
          })}
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
