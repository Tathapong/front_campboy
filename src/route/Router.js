import { Route, Routes } from "react-router-dom";

import HeaderContainer from "../layout/header/HeaderContainer";
import Home from "../pages/home/Home";
import FindACamp from "../pages/findACamp/FindACamp";
import Camp from "../pages/camp/Camp";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<HeaderContainer />}>
        <Route path="/" element={<Home />} />
        <Route path="findacamp" element={<FindACamp />} />
        <Route path="camp/:campId" element={<Camp />} />
      </Route>
    </Routes>
  );
}

export default Router;
