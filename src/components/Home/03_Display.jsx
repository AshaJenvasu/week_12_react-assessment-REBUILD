import Table from "../Table";

const Display = ({
  activeSection,
  members,
  handleDelete,
  handleCreate,
  formData,
  setFormData,
}) => {
  return (
    <div className="w-full max-w-5xl mt-10 p-10 bg-white rounded-2xl shadow-xl border-t-8 border-orange-600">
      {!activeSection && (
        <p className="text-center text-3xl font-bold text-gray-500 italic">
          {`"Who decided that? I will decide what to show!" - Choose a section`}
        </p>
      )}
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
      {activeSection === "admin" && (
        <div className="text-center">
          <h2 className="text-4xl font-extrabold text-orange-700 mb-8">
            Admin Control Panel
          </h2>
          <div className="mb-12 p-8 bg-white rounded-xl border-4 border-amber-500 shadow-lg">
            <h3 className="text-2xl font-black mb-6 text-brown-950 uppercase italic">
              Create User Here
            </h3>
            <form onSubmit={handleCreate} className="flex gap-4 items-end">
              <div className="flex flex-col gap-2">
                <label className="font-bold text-sm">Name</label>
                <input
                  type="text"
                  placeholder="Name"
                  className="border-2 border-gray-300 p-2 rounded-lg focus:border-orange-500 outline-none"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-bold text-sm">Last Name</label>
                <input
                  type="text"
                  placeholder="Last Name"
                  className="border-2 border-gray-300 p-2 rounded-lg focus:border-orange-500 outline-none"
                  value={formData.lastname}
                  onChange={(e) =>
                    setFormData({ ...formData, lastname: e.target.value })
                  }
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-bold text-sm">Position</label>
                <input
                  type="text"
                  placeholder="Position"
                  className="border-2 border-gray-300 p-2 rounded-lg focus:border-orange-500 outline-none"
                  value={formData.position}
                  onChange={(e) =>
                    setFormData({ ...formData, position: e.target.value })
                  }
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-orange-600 text-white px-8 py-2 rounded-lg font-black hover:bg-orange-800 shadow-md transition-all transform hover:scale-105 h-[44px]"
              >
                Save
              </button>
            </form>
          </div>
          <div className="text-xl text-brown-900 bg-red-100 p-5 rounded-lg border border-red-500">
            <Table data={members} isAdmin={true} onDelete={handleDelete} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Display;
