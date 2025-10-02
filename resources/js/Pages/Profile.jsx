import { usePage, useForm } from "@inertiajs/react";
import { useState } from "react";

export default function Profile() {
  const { auth } = usePage().props;
  const [preview, setPreview] = useState(null);

  const { data, setData, post, processing, errors } = useForm({
    profile_image: null,
    name: auth.user.name,
    email: auth.user.email,
    address: auth.user.address || "",
    contact: auth.user.contact || "",
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setData("profile_image", file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleImageSubmit = (e) => {
    e.preventDefault();
    post("/profile/update-image", {
      preserveScroll: true,
      onSuccess: () => setPreview(null),
    });
  };

  const handleInfoSubmit = (e) => {
    e.preventDefault();
    post("/profile/update", { preserveScroll: true });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      {/* Header with gradient */}
      <div className="bg-gradient-to-r from-green-500 to-blue-600 h-36 sm:h-44 md:h-52 rounded-xl relative shadow-lg">
        <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
          <img
            src={
              preview ||
              (auth.user.profile_image
                ? `/storage/${auth.user.profile_image}`
                : "/images/user.png")
            }
            alt="Profile"
            className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full border-4 border-white object-cover shadow-lg"
          />
        </div>
      </div>

      {/* Profile Info Card */}
      <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 mt-20">
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-800">
          {auth.user.name}
        </h1>

        {/* Change Profile Picture */}
        <form
          onSubmit={handleImageSubmit}
          className="flex flex-col items-center mt-6 gap-3"
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            id="profile-upload"
          />
          <label
            htmlFor="profile-upload"
            className="cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg shadow-sm transition text-sm sm:text-base"
          >
            Change Profile Picture
          </label>
          {preview && (
            <button
              type="submit"
              disabled={processing}
              className="bg-blue-600 text-white px-5 sm:px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition text-sm sm:text-base"
            >
              {processing ? "Uploading..." : "Save Picture"}
            </button>
          )}
        </form>

        {/* Profile Form */}
        <form
          onSubmit={handleInfoSubmit}
          className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Name
            </label>
            <input
              type="text"
              value={data.name}
              onChange={(e) => setData("name", e.target.value)}
              className={`mt-1 w-full rounded-lg border p-3 text-sm sm:text-base shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-xs sm:text-sm">
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              value={data.email}
              onChange={(e) => setData("email", e.target.value)}
              className={`mt-1 w-full rounded-lg border p-3 text-sm sm:text-base shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs sm:text-sm">
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">
              Address
            </label>
            <input
              type="text"
              value={data.address}
              onChange={(e) => setData("address", e.target.value)}
              className={`mt-1 w-full rounded-lg border p-3 text-sm sm:text-base shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none ${
                errors.address ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.address && (
              <p className="text-red-500 text-xs sm:text-sm">
                {errors.address}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">
              Contact
            </label>
            <input
              type="text"
              value={data.contact}
              onChange={(e) => setData("contact", e.target.value)}
              className={`mt-1 w-full rounded-lg border p-3 text-sm sm:text-base shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none ${
                errors.contact ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.contact && (
              <p className="text-red-500 text-xs sm:text-sm">
                {errors.contact}
              </p>
            )}
          </div>

          {/* Save Button */}
          <div className="col-span-1 md:col-span-2 mt-4">
            <button
              type="submit"
              disabled={processing}
              className={`w-full bg-blue-600 text-white py-3 rounded-lg font-semibold shadow-md hover:bg-blue-700 transition text-sm sm:text-base ${
                processing ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {processing ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
