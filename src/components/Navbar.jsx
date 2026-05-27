import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogoutClick = async () => {
    await logout();
    setMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-black border-b-4 border-amber-500 shadow-[0_5px_20px_rgba(245,158,11,0.4)]">
      {/* ─── Top Bar ─── */}
      <div className="flex justify-between items-center px-6 md:px-12 py-5">
        {/* โลโก้ + Role Badge */}
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="text-2xl font-black text-amber-500 tracking-widest hover:text-orange-500 transition-colors"
          >
            ESCANOR <span className="text-white">PROJECT</span>
          </Link>
          {user && (
            <span className="text-xs font-bold px-3 py-1 bg-amber-500 text-black rounded-full uppercase tracking-wider shadow-[0_0_10px_rgba(245,158,11,0.5)]">
              {user.role}
            </span>
          )}
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-12">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/owner">Owner</NavLink>
          {user && (
            <div className="flex items-center gap-6 border-l-2 border-amber-500/30 pl-6">
              <p className="text-base font-medium text-gray-300">
                Welcome,{" "}
                <span className="text-amber-500 font-black tracking-wide">
                  {user.username}
                </span>
              </p>
              <LogoutButton onClick={handleLogoutClick} />
            </div>
          )}
        </div>

        {/* Hamburger (mobile only) */}
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="md:hidden flex flex-col justify-center items-center gap-1.5 w-10 h-10 cursor-pointer"
          aria-label="Toggle menu"
        >
          <span
            className={`block w-6 h-0.5 bg-amber-500 transition-all duration-300 origin-center
              ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
          />
          <span
            className={`block w-6 h-0.5 bg-amber-500 transition-all duration-300
              ${menuOpen ? "opacity-0 scale-x-0" : ""}`}
          />
          <span
            className={`block w-6 h-0.5 bg-amber-500 transition-all duration-300 origin-center
              ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
          />
        </button>
      </div>

      {/* ─── Mobile Dropdown ─── */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out
          ${menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="flex flex-col px-6 pb-6 gap-5 border-t border-amber-500/20">
          <NavLinkMobile to="/" onClick={() => setMenuOpen(false)}>
            Home
          </NavLinkMobile>
          <NavLinkMobile to="/owner" onClick={() => setMenuOpen(false)}>
            Owner
          </NavLinkMobile>

          {user && (
            <>
              <div className="border-t border-amber-500/20 pt-4">
                <p className="text-sm font-medium text-gray-400 mb-3">
                  Logged in as{" "}
                  <span className="text-amber-500 font-black">
                    {user.username}
                  </span>
                </p>
                <LogoutButton onClick={handleLogoutClick} />
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

// ─── Subcomponents ───

const NavLink = ({ to, children }) => (
  <Link
    to={to}
    className="relative group text-xl font-bold text-white transition duration-300"
  >
    <span>{children}</span>
    <span className="absolute -bottom-1 left-0 w-0 h-1 bg-gradient-to-r from-orange-500 to-yellow-400 transition-all duration-300 group-hover:w-full shadow-[0_0_8px_#f59e0b]" />
  </Link>
);

const NavLinkMobile = ({ to, children, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className="text-lg font-bold text-white hover:text-amber-500 transition-colors py-1"
  >
    {children}
  </Link>
);

const LogoutButton = ({ onClick }) => (
  <button
    onClick={onClick}
    className="px-4 py-2 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 
               text-white text-sm font-black rounded-lg transition-all transform hover:scale-105 active:scale-95
               shadow-[0_0_15px_rgba(220,38,38,0.3)] uppercase tracking-wider border border-red-500/20 cursor-pointer"
  >
    Logout
  </button>
);

export default Navbar;
