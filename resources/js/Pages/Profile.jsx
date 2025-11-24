import { usePage, useForm } from "@inertiajs/react";
import { useState } from "react";
import { CheckCircle, Search, Grid, List, Upload, Filter, Trash2, ShoppingCart, Pen, CheckCircle2Icon } from "lucide-react";

export default function Profile() {
  const { auth } = usePage().props;
  const [preview, setPreview] = useState(null);
  const [open, setOpen] = useState(false);

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
      <div className="bg-gradient-to-r from-green-500 to-blue-600 h-36 sm:h-44 md:h-22 rounded-xl relative shadow-lg">
        <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
          <img
            src={
              preview ||
              (auth.user.profile_image
                ? `/storage/${auth.user.profile_image}`
                : "/images/user.png")
            }
            alt="Profile"
            className="w-24 h-24 sm:w-28 sm:h-28 md:w-22 md:h-22 rounded-full border-4 border-white object-cover shadow-lg"
          />
        </div>
      </div>

      {/* Profile Info Card */}
      <div className="bg-white rounded-xl shadow-lg py-6 px-2 sm:p-8 mt-10">
        <div className="flex justify-center  w-full align-center">
          <h1 className="text-xl sm:text-xl font-bold text-center text-gray-800">
            {auth.user.name}
          </h1>
          <form onSubmit={handleImageSubmit}>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              id="profile-upload"
            />

            {/* Pen Button (opens file picker) */}
            <button
              type="button"
              onClick={() => document.getElementById("profile-upload").click()}

            >
              <Pen className="w-4 text-gray-600 mt-1 ml-2" />
            </button>

            {/* Save button appears ONLY after selecting an image */}
            {preview && (
              <button
                type="submit"
                disabled={processing}
                className=" font-bold text-green-600  transition ml-3"
              >
                {processing ? (
                  <span className="text-xs px- font-bold">...</span>
                ) : (
                  <CheckCircle2Icon className="w-6 text-green-600 " />
                )}
              </button>
            )}

          </form>

        </div>


        {/* Change Profile Picture */}


        {/* Profile Form */}
        {/* Collapsible Section */}
        <div className="mt-5 border border-gray-300 rounded-xl shadow-sm">
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="w-full flex justify-between items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-t-xl transition"
          >
            <span className="font-semibold text-gray-800 text-sm">
              Profile Details
            </span>

            <svg
              className={`w-4 h-4 transform transition ${open ? "rotate-180" : "rotate-0"
                }`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Collapsible Content */}
          <div
            className={`overflow-hidden transition-all duration-300 ${open ? "max-h-[2000px] p-4" : "max-h-0 p-0"
              }`}
          >
            <form
              onSubmit={handleInfoSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Name
                </label>
                <input
                  type="text"
                  value={data.name}
                  onChange={(e) => setData("name", e.target.value)}
                  className={`mt-1 w-full rounded-lg border p-3 shadow-sm focus:ring-2 focus:ring-blue-400 ${errors.name ? "border-red-500" : "border-gray-300"
                    }`}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs">{errors.name}</p>
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
                  className={`mt-1 w-full rounded-lg border p-3 shadow-sm focus:ring-2 focus:ring-blue-400 ${errors.email ? "border-red-500" : "border-gray-300"
                    }`}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs">{errors.email}</p>
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
                  className={`mt-1 w-full rounded-lg border p-3 shadow-sm focus:ring-2 focus:ring-blue-400 ${errors.address ? "border-red-500" : "border-gray-300"
                    }`}
                />
                {errors.address && (
                  <p className="text-red-500 text-xs">{errors.address}</p>
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
                  className={`mt-1 w-full rounded-lg border p-3 shadow-sm focus:ring-2 focus:ring-blue-400 ${errors.contact ? "border-red-500" : "border-gray-300"
                    }`}
                />
                {errors.contact && (
                  <p className="text-red-500 text-xs">{errors.contact}</p>
                )}
              </div>

              {/* Save Button */}
              <div className="col-span-1 md:col-span-2 mt-4">
                <button
                  type="submit"
                  disabled={processing}
                  className={`w-full bg-blue-600 text-white py-3 rounded-lg font-semibold shadow-md hover:bg-blue-700 transition ${processing ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                >
                  {processing ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}
