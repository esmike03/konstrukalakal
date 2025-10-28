import { usePage, Link, useForm } from "@inertiajs/react";
import React, { useState, useEffect } from "react";
import { CheckCircle, X, MessageCircle } from "lucide-react";

export default function Cart() {
  const { cartItems, flash, auth, donateItemCount, tradeItemCount, orderItemCount, cartItemCount } = usePage().props;
  const [showMessage, setShowMessage] = useState(false);
  const [filter, setFilter] = useState("all");
  const form = useForm({ material_id: null });
  const { post } = form;
  const { url } = usePage();
  const rejectDonate = (id) => confirm("Reject this inquiry?") && post(`/donate/${id}/reject`);
  const cancelDonate = (id) => confirm("Cancel this item?") && post(`/cart/delete/${id}`);
  const handleConfirm = (id) => confirm("Confirm this item?") && post(`/order/${id}/submit`);
  const acceptDonate = (id) => confirm("Accept this inquiry?") && post(`/donate/${id}/accept`);
  const tabs = [
    { href: "/cart", label: "My Cart", count: cartItemCount },
    { href: "/cart/donate", label: "Donation", count: donateItemCount },
    { href: "/my-trades", label: "Trades", count: tradeItemCount },
    { href: "/Orders", label: "Orders", count: orderItemCount },
  ];
  const filteredTrades = cartItems.filter((trade) => filter === "all" || trade.status === filter);

  useEffect(() => {
    if (flash?.message) {
      setShowMessage(true);
      const timer = setTimeout(() => setShowMessage(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [flash]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Flash Message */}

          <aside className="md:w-64 w-full top-0  md:h-screen   md:left-0 ">
        <div className="flex md:flex-col flex-row md:space-y-4 space-x-4 md:space-x-0 p-4 justify-center md:justify-start">
      {tabs.map((tab, idx) => {
        const isActive = url.startsWith(tab.href); // 👈 Check if the current URL matches the tab

        return (
          <div key={idx} className="relative">
            <span className="absolute -top-2 -right-2 z-50 bg-red-600 text-xs text-white rounded-full px-2 py-0.5 shadow-md">
              {tab.count}
            </span>
            <Link
              href={tab.href}
              className={`block text-center text-xs font-semibold px-4 py-2 rounded-lg border shadow-md backdrop-blur-md transition
                ${
                  isActive
                    ? "bg-green-600 text-white border-green-700 shadow-lg" // 🔵 Highlighted (active)
                    : "bg-white/70 hover:bg-white/90 text-gray-800 border-gray-200"
                }`}
            >
              {tab.label}
            </Link>
          </div>
        );
      })}
    </div>
    </aside>
<main className="flex-1  w-full  p-6">
    {flash?.message && (
      <div
        className={`fixed bottom-4 right-4 px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 text-white backdrop-blur-lg
          ${/(added|success|updated|deleted)/i.test(flash.message)
            ? "bg-green-500/80"
            : "bg-red-500/80"}
          transition-all duration-500 ${showMessage ? "opacity-100" : "opacity-0"}`}
      >
        {/(added|success|updated|deleted)/i.test(flash.message) ? (
          <CheckCircle size={18} />
        ) : (
          <X size={18} />
        )}
        <span className="text-sm">{flash.message}</span>
      </div>
    )}

      {/* Header */}



      {/* Nav Badges */}



      {/* Trades */}
      <div className="w-full  max-w-6xl">
        {filteredTrades.length === 0 ? (
          <p className="text-gray-500 text-center text-lg">No items found.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTrades.map((trade) => {
              const isUser = trade.user_id === auth.user.id;

              return (
                <div
                  key={trade.id}
                  className="relative h-50 rounded-2xl overflow-hidden shadow-lg group transition-transform hover:scale-[1.02] cursor-pointer"
                >
                  {/* Background Image */}
                  <img
                    src={`/storage/${trade.material.image}`}
                    alt={trade.material.material_name}
                    className="absolute inset-0 w-full h-full object-cover transition duration-300 group-hover:scale-105"
                  />

                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  {/* Status Badge */}
                  <span
                    className={`absolute top-4 left-4 text-xs font-semibold px-3 py-1 rounded-xl shadow-md ${
                      trade.status === "pending"
                        ? "bg-amber-500 text-white"
                        : trade.status === "accepted"
                        ? "bg-green-500 text-white"
                        : "bg-red-500 text-white"
                    }`}
                  >
                    {trade.status.toUpperCase()}
                  </span>

                  {/* Bottom Info Section */}
                  <div className="absolute bottom-0 left-0 right-0 flex justify-between items-end p-4 text-white">
                    <div>
                      <Link href={`/materials/${trade.material.id}`}>
                      <h2 className="text-lg font-bold drop-shadow-md">
                        {trade.material.material_name}
                      </h2>
                      </Link>
                      <p className="text-xs opacity-90">
                        {!isUser ? trade.user.name : ""}
                        <span className="text-green-500 font-bold">P{(trade.material.price * trade.quantity)}</span>  <span className="font-bold">[ {trade.quantity} ]</span>
                      </p>
                    </div>

                    {/* Buttons Area */}
                    <div className="flex gap-2">
                      {isUser ? (
                        <>
                          <button
                            onClick={() => cancelDonate(trade.id)}
                            disabled={["rejected", "cancelled"].includes(trade.status)}
                            className={`p-2 rounded-full text-sm font-medium shadow-md transition ${
                              ["rejected", "cancelled"].includes(trade.status)
                                ? "bg-gray-500/40 cursor-not-allowed"
                                : "bg-red-500 hover:bg-red-600"
                            }`}
                            title="Cancel"
                          >
                            <X size={16} />
                          </button>
                          <button
                            onClick={() => handleConfirm(trade.id)}
                            className="p-2 rounded-full bg-green-500 hover:bg-green-600 shadow-md transition"
                            title="Confirm"
                          >
                            <CheckCircle size={16} />
                          </button>
                          <Link
                            href={`/message/${trade.material_id}`}
                            className="p-2 rounded-full bg-blue-500 hover:bg-blue-600 shadow-md transition"
                            title="Chat"
                          >
                            <MessageCircle size={16} />
                          </Link>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => rejectDonate(trade.id)}
                            disabled={["rejected", "cancelled", "accepted"].includes(trade.status)}
                            className={`p-2 rounded-full text-sm font-medium shadow-md transition ${
                              ["rejected", "cancelled", "accepted"].includes(trade.status)
                                ? "bg-gray-500/40 cursor-not-allowed"
                                : "bg-red-500 hover:bg-red-600"
                            }`}
                            title="Reject"
                          >
                            <X size={16} />
                          </button>
                          <Link
                            href={`/messagex/${trade.material_id}/${trade.user_id}`}
                            className="p-2 rounded-full bg-blue-500 hover:bg-blue-600 shadow-md transition"
                            title="Chat"
                          >
                            <MessageCircle size={16} />
                          </Link>
                          <button
                            onClick={() => acceptDonate(trade.id)}
                            disabled={["rejected", "cancelled", "accepted"].includes(trade.status)}
                            className={`p-2 rounded-full text-sm font-medium shadow-md transition ${
                              ["rejected", "cancelled", "accepted"].includes(trade.status)
                                ? "bg-gray-500/40 cursor-not-allowed"
                                : "bg-green-500 hover:bg-green-600"
                            }`}
                            title="Accept"
                          >
                            <CheckCircle size={16} />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      </main>
    </div>
  );
}
