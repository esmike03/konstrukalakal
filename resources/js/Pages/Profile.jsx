import { usePage, useForm } from "@inertiajs/react";
import { useState } from "react";

export default function Profile() {
  const { auth } = usePage().props;
  const [preview, setPreview] = useState(null);

  // Inertia form handling
  const { data, setData, post, processing, errors } = useForm({
    profile_image: null,
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setData("profile_image", file);
      setPreview(URL.createObjectURL(file)); // Show preview
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    post("/profile/update-image", {
      preserveScroll: true,
      onSuccess: () => setPreview(null), // Reset preview after success
    });
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Profile Header */}
      <div className="flex flex-col items-center mb-4">
        <h1 className="text-3xl font-bold text-gray-800">Profile</h1>
        <img
          src={preview || (auth.user.profile_image ? `/storage/${auth.user.profile_image}` : "/images/user.png")}
          alt="Profile"
          className="w-28 h-28 mt-2 rounded-full object-cover shadow-md"
        />

        {/* Profile Picture Upload */}
        <form onSubmit={handleSubmit} className="mt-4 flex flex-col items-center gap-2">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            id="profile-upload"
          />
          <label
            htmlFor="profile-upload"
            className="cursor-pointer bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1 rounded-md"
          >
            Change Profile Picture
          </label>
          {preview && (
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600 transition"
              disabled={processing}
            >
              {processing ? "Uploading..." : "Save"}
            </button>
          )}
        </form>

        {/* Display name */}
        <p className="text-gray-800 font-bold text-2xl mt-4">{auth.user.name}</p>
      </div>

      {/* Profile Details Card */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-gray-700 font-semibold">Email:</p>
            <p className="text-gray-500">{auth.user.email}</p>
          </div>
          <div>
            <p className="text-gray-700 font-semibold">Address:</p>
            <p className="text-gray-500">{auth.user.address}</p>
          </div>
          <div>
            <p className="text-gray-700 font-semibold">Contact:</p>
            <p className="text-gray-500">{auth.user.contact}</p>
          </div>
          <div>
            <p className="text-gray-700 font-semibold">Joined:</p>
            <p className="text-gray-500">
              {new Date(auth.user.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
