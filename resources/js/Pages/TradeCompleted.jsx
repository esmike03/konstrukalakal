import React, { useState, useEffect } from "react";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { MessageCircle, CheckCircle, X } from "lucide-react";

export default function TradeCart({ trades, isUser }) {
  const { post } = useForm();
  const { flash, auth, cartItemCount, donateItemCount, tradeItemCount, orderItemCount, url } = usePage().props;
  const [showMessage, setShowMessage] = useState(false);
  const [filter, setFilter] = useState("completed");

  const tabs = [
    { href: "/cart", label: "Buy Cart", count: cartItemCount },
    { href: "/cart/donate", label: "Donation Cart", count: donateItemCount },
    { href: "/my-trades", label: "Trades Cart", count: tradeItemCount },
    { href: "/Orders", label: "My Orders", count: orderItemCount },
  ];

  useEffect(() => {
    if (flash?.message) {
      setShowMessage(true);
      const timer = setTimeout(() => setShowMessage(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [flash]);

  const rejectDonate = (id) => confirm("Reject this inquiry?") && post(`/donate/${id}/reject`);
  const cancelDonate = (id) => confirm("Cancel this inquiry?") && post(`/donate/${id}/cancel`);
  const acceptDonate = (id) => confirm("Accept this inquiry?") && post(`/donate/${id}/accept`);

  const filteredTrades = trades.filter(
    (trade) => filter === "all" || trade.status.toLowerCase() === filter
  );

  // Group trades by seller
  const groupedBySeller = filteredTrades.reduce((acc, trade) => {
    const ownerId = trade.owner.id;
    if (!acc[ownerId]) acc[ownerId] = { owner: trade.owner, items: [] };
    acc[ownerId].items.push(trade);
    return acc;
  }, {});

    const updateQuantity = (id, newQty) => {
    console.log("Updating:", id, newQty);
    if (newQty < 1) return;
    post(`/cart/update-donate/${id}/${newQty}`, {
      quantity: newQty,
    }, {
      preserveScroll: true,
    });

  };
  return (
    <>
      <Head title="Donation Cart" />
      <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
        {/* Sidebar */}
        <aside className="md:w-64 w-full md:h-screen">
          <div className="flex md:flex-col flex-row md:space-y-4 space-x-4 md:space-x-0 p-4 justify-center md:justify-start">
            {tabs.map((tab, idx) => {
              const isActive = url === tab.href;
              return (
                <div key={idx} className="relative">
                  <span className="absolute -top-2 -right-2 z-50 bg-red-600 text-xs text-white rounded-full px-2 py-0.5 shadow-md">
                    {tab.count}
                  </span>
                  <Link
                    href={tab.href}
                    className={`block text-center text-xs font-semibold px-4 py-2 rounded-lg border shadow-md backdrop-blur-md transition ${tab.href === "/my-trades"
                        ? "bg-green-600 text-white border-green-700 shadow-lg" // Donation Cart always green
                        : isActive
                          ? "bg-green-600 text-white border-green-700 shadow-lg" // active tab green
                          : "bg-white/70 hover:bg-white/90 text-gray-800 border-gray-200" // other tabs normal
                      }`}
                  >
                    {tab.label}
                  </Link>

                </div>
              );
            })}
          </div>
        </aside>

        <main className="flex-1 w-full p-6">
          {/* Flash Message */}
          {flash?.message && (
            <div
              className={`fixed bottom-4 right-4 px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 text-white backdrop-blur-lg ${/(added|success|updated|deleted)/i.test(flash.message)
                  ? "bg-green-500/80"
                  : "bg-red-500/80"
                } transition-all duration-500 ${showMessage ? "opacity-100" : "opacity-0"}`}
            >
              {/(added|success|updated|deleted)/i.test(flash.message) ? <CheckCircle size={18} /> : <X size={18} />}
              <span className="text-sm">{flash.message}</span>
            </div>
          )}

          {/* Filter Buttons */}
          <div className="mb-6 w-full flex justify-end items-center">
            <div className="flex items-center space-x-6 text-sm font-semibold text-gray-700">
             <Link
                                href="/my-trades"
                                className={`transition-colors duration-200 ${
                                  url === "/OrdersCompleted"
                                    ? "text-green-600 border-b-2 border-green-600"
                                    : "text-gray-700 hover:text-green-600"
                                }`}
                              >
                               Pending
                              </Link>

                              <Link
                                href="/my-trades"
                                className={`transition-colors duration-200 ${
                                  url === "/OrdersRejected"
                                    ? "text-green-600 border-b-2 border-green-600"
                                    : "text-gray-700 hover:text-green-600"
                                }`}
                              >
                                Accepted
                              </Link>
              {[ "Completed"].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilter(status.toLowerCase())}
                  className={`transition-colors duration-200 ${filter === status.toLowerCase()
                      ? "text-green-600 border-b-2 border-green-600"
                      : "text-gray-700 hover:text-green-600"
                    }`}
                >
                  {status}
                </button>
              ))}


                              <Link
                                href="/tradeRejected"
                                className={`transition-colors duration-200 ${
                                  url === "/OrdersRejected"
                                    ? "text-green-600 border-b-2 border-green-600"
                                    : "text-gray-700 hover:text-green-600"
                                }`}
                              >
                                Rejected
                              </Link>
            </div>
          </div>

          {/* Trades Grouped by Seller */}
          {Object.values(groupedBySeller).length === 0 ? (
            <p className="text-gray-500 text-center text-lg">No items match this filter.</p>
          ) : (
            <div className="space-y-8 max-w-6xl mx-auto">
              {Object.values(groupedBySeller).map(({ owner, items }) => (
                <div key={owner.id} className="space-y-4">
                  {/* Seller Header */}
                  <Link href={`/profile-view/${owner.id}`}>
                  <h2 className="text-xl font-bold text-gray-800 mb-2 border-b pb-2 border-gray-300">{owner.name} - <span className="text-sm font-normal">{owner.address}</span></h2>
                </Link>

                  {/* Seller Items */}
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {items.map((trade) => {
                      const isOwnerUser = trade.user_id === auth.user.id;
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

                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                          {/* Material Info */}
                          <div className="absolute bottom-0 left-0 right-0 p-4 text-white flex justify-between items-end">
                            <div>
                              <Link href={`/materials/${trade.material.id}`}>
                                <h3 className="text-lg font-bold drop-shadow-md">{trade.material.material_name}</h3>
                              </Link>
                              <p className="text-xs opacity-90">
                                {!isOwnerUser ? trade.user.name : ""} x {trade.quantity}
                              </p>

                            </div>

                            {/* Buttons */}
                            <div className="flex gap-2">
                              {isOwnerUser ? (
                                <>
                                  <Link
                                                                      href={`/materials/${trade.material_id}`}
                                                                      className="px-2 py-1 rounded-full bg-green-500 hover:bg-blue-600 shadow-md transition"
                                                                      title="Chat"
                                                                    >
                                                                      Completed
                                                                    </Link>
                                </>
                              ) : (
                                <>
                                  <button
                                    onClick={() => rejectDonate(trade.id)}
                                    disabled={["rejected", "cancelled", "accepted"].includes(trade.status)}
                                    className={`p-2 rounded-full text-sm font-medium shadow-md transition ${["rejected", "cancelled", "accepted"].includes(trade.status)
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
                                    className={`p-2 rounded-full text-sm font-medium shadow-md transition ${["rejected", "cancelled", "accepted"].includes(trade.status)
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
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </>
  );
}
