import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { thunk_getBlogById, selectBlog } from "../../../stores/blogSlice";

import Modal from "../../../components/modal/Modal";
import ProfileTitle from "../../../components/profileTitle/ProfileTitle";
import ShareSocial from "../../../components/shareSocial/ShareSocial";
import IconText from "../../../components/iconText/IconText";

function BlogContainer() {
  const dispatch = useDispatch();
  const { blogId } = useParams();

  const blog = useSelector(selectBlog);

  useEffect(() => {
    const fetch = async () => {
      try {
        await dispatch(thunk_getBlogById(blogId));
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, []);

  return (
    <div className="blog-container col-10">
      <div className="header-background-blog-container"></div>

      <div className="header-group">
        <ProfileTitle name="John mayer" about="Dec 16, 2022" />
        <div className="action-group">
          <ShareSocial />
          <IconText type="save-post" />
          <IconText type="vertical-dot" />
        </div>
      </div>
      <div className="blog-content-group">
        <div className="title">{blog.title}</div>
        <div className="content" dangerouslySetInnerHTML={{ __html: blog.content }}></div>
      </div>
      <div className="sidebar-group">
        <ProfileTitle
          name="Tathapong Subin"
          follower="104685"
          about="Brand Marketer. Foundere of Embedded Brand Strategy. Writing about startups, media, and brands. Ex P&G, McKinsey, Ogilvy"
          onClickButton={() => {}}
        />
      </div>
      <Modal></Modal>
    </div>
  );
}

export default BlogContainer;
