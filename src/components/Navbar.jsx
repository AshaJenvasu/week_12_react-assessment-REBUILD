import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  const handleLogoutClick = async () => {
    // ยิงคำสั่งทำลายคุกกี้ที่ฝั่งหลังบ้าน และล้างค่า State ส่วนกลาง
    await logout();
    // พอเคลียร์ค่าเสร็จปุ๊บ หน้า Home.jsx ที่ดักเงื่อนไข if (!user) ไว้ จะทำงานและพากระโดดกลับหน้าแรกทันทีจ้ะ!
  };

  return (
    <nav
      className="sticky top-0 z-50 flex justify-end items-center gap-12 px-12 py-5 
                 bg-black border-b-4 border-amber-500 shadow-[0_5px_20px_rgba(245,158,11,0.4)]"
    >
      {/* ฝั่งซ้าย: โลโก้หรือชื่อโปรเจกต์ */}
      <div className="mr-auto flex items-center">
        <Link
          to="/"
          className="text-2xl font-black text-amber-500 tracking-widest hover:text-orange-500 transition-colors"
        >
          ESCANOR <span className="text-white">PROJECT</span>
        </Link>

        {/* แสดงระดับสิทธิ์ (Role Badge) ขยับตามชื่อโลโก้เดิมของหนู */}
        {user && (
          <span className="text-xs font-bold mx-5 px-3 py-1 bg-amber-500 text-black rounded-full uppercase tracking-wider shadow-[0_0_10px_rgba(245,158,11,0.5)]">
            {user.role}
          </span>
        )}
      </div>

      {/* ฝั่งขวา: เมนูลิงก์ และ ข้อมูลโปรไฟล์พร้อมปุ่ม Logout */}
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

      {/* 💡 เติมระบบต้อนรับและปุ่ม Logout คลุมด้วยสิทธิ์ล็อกอิน */}
      {user && (
        <div className="flex items-center gap-6 border-l-2 border-amber-500/30 pl-6">
          {/* แสดงชื่อผู้ใช้ที่ล็อกอินอยู่ในระบบกลาง */}
          <p className="text-base font-medium text-gray-300">
            Welcome,{" "}
            <span className="text-amber-500 font-black tracking-wide">
              {user.username}
            </span>
          </p>

          {/* ปุ่ม Logout ธีมทลายดวงตะวัน (แดง-ส้มตัดขอบเข้ากับธีมมืด) */}
          <button
            onClick={handleLogoutClick}
            className="px-4 py-2 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 
                       text-white text-sm font-black rounded-lg transition-all transform hover:scale-105 active:scale-95
                       shadow-[0_0_15px_rgba(220,38,38,0.3)] uppercase tracking-wider border border-red-500/20 cursor-pointer"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
