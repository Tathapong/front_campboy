import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectMe } from "../../../stores/myUserSlice";
import { thunk_toggleSave, thunk_toggleLike } from "../../../stores/blogsSlice";
import { convertFromRaw } from "draft-js";

import IconText from "../../../components/iconText/IconText";
import ProfileTitle from "../../../components/profileTitle/ProfileTitle";

function BlogCardB(props) {
  const { blog } = props;
  const dispatch = useDispatch();
  const myUser = useSelector(selectMe);

  const date = new Date(blog.createdAt).toUTCString().slice(5, 16);

  const rawContentState = JSON.parse(blog.content);
  const contentState = convertFromRaw(rawContentState);
  const contentText = contentState.getPlainText();

  const blogId = blog.id;
  const profileId = blog.userId;
  const profileName = `${blog.User.firstName} ${blog.User.lastName}`;
  const profileImage = blog.User.profileImage;
  const blogLikeCount = blog.BlogLikes.length;
  const blogCommentCount = blog.BlogComments.length;
  const isLike = Boolean(blog.BlogLikes?.filter((item) => item.userId === myUser?.id).length);
  const isSave = Boolean(blog.BlogSaves?.filter((item) => item.userId === myUser?.id).length);

  async function handleClickSaveBlog() {
    try {
      await dispatch(thunk_toggleSave(blogId));
    } catch (error) {
      console.log(error);
    }
  }
  async function handleClickLikeBlog() {
    try {
      await dispatch(thunk_toggleLike(blogId));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="blog-card-b-group">
      <div className="profile-date">
        <ProfileTitle name={profileName} profileImage={profileImage} />
        <div className="date">{date}</div>
      </div>

      <div className="content-group">
        {blog.featureImage ? (
          <div className="image-group">
            <img src={blog.featureImage} alt="blog-img" className="image" />
          </div>
        ) : (
          ""
        )}
        <div className="info-group">
          <Link className="title" to={`${blog.id}`}>
            {blog.title}
          </Link>
          <div className="content">{contentText}</div>
        </div>
      </div>
      <div className="footer">
        <div className="like-comment">
          <IconText
            name={`${blogLikeCount} Likes`}
            type="like"
            onClick={handleClickLikeBlog}
            isActive={isLike}
            unauthorized={!Boolean(myUser)}
          />
          <IconText name={`${blogCommentCount} Comments`} type="comment" />
        </div>
        {myUser ? (
          <IconText type="save-post" onClick={handleClickSaveBlog} isActive={isSave} unauthorized={!Boolean(myUser)} />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default BlogCardB;
