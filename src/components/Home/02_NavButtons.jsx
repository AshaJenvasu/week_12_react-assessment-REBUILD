import { useAuth } from "../../context/AuthContext";

const NavButtons = ({ activeSection, setActiveSection, getButtonClass }) => {
  const { user } = useAuth();

  return (
    <div className="flex gap-20 mb-16">
      <button
        onClick={() => setActiveSection("user")}
        className={getButtonClass("user")}
      >
        User Home Section
      </button>
      {user.role === "admin" && (
        <button
          onClick={() => setActiveSection("admin")}
          className={getButtonClass("admin")}
        >
          Admin Home Section
        </button>
      )}
    </div>
  );
};

export default NavButtons;
