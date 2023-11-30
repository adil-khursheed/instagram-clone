import { Outlet } from "react-router-dom";
import "./App.css";
import { Bottombar, LeftSidebar, Topbar } from "./components/index";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getMyProfile } from "./features/profile/profileAction";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyProfile());
  }, [dispatch]);
  return (
    <>
      <div className="relative max-w-[1440px] mx-auto w-full sm:flex">
        <Topbar />
        <LeftSidebar />
        <main className="w-full main-height sm:h-screen overflow-y-auto overflow-x-hidden custom-scrollbar">
          <Outlet />
        </main>
        <Bottombar />
      </div>
    </>
  );
}

export default App;
