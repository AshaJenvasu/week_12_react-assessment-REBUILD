const Table = ({ data, isAdmin, onDelete }) => {
  return (
    <div className="overflow-x-auto rounded-xl border-4 border-orange-600 shadow-2xl bg-white">
      <table className="table-auto w-full text-left border-collapse">
        {/* Table Header  */}
        <thead>
          <tr className="bg-amber-400 text-brown-950 uppercase text-sm leading-normal">
            <th className="py-4 px-6 border-b-2 border-orange-700">Username</th>
            <th className="py-4 px-6 border-b-2 border-orange-700">Email</th>
            <th className="py-4 px-6 border-b-2 border-orange-700">Role</th>
            {/* ถ้าเป็น Admin ให้โชว์หัวข้อ Action */}
            {isAdmin && (
              <th className="py-4 px-6 border-b-2 border-orange-700 text-center">
                Action
              </th>
            )}
          </tr>
        </thead>

        {/* Table Body */}
        <tbody className="text-brown-900 text-md font-bold">
          {data.length > 0 ? (
            data.map((member) => (
              <tr
                key={member._id}
                className="border-b border-orange-200 hover:bg-orange-50 transition-colors"
              >
                <td className="py-4 px-6">{member.username}</td>
                <td className="py-4 px-6">{member.email}</td>
                <td className="py-4 px-6">{member.role}</td>

                {/* ถ้าเป็น Admin ให้โชว์ปุ่ม Delete */}
                {isAdmin && (
                  <td className="py-4 px-6 text-center">
                    <button
                      onClick={() => onDelete(member._id)}
                      className="bg-red-600 text-white px-4 py-2 rounded-lg font-black hover:bg-red-800 hover:shadow-lg hover:shadow-red-500/50 transition-all transform hover:scale-110"
                    >
                      DELETE
                    </button>
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={isAdmin ? 4 : 3}
                className="py-10 text-center text-gray-500 italic"
              >
                {`"Who decided there is no data? I am waiting..."`}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
