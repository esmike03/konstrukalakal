import { usePage, Link, useForm } from "@inertiajs/react";
import { useState, useEffect } from "react";
import { ShoppingCart, CheckCircle, X } from "lucide-react";

export default function Cart() {
  const { cartItems, flash } = usePage().props;
  const [showMessage, setShowMessage] = useState(false);
  const [activeTab, setActiveTab] = useState("sale");
  const [selectedItem, setSelectedItem] = useState(null);
  const { post } = useForm();

  const handleConfirm = () => {
    if (!selectedItem) return;

    post("/order/submit", {
      material_id: selectedItem,

    });
  };

  useEffect(() => {
    if (flash?.message) {
      setShowMessage(true);
      const timer = setTimeout(() => setShowMessage(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [flash]);



  const filteredItems = cartItems.filter(
    (item) => item.material.forbdt.toLowerCase() === activeTab
  );

    const handleSelectItem = (itemId) => {
    setSelectedItem((prev) => (prev === itemId ? null : itemId));
    };

  // build a query string like "items[]=3&items[]=7&items[]=12"
  const checkoutQuery = selectedItem ? `?items[]=${selectedItem}` : "";

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Flash */}
      {flash?.message && (
        <div
          className={`${
            flash.message.toLowerCase().includes("added")
              ? "bg-green-400 border-green-600"
              : "bg-red-400 border-red-600"
          } shadow-lg absolute bottom-4 right-4 flex items-center gap-2 text-white p-3 rounded-md transition-transform ${
            showMessage ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
          }`}
        >
          {flash.message.toLowerCase().includes("added") ? (
            <CheckCircle size={20} />
          ) : (
            <X size={20} />
          )}
          {flash.message}
        </div>
      )}

      {/* Header */}
      <h1 className="text-3xl font-bold text-center mb-6">Cart</h1>
      <div className="gap-2 flex">
        <Link href="/cart/donate" className="bg-green-500 px-2 rounded-md text-white cursor-pointer">
            Donation
        </Link>
        <Link href="/my-trades" className="bg-green-500 px-2 rounded-md text-white cursor-pointer">
            Trades
        </Link>


      </div>
      {/* Tabs */}
      <div className="flex justify-center space-x-4 mb-6">
        {["sale"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-md ${
              activeTab === tab ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Items */}
      {filteredItems.length ? (
        <ul className="space-y-4">
          {filteredItems.map((item) => (
            <li
              key={item.id}
              className="flex justify-between items-center border-b pb-4"
            >
              <div className="flex items-center gap-4">
                <input
                type="checkbox"
                checked={selectedItem === item.id}
                onChange={() => handleSelectItem(item.id)}
                className="w-5 h-5"
                />

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
                    {item.quantity} x{" "}
                    {(item.material.forbdt !== "Trade" && item.material.forbdt !== "Donation") ? (
                      `₱${item.material.price}`
                    ) : (
                      ""
                    )}
                  </p>

                </div>
              </div>
              <div className="flex items-center gap-2">
              {(item.material.forbdt !== "Trade" && item.material.forbdt !== "Donation") && (
                <span className="font-semibold text-gray-800">
                  ₱{item.quantity * item.material.price}
                </span>
               )}

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
        <p className="text-center text-gray-500">Your cart is empty.</p>
      )}

      {/* Proceed to Checkout (with query string) */}
        {selectedItem && (
        <div className="mt-8 text-center">
            <button
            onClick={handleConfirm}
            className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-md text-lg font-semibold transition"
            >
            <ShoppingCart size={20} />
            Confirm
            </button>
        </div>
        )}

    </div>
  );
}
