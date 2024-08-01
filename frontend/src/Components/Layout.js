import { Outlet } from "react-router-dom";
import VerticalDashboard from "./VerticalDashboard";

const Layout = () => {
  return (
    <div className="app-layout">
      <VerticalDashboard />
      <main className="App">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
