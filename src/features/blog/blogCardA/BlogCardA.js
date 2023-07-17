import { Link } from "react-router-dom";
import { convertFromRaw } from "draft-js";

import ProfileTitle from "../../../components/profileTitle/ProfileTitle";
import IconText from "../../../components/iconText/IconText";

function BlogCardA(props) {
  const { blog } = props;

  const date = new Date(blog.createdAt).toUTCString().slice(5, 16);

  const rawContentState = JSON.parse(blog.content);
  const contentState = convertFromRaw(rawContentState);
  const contentText = contentState.getPlainText();

  return (
    <div className="blog-card-a-group">
      <div className="date">{date}</div>

      <Link className="image-group" to={`/blog/${blog.id}`}>
        <img src={blog.featureImage} alt="blog-img" className="image" />
      </Link>
      <div className="content-footer">
        <Link className="title" to={`/blog/${blog.id}`}>
          {blog.title}
        </Link>

        <div className="content">{contentText}</div>
        <div className="footer">
          <ProfileTitle
            name={blog.profileName}
            type="horizontal"
            profileImage={blog.profileImage}
            to={`/profile/${blog.profileId}`}
          />
          <IconText name={`${blog.likeCount} Likes`} type="like" isActive={true} />
        </div>
      </div>
    </div>
  );
}

export default BlogCardA;
