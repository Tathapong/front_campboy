import "./blogRecent.css";
import { Link } from "react-router-dom";
import blogRecent1 from "../../../assets/images/blogRecent1.jpg";

function BlogRecent(props) {
  const { image = blogRecent1, title = "Title", date = "date" } = props;
  return (
    <Link className="blog-recent-group">
      <div className="image">
        <img src={image} alt="img-recent" />
      </div>
      <div className="info">
        <div className="title">{title}</div>
        <div className="date">{date}</div>
      </div>
    </Link>
  );
}

export default BlogRecent;
