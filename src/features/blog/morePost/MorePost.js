import { memo } from "react";

import BlogCardA from "../blogCardA/BlogCardA";
import BlogRecent from "../blogRecent/BlogRecent";

import IconText from "../../../components/iconText/IconText";

function BlogCardAList(props) {
  const { morePost } = props;

  return (
    <div className="more-post-group">
      <div className="blog-card-a-list">
        {morePost.topBlogs?.map((blog) => (
          <BlogCardA key={blog.id} blog={blog} />
        ))}
      </div>
      <div className="recent-post-group">
        <IconText name="View All Post" type="view-all-post" to={`/blog`} />
        <div className="blog-recent-list-title">RECENT POSTS</div>
        <div className="blog-recent-list">
          {morePost.recentBlogs?.map((blog) => (
            <BlogRecent key={blog.id} blog={blog} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default memo(BlogCardAList);
