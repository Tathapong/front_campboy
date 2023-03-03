import "./blogRecentList.css";
import blogRecent1 from "../../../assets/images/blogRecent1.jpg";
import blogRecent2 from "../../../assets/images/blogRecent2.jpg";
import blogRecent3 from "../../../assets/images/blogRecent3.jpg";
import blogRecent4 from "../../../assets/images/blogRecent4.jpg";
import blogRecent5 from "../../../assets/images/blogRecent5.jpg";

import BlogRecent from "../blogRecent/BlogRecent";

function BlogRecentList() {
  return (
    <>
      <div className="blog-recent-list-group">
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
    </>
  );
}

export default BlogRecentList;
