import { useState } from "react";
import { useAuth } from "../../context/AuthContext"; // จูนคลื่นวิทยุรับสัญญาณส่วนกลาง

const RegisterForm = () => {
  const { register, authError } = useAuth(); // หยิบฟังก์ชันสมัครสมาชิกส่วนกลางมาเตรียมใช้

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    // ยิงพลังสมัครสมาชิกส่วนกลางข้ามฝั่งไปหลังบ้าน
    await register(username, email, password);

    setSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
      {authError && (
        <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm font-bold text-center">
          {authError}
        </div>
      )}

      {/* ช่องกรอก Username */}
      <div className="flex flex-col gap-1">
        <label className="font-bold text-sm text-brown-950">Username</label>
        <input
          type="text"
          placeholder="Choose your username"
          className="border-2 border-gray-300 p-2 rounded-lg focus:border-amber-500 outline-none w-full bg-white text-base font-normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>

      {/* ช่องกรอก Email */}
      <div className="flex flex-col gap-1">
        <label className="font-bold text-sm text-brown-950">Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          className="border-2 border-gray-300 p-2 rounded-lg focus:border-orange-500 outline-none w-full bg-white text-base font-normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      {/* ช่องกรอก Password */}
      <div className="flex flex-col gap-1">
        <label className="font-bold text-sm text-brown-950">Password</label>
        <input
          type="password"
          placeholder="Create your password"
          className="border-2 border-gray-300 p-2 rounded-lg focus:border-orange-500 outline-none w-full bg-white text-base font-normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="bg-amber-600 text-white w-full py-3 mt-2 rounded-lg font-black hover:bg-orange-800 shadow-lg transition-all transform hover:scale-105 uppercase tracking-wider"
      >
        {submitting ? "Creating Account..." : "Sign Up"}
      </button>
    </form>
  );
};

export default RegisterForm;
