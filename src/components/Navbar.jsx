import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav
      className="sticky top-0 z-50 flex justify-end items-center gap-12 px-12 py-5 
                    bg-black border-b-4 border-amber-500 shadow-[0_5px_20px_rgba(245,158,11,0.4)]"
    >
      <div className="mr-auto">
        <Link
          to="/"
          className="text-2xl font-black text-amber-500 tracking-widest hover:text-orange-500 transition-colors"
        >
          ESCANOR <span className="text-white">PROJECT</span>
        </Link>
      </div>

      <Link
        to="/"
        className="relative group text-xl font-bold text-white transition duration-300"
      >
        <span>Home</span>
        <span className="absolute -bottom-1 left-0 w-0 h-1 bg-gradient-to-r from-orange-500 to-yellow-400 transition-all duration-300 group-hover:w-full shadow-[0_0_8px_#f59e0b]"></span>
      </Link>

      <Link
        to="/owner"
        className="relative group text-xl font-bold text-white transition duration-300"
      >
        <span>Owner</span>
        <span className="absolute -bottom-1 left-0 w-0 h-1 bg-gradient-to-r from-orange-500 to-yellow-400 transition-all duration-300 group-hover:w-full shadow-[0_0_8px_#f59e0b]"></span>
      </Link>
    </nav>
  );
};

export default Navbar;
