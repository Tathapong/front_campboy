// import "./blogCardAList.css";
import blogRecent1 from "../../../assets/images/blogRecent1.jpg";
import blogRecent2 from "../../../assets/images/blogRecent2.jpg";
import blogRecent3 from "../../../assets/images/blogRecent3.jpg";
import blogRecent4 from "../../../assets/images/blogRecent4.jpg";
import blogRecent5 from "../../../assets/images/blogRecent5.jpg";

import BlogCardA from "../blogCardA/BlogCardA";
import BlogRecent from "../blogRecent/BlogRecent";

import IconText from "../../../components/iconText/IconText";

function BlogCardAList() {
  return (
    <div className="more-post-group">
      <div className="blog-card-a-list">
        <BlogCardA />
        <BlogCardA />
      </div>
      <div className="recent-post-group">
        <IconText name="View All Post" type="view-all-post" />
        <div className="blog-recent-list-title">RECENT POSTS</div>
        <div className="blog-recent-list">
          <BlogRecent image={blogRecent1} title="The age of Agile must end" date="Feb 9, 2022" />
          <BlogRecent image={blogRecent2} title="Introducing the new JupyterLab Desktop!" date="Mar 12, 2022" />
          <BlogRecent image={blogRecent3} title="Ukraine War, 10 February 2023" date="Jan 4, 2021" />
          <BlogRecent
            image={blogRecent5}
            title="Why the Google layoffs are about personal ambition and poor leadership"
            date="Dec 11, 2021"
          />
          <BlogRecent image={blogRecent4} title="Be Present" date="Jun 13, 2022" />
        </div>
      </div>
    </div>
  );
}

export default BlogCardAList;
