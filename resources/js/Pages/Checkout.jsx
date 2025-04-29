import { Link, usePage } from "@inertiajs/react";
import { ArrowLeft, CheckCircle } from "lucide-react";

export default function Checkout() {
  // Get selected items passed from controller
  const { selectedItems = [] } = usePage().props;

  // Ensure we have an array
  const items = Array.isArray(selectedItems) ? selectedItems : [];

  // Calculate total amount
  const totalAmount = items.reduce(
    (sum, item) => sum + item.material.price * item.quantity,
    0
  );

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <Link
          href="/cart"
          className="flex items-center gap-2 text-gray-700 hover:underline"
        >
          <ArrowLeft size={20} /> Back to Cart
        </Link>
        <h1 className="text-3xl font-bold text-gray-800">Checkout</h1>
      </div>

      {/* Selected Items */}
      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center border-b border-gray-300 pb-4"
          >
            <div className="flex items-center gap-4">
              <img
                src={`/storage/${item.material.image}`}
                alt={item.material.material_name}
                className="w-16 h-16 object-cover rounded-md"
              />
              <div>
                <h3 className="text-lg font-semibold">
                  {item.material.material_name}
                </h3>
                <p className="text-sm text-gray-500">
                  {item.quantity} x ₱{item.material.price}
                </p>
              </div>
            </div>

            <span className="font-semibold text-gray-800">
              ₱{item.material.price * item.quantity}
            </span>
          </div>
        ))}
      </div>

      {/* Total Amount */}
      <div className="mt-8 flex justify-between items-center text-xl font-bold text-gray-800 border-t pt-4">
        <span>Total:</span>
        <span>₱{totalAmount}</span>
      </div>

      {/* Place Order Button */}
      <div className="mt-8 text-center">
        <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-md text-lg font-semibold transition-all duration-200">
          Place Order
        </button>
      </div>
    </div>
  );
}
