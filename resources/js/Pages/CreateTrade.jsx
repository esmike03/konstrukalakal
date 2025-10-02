import { useForm, usePage } from "@inertiajs/react";
import { useState } from "react";

export default function CreateTrade() {
  const { props } = usePage();
  const material = props.material;

  const { data, setData, post, processing, errors } = useForm({
    item_title: "",
    item_image: null,
    trade_for: material?.id,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post("/trade/submit");
  };

  return (
    <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-lg p-6 mt-10 border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Propose a Trade</h2>

      {/* Material Preview */}
      <div className="mb-6 border rounded-lg p-3 bg-gray-50">
        <p className="text-sm text-gray-600">You're trading for:</p>
        <div className="flex items-center gap-4 mt-3">
          <img
            src={`/storage/${material.image}`}
            alt={material.material_name}
            className="w-20 h-20 object-cover rounded-md shadow"
          />
          <p className="font-semibold text-gray-800">{material.material_name}</p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Your Item Title
          </label>
          <input
            type="text"
            value={data.item_title}
            onChange={(e) => setData("item_title", e.target.value)}
            className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-700"
            placeholder="Enter your item's title"
          />
          {errors.item_title && (
            <p className="text-red-500 text-xs mt-1">{errors.item_title}</p>
          )}
        </div>

        {/* Upload Image */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Upload Image of Your Item
          </label>
          <input
            type="file"
            onChange={(e) => setData("item_image", e.target.files[0])}
            className="mt-2 w-full text-sm text-gray-600 file:mr-3 file:py-2 file:px-4
                       file:rounded-lg file:border-0
                       file:text-sm file:font-semibold
                       file:bg-green-600 file:text-white
                       hover:file:bg-green-700 cursor-pointer"
          />
          {errors.item_image && (
            <p className="text-red-500 text-xs mt-1">{errors.item_image}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={processing}
          className="w-full bg-green-600 text-white py-2.5 rounded-lg font-medium hover:bg-green-700 transition disabled:opacity-50"
        >
          {processing ? "Submitting..." : "Submit Trade Request"}
        </button>
      </form>
    </div>
  );
}
