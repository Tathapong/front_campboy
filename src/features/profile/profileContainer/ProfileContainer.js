import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import SidebarProfile from "./SidebarProfile";
import Modal from "../../../components/modal/Modal";
import BlogCardB from "../../blog/blogCardB/BlogCardB";
import IconText from "../../../components/iconText/IconText";

import { selectBlogs, thunk_getAllBlog } from "../../../stores/blogsSlice";
import { selectMe } from "../../../stores/myUserSlice";
import FollowerList from "../../../components/followerList/FollowerList";

function ProfileContainer() {
  const coverImageURL = "https://res.cloudinary.com/duzw1g3u8/image/upload/v1675610434/16741519048174266565066.jpg";

  const [modalFollowingIsOpen, setModalFollowingIsOpen] = useState(false);
  const [modalProfileIsOpen, setModalProfileIsOpen] = useState(false);

  const params = useParams();
  const { profileId } = params;

  const dispatch = useDispatch();
  const myUser = useSelector(selectMe);
  const blogs = useSelector((state) => selectBlogs(state));

  useEffect(() => {
    const fetch = async () => {
      try {
        await dispatch(thunk_getAllBlog());
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, [dispatch, myUser]);

  function openModalFollowing() {
    setModalFollowingIsOpen(true);
  }

  function closeModalFollowing() {
    setModalFollowingIsOpen(false);
  }

  function openModalProfile() {
    setModalProfileIsOpen(true);
  }

  function closeModalProfile() {
    setModalProfileIsOpen(false);
  }

  return (
    <div className="profile-container col-10">
      <div className="header-background-profile-container" />

      <div className="header-group">
        <div className="cover-image-group">
          <img className="image" src={coverImageURL} alt="coverImage" />
        </div>
        <div className="profile-name-group">
          <div className="profile-name">Tathapong Subin</div>
          <IconText type="outdent" onClick={openModalProfile} />
        </div>
      </div>

      <div className="blog-list-group">
        {blogs.map((blog) => (
          <BlogCardB blog={blog} key={blog.id} />
        ))}
      </div>

      <SidebarProfile onClickMore={openModalFollowing} />
      <Modal
        header="Following"
        isOpen={modalFollowingIsOpen}
        closeModal={closeModalFollowing}
        className="modal-following"
      >
        <FollowerList />
      </Modal>
      <Modal header="" isOpen={modalProfileIsOpen} closeModal={closeModalProfile} className="modal-sidebar">
        <SidebarProfile onClickMore={openModalFollowing} />
      </Modal>
    </div>
  );
}

export default ProfileContainer;
