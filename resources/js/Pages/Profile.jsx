import { usePage, useForm } from "@inertiajs/react";
import { useState } from "react";

export default function Profile() {
  const { auth } = usePage().props;
  const [preview, setPreview] = useState(null);

  // Inertia form handling
  const { data, setData, post, processing, errors } = useForm({
    profile_image: null,
    name:    auth.user.name,
    email:   auth.user.email,
    address: auth.user.address || "",
    contact: auth.user.contact || "",
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

  function handleSubmit2(e) {
    e.preventDefault();
    post('/profile/update', {
      preserveScroll: true,
    });
  }

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
        <p className="text-gray-800 text-center font-bold text-2xl">{auth.user.name}</p>
      </div>

      {/* Profile Details Card */}
      <div className="bg-white shadow rounded-lg p-6">
      <form onSubmit={handleSubmit2} className="bg-white shadow rounded-lg p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-1 font-medium">Name</label>
            <input
              type="text"
              value={data.name}
              onChange={e => setData('name', e.target.value)}
              className={`w-full border rounded p-2 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              value={data.email}
              onChange={e => setData('email', e.target.value)}
              className={`w-full border rounded p-2 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block mb-1 font-medium">Address</label>
            <input
              type="text"
              value={data.address}
              onChange={e => setData('address', e.target.value)}
              className={`w-full border rounded p-2 ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.address && <p className="text-red-600 text-sm mt-1">{errors.address}</p>}
          </div>

          <div>
            <label className="block mb-1 font-medium">Contact</label>
            <input
              type="text"
              value={data.contact}
              onChange={e => setData('contact', e.target.value)}
              className={`w-full border rounded p-2 ${errors.contact ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.contact && <p className="text-red-600 text-sm mt-1">{errors.contact}</p>}
          </div>
        </div>

        <div className="text-center">
          <button
            type="submit"
            disabled={processing}
            className={`bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition ${processing ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {processing ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
    </div>
  );
}
