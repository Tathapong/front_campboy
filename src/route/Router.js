import { Route, Routes } from "react-router-dom";
import Home from "../pages/home/Home";
import Header from "../layout/header/Header";
import FindACamp from "../pages/findACamp/FindACamp";
import Camp from "../pages/camp/Camp";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Header />}>
        <Route path="/" element={<Home />} />
        <Route path="findacamp" element={<FindACamp />} />
        <Route path="camp/:campId" element={<Camp />} />
      </Route>
    </Routes>
  );
}

export default Router;
