import { createContext, useContext, useEffect, useState } from "react";

// 1. 💡 สร้างสถานีกระจายสัญญาณส่วนกลาง (Context)
const AuthContext = createContext(null);

const apiBase = import.meta.env.VITE_API_URL || "http://localhost:3000";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // เก็บข้อมูลผู้ใช้ที่ล็อกอินอยู่
  const [authLoading, setAuthLoading] = useState(true); // ล็อกหน้าจอตอนเปิดเว็บเพื่อเช็กคุกกี้
  const [authError, setAuthError] = useState(null); // เก็บข้อผิดพลาดในการล็อกอิน

  // 2. 💡 ฟังก์ชันเช็กเซสชัน (ดึงข้อมูลผู้ใช้จากคุกกี้)
  const checkSession = async () => {
    try {
      setAuthLoading(true);
      // 🌟 แก้ไข: เปลี่ยนมาใช้ apiBase เพื่อให้สลับพอร์ตตาม .env ได้อย่างปลอดภัย ไม่เกิด URL ซ้อนกัน
      const res = await fetch(`${apiBase}/api/v2/users/auth/me`, {
        method: "GET",
        credentials: "include", // 🔑 แนบคุกกี้ล็อกอินข้ามฝั่ง
      });

      if (res.ok) {
        const data = await res.json();
        // 💡 รองรับทั้งโครงสร้างข้อมูลของฝั่งพี่นิติ (data.user) และแบบเผื่อเลือกอื่นๆ ค่ะ
        setUser(data.user || data.data || data);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Error checking session:", error);
      setUser(null);
    } finally {
      setAuthLoading(false);
    }
  };

  // 3. 💡 ตรวจสอบเซสชันทันทีทุกครั้งที่หน้าเว็บถูกเปิดขึ้นมา
  useEffect(() => {
    checkSession();
  }, []);

  // 4. 💡 ฟังก์ชันกดยิงล็อกอิน (Login)
  const login = async (email, password) => {
    try {
      setAuthError(null);

      // 🌟 แก้ไข: เปลี่ยนมาใช้ apiBase เพื่อเชื่อมต่อพอร์ตที่ถูกต้อง
      const res = await fetch(`${apiBase}/api/v2/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include", // 🔑 สั่งให้รับคุกกี้มาเก็บลงบราวเซอร์
      });

      const data = await res.json();

      if (res.ok) {
        setUser(data.user || data.data || data); // ล็อกอินสำเร็จ! จำค่าลง State
        return { success: true };
      } else {
        setAuthError(
          data.message || "Incorrect email or password. Please try again.",
        );
        return { success: false, message: data.message };
      }
    } catch (error) {
      setAuthError(error.message || "Invalid credentials");
      return { success: false, message: "Server error" };
    }
  };

  // 5. 💡 ฟังก์ชันกดออกจากระบบ (Logout)
  const logout = async () => {
    try {
      // 🌟 แก้ไข: เปลี่ยนมาใช้ apiBase เพื่อยิงไปทำลายคุกกี้ให้ถูกพอร์ต
      const res = await fetch(`${apiBase}/api/v2/users/auth/logout`, {
        method: "POST",
        credentials: "include",
      });

      if (res.ok) {
        setUser(null); // ล้างข้อมูลผู้ใช้จาก State
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  // 5.55 💡 ฟังก์ชันสมัครสมาชิก
  const register = async (username, email, password) => {
    try {
      setAuthError(null);

      // 🌟 แก้ไข: ลบส่วนเกิน /api/v2 ออก เพราะตัวแปร apiBase มันมีคำนี้รวมอยู่แล้วจ้า!
      const res = await fetch(`${apiBase}/api/v2/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        // สมัครเสร็จปุ๊บ สั่งเรียกฟังก์ชัน login ต่อให้เลยทันที
        return await login(email, password);
      } else {
        setAuthError(data.message || "Registration failed");
        return { success: false, message: data.message };
      }
    } catch (error) {
      setAuthError("Server error during registration");
      return { success: false, message: "Server error" };
    }
  };

  // 6. 💡 ส่งสัญญาณค่า State และฟังก์ชันทั้งหมดออกไปให้ทุก Component หยิบไปใช้
  return (
    <AuthContext.Provider
      value={{
        user,
        authLoading,
        authError,
        login,
        logout,
        checkSession,
        register,
        apiBase, // 🌟 ส่งค่า apiBase ออกไปด้วย เพื่อให้หน้าสืบค้น AI หยิบไปใช้ต่อได้ง่ายๆ จ้า
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// 7. 💡 ทำ Custom Hook สำหรับเรียกใช้ง่ายๆ ผ่านคำสั่ง useAuth()
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
