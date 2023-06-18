import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import SidebarProfile from "./SidebarProfile";
import Modal from "../../../components/modal/Modal";
import BlogCardB from "../../blog/blogCardB/BlogCardB";
import IconText from "../../../components/iconText/IconText";
import EditProfileForm from "./EditProfileForm";

import { selectBlogsByProfileId, thunk_getAllBlog } from "../../../stores/blogsSlice";
import { selectMe } from "../../../stores/myUserSlice";
import FollowerList from "../../../components/followerList/FollowerList";
import { selectProfile, thunk_getProfileById } from "../../../stores/profileSlice";

function ProfileContainer() {
  const coverImageURL = "https://res.cloudinary.com/duzw1g3u8/image/upload/v1675610434/16741519048174266565066.jpg";

  const [modalFollowingIsOpen, setModalFollowingIsOpen] = useState(false);
  const [modalProfileIsOpen, setModalProfileIsOpen] = useState(false);
  const [modalEditProfileIsOpen, setModalEditProfileIsOpen] = useState(false);

  const params = useParams();
  const { profileId } = params;

  const dispatch = useDispatch();
  const myUser = useSelector(selectMe);
  const blogs = useSelector((state) => selectBlogsByProfileId(state, profileId));
  const profile = useSelector(selectProfile);

  useEffect(() => {
    const fetch = async () => {
      try {
        await dispatch(thunk_getAllBlog());
        await dispatch(thunk_getProfileById(profileId));
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, [dispatch, myUser, profileId]);

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
  function openModalEditProfile() {
    setModalEditProfileIsOpen(true);
  }

  function closeModalEditProfile() {
    setModalEditProfileIsOpen(false);
  }

  return (
    <div className="profile-container col-10">
      <div className="header-background-profile-container" />

      <div className="header-group">
        <div className="cover-image-group">
          <img className="image" src={profile.profileCoverImage} alt="coverImage" />
        </div>
        <div className="profile-name-group">
          <div className="profile-name">{profile.profileName}</div>
          <IconText type="outdent" onClick={openModalProfile} />
        </div>
      </div>

      <div className="blog-list-group">
        {blogs.map((blog) => (
          <BlogCardB blog={blog} key={blog.id} unProfile={true} />
        ))}
      </div>

      <SidebarProfile profile={profile} onClickMore={openModalFollowing} onClickEditProfile={openModalEditProfile} />
      <Modal
        header="Following"
        isOpen={modalFollowingIsOpen}
        closeModal={closeModalFollowing}
        className="modal-following"
      >
        <FollowerList />
      </Modal>
      <Modal header="" isOpen={modalProfileIsOpen} closeModal={closeModalProfile} className="modal-sidebar">
        <SidebarProfile profile={profile} onClickMore={openModalFollowing} onClickEditProfile={openModalEditProfile} />
      </Modal>
      <Modal
        header=""
        isOpen={modalEditProfileIsOpen}
        closeModal={closeModalEditProfile}
        className="modal-edit-profile"
      >
        <EditProfileForm />
      </Modal>
    </div>
  );
}

export default ProfileContainer;
