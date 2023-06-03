import { Link } from "react-router-dom";
import blog1 from "../../../assets/images/blog1.jpg";
import ProfileTitle from "../../../components/profileTitle/ProfileTitle";
import IconText from "../../../components/iconText/IconText";

function BlogCardA() {
  return (
    <div className="blog-card-a-group">
      <div className="date">Feb 9, 2022</div>

      <Link className="image-group">
        <img src={blog1} alt="blog-img" className="image" />
      </Link>
      <div className="content-footer">
        <Link className="title">Must-Visit RV and Camping Rallies, Shows, and Events for 2023</Link>

        <div className="content">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
          standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to
          make a type specimen book. It has survived not only five centuries, but also the leap into electronic
          typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset
          sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus
          PageMaker including versions of Lorem Ipsum
        </div>
        <div className="footer">
          <ProfileTitle name="john mayer" />
          <IconText name="47 Likes" type="like-active" />
        </div>
      </div>
    </div>
  );
}

export default BlogCardA;
