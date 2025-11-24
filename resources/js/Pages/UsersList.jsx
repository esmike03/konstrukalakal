import { Link, usePage, router } from "@inertiajs/react";
import { Trash2 } from "lucide-react";

export default function UserList() {
  const { props } = usePage();
  const { users, flash } = props;

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this user?")) {
      router.delete(`/admin/usersx/${id}`);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">User Management</h1>

      {flash?.success && (
        <div className="bg-green-100 text-green-800 text-sm p-2 rounded mb-4">
          {flash.success}
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full border-collapse">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="px-4 py-2 text-sm font-medium text-gray-600">Profile</th>
              <th className="px-4 py-2 text-sm font-medium text-gray-600">Name</th>
              <th className="px-4 py-2 text-sm font-medium text-gray-600">Email</th>
              <th className="px-4 py-2 text-sm font-medium text-gray-600">Phone</th>
              <th className="px-4 py-2 text-sm font-medium text-gray-600">Address</th>
              <th className="px-4 py-2 text-sm font-medium text-gray-600">Joined</th>
              <th className="px-4 py-2 text-sm font-medium text-gray-600 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.data.length > 0 ? (
              users.data.map((user) => (
                <tr key={user.id} className="border-b hover:bg-gray-50 transition">
                  {/* Profile Image */}
                  <td className="px-4 py-2">
                                        <img
                    src={`/storage/${user.profile_image}`}
                    alt={user.name}
                    className="w-10 h-10 rounded-full object-cover border"
                    />

                  </td>

                  {/* User Info */}
                  <td className="px-4 py-2 text-sm font-semibold text-gray-800">
                  <Link href={`/profile-view/${user.id}`}>
                    {user.name}
                    </Link>
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-600">{user.email}</td>
                  <td className="px-4 py-2 text-sm text-gray-600">{user.contact}</td>
                  <td className="px-4 py-2 text-sm text-gray-600">{user.address}</td>
                  <td className="px-4 py-2 text-sm text-gray-500">
                    {new Date(user.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 text-right">
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="text-red-600 hover:text-red-800 transition"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center text-gray-500 py-6">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 gap-2">
        {users.links.map((link, index) => (
          <button
            key={index}
            disabled={!link.url}
            onClick={() => router.visit(link.url)}
            className={`px-3 py-1 text-sm rounded ${
              link.active
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <span dangerouslySetInnerHTML={{ __html: link.label }} />
          </button>
        ))}
      </div>
    </div>
  );
}
