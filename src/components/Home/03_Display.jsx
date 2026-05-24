import { useAuth } from "../../context/AuthContext";

import Table from "../Table";

const Display = ({
  activeSection,
  members,
  handleDelete,
  handleCreate,
  formData,
  setFormData,
}) => {
  const { user } = useAuth();
  return (
    <div className="w-full max-w-5xl mt-10 p-10 bg-white rounded-2xl shadow-xl border-t-8 border-orange-600">
      {!activeSection && (
        <p className="text-center text-3xl font-bold text-gray-500 italic">
          {`"Who decided that? I will decide what to show!" - Choose a section`}
        </p>
      )}
      {/* 👤 โหมด User Database */}
      {activeSection === "user" && (
        <div className="text-center">
          <h2 className="text-4xl font-extrabold text-black mb-8">
            User Database
          </h2>
          <div className="text-xl text-brown-900 bg-amber-100 p-5 rounded-lg border border-yellow-500">
            <Table data={members} isAdmin={false} />
          </div>
        </div>
      )}
      {/* 🛠️ โหมด Admin Control Panel */}
      {activeSection === "admin" && user.role === "admin" && (
        <div className="text-center w-full">
          <h2 className="text-4xl font-extrabold text-orange-700 mb-8">
            Admin Control Panel
          </h2>

          {/* กล่องแบบฟอร์มสำหรับการสร้าง User */}
          <div className="mb-12 p-8 bg-white rounded-xl border-4 border-amber-500 shadow-lg max-w-full">
            <h3 className="text-2xl font-black mb-6 text-brown-950 uppercase italic">
              Create User Here
            </h3>

            {/* 💡 เปลี่ยนมาใช้ grid layout เพื่อให้ทุกกล่องแบ่งช่องเท่ากันอย่างสมบูรณ์แบบ ไม่เยื้องหลุดจอ */}
            <form
              onSubmit={handleCreate}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end text-left"
            >
              {/* ช่องกรอก 1: Username */}
              <div className="flex flex-col gap-2">
                <label className="font-bold text-sm text-brown-950">
                  Username
                </label>
                <input
                  type="text"
                  placeholder="Username"
                  className="border-2 border-gray-300 p-2 rounded-lg focus:border-orange-500 outline-none w-full bg-white text-base font-normal"
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                  required
                />
              </div>

              {/* ช่องกรอก 2: Email */}
              <div className="flex flex-col gap-2">
                <label className="font-bold text-sm text-brown-950">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Email Address" // 💡 แก้ไขตัวบอกใบ้คำให้อ่านง่ายตรงตัวแล้วจ้ะ
                  className="border-2 border-gray-300 p-2 rounded-lg focus:border-orange-500 outline-none w-full bg-white text-base font-normal"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                />
              </div>

              {/* ช่องกรอก 3: Password */}
              <div className="flex flex-col gap-2">
                <label className="font-bold text-sm text-brown-950">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Password"
                  className="border-2 border-gray-300 p-2 rounded-lg focus:border-orange-500 outline-none w-full bg-white text-base font-normal"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  required
                />
              </div>

              {/* ช่องกรอก 4: Role */}
              <div className="flex flex-col gap-2">
                <label className="font-bold text-sm text-brown-950">Role</label>
                <select
                  className="border-2 border-gray-300 p-2 rounded-lg focus:border-orange-500 outline-none w-full bg-white h-[44px] text-base font-normal"
                  value={formData.role}
                  onChange={(e) =>
                    setFormData({ ...formData, role: e.target.value })
                  }
                  required
                >
                  <option value="">Select...</option>
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              {/* ปุ่มกดส่งฟอร์ม */}
              <button
                type="submit"
                className="bg-orange-600 text-white w-full py-2 rounded-lg font-black hover:bg-orange-800 shadow-md transition-all transform hover:scale-105 h-[44px] text-center uppercase"
              >
                Save
              </button>
            </form>
          </div>

          {/* 💡 ส่วนกล่องครอบตารางแอดมิน: ถอด text-xl ออกเพื่อไม่ให้ตัวหนังสือดันตารางจนล้นกรอบ */}
          <div className="text-base text-brown-900 bg-red-100 p-5 rounded-lg border border-red-500 w-full overflow-hidden">
            <Table data={members} isAdmin={true} onDelete={handleDelete} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Display;
