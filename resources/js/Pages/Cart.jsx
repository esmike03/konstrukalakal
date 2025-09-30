import { usePage, Link, useForm } from "@inertiajs/react";
import React, { useState, useEffect } from "react";
import { ShoppingCart, CheckCircle, X, ArrowLeft, MessageCircle } from "lucide-react";

export default function Cart() {
  const { cartItems, flash, auth } = usePage().props;
  const [showMessage, setShowMessage] = useState(false);
  const [activeTab, setActiveTab] = useState("sale");
  const [selectedItem, setSelectedItem] = useState(null);
  const [filter, setFilter] = useState("pending");

  // ✅ Single useForm
  const form = useForm({ material_id: null });
  const { post } = form;

  const rejectDonate = (id) => {
    if (confirm("Are you sure you want to reject this Inquiry?")) {
      post(`/donate/${id}/reject`);
    }
  };

  const cancelDonate = (id) => {
    if (confirm("Are you sure you want to cancel this Inquiry?")) {
      post(`/donate/${id}/cancel`);
    }
  };

    const handleConfirm = (id) => {
        if (confirm("Are you sure you want to confirm this Item?")) {
        post(`/order/${id}/submit`);
        }
        // form.post("/order/submit");
    };

  const acceptDonate = (id) => {
    if (confirm("Are you sure you want to accept this Inquiry?")) {
      post(`/donate/${id}/accept`);
    }
  };

  // ✅ Filtered trades from cartItems
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

  // (fix this to match your real data field)
  const filteredItems = cartItems.filter(
    (item) => item.material.category?.toLowerCase() === activeTab
  );

  const handleSelectItem = (itemId) => {
    setSelectedItem((prev) => (prev === itemId ? null : itemId));
    form.setData("material_id", itemId);
  };

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


      {/* Nav */}
      <div className="gap-2 flex">
        <Link href="/cart/donate" className="bg-green-500 px-2 py-1 rounded-md text-white">
          Donation
        </Link>
        <Link href="/my-trades" className="bg-green-500 px-2 py-1 rounded-md text-white">
          Trades
        </Link>
        <Link href="/Orders" className="bg-green-500 px-2 py-1 rounded-md text-white">
          Orders
        </Link>
      </div>
      <div className="mt-2 w-full flex justify-between">
            <h1 className="text-3xl font-bold text-center mb-6">Sale Cart</h1>
          <div>
            <label className="mr-2 font-semibold">Filter by status:</label>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border rounded-md px-3 py-1"
            >
              <option value="all">All</option>
              <option value="pending">Pending</option>
              <option value="accepted">Accepted</option>
              <option value="rejected">Rejected</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>


      {/* Filter & Trades */}
      <div className="mt-1">


        {filteredTrades.length === 0 ? (
          <p className="text-gray-500">No trades match this filter.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredTrades.map((trade) => {
              const isUser = trade.user_id === auth.user.id; // ✅ define isUser here

              return (
                <div
                  key={trade.id}
                  className="bg-white group hover:shadow-lg hover:scale-[1.02] transition-transform shadow-md rounded-lg w-fit py-2 px-6 border border-gray-200"
                >
                  {/* Status */}
                  <div className="mb-2">
                    <p
                      className={`text-sm rounded-md py-1 text-gray-50 text-center w-full
                        ${trade.status === "pending" ? "bg-amber-400" : ""}
                        ${trade.status === "accepted" ? "bg-green-500" : ""}
                        ${trade.status === "rejected" ? "bg-red-500" : ""}
                        ${trade.status === "cancelled" ? "bg-red-500" : ""}
                      `}
                    >
                      <span className="font-semibold uppercase">{trade.status}</span>
                    </p>
                  </div>

                  {/* Trader */}
                  <div className="w-full text-center text-xs mb-2">
                    {!isUser ? trade.user.name : "Owner"}
                  </div>

                  {/* Material */}
                  <div className="flex justify-center">
                    <Link href={`/materials/${trade.material.id}`} className="text-center">
                      <img
                        src={`/storage/${trade.material.image}`}
                        alt={trade.material.material_name}
                        className="w-16 h-16 object-cover rounded-md mx-auto"
                      />
                      <p className="font-bold text-sm">{trade.material.material_name}</p>
                    </Link>
                  </div>

                  {/* Actions */}
                  {isUser ? (
                    <div className="w-full py-2 gap-3 flex justify-between">
                      <button
                        disabled={trade.status === "rejected" || trade.status === "cancelled"}
                        onClick={() => cancelDonate(trade.id)}
                        className={`px-2 py-1 rounded-md text-white
                          ${
                            trade.status === "rejected" || trade.status === "cancelled"
                              ? "bg-gray-400 cursor-not-allowed"
                              : "bg-red-500 hover:bg-red-600"
                          }`}
                      >
                        Cancel
                      </button>
                        <button
                            onClick={() => handleConfirm(trade.id)}
                            className="flex items-center gap-1 bg-green-500 text-white px-2 py-1 rounded-md"
                        >
                            Confirm
                        </button>
                        <Link
                            href={`/message/${trade.material_id}`}
                            className="flex items-center gap-1 bg-blue-500 text-white px-2 py-1 rounded-md"
                        >
                            <MessageCircle className="w-4 h-4" />

                        </Link>
                    </div>
                  ) : (
                    <div className="w-full py-2 gap-3 flex justify-between">
                      <button
                        disabled={
                          trade.status === "rejected" ||
                          trade.status === "cancelled" ||
                          trade.status === "accepted"
                        }
                        onClick={() => rejectDonate(trade.id)}
                        className={`px-2 py-1 rounded-md text-white
                          ${
                            trade.status === "rejected" ||
                            trade.status === "cancelled" ||
                            trade.status === "accepted"
                              ? "bg-gray-400 cursor-not-allowed"
                              : "bg-red-500 hover:bg-red-600"
                          }`}
                      >
                        Reject
                      </button>
                      <Link
                        href={`/messagex/${trade.material_id}/${trade.user_id}`}
                        className="flex items-center gap-1 bg-blue-500 text-white px-2 py-1 rounded-md"
                      >
                        <MessageCircle className="w-4 h-4" />
                        Message
                      </Link>
                      <button
                        onClick={() => acceptDonate(trade.id)}
                        disabled={
                          trade.status === "rejected" ||
                          trade.status === "cancelled" ||
                          trade.status === "accepted"
                        }
                        className={`px-2 py-1 rounded-md text-white
                          ${
                            trade.status === "rejected" ||
                            trade.status === "cancelled" ||
                            trade.status === "accepted"
                              ? "bg-gray-400 cursor-not-allowed"
                              : "bg-green-500 hover:bg-green-600"
                          }`}
                      >
                        Accept
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
