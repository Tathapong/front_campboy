import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import FollowerList from "../../../components/followerList/FollowerList";
import IconText from "../../../components/iconText/IconText";
import Modal from "../../../components/modal/Modal";
import BlogCardB from "../../blog/blogCardB/BlogCardB";
import SidebarProfile from "./SidebarProfile";
import EditProfileForm from "./EditProfileForm";

import { selectMe } from "../../../stores/myUserSlice";
import { selectBlogsByProfileId, thunk_getAllBlog } from "../../../stores/blogsSlice";
import { selectProfile, thunk_getProfileById } from "../../../stores/profileSlice";

function ProfileContainer() {
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
        console.log(error.response);
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
          <div className="profile-name">{`${profile.firstName} ${profile.lastName}`}</div>
          <IconText type="outdent" onClick={openModalProfile} />
        </div>
        {blogs.length ? (
          ""
        ) : (
          <div className="no-blog-list">{`${profile.firstName} ${profile.lastName} hasn't written any stories yet.`}</div>
        )}
      </div>

      {blogs.length ? (
        <div className="blog-list-group">
          {blogs.map((blog) => (
            <BlogCardB blog={blog} key={blog.id} unProfile={true} />
          ))}
        </div>
      ) : (
        ""
      )}

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
        <EditProfileForm profile={profile} closeModal={closeModalEditProfile} modalIsOpen={modalEditProfileIsOpen} />
      </Modal>
    </div>
  );
}

export default ProfileContainer;
