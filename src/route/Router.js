import { Route, Routes } from "react-router-dom";
import Home from "../pages/home/Home";
import Header from "../layout/header/Header";
import FindACamp from "../pages/findACamp/FindACamp";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Header />}>
        <Route path="/" element={<Home />} />
        <Route path="findacamp" element={<FindACamp />} />
      </Route>
    </Routes>
  );
}

export default Router;
