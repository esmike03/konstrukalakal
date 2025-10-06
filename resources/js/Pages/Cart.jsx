import { usePage, Link, useForm } from "@inertiajs/react";
import React, { useState, useEffect } from "react";
import { CheckCircle, X, MessageCircle } from "lucide-react";

export default function Cart() {
  const { cartItems, flash, auth } = usePage().props;
  const [showMessage, setShowMessage] = useState(false);
  const [filter, setFilter] = useState("pending");
  const { donateItemCount, tradeItemCount, orderItemCount } = usePage().props;
  const form = useForm({ material_id: null });
  const { post } = form;

  const rejectDonate = (id) => {
    if (confirm("Are you sure you want to reject this Inquiry?")) {
      post(`/donate/${id}/reject`);
    }
  };

  const cancelDonate = (id) => {
    if (confirm("Are you sure you want to cancel this Item?")) {
      post(`/cart/delete/${id}`);
    }
  };

  const handleConfirm = (id) => {
    if (confirm("Are you sure you want to confirm this Item?")) {
      post(`/order/${id}/submit`);
    }
  };

  const acceptDonate = (id) => {
    if (confirm("Are you sure you want to accept this Inquiry?")) {
      post(`/donate/${id}/accept`);
    }
  };

  const filteredTrades = cartItems.filter(
    (trade) => filter === "all" || trade.status === filter
  );

  useEffect(() => {
    if (flash?.message) {
      setShowMessage(true);
      const timer = setTimeout(() => setShowMessage(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [flash]);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center py-10 px-4">
      {/* Flash Message */}
      {flash?.message && (
        <div
          className={`fixed bottom-6 right-6 backdrop-blur-md bg-white/70 border border-gray-200 text-gray-800 shadow-xl rounded-xl px-4 py-3 flex items-center gap-2 transition-all duration-300 ${
            showMessage ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          {flash.message.toLowerCase().includes("added") ? (
            <CheckCircle className="text-green-600" size={20} />
          ) : (
            <X className="text-red-600" size={20} />
          )}
          {flash.message}
        </div>
      )}

      {/* Header */}
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8"> Sale Cart</h1>

      {/* Nav Badges */}
      <div className="flex gap-4 mb-6">
        {[
          { href: "/cart/donate", label: "Donation", count: donateItemCount },
          { href: "/my-trades", label: "Trades", count: tradeItemCount },
          { href: "/Orders", label: "Orders", count: orderItemCount },
        ].map((tab, idx) => (
          <div key={idx} className="relative">
            <span className="absolute -top-2 -right-2 z-50 bg-red-600 text-xs text-white rounded-full px-2 py-0.5 shadow-md">
              {tab.count}
            </span>
            <Link
              href={tab.href}
              className="backdrop-blur-md bg-white/70 hover:bg-white/90 transition px-4 py-2 rounded-lg text-gray-800 font-semibold shadow-md border border-gray-200"
            >
              {tab.label}
            </Link>
          </div>
        ))}
      </div>

      {/* Trades */}
      <div className="w-full max-w-6xl">
        {filteredTrades.length === 0 ? (
          <p className="text-gray-500 text-center text-lg">
            No items match this filter.
          </p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTrades.map((trade) => {
              const isUser = trade.user_id === auth.user.id;

              return (
                <div
                  key={trade.id}
                  className="backdrop-blur-md bg-white/70 border border-gray-200 p-6 rounded-2xl shadow-md hover:shadow-lg hover:scale-[1.02] transition-transform"
                >
                  {/* Status */}
                  <div className="mb-3">
                    <p
                      className={`text-sm font-semibold px-3 py-1 rounded-full text-center w-fit mx-auto ${
                        trade.status === "pending"
                          ? "bg-amber-400 text-white"
                          : trade.status === "accepted"
                          ? "bg-green-500 text-white"
                          : "bg-red-500 text-white"
                      }`}
                    >
                      {trade.status.toUpperCase()}
                    </p>
                  </div>

                  {/* User */}
                  <p className="text-center text-gray-700 text-xs mb-2">
                    {!isUser ? trade.user.name : "Owner"}
                  </p>

                  {/* Material */}
                  <div className="flex flex-col items-center mb-4">
                    <img
                      src={`/storage/${trade.material.image}`}
                      alt={trade.material.material_name}
                      className="w-20 h-20 object-cover rounded-lg shadow"
                    />
                    <p className="mt-2 text-gray-900 font-bold">
                      {trade.material.material_name}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex justify-between gap-2">
                    {isUser ? (
                      <>
                        <button
                          disabled={trade.status === "rejected" || trade.status === "cancelled"}
                          onClick={() => cancelDonate(trade.id)}
                          className={`px-3 py-1 rounded-lg font-medium shadow-md ${
                            trade.status === "rejected" || trade.status === "cancelled"
                              ? "bg-gray-300 cursor-not-allowed text-gray-600"
                              : "bg-red-500 hover:bg-red-600 text-white"
                          }`}
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleConfirm(trade.id)}
                          className="px-3 py-1 rounded-lg bg-green-500 hover:bg-green-600 text-white font-medium shadow-md"
                        >
                          Confirm
                        </button>
                        <Link
                          href={`/message/${trade.material_id}`}
                          className="px-3 py-1 rounded-lg bg-blue-500 hover:bg-blue-600 text-white flex items-center gap-1 font-medium shadow-md"
                        >
                          <MessageCircle className="w-4 h-4" /> Chat
                        </Link>
                      </>
                    ) : (
                      <>
                        <button
                          disabled={
                            trade.status === "rejected" ||
                            trade.status === "cancelled" ||
                            trade.status === "accepted"
                          }
                          onClick={() => rejectDonate(trade.id)}
                          className={`px-3 py-1 rounded-lg font-medium shadow-md ${
                            trade.status === "rejected" ||
                            trade.status === "cancelled" ||
                            trade.status === "accepted"
                              ? "bg-gray-300 cursor-not-allowed text-gray-600"
                              : "bg-red-500 hover:bg-red-600 text-white"
                          }`}
                        >
                          Reject
                        </button>
                        <Link
                          href={`/messagex/${trade.material_id}/${trade.user_id}`}
                          className="px-3 py-1 rounded-lg bg-blue-500 hover:bg-blue-600 text-white flex items-center gap-1 font-medium shadow-md"
                        >
                          <MessageCircle className="w-4 h-4" /> Chat
                        </Link>
                        <button
                          onClick={() => acceptDonate(trade.id)}
                          disabled={
                            trade.status === "rejected" ||
                            trade.status === "cancelled" ||
                            trade.status === "accepted"
                          }
                          className={`px-3 py-1 rounded-lg font-medium shadow-md ${
                            trade.status === "rejected" ||
                            trade.status === "cancelled" ||
                            trade.status === "accepted"
                              ? "bg-gray-300 cursor-not-allowed text-gray-600"
                              : "bg-green-500 hover:bg-green-600 text-white"
                          }`}
                        >
                          Accept
                        </button>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
