import { useEffect } from "react";
import "./App.css";
import Authentication from "./pages/Authentication/Authentication";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProfileAction } from "./Redux/Auth/auth.action";
import HomePage from "./pages/HomePage/HomePage";
import Message from "./pages/Message/Message";

function App() {
  const { auth } = useSelector((store) => store);
  console.log("auth", auth)
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    dispatch(getProfileAction(jwt));
  }, [jwt]);
  return (
    <div className="">
      {/* <Authentication /> */}
      <Routes>
        <Route
          path="/*"
          element={auth.user ? <HomePage /> : <Authentication />}
        />
        <Route path="/message" element={<Message />} />
        <Route path="/*" element={<Authentication />} />
        {/* <Route path="/home" element={<HomePage />} /> */}
      </Routes>
    </div>
  );
}

export default App;
