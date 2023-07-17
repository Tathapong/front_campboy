import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

import Loading from "../components/spinner/Loading";
import HeaderContainer from "../layout/header/HeaderContainer";

import AllBlog from "../pages/allBlog/AllBlog";
import Blog from "../pages/blog/Blog";
import Camp from "../pages/camp/Camp";
import CreateBlog from "../pages/createBlog/CreateBlog";
import FindACamp from "../pages/findACamp/FindACamp";
import Home from "../pages/home/Home";
import NotFound from "../pages/notFound/NotFound";
import Profile from "../pages/profile/Profile";
import ResetPassword from "../pages/resetPassword/ResetPassword";
import VerifyEmailPage from "../pages/verifyEmail/VerifyEmail";
import JoinCampPage from "../pages/joinCamp/JoinCampPage";

import { selectLoading } from "../stores/loadingSlice";

function Router() {
  const loading = useSelector(selectLoading);
  return (
    <>
      {loading && <Loading />}
      <Routes>
        <Route path="/" element={<HeaderContainer />}>
          <Route index element={<Home />} />
          <Route path="findacamp" element={<FindACamp />} />
          <Route path="camp/:campId" element={<Camp />} />
          <Route path="blog/" element={<AllBlog />} />
          <Route path="blog/:blogId" element={<Blog />} />
          <Route path="blog/create" element={<CreateBlog />} />
          <Route path="profile/:profileId" element={<Profile />} />
          <Route path="join" element={<JoinCampPage />} />
        </Route>
        <Route path="/users/:userId/verify/:hashedToken" element={<VerifyEmailPage />} />
        <Route path="/users/:userId/reset-password/:hashedToken" element={<ResetPassword />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default Router;
