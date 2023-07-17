import ProfileTitle from "../../../components/profileTitle/ProfileTitle";
import BlogRecent from "../blogRecent/BlogRecent";

function SidebarBlog(props) {
  const { profileId, profileName, profileImage, profileAbout = " ", blogList = [] } = props;

  return (
    <div className="sidebar-blog-group">
      <ProfileTitle
        type="vertical"
        name={profileName}
        profileImage={profileImage}
        about={profileAbout}
        to={`/profile/${profileId}`}
      />
      {blogList.length ? (
        <div className="blog-more-group">
          <div className="title">More posts</div>
          <div className="blog-list">
            {blogList.map((blog) => (
              <BlogRecent blog={blog} key={blog.id} />
            ))}
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default SidebarBlog;
