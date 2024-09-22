import { Link } from "react-router-dom";

export const Navigator = ({ topics }) => {
  return (
    <div className="navigator">
      <nav className="pageWidth">
        <ul className="navigatorList">
          <li id="homeNav" className="topicItem">
            <Link to="/">Home</Link>
          </li>
          {topics.map((topic, index) => {
            return (
              <li className="topicItem" key={index}>
                <Link to={`/topics/${topic.slug}`}>
                  {topic.slug.charAt(0).toUpperCase() + topic.slug.slice(1)}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};
