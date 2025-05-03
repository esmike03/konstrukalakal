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
    post('/trade/submit');
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow-md mt-10">
      <h2 className="text-xl font-semibold mb-4">Propose a Trade</h2>

      <div className="mb-4">
        <p className="text-sm text-gray-600">You're trading for:</p>
        <div className="flex items-center gap-4 mt-2">
          <img src={`/storage/${material.image}`} alt={material.material_name} className="w-20 h-20 object-cover rounded" />
          <p className="font-semibold">{material.material_name}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Your Item Title</label>
          <input
            type="text"
            value={data.item_title}
            onChange={(e) => setData("item_title", e.target.value)}
            className="mt-1 p-2 border rounded w-full"
          />
          {errors.item_title && <p className="text-red-500 text-xs">{errors.item_title}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium">Upload Image of Your Item</label>
          <input
            type="file"
            onChange={(e) => setData("item_image", e.target.files[0])}
            className="mt-1"
          />
          {errors.item_image && <p className="text-red-500 text-xs">{errors.item_image}</p>}
        </div>

        <button
          type="submit"
          disabled={processing}
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
        >
          Submit Trade Request
        </button>
      </form>
    </div>
  );
}
