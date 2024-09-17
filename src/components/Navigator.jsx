import { Link } from "react-router-dom";

export const Navigator = () => {
  return (
    <div className="navigator">
      <h2>This is the navigator</h2>
      <nav>
        <ul>
          <li>
            <Link to="/articles">Articles</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
