import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import SignIn from "./Pages/SignIn";
import Missing from "./Pages/Missing";
import Unauthorized from "./Components/Unauthorized";
import Dashboard from "./Pages/Dashboard";
import Profile from "./Components/Profile";
import Settings from "./Components/Settings";
import PersistLogin from "./Components/PersistLogin";
import Register from "./Pages/Register";
import RequireAuth from "./Components/RequireAuth";

const ROLES_LIST = {
  Admin: 5150,
  Editor: 1984,
  User: 2001,
};

const App = () => {
  return (
    <>
      <Routes>
        {/* PUblic routes */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/register" element={<Register />} />
        <Route element={<PersistLogin />}>
          <Route
            element={
              <RequireAuth
                allowedRoles={[
                  ROLES_LIST.User,
                  ROLES_LIST.Admin,
                  ROLES_LIST.Editor,
                ]}
              />
            }
          >
            {/* Private Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Route>
        {/* Catch all */}
        <Route path="*" element={<Missing />} />
      </Routes>
    </>
  );
};

export default App;
