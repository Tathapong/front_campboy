import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectLoading } from "../stores/loadingSlice";

import HeaderContainer from "../layout/header/HeaderContainer";
import Home from "../pages/home/Home";
import FindACamp from "../pages/findACamp/FindACamp";
import Camp from "../pages/camp/Camp";
import Loading from "../components/spinner/Loading";
import VerifyEmail from "../features/auth/verifyEmail/VerifyEmail";
import ResetPasswordEmail from "../features/auth/resetPasswordEmail/ResetPasswordEmail";
import AllBlogContainer from "../features/blog/allBlogContainer/AllBlogContainer";
import CreateBlogContainer from "../features/blog/createBlogContainer/CreateBlogContainer";
import BlogContainer from "../features/blog/blogContainer/BlogContainer";
import ProfileContainer from "../features/profile/profileContainer/ProfileContainer";

function Router() {
  const loading = useSelector(selectLoading);
  return (
    <>
      {loading && <Loading />}
      <Routes>
        <Route path="/" element={<HeaderContainer />}>
          <Route path="/" element={<Home />} />
          <Route path="findacamp" element={<FindACamp />} />
          <Route path="camp/:campId" element={<Camp />} />
          <Route path="blog/" element={<AllBlogContainer />} />
          <Route path="blog/:blogId" element={<BlogContainer />} />
          <Route path="blog/create" element={<CreateBlogContainer />} />
          <Route path="profile/:profileId" element={<ProfileContainer />} />
        </Route>
        <Route path="/users/:userId/verify/:hashedToken" element={<VerifyEmail />} />
        <Route path="/users/:userId/reset-password/:hashedToken" element={<ResetPasswordEmail />} />
      </Routes>
    </>
  );
}

export default Router;
