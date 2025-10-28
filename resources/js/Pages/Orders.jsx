import React, { useState, useEffect } from "react";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { ArrowLeft, MessageCircle, CheckCircle, X } from "lucide-react";

export default function Orders({ trades, isUser }) {
    const { post } = useForm();
    const { flash } = usePage().props;
    const [showMessage, setShowMessage] = useState(false);
    const [filter, setFilter] = useState("pending");
const { cartItems, auth, donateItemCount, tradeItemCount, orderItemCount, cartItemCount } = usePage().props;
      const { url } = usePage();
       const tabs = [
    { href: "/cart", label: "My Cart", count: cartItemCount },
    { href: "/cart/donate", label: "Donation", count: donateItemCount },
    { href: "/my-trades", label: "Trades", count: tradeItemCount },
    { href: "/Orders", label: "Orders", count: orderItemCount },
  ];
    useEffect(() => {
        if (flash?.message) {
            setShowMessage(true);
            const timer = setTimeout(() => {
                setShowMessage(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [flash]);

    const rejectDonate = (id) => {
        if (confirm("Are you sure you want to reject this Order?")) {
            post(`/order/${id}/reject`);
        }
    };

    const cancelDonate = (id) => {
        if (confirm("Are you sure you want to cancel this Order?")) {
            post(`/order/${id}/cancel`);
        }
    };

    const completeOrder = (id) => {
        if (confirm("Are you sure you want to complete this Order?")) {
            post(`/order/${id}/complete`);
        }
    };

    const acceptDonate = (id) => {
        if (confirm("Are you sure you want to accept this Order?")) {
            post(`/order/${id}/accept`);
        }
    };

    const filteredTrades = trades.filter(
        (trade) => filter === "Pending" || trade.status === filter
    );

    return (
        <>
            <Head title="Orders" />

            <div className="min-h-screen bg-white">
                <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
                    {/* Flash message */}
                    <aside className="md:w-64 w-full top-0  md:h-screen   md:left-0 ">
                            <div className="flex md:flex-col flex-row md:space-y-4 space-x-4 md:space-x-0 p-4 justify-center md:justify-start">
                          {tabs.map((tab, idx) => {
                            const isActive = url === tab.href;
                     // 👈 Check if the current URL matches the tab

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
                        <main className="flex-1   w-full  p-6">
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


                    {/* Header + Filter */}
                    <div className="mb-6 w-full flex justify-end">
                         <div className="flex items-center space-x-6 text-sm font-semibold text-gray-700">
  {[ "Pending", "Accepted", "Rejected", "Completed"].map((status) => (
    <button
      key={status}
      onClick={() => setFilter(status.toLowerCase())}
      className={`transition-colors duration-200 ${
        filter === status.toLowerCase()
          ? "text-green-600 border-b-2 border-green-600"
          : "text-gray-700 hover:text-green-600"
      }`}
    >
      {status}
    </button>
  ))}
</div>

                                    </div>

                    {/* Cards */}
                    {filteredTrades.length === 0 ? (
                        <p className="text-gray-500 text-center">No orders match this filter.</p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredTrades.map((trade) => (
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

                                                  </span>

                                                  {/* Bottom Info Section */}
                                                  <div className="absolute bottom-0 left-0 right-0 flex justify-between items-end p-4 text-white">
                                                    <div>
                                                        <Link href={`/materials/${trade.material.id}`}>
                                                      <h2 className="text-lg font-bold drop-shadow-md">
                                                        <span className="block text-xs font-light">{trade.owner.name}</span>
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
                            ))}
                        </div>
                    )}
                        </main>
                </div>
            </div>
        </>
    );
}
