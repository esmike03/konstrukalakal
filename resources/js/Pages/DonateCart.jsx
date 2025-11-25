import React, { useState, useEffect } from "react";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { MessageCircle, CheckCircle, X } from "lucide-react";

export default function DonateCart({ trades, isUser }) {
  const { post } = useForm();
  const { flash, auth, cartItemCount, donateItemCount, tradeItemCount, orderItemCount, url } = usePage().props;
  const [showMessage, setShowMessage] = useState(false);
  const [filter, setFilter] = useState("pending");

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
                    className={`block text-center text-xs font-semibold px-4 py-2 rounded-lg border shadow-md backdrop-blur-md transition ${tab.href === "/cart/donate"
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
              {["Pending", "Accepted"].map((status) => (
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
                                href="/DonateCompleted"
                                className={`transition-colors duration-200 ${
                                  url === "/OrdersCompleted"
                                    ? "text-green-600 border-b-2 border-green-600"
                                    : "text-gray-700 hover:text-green-600"
                                }`}
                              >
                                Completed
                              </Link>

                              <Link
                                href="/DonateRejected"
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
      <div
        key={owner.id}
        className="bg-gray-50 border border-gray-300 rounded-xl p-4 space-y-4"
      >

        {/* Seller Header */}
        <Link href={`/profile-view/${owner.id}`}>
          <p className="text-lg font-bold text-gray-800 border-b pb-2 mb-6 border-gray-300">
            {owner.name}
            <span className="text-sm font-normal text-gray-600">
              {" "}– {owner.address}
            </span>
          </p>
        </Link>

        {/* Seller Items */}
        <div className="space-y-4">
          {items.map((trade) => {
            const isOwnerUser = trade.user_id === auth.user.id;

            return (
              <div
                key={trade.id}
                className="flex items-start pb-4 border-b border-gray-200 space-x-4"
              >


                {/* IMAGE */}
                <img
                  src={`/storage/${trade.material.image}`}
                  className="w-20 h-20 rounded-lg object-cover border"
                />

                {/* MATERIAL DETAILS */}
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">
                    {trade.material.material_name}
                  </p>

                  {!isOwnerUser && (
                    <p className="text-xs text-gray-500">
                      From: {trade.user.name}
                    </p>
                  )}

                  <p className="text-sm text-gray-700 mt-1">
                    <span className="font-bold text-green-700">
                      ₱{trade.material.price * trade.quantity}
                    </span>
                    {" "}× {trade.quantity}
                  </p>
                </div>

                {/* QTY CONTROLS */}
                <div className="flex items-center space-x-2 my-auto mr-8">
                  <button
                    onClick={() => updateQuantity(trade.id, trade.quantity - 1)}
                    className="w-7 h-7 border border-gray-300 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-100"
                  >
                    −
                  </button>

                  <span className="w-6 text-center text-gray-700 font-semibold">
                    {trade.quantity}
                  </span>

                  <button
                    onClick={() => updateQuantity(trade.id, trade.quantity + 1)}
                    className="w-7 h-7 border border-gray-300 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>

                {/* ACTION BUTTONS */}
                <div className="flex items-center space-x-3 my-auto">
                  {isOwnerUser ? (
                    <>
                      {/* Cancel */}
                      <button
                        onClick={() => cancelDonate(trade.id)}
                        disabled={["rejected", "cancelled"].includes(trade.status)}
                        className={`text-red-600 ${
                          ["rejected", "cancelled"].includes(trade.status)
                            ? "opacity-40 cursor-not-allowed"
                            : "hover:text-red-700"
                        }`}
                      >
                        <X size={20} />
                      </button>

                      {/* Chat */}
                      <Link
                        href={`/message/${trade.material_id}`}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        <MessageCircle size={20} />
                      </Link>
                    </>
                  ) : (
                    <>
                      {/* Reject */}
                      <button
                        onClick={() => rejectDonate(trade.id)}
                        disabled={["rejected", "cancelled", "accepted"].includes(trade.status)}
                        className={`text-red-600 ${
                          ["rejected", "cancelled", "accepted"].includes(trade.status)
                            ? "opacity-40 cursor-not-allowed"
                            : "hover:text-red-700"
                        }`}
                      >
                        <X size={20} />
                      </button>

                      {/* Chat */}
                      <Link
                        href={`/messagex/${trade.material_id}/${trade.user_id}`}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        <MessageCircle size={20} />
                      </Link>

                      {/* Accept */}
                      <button
                        onClick={() => acceptDonate(trade.id)}
                        disabled={["rejected", "cancelled", "accepted"].includes(trade.status)}
                        className={`text-green-600 ${
                          ["rejected", "cancelled", "accepted"].includes(trade.status)
                            ? "opacity-40 cursor-not-allowed"
                            : "hover:text-green-700"
                        }`}
                      >
                        <CheckCircle size={20} />
                      </button>
                    </>
                  )}
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
