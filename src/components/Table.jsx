import { useState } from "react";
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";

const EMPTY_FORM = { username: "", email: "", role: "user" };

// ─── Sub-components ───────────────────────────────────────────────

const RoleBadge = ({ role }) => (
  <span className="text-xs font-black px-2 py-0.5 bg-orange-100 text-orange-700 rounded-full uppercase">
    {role || "user"}
  </span>
);

const EditRow = ({ formData, onChange, onSave, onCancel }) => (
  <>
    <td className="p-4">
      <input
        type="text"
        className="border-2 border-amber-500 rounded-lg px-2 py-1 w-full font-bold focus:outline-none focus:ring-2 focus:ring-orange-500 text-black bg-white"
        value={formData.username}
        onChange={(e) => onChange("username", e.target.value)}
      />
    </td>
    <td className="p-4">
      <input
        type="email"
        className="border-2 border-amber-500 rounded-lg px-2 py-1 w-full font-bold focus:outline-none focus:ring-2 focus:ring-orange-500 text-black bg-white"
        value={formData.email}
        onChange={(e) => onChange("email", e.target.value)}
      />
    </td>
    <td className="p-4">
      <select
        className="border-2 border-amber-500 rounded-lg px-2 py-1 font-bold focus:outline-none focus:ring-2 focus:ring-orange-500 text-black bg-white"
        value={formData.role}
        onChange={(e) => onChange("role", e.target.value)}
      >
        <option value="user">user</option>
        <option value="admin">admin</option>
      </select>
    </td>
    <td className="p-4 flex gap-2 justify-center items-center">
      <button
        onClick={onSave}
        className="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white font-black text-xs uppercase tracking-wider rounded-lg transition-all active:scale-95 shadow"
      >
        Save
      </button>
      <button
        onClick={onCancel}
        className="px-3 py-1.5 bg-gray-500 hover:bg-gray-600 text-white font-black text-xs uppercase tracking-wider rounded-lg transition-all active:scale-95 shadow"
      >
        Cancel
      </button>
    </td>
  </>
);

const ViewRow = ({ member, isAdmin, onEdit, onDelete }) => (
  <>
    <td className="p-4 font-bold text-gray-800">{member.username || "—"}</td>
    <td className="p-4 font-semibold text-gray-600">{member.email || "—"}</td>
    <td className="p-4">
      <RoleBadge role={member.role} />
    </td>
    {isAdmin && (
      <td className="p-4 flex gap-2 justify-center items-center">
        <button
          onClick={onEdit}
          className="px-4 py-1.5 bg-amber-500 hover:bg-amber-600 text-black font-black text-xs uppercase tracking-wider rounded-lg shadow-md transition-all transform active:scale-95 border border-amber-600/30"
        >
          Edit
        </button>
        <button
          onClick={onDelete}
          className="px-4 py-1.5 bg-red-600 hover:bg-red-700 text-white font-black text-xs uppercase tracking-wider rounded-lg shadow-md transition-all transform active:scale-95"
        >
          Delete
        </button>
      </td>
    )}
  </>
);

// ─── Main Component ────────────────────────────────────────────────

const Table = ({ data, isAdmin, setMembers, onDelete }) => {
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState(EMPTY_FORM);

  const handleEditClick = (member) => {
    setEditingId(member._id);
    setEditFormData({
      username: member.username || "",
      email: member.email || "",
      role: member.role || "user",
    });
  };

  const handleFieldChange = (field, value) => {
    setEditFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async (id) => {
    try {
      const res = await fetch(`${API_BASE}/api/v2/users${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editFormData),
      });

      if (!res.ok) {
        console.error("Update failed:", res.status);
        return;
      }

      setMembers((prev) =>
        prev.map((m) => (m._id === id ? { ...m, ...editFormData } : m)),
      );
      setEditingId(null);
    } catch (err) {
      console.error("Error updating user:", err);
    }
  };

  const handleCancel = () => setEditingId(null);

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-left border-collapse bg-white text-sm text-black">
        <thead>
          <tr className="bg-amber-500 text-brown-950 font-black uppercase border-b-4 border-amber-600">
            <th className="p-4">Username</th>
            <th className="p-4">Email</th>
            <th className="p-4">Role</th>
            {isAdmin && <th className="p-4 text-center">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {data?.map((member) => {
            if (!member?._id) return null;

            const isEditing = editingId === member._id;

            return (
              <tr
                key={member._id}
                className="border-b border-gray-200 hover:bg-amber-50/30 transition-colors"
              >
                {isEditing ? (
                  <EditRow
                    formData={editFormData}
                    onChange={handleFieldChange}
                    onSave={() => handleSave(member._id)}
                    onCancel={handleCancel}
                  />
                ) : (
                  <ViewRow
                    member={member}
                    isAdmin={isAdmin}
                    onEdit={() => handleEditClick(member)}
                    onDelete={() => onDelete?.(member._id)}
                  />
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
