import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import Button from "../../../components/button/Button";
import FollowList from "../../../components/followList/FollowList";
import Modal from "../../../components/modal/Modal";
import NavbarTab from "../../../components/navbarTab/NavbarTab";
import SidebarFollower from "../../../components/sidebarFollower/SidebarFollower";
import BlogCardB from "../blogCardB/BlogCardB";

import { selectMe } from "../../../stores/myUserSlice";
import { selectBlogs, thunk_getAllBlog } from "../../../stores/blogsSlice";
import { selectTopFiveWriter, selectTopWriter, thunk_getTopWriter } from "../../../stores/followListSlice";

import { tabMenuList } from "../../../constants/constant";

function AllBlogContainer() {
  const [tabItem, setTabItem] = useState("");
  const [modalTopWriterIsOpen, setModalTopWriterIsOpen] = useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const myUser = useSelector(selectMe);
  const blogs = useSelector((state) => selectBlogs(state, tabItem));

  const topWriter = useSelector(selectTopWriter);
  const topFiveWriter = useSelector(selectTopFiveWriter);

  useEffect(() => {
    const fetch = async () => {
      try {
        await dispatch(thunk_getAllBlog());
        await dispatch(thunk_getTopWriter());
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, [dispatch, myUser]);

  function openModalTopWriter() {
    setModalTopWriterIsOpen(true);
  }
  function closeModalTopWriter() {
    setModalTopWriterIsOpen(false);
  }

  function handleOnClickWriteAPost() {
    navigate("/blog/create");
  }

  return (
    <div className="all-blog-container col-8">
      <div className="header-background-all-blog"></div>

      <div className="header-group">
        <NavbarTab list={tabMenuList} value={tabItem} setValue={setTabItem} />
        {myUser ? <Button name="Write a post" onClick={handleOnClickWriteAPost} /> : ""}
      </div>

      <div className="blog-list-group">
        {blogs.map((blog) => (
          <BlogCardB blog={blog} key={blog.id} />
        ))}
      </div>
      <div className="sidebar-follower">
        <SidebarFollower title="Top writer" followList={topFiveWriter} onClickMore={openModalTopWriter} />
      </div>

      <Modal header="Top writer" isOpen={modalTopWriterIsOpen} closeModal={closeModalTopWriter}>
        <FollowList followList={topWriter} />
      </Modal>
    </div>
  );
}

export default AllBlogContainer;
