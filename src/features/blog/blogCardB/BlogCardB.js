import { Link } from "react-router-dom";
import IconText from "../../../components/iconText/IconText";
import ProfileTitle from "../../../components/profileTitle/ProfileTitle";
import Immutable from "immutable";
import { convertFromHTML, ContentState, DefaultDraftBlockRenderMap } from "draft-js";

function BlogCardB(props) {
  const { blog } = props;

  const date = new Date(blog.createdAt).toUTCString().slice(5, 16);

  const blockRenderMap = Immutable.Map({
    unstyled: {
      element: "div",
      aliasedElements: ["img"]
    }
  });

  const extendedBlockRenderMap = DefaultDraftBlockRenderMap.merge(blockRenderMap);
  const blocksFromHTML = convertFromHTML(blog.content, undefined, extendedBlockRenderMap);
  const contentState = ContentState.createFromBlockArray(blocksFromHTML.contentBlocks, blocksFromHTML.entityMap);
  const content = contentState.getPlainText();

  function toggleLike() {}

  function toggleSavePost() {}

  return (
    <div className="blog-card-b-group">
      <div className="profile-date">
        <ProfileTitle name="John Mayer" />
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
          <div className="content">{content}</div>
        </div>
      </div>
      <div className="footer">
        <IconText name="47 Likes" type="like" />
        <IconText type="save-post" />
      </div>
    </div>
  );
}

export default BlogCardB;
