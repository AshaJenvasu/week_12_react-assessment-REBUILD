import { useState, useEffect } from "react";

import Header from "../components/Home/01_Header";
import NavButtons from "../components/Home/02_NavButtons";
import Display from "../components/Home/03_Display";

const Home = () => {
  const [activeSection, setActiveSection] = useState("");
  const [members, setMembers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    position: "",
  });

  const fetchData = async () => {
    try {
      const res = await fetch(
        "https://67eca027aa794fb3222e43e2.mockapi.io/members",
      );
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await res.json();
      setMembers(data);
      console.log("Data fetched successfully:", data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
      const res = await fetch(
        `https://67eca027aa794fb3222e43e2.mockapi.io/members/${id}`,
        {
          method: "DELETE",
        },
      );
      if (res.ok) {
        setMembers(members.filter((member) => member.id !== id));
        alert("Erase successfully! The pride remains.");
      }
    } catch (error) {
      console.error("Error deleting member:", error);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        "https://67eca027aa794fb3222e43e2.mockapi.io/members",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        },
      );
      if (res.ok) {
        const newMember = await res.json();
        setMembers([...members, newMember]);
        setFormData({
          name: "",
          lastname: "",
          position: "",
        });
        alert("New warrior added to the ranks!");
      }
    } catch (error) {
      console.error("Error creating member:", error);
    }
  };

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
