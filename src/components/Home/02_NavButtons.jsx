const NavButtons = ({ activeSection, setActiveSection, getButtonClass }) => {
  return (
    <div className="flex gap-20 mb-16">
      <button
        onClick={() => setActiveSection("user")}
        className={getButtonClass("user")}
      >
        User Home Section
      </button>
      <button
        onClick={() => setActiveSection("admin")}
        className={getButtonClass("admin")}
      >
        Admin Home Section
      </button>
    </div>
  );
};

export default NavButtons;
