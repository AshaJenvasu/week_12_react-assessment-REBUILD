import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

import Header from "../components/Home/01_Header";
import NavButtons from "../components/Home/02_NavButtons";
import Display from "../components/Home/03_Display";
import LoginForm from "../components/Home/04_LoginForm";
import RegisterForm from "../components/Home/05_RegisterForm";

// 🌟 1. รวมศูนย์จุดจอดพอร์ตไว้ตรงนี้ (อยู่บน Vercel จะใช้ .env ทันทีจ้ะ)
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";

const Home = () => {
  const { user, authLoading } = useAuth();
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [activeSection, setActiveSection] = useState("");
  const [members, setMembers] = useState([]);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
  });

  // 🌟 2. แก้ไขการดึงข้อมูลรายชื่อผู้ใช้ทั้งหมด (GET)
  const fetchData = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/v2/users`, {
        method: "GET",
        credentials: "include", // 🔑 ส่งคุกกี้ล็อกอินข้ามไปขอดึงข้อมูล
      });
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await res.json();
      setMembers(data.data);
      console.log("Data fetched successfully:", data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getButtonClass = (section) => {
    const baseClass =
      "px-10 py-4 rounded-full shadow-2xl font-black text-lg transition-all duration-300 ease-in-out transform hover:scale-110 border-2";
    if (activeSection === section) {
      return `${baseClass} bg-amber-400 text-brown-950 border-red-700 ring-4 ring-orange-400 scale-105 shadow-orange-500/50`;
    }
    return `${baseClass} bg-white text-black border-black hover:border-orange-600`;
  };

  // 🌟 3. แก้ไขการลบข้อมูลผู้ใช้ (DELETE)
  const handleDelete = async (id) => {
    if (
      !window.confirm(
        "Are you sure you want to erase this human from the database?",
      )
    )
      return;
    try {
      const res = await fetch(`${API_BASE}/api/v2/users/${id}`, {
        method: "DELETE",
        credentials: "include", // 🔑 แนบคุกกี้ล็อกอินเพื่อยืนยันสิทธิ์ในการลบ
      });
      if (res.ok) {
        setMembers(members.filter((member) => member._id !== id));
        alert("Erase successfully! The pride remains.");
      }
    } catch (error) {
      console.error("Error deleting member:", error);
    }
  };

  // 🌟 4. แก้ไขการสร้างข้อมูลผู้ใช้ใหม่ (POST)
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE}/api/v2/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include", // 🔑 เผื่อหลังบ้านเช็กสิทธิ์แอดมินก่อนสร้างผู้ใช้จ้ะ
      });
      if (res.ok) {
        const newMember = await res.json();
        setMembers([...members, newMember.data]);
        setFormData({
          username: "",
          email: "",
          password: "",
          role: "",
        });
        alert("New warrior added to the ranks!");
      }
    } catch (error) {
      console.error("Error creating member:", error);
    }
  };

  useEffect(() => {
    if (!authLoading && user) {
      fetchData();
    }
  }, [authLoading, user]);

  if (authLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#F3F4F6]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-amber-600 mb-4"></div>
        <p className="text-xl font-black text-brown-950 italic animate-pulse">
          {`"Who decided the web is ready? I am checking your session..."`}
        </p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#F3F4F6] px-6">
        <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-2xl border-t-8 border-amber-500 text-center">
          <h2 className="text-3xl font-extrabold text-brown-950 mb-2">
            ESCANOR PROJECT
          </h2>
          <p className="text-gray-500 italic mb-6">
            {isLoginMode
              ? `"Stand at the pinnacle of power. Please Login."`
              : `"Join the ranks of the mighty. Please Sign Up."`}
          </p>

          {isLoginMode ? <LoginForm /> : <RegisterForm />}

          <div className="mt-6 text-sm text-gray-600">
            {isLoginMode ? (
              <p>
                Don't have an account?{" "}
                <button
                  onClick={() => setIsLoginMode(false)}
                  className="text-orange-600 font-bold hover:underline"
                >
                  Sign Up
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{" "}
                <button
                  onClick={() => setIsLoginMode(true)}
                  className="text-orange-600 font-bold hover:underline"
                >
                  Log In
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center pt-24 px-10 min-h-screen bg-[#F3F4F6] relative overflow-hidden">
      <div className="absolute inset-0 flex justify-center items-center opacity-[0.09] pointer-events-none">
        <img
          src="https://i.pinimg.com/736x/62/5e/82/625e8280b13d400d39780172325301ad.jpg"
          alt="lion-sin"
          className="w-[600px] "
        />
      </div>

      <Header />
      <NavButtons
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        getButtonClass={getButtonClass}
      />
      <Display
        activeSection={activeSection}
        members={members}
        setMembers={setMembers}
        handleDelete={handleDelete}
        formData={formData}
        setFormData={setFormData}
        handleCreate={handleCreate}
      />
    </div>
  );
};

export default Home;
