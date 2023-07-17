import { Link } from "react-router-dom";
import { NO_IMAGE_AVAILABLE } from "../../../config/env";

function BlogRecent(props) {
  const { blog } = props;

  const date = new Date(blog.createdAt).toUTCString().slice(5, 16);

  return (
    <Link className="blog-recent-group" to={`/blog/${blog.id}`}>
      <div className="image-group">
        <img src={blog.featureImage ?? NO_IMAGE_AVAILABLE} alt="img-recent" className="image" />
      </div>
      <div className="info">
        <div className="title">{blog.title}</div>
        <div className="date">{date}</div>
      </div>
    </Link>
  );
}

export default BlogRecent;
