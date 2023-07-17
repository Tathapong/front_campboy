import { memo } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { convertFromRaw } from "draft-js";

import IconText from "../../../components/iconText/IconText";
import ProfileTitle from "../../../components/profileTitle/ProfileTitle";

import { selectMe } from "../../../stores/myUserSlice";
import { thunk_toggleSave, thunk_toggleLike } from "../../../stores/blogsSlice";

function BlogCardB(props) {
  const { blog, unProfile = false } = props;
  const dispatch = useDispatch();
  const myUser = useSelector(selectMe);

  const date = new Date(blog.createdAt).toUTCString().slice(5, 16);

  const rawContentState = JSON.parse(blog.content);
  const contentState = convertFromRaw(rawContentState);
  const contentText = contentState.getPlainText();

  async function handleOnClickSaveBlog() {
    try {
      await dispatch(thunk_toggleSave(blog.id));
    } catch (error) {
      console.log(error);
    }
  }
  async function handleOnClickLikeBlog() {
    try {
      await dispatch(thunk_toggleLike(blog.id));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="blog-card-b-group">
      {unProfile ? (
        ""
      ) : (
        <div className="profile-date">
          <ProfileTitle name={blog.profileName} profileImage={blog.profileImage} to={`/profile/${blog.profileId}`} />
          <div className="date">{date}</div>
        </div>
      )}

      <div className="content-group">
        {blog.featureImage ? (
          <div className="image-group">
            <img src={blog.featureImage} alt="blog-img" className="image" />
          </div>
        ) : (
          ""
        )}
        <div className="info-group">
          <Link className="title" to={`/blog/${blog.id}`}>
            {blog.title}
          </Link>
          <div className="content">{contentText}</div>
        </div>
      </div>

      <div className="footer">
        <div className="like-comment">
          <IconText
            name={`${blog.blogLikeCount} Likes`}
            type="like"
            onClick={handleOnClickLikeBlog}
            isActive={Boolean(blog.isLike)}
            unauthorized={!Boolean(myUser)}
          />
          <IconText name={`${blog.blogCommentCount} Comments`} type="comment" />
        </div>

        {myUser ? (
          <IconText
            type="save-post"
            onClick={handleOnClickSaveBlog}
            isActive={Boolean(blog.isSave)}
            unauthorized={!Boolean(myUser)}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default memo(BlogCardB);
