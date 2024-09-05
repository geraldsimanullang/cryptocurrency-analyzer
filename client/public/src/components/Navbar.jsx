import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  function handleLogout(event) {
    event.preventDefault();
    localStorage.clear();
    navigate("/login");
  }

  return (
    <div className="flex w-full bg-gray-900 justify-between items-center px-12 py-4 border-b-2 border-gray-800 shadow-md">
      <div className="flex gap-8">
        <Link to="/">
          <button className="text-amber-400 text-base font-medium hover:text-yellow-200 transition-colors duration-200">
            Home
          </button>
        </Link>
        <Link to="/my-portfolio">
          <button className="text-amber-400 text-base font-medium hover:text-yellow-200 transition-colors duration-200">
            My Portfolio
          </button>
        </Link>
      </div>
      <div>
        <button
          className="text-red-400 text-base font-medium hover:text-red-600 transition-colors duration-200"
          onClick={(event) => handleLogout(event)}
        >
          Log Out
        </button>
      </div>
    </div>
  );
}
