import { usePage, Link } from "@inertiajs/react";
import { useState, useEffect } from "react";
import { ArrowLeft, ShoppingCart, CheckCircle, X } from "lucide-react";

export default function Cart() {
  const { cartItems } = usePage().props;
  const [showMessage, setShowMessage] = useState(false);
  const { flash } = usePage().props;

  const [activeTab, setActiveTab] = useState("sale"); // Default tab is 'sale'

  useEffect(() => {
    if (flash?.message) {
      setShowMessage(true); // Show the message
      const timer = setTimeout(() => {
        setShowMessage(false); // Hide after 3 seconds
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [flash]);

  // Function to filter cart items by the `forbdt` field (sale, trade, donate)
  const filteredItems = cartItems.filter((item) => item.material.forbdt.toLowerCase() === activeTab);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Flash Message */}
      {flash?.message && (
        <div
          className={`${
            flash.message.toLowerCase().includes("added")
              ? "bg-green-400 border border-green-600"
              : "bg-red-400 border border-red-600"
          } shadow-lg bottom-4 flex items-center gap-2 w-fit right-4 absolute text-white p-3 rounded-md z-100 mb-4 transition-all duration-500 transform ${
            showMessage ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5"
          }`}
        >
          {flash.message.toLowerCase().includes("added") ? (
            <CheckCircle size={20} className="text-white" />
          ) : (
            <X size={20} className="text-white" />
          )}
          {flash.message}
        </div>
      )}

      {/* Profile Header */}
      <div className="flex flex-col items-center mb-4">
        <h1 className="text-3xl font-bold text-gray-800">Cart</h1>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveTab("sale")}
          className={`px-4 py-2 rounded-md ${
            activeTab === "sale" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Sale
        </button>
        <button
          onClick={() => setActiveTab("trade")}
          className={`px-4 py-2 rounded-md ${
            activeTab === "trade" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Trade
        </button>
        <button
          onClick={() => setActiveTab("donate")}
          className={`px-4 py-2 rounded-md ${
            activeTab === "donate" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Donate
        </button>
      </div>

      {/* Cart Items */}
      {filteredItems.length > 0 ? (
        <ul className="space-y-4">
          {filteredItems.map((item) => (
            <li key={item.id} className="flex justify-between items-center border-b border-gray-400 pb-4">
              <div className="flex items-center gap-4">
                {/* Material Image */}
                <img
                  src={`/storage/${item.material.image}`} // Path to the image
                  alt={item.material.material_name}
                  className="w-16 h-16 object-cover rounded-md"
                />

                <div>
                  <h3 className="text-lg font-semibold">{item.material.material_name}</h3>
                  <p className="text-sm text-gray-500">{item.quantity} x ₱{item.material.price}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-800">₱{item.quantity * item.material.price}</span>
                <Link href={`/cart/delete/${item.id}`}>
                  <button className="bg-red-500 text-white px-3 py-1 rounded-md">
                    Remove
                  </button>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 text-center">Your cart is empty.</p>
      )}
    </div>
  );
}
