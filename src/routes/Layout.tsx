import { Outlet } from "react-router-dom";
import { NavBar } from "../components/NavBar";


export function Layout() {
  return (
    <>
      {<NavBar />}
      <div className="container mt-3">
        <Outlet />
      </div>
    </>
  );
}
