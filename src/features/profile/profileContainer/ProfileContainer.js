import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import IconText from "../../../components/iconText/IconText";
import FollowList from "../../../components/followList/FollowList";
import Modal from "../../../components/modal/Modal";

import BlogCardB from "../../blog/blogCardB/BlogCardB";
import EditProfileForm from "./EditProfileForm";
import SidebarProfile from "./SidebarProfile";

import { selectMe } from "../../../stores/myUserSlice";
import { selectBlogsByProfileId, thunk_getAllBlog } from "../../../stores/blogsSlice";
import { selectProfile, thunk_getProfileById } from "../../../stores/profileSlice";

function ProfileContainer() {
  const [modalProfileIsOpen, setModalProfileIsOpen] = useState(false);
  const [modalFollowerIsOpen, setModalFollowerIsOpen] = useState(false);
  const [modalFollowingIsOpen, setModalFollowingIsOpen] = useState(false);
  const [modalEditProfileIsOpen, setModalEditProfileIsOpen] = useState(false);

  const params = useParams();
  const { profileId } = params;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const myUser = useSelector(selectMe);

  const blogs = useSelector((state) => selectBlogsByProfileId(state, profileId));
  const profile = useSelector(selectProfile);

  useEffect(() => {
    closeModalFollowing();
    closeModalFollower();

    const fetch = async () => {
      try {
        await dispatch(thunk_getAllBlog());
        await dispatch(thunk_getProfileById(profileId));
      } catch (error) {
        console.log(error);
        if (error.response.status === 404) navigate("/*");
      }
    };
    fetch();
  }, [dispatch, myUser, profileId]);

  function openModalProfile() {
    setModalProfileIsOpen(true);
  }
  function closeModalProfile() {
    setModalProfileIsOpen(false);
  }

  function openModalFollowing() {
    setModalFollowingIsOpen(true);
  }
  function closeModalFollowing() {
    setModalFollowingIsOpen(false);
  }

  function openModalFollower() {
    setModalFollowerIsOpen(true);
  }
  function closeModalFollower() {
    setModalFollowerIsOpen(false);
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
          <img className="image" src={profile.coverImage} alt="coverImage" />
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

      <SidebarProfile
        profile={profile}
        onClickEditProfile={openModalEditProfile}
        onClickShowFollower={openModalFollower}
        onClickShowFollowing={openModalFollowing}
      />

      <Modal header="" isOpen={modalProfileIsOpen} closeModal={closeModalProfile} className="modal-sidebar">
        <SidebarProfile
          profile={profile}
          onClickEditProfile={openModalEditProfile}
          onClickShowFollower={openModalFollower}
          onClickShowFollowing={openModalFollowing}
        />
      </Modal>

      <Modal
        header="Following"
        isOpen={modalFollowingIsOpen}
        closeModal={closeModalFollowing}
        className="modal-following"
      >
        <FollowList followList={profile.following} />
      </Modal>

      <Modal header="Follower" isOpen={modalFollowerIsOpen} closeModal={closeModalFollower} className="modal-follower">
        <FollowList followList={profile.follower} />
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
