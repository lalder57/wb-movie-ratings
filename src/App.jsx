import { NavLink, Outlet, useNavigate } from "react-router-dom";
import LogoutButton from "./components/LogoutButton.jsx";
import axios from "axios";

export default function App() {
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    const res = await axios.post("/api/logout");
    if (res.data.success) {
      navigate("/");
    }
  };
  return (
    <>
      <nav>
        <div id="nav-bar-list">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/movies">All movies</NavLink>
          <NavLink to="/login">Log in</NavLink>
          <NavLink to="/me">Your ratings</NavLink>
          <LogoutButton onLogout={handleLogout} />
        </div>
      </nav>

      <hr />

      <main>
        <Outlet />
      </main>
    </>
  );
}
