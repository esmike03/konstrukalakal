import { usePage } from "@inertiajs/react";

export default function Profile() {
  const { auth } = usePage().props;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Profile Header */}
      <div className="flex flex-col items-center mb-4">
      <h1 className="text-3xl font-bold text-gray-800">Profile</h1>
        <img
          src={
            auth.user.profile_image
              ? `/storage/${auth.user.profile_image}`
              : "/images/default_profile.png"
          }
          alt="Profile"
          className="w-28 h-28 mt-2 rounded-full object-cover shadow-md"
        />
        <div>
            <p className="text-gray-800 font-bold text-2xl mt-4">{auth.user.name}</p>
        </div>
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
                {new Date(auth.user.created_at).toLocaleTimeString()}
            </p>
          </div>
          {/* Add more fields here if needed */}
        </div>
      </div>
    </div>
  );
}
