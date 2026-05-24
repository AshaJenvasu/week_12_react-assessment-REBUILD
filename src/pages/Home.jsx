import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

import Header from "../components/Home/01_Header";
import NavButtons from "../components/Home/02_NavButtons";
import Display from "../components/Home/03_Display";

const Home = () => {
  const { user, authLoading, login } = useAuth();

  const [activeSection, setActiveSection] = useState("");
  const [members, setMembers] = useState([]);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
  });

  const fetchData = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/v2/users");
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await res.json();
      // 💡 จุดเปลี่ยนสำคัญ: เราต้องสั่งดักเข้าคีย์ .data เพื่อเอา Array ข้างในส่งให้ setMembers
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

  const handleDelete = async (id) => {
    if (
      !window.confirm(
        "Are you sure you want to erase this human from the database?",
      )
    )
      return;
    try {
      const res = await fetch(`http://localhost:3000/api/v2/users/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setMembers(members.filter((member) => member._id !== id));
        alert("Erase successfully! The pride remains.");
      }
    } catch (error) {
      console.error("Error deleting member:", error);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/api/v2/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
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
  // จะสั่งดึงข้อมูลผู้ใช้จากหลังบ้าน ก็ต่อเมื่อ "เช็กคุกกี้เสร็จแล้ว" และ "มีผู้ใช้ล็อกอินอยู่จริง" เท่านั้น
  useEffect(() => {
    if (!authLoading && user) {
      fetchData();
    }
  }, [authLoading, user]);
  // =========================================================
  // 🛡️ บล็อกที่ 1: หน้าจอ Loading Screen ดักวินาทีแรกสุด
  // =========================================================
  if (authLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#F3F4F6]">
        {/* แอนิเมชันวงกลมหมุนๆ สไตล์ Tailwind */}
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-orange-600 mb-4"></div>
        <p className="text-xl font-black text-brown-950 italic animate-pulse">
          {`"Who decided the web is ready? I am checking your session..."`}
        </p>
      </div>
    );
  }
  // =========================================================
  // 🛡️ บล็อกที่ 2: ถ้าตรวจเสร็จแล้วไม่มีคุกกี้ล็อกอินค้างอยู่ ให้โชว์หน้าล็อกอินบล็อกไว้ก่อน
  // =========================================================
  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#F3F4F6] px-6">
        <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-2xl border-t-8 border-orange-600 text-center">
          <h2 className="text-3xl font-extrabold text-brown-950 mb-2">
            ESCANOR PROJECT
          </h2>
          <p className="text-gray-500 italic mb-6">
            "Stand at the pinnacle of power. Please Login."
          </p>

          {/* เดี๋ยวเราจะมาสร้างฟอร์มกรอก Login เล็กๆ ยิงเข้าฟังก์ชัน login ตรงนี้กันในขั้นตอนถัดไปจ้ะ */}
          <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg text-sm text-orange-700">
            [ เดี๋ยวเราจะมาเสียบกล่อง Login Form ]
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center pt-24 px-10 min-h-screen min-h-screen bg-[#F3F4F6] relative overflow-hidden">
      <div className="absolute inset-0 flex justify-center items-center opacity-[0.09] pointer-events-none">
        <img
          src="https://i.pinimg.com/736x/62/5e/82/625e8280b13d400d39780172325301ad.jpg"
          alt="lion-sin"
          className="w-[600px] "
        />
      </div>

      {/* 1. Header */}
      <Header />
      {/* 2. Buttons Container  */}
      <NavButtons
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        getButtonClass={getButtonClass}
      />
      {/* 3. Section Display  */}
      <Display
        activeSection={activeSection}
        members={members}
        handleDelete={handleDelete}
        formData={formData}
        setFormData={setFormData}
        handleCreate={handleCreate}
      />
    </div>
  );
};

export default Home;
