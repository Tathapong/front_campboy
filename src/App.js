import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { thunk_getMe } from "./stores/myUserSlice";
import { getAccesToken } from "./utilities/localStorage";

import { ToastContainer } from "react-toastify";

import Router from "./route/Router";
import ScrollToTop from "./layout/utilities/ScrollToTop";
import Loading from "./components/spinner/Loading";

function App() {
  const dispatch = useDispatch();
  const [initialState, setInitialState] = useState(true);

  useEffect(() => {
    const fetchMe = async () => {
      try {
        if (getAccesToken()) await dispatch(thunk_getMe());
      } catch (err) {
        console.log(err);
      } finally {
        setInitialState(false);
      }
    };
    fetchMe();
  }, [dispatch]);

  return (
    <>
      {initialState ? <Loading /> : ""}
      <div className="App">
        <ScrollToTop />
        <Router />
        <ToastContainer position="bottom-center" autoClose="1500" />
      </div>
    </>
  );
}

export default App;
