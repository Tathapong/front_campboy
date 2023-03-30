import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectLoading } from "../stores/loadingSlice";

import HeaderContainer from "../layout/header/HeaderContainer";
import Home from "../pages/home/Home";
import FindACamp from "../pages/findACamp/FindACamp";
import Camp from "../pages/camp/Camp";
import Loading from "../components/spinner/Loading";

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
        </Route>
      </Routes>
    </>
  );
}

export default Router;
