import { createContext, useContext, useEffect, useState } from "react";

// 1. 💡 สร้างสถานีกระจายสัญญาณส่วนกลาง (Context)
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // เก็บข้อมูลผู้ใช้ที่ล็อกอินอยู่ (ถ้าเป็น null แปลว่ายังไม่ได้ล็อกอิน)
  const [authLoading, setAuthLoading] = useState(true); // ใช้ล็อกหน้าจอตอนที่ระบบกำลังรีบเช็กคุกกี้ตอนเปิดเว็บครั้งแรก
  const [authError, setAuthError] = useState(null); // ใช้เก็บข้อผิดพลาดในการล็อกอิน

  // 2. 💡 ฟังก์ชันเช็กเซสชัน (ดึงข้อมูลผู้ใช้จากคุกกี้ที่ค้างอยู่)
  const checkSession = async () => {
    try {
      setAuthLoading(true);
      // ยิงไปที่ Route  (GET /auth/me)
      const res = await fetch("http://localhost:3000/api/v2/auth/me", {
        method: "GET",
        credentials: "include",
        // 🔑 ตรงนี้สำคัญมาก! สั่งให้ fetch ยอมแนบคุกกี้ล็อกอินข้ามฝั่งไปด้วย
      });

      if (res.ok) {
        const data = await res.json();
        setUser(data.data); // 💡 สมมติหลังบ้านส่ง { success: true, data: userObject } ให้เซ็ตข้อมูลลง State user
      } else {
        setUser(null);
        // ถ้าไม่มีโทเค็นหรือโทเค็นหมดอายุ ให้คนนั้นเป็นสถานะไม่ได้ล็อกอิน
      }
    } catch (error) {
      console.error("Error checking session:", error);
      setUser(null);
    } finally {
      setAuthLoading(false); // เช็กเสร็จแล้ว ปลดล็อกหน้าจอโหลด
    }
  };

  // 3. 💡 สั่งให้ตรวจสอบเซสชันทันทีทุกครั้งที่หน้าเว็บถูกเปิดขึ้นมา (สเต็ปแรกสุดของเว็บ)
  useEffect(() => {
    checkSession();
  }, []);

  // 4. 💡 ฟังก์ชันกดยิงล็อกอิน (Login)
  const login = async (email, password) => {
    try {
      setAuthError(null); // ยิงไปที่ Route (POST /login)

      const res = await fetch("http://localhost:3000/api/v2/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          body: JSON.stringify({ email, password }),
          credentials: "include", // 🔑 สั่งให้รับคุกกี้ accessToken ที่หลังบ้านพ่นกลับมาเก็บลงบราวเซอร์
        },
      });

      const data = await res.json();

      if (res.ok) {
        setUser(data.data); // ล็อกอินสำเร็จ! จำค่าผู้ใช้ลง State ส่วนกลาง
        return { success: true };
      } else {
        setAuthError(data.message || "Invalid credentials");
        return { success: false, message: data.message };
      }
    } catch (error) {
      setAuthError("Server error. Please try again later.");
      return { success: false, message: "Server error" };
    }
  };

  // 5. 💡 ฟังก์ชันกดออกจากระบบ (Logout)
  const logout = async () => {
    try {
      // ยิงไปที่ Route (POST /auth/logout)
      const res = await fetch("http://localhost:3000/api/v2/auth/logout", {
        method: "POST",
        credentials: "include", // สั่งให้ส่งคุกกี้ไปเพื่ออ้างอิงและทำลายทิ้งที่หลังบ้าน
      });

      if (res.ok) {
        setUser(null); // ออกจากระบบสําเร็จ! ล้างข้อมูลผู้ใช้จาก State ส่วนกลาง
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  // 6. 💡 ส่งสัญญาณค่า State และฟังก์ชันทั้งหมดออกไปนอกบ้าน ให้ทุก Component หยิบไปใช้ได้
  return (
    <AuthContext.Prodvider
      value={{ user, authLoading, authError, login, logout, checkSession }}
    >
      {children}
    </AuthContext.Prodvider>
  );
}
// 7. 💡 ทำ Custom Hook สำหรับส่งออกไปให้ไฟล์อื่นเรียกใช้ง่ายๆ ผ่านคำสั่ง useAuth()

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
