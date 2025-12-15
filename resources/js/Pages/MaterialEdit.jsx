import { useForm, Link, usePage } from "@inertiajs/react";
import { useState, useEffect } from "react";
import { ArrowLeft, CheckCircle, X } from "lucide-react";

export default function EditMaterial({ material }) {
  const { flash } = usePage().props;
  const [showMessage, setShowMessage] = useState(false);

  const { data, setData, post, processing, errors } = useForm({
    material_name: material.material_name,
    category: material.category,
    condition: material.condition,
    price: material.price,
    description: material.description,
    forbdt: material.forbdt,
    quantity: material.quantity,
    images: null,
  });

  useEffect(() => {
    if (flash?.message) {
      setShowMessage(true);
      const t = setTimeout(() => setShowMessage(false), 3000);
      return () => clearTimeout(t);
    }
  }, [flash]);

function handleSubmit(e) {
    e.preventDefault();

    // Use post method and spoof the PUT method in the payload
    post(`/materials-update/${material.id}`, {
      ...data,
      _method: 'PUT' // <--- This is the key change to ensure the request is treated as POST, carrying PUT
    }, {
      forceFormData: true,
      preserveScroll: true,
    });
  }

  const [previewImages, setPreviewImages] = useState(
  material.image ? JSON.parse(material.image) : []
);

function handleImageChange(e) {
  const files = Array.from(e.target.files);
  setData("images", files);

  // preview
  const previews = files.map((file) => URL.createObjectURL(file));
  setPreviewImages(previews);
}


  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Flash Message */}
      {flash?.message && (
        <div
          className={`fixed top-6 right-6 flex items-center gap-2 px-4 py-2 rounded-md text-white shadow-lg transition-all duration-300 ${
            flash.message.toLowerCase().includes("success")
              ? "bg-green-500"
              : "bg-red-500"
          } ${showMessage ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
        >
          {flash.message.toLowerCase().includes("success") ? (
            <CheckCircle size={20} />
          ) : (
            <X size={20} />
          )}
          <span className="text-sm font-medium">{flash.message}</span>
        </div>
      )}

      {/* Back Link */}
      <Link
        href="/materials"
        className="flex items-center text-gray-600 hover:text-gray-800 mb-6 transition"
      >
        <ArrowLeft size={20} />
        <span className="ml-2 text-sm font-medium">Back to List</span>
      </Link>

      {/* Card */}
      <div className="bg-white shadow-md rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Edit Material
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
        {/* Images */}
<div>
  <label className="block font-medium text-sm text-gray-700 mb-2">
    Images
  </label>

  {/* Preview */}
  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
    {previewImages.map((img, i) => (
      <img
        key={i}
        src={img.startsWith("blob") ? img : `/storage/${img}`}
        className="w-full h-32 object-cover rounded-lg border"
      />
    ))}
  </div>

  {/* Upload */}
  <input
    type="file"
    multiple
    name="images[]"
    accept="image/*"
    onChange={handleImageChange}
    className="block w-full text-sm text-gray-700"
  />

  <p className="text-xs text-gray-500 mt-1">
    Uploading images will replace existing ones
  </p>

  {errors.images && (
    <p className="text-red-600 text-xs mt-1">{errors.images}</p>
  )}
</div>

          {/* Name */}
          <div>
            <label className="block font-medium text-sm text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              value={data.material_name}
              onChange={(e) => setData("material_name", e.target.value)}
              className={`w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none ${
                errors.material_name ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.material_name && (
              <p className="text-red-600 text-xs mt-1">{errors.material_name}</p>
            )}
          </div>

          {/* For */}
          <div>
            <label className="block font-medium text-sm text-gray-700 mb-1">
              For
            </label>
            <select
              value={data.forbdt}
              onChange={(e) => setData("forbdt", e.target.value)}
              className={`w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none ${
                errors.forbdt ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="Sale">Sale</option>
              <option value="Trade">Trade</option>
              <option value="Donation">Donation</option>
            </select>
            {errors.forbdt && (
              <p className="text-red-600 text-xs mt-1">{errors.forbdt}</p>
            )}
          </div>

          {/* Category & Condition */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-sm text-gray-700 mb-1">
                Category
              </label>
              <input
                type="text"
                value={data.category}
                onChange={(e) => setData("category", e.target.value)}
                className={`w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none ${
                  errors.category ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.category && (
                <p className="text-red-600 text-xs mt-1">{errors.category}</p>
              )}
            </div>
            <div>
              <label className="block font-medium text-sm text-gray-700 mb-1">
                Condition
              </label>
              <input
                type="text"
                value={data.condition}
                onChange={(e) => setData("condition", e.target.value)}
                className={`w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none ${
                  errors.condition ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.condition && (
                <p className="text-red-600 text-xs mt-1">{errors.condition}</p>
              )}
            </div>
          </div>

          {/* Price & Quantity */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.forbdt === "Sale" && (
            <div>
              <label className="block font-medium text-sm text-gray-700 mb-1">
                Price
              </label>
              <input
                type="number"
                value={data.price}
                onChange={(e) => setData("price", e.target.value)}
                className={`w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none ${
                  errors.price ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.price && (
                <p className="text-red-600 text-xs mt-1">{errors.price}</p>
              )}
            </div>
          )}
            <div>
              <label className="block font-medium text-sm text-gray-700 mb-1">
                Quantity
              </label>
              <input
                type="number"
                value={data.quantity}
                onChange={(e) => setData("quantity", e.target.value)}
                className={`w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none ${
                  errors.quantity ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.quantity && (
                <p className="text-red-600 text-xs mt-1">{errors.quantity}</p>
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block font-medium text-sm text-gray-700 mb-1">
              Description
            </label>
            <textarea
              rows={4}
              value={data.description}
              onChange={(e) => setData("description", e.target.value)}
              className={`w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none ${
                errors.description ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.description && (
              <p className="text-red-600 text-xs mt-1">{errors.description}</p>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <button
              type="submit"
              disabled={processing}
              className={`flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700 transition text-sm font-medium ${
                processing ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <CheckCircle size={18} />
              {processing ? "Saving..." : "Save Changes"}
            </button>
            <Link
              href="/materials"
              className="text-sm font-medium text-gray-600 hover:text-gray-800 transition"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
