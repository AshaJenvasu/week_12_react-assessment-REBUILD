import { useState } from "react";
// 💡 ดึงสมาร์ทโฟนรับสัญญาณ useAuth เข้ามาเพื่อเอาฟังก์ชันล็อกอินส่วนกลางมาใช้
import { useAuth } from "../../context/AuthContext";

const LoginForm = () => {
  // 💡 แกะกล่องหยิบฟังก์ชัน login และตัวแสดงผล Error มาเตรียมไว้
  const { login, authError } = useAuth();

  // สร้าง State ท้องถิ่นเอาไว้จำค่าที่กำลังกรอกในช่องอีเมลและรหัสผ่าน
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault(); // ป้องกันไม่ให้หน้าเว็บรีเฟรชตัวเอง
    setSubmitting(true);

    // 💡 ยิงฟังก์ชันล็อกอินของส่วนกลาง ส่งค่าไปทลายกำแพงหลังบ้าน!
    await login(email, password);

    setSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
      {/* ⚠️ แสดงข้อความแจ้งเตือนสีแดงทันที ถ้าหลังบ้านบอกว่ารหัสผ่านหรืออีเมลผิด */}
      {authError && (
        <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm font-bold text-center animate-shake">
          {authError}
        </div>
      )}

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
          placeholder="Enter your password"
          className="border-2 border-gray-300 p-2 rounded-lg focus:border-orange-500 outline-none w-full bg-white text-base font-normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      {/* ปุ่มกดส่งแรงล็อกอิน */}
      <button
        type="submit"
        disabled={submitting}
        className="bg-amber-500 text-white w-full py-3 mt-2 rounded-lg font-black hover:bg-orange-800 shadow-lg transition-all transform hover:scale-105 uppercase tracking-wider"
      >
        {submitting ? "Verifying Power..." : "Login"}
      </button>
    </form>
  );
};

export default LoginForm;
