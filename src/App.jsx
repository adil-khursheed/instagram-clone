import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <div className="flex">
        <Navbar />
        <main className="overflow-y-scroll w-full">
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default App;
