import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import SignIn from "./Pages/SignIn";
import Layout from "./Components/Layout";
import Missing from "./Pages/Missing";
import Unauthorized from "./Components/Unauthorized";
import Dashboard from "./Pages/Dashboard";
import Profile from "./Components/Profile";
import Settings from "./Components/Settings";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* PUblic routes */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/" element={<Home />} />
          {/* Catch all */}
          <Route path="*" element={<Missing />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
