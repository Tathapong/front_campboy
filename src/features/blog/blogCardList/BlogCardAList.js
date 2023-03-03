import "./blogCardAList.css";
import BlogCardA from "../blogCardA/BlogCardA";
import BlogRecentList from "../blogRecentList/BlogRecentList";
import IconText from "../../../components/iconText/IconText";

function BlogCardAList() {
  return (
    <div className="blog-card-a-list-group">
      <div className="blog-card-group">
        <BlogCardA />
        <BlogCardA />
      </div>
      <div className="blog-recent">
        <IconText name="View All Post" type="view-all-post">
          <i class="fa-solid fa-arrow-right"></i>
        </IconText>
        <div className="blog-recent-list-title">RECENT POSTS</div>
        <BlogRecentList />
      </div>
    </div>
  );
}

export default BlogCardAList;
