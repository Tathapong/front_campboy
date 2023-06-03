import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { selectMe } from "../../../stores/myUserSlice";
import { selectBlogs, thunk_getAllBlog } from "../../../stores/blogsSlice";

import BlogCardB from "../blogCardB/BlogCardB";
import NavbarTab from "../../../components/navbarTab/NavbarTab";
import Button from "../../../components/button/Button";
import SidebarFollower from "../../../components/sidebarFollower/SidebarFollower";
import FollowerList from "../../../components/followerList/FollowerList";
import Modal from "../../../components/modal/Modal";

import { tabMenuList } from "../../../constants/constant";

function AllBlogContainer() {
  const navigate = useNavigate();
  const [tabItem, setTabItem] = useState("");
  const [modalWhoToFollowerIsOpen, setModalWhoToFollowerIsOpen] = useState(false);
  const [modalTopWriterIsOpen, setModalTopWriterIsOpen] = useState(false);

  const myUser = useSelector(selectMe);
  const dispatch = useDispatch();

  const openModalWhoToFollower = () => setModalWhoToFollowerIsOpen(true);
  const closeModalWhoToFollower = () => setModalWhoToFollowerIsOpen(false);

  const openModalTopWriter = () => setModalTopWriterIsOpen(true);
  const closeModalTopWriter = () => setModalTopWriterIsOpen(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        await dispatch(thunk_getAllBlog());
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, []);

  const blogs = useSelector(selectBlogs);

  return (
    <div className="all-blog-container col-8">
      <div className="header-background-all-blog"></div>

      <div className="header-group">
        <NavbarTab list={tabMenuList} value={tabItem} setValue={setTabItem} />
        {myUser ? <Button name="Write a post" onClick={() => navigate("/blog/create")} /> : ""}
      </div>

      <div className="blog-list-group">
        {blogs.map((blog) => (
          <BlogCardB blog={blog} />
        ))}
      </div>
      <div className="sidebar-follower">
        <SidebarFollower title="Who to follow" onClickMore={openModalWhoToFollower} />
        <SidebarFollower title="Top writer" onClickMore={openModalTopWriter} />
      </div>
      <Modal header="Who to follow" isOpen={modalWhoToFollowerIsOpen} closeModal={closeModalWhoToFollower}>
        <FollowerList />
      </Modal>
      <Modal header="Top writer" isOpen={modalTopWriterIsOpen} closeModal={closeModalTopWriter}>
        <FollowerList />
      </Modal>
    </div>
  );
}

export default AllBlogContainer;
