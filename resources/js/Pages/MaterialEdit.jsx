import { useForm, Link, usePage } from "@inertiajs/react";
import { useState, useEffect } from "react";
import { ArrowLeft, CheckCircle, X } from "lucide-react";

export default function EditMaterial({ material, user }) {
  const { flash } = usePage().props;
  const [showMessage, setShowMessage] = useState(false);

  // initialize the form with your material’s current values
  const { data, setData, put, processing, errors } = useForm({
    material_name: material.material_name,
    category: material.category,
    condition: material.condition,
    price: material.price,
    description: material.description,
    forbdt: material.forbdt,
    quantity: material.quantity,
  });

  // flash message - show & auto-hide
  useEffect(() => {
    if (flash?.message) {
      setShowMessage(true);
      const t = setTimeout(() => setShowMessage(false), 3000);
      return () => clearTimeout(t);
    }
  }, [flash]);

  function handleSubmit(e) {
    e.preventDefault();
    put(
      // assuming your update route is /materials/{id}
      `/materials-update/${material.id}`,
      {
        onSuccess: () => {
          // you could redirect or just let the flash show
        },
      }
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10 relative">
      {/* Flash */}
      {flash?.message && (
        <div
          className={`absolute top-4 right-4 flex items-center gap-2 px-4 py-2 rounded-md text-white shadow-lg transform transition ${
            flash.message.toLowerCase().includes("success")
              ? "bg-green-500"
              : "bg-red-500"
          } ${showMessage ? "opacity-100" : "opacity-0 -translate-y-4"}`}
        >
          {flash.message.toLowerCase().includes("success") ? (
            <CheckCircle size={20} />
          ) : (
            <X size={20} />
          )}
          <span>{flash.message}</span>
        </div>
      )}

      {/* Back Link */}
      <Link href="/materials">
        <button className="flex items-center text-gray-600 hover:text-gray-800 mb-4">
          <ArrowLeft size={20} /> <span className="ml-1">Back to List</span>
        </button>
      </Link>

      <h2 className="text-2xl font-bold mb-6">Edit Material</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block font-medium mb-1">Name</label>
          <input
            type="text"
            value={data.material_name}
            onChange={e => setData("material_name", e.target.value)}
            className={`w-full border rounded p-2 ${
              errors.material_name ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.material_name && (
            <p className="text-red-600 text-sm mt-1">{errors.material_name}</p>
          )}
        </div>

        {/* For */}
        <div>
          <label className="block font-medium mb-1">For</label>
          <select
            value={data.forbdt}
            onChange={e => setData("forbdt", e.target.value)}
            className={`w-full border rounded p-2 ${
              errors.forbdt ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="Sale">Sale</option>
            <option value="Trade">Trade</option>
            <option value="Donation">Donation</option>
          </select>
          {errors.forbdt && (
            <p className="text-red-600 text-sm mt-1">{errors.forbdt}</p>
          )}
        </div>

        {/* Category & Condition */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">Category</label>
            <input
              type="text"
              value={data.category}
              onChange={e => setData("category", e.target.value)}
              className={`w-full border rounded p-2 ${
                errors.category ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.category && (
              <p className="text-red-600 text-sm mt-1">{errors.category}</p>
            )}
          </div>
          <div>
            <label className="block font-medium mb-1">Condition</label>
            <input
              type="text"
              value={data.condition}
              onChange={e => setData("condition", e.target.value)}
              className={`w-full border rounded p-2 ${
                errors.condition ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.condition && (
              <p className="text-red-600 text-sm mt-1">{errors.condition}</p>
            )}
          </div>
        </div>

        {/* Price & Quantity */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">Price</label>
            <input
              type="number"
              value={data.price}
              onChange={e => setData("price", e.target.value)}
              className={`w-full border rounded p-2 ${
                errors.price ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.price && (
              <p className="text-red-600 text-sm mt-1">{errors.price}</p>
            )}
          </div>
          <div>
            <label className="block font-medium mb-1">Quantity</label>
            <input
              type="number"
              value={data.quantity}
              onChange={e => setData("quantity", e.target.value)}
              className={`w-full border rounded p-2 ${
                errors.quantity ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.quantity && (
              <p className="text-red-600 text-sm mt-1">{errors.quantity}</p>
            )}
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium mb-1">Description</label>
          <textarea
            rows={4}
            value={data.description}
            onChange={e => setData("description", e.target.value)}
            className={`w-full border rounded p-2 ${
              errors.description ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.description && (
            <p className="text-red-600 text-sm mt-1">{errors.description}</p>
          )}
        </div>

        {/* Save */}
        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={processing}
            className={`flex items-center gap-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition ${
              processing ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <CheckCircle size={18} />{" "}
            {processing ? "Saving..." : "Save Changes"}
          </button>
          <Link
            href="/materials"
            className="text-gray-600 hover:underline"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
