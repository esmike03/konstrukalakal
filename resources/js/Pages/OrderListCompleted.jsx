import React, { useState, useEffect } from "react";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { ArrowLeft, MessageCircle, CheckCircle, X, ChevronDown } from "lucide-react";
import { router } from "@inertiajs/react";

export default function OrderListCompleted({ trades, isUser }) {
    const { post } = useForm();
    const { flash } = usePage().props;
    const [showMessage, setShowMessage] = useState(false);
    const [filter, setFilter] = useState("completed");

      const handleChange = (e) => {
    const value = e.target.value;
    if (value) router.visit(value); // Redirect to selected page
  };
  const { cartItems, auth, donateItemCount, tradeItemCount, orderItemCount, cartItemCount, order, donate, trader } = usePage().props;
        const { url } = usePage();
         const tabs = [
      { href: "/order-listCompleted", label: "Order List", count: order },
      { href: "/donate-list", label: "Donation List", count: donate },
      { href: "/trade-list", label: "Trades List", count: trader },

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

    const acceptDonate = (id) => {
        if (confirm("Are you sure you want to accept this Order?")) {
            post(`/order/${id}/accept`);
        }
    };

    const completeOrder = (id) => {
        if (confirm("Are you sure you want to complete this Order?")) {
            post(`/order/${id}/complete`);
        }
    };

    const cancelOrder = (id) => {
        if (confirm("Are you sure you want to cancel this Order?")) {
            post(`/order/${id}/cancelbyowner`);
        }
    };

    const filteredTrades = trades.filter(
        (trade) => filter === "Rejected" || trade.status === filter
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
                              ${/(added|sent|success|updated|deleted|completed|successfully)/i.test(flash.message)
                                ? "bg-green-500/80"
                                : "bg-red-500/80"}
                              transition-all duration-500 ${showMessage ? "opacity-100" : "opacity-0"}`}
                          >
                            {/(added|sent|success|updated|deleted|completed|successfully)/i.test(flash.message) ? (
                              <CheckCircle size={18} />
                            ) : (
                              <X size={18} />
                            )}
                            <span className="text-sm">{flash.message}</span>
                          </div>
                        )}

                    {/* Header + Filter */}
                    <div className="mb-2 w-full flex justify-end">


                                            <div className="flex items-center space-x-6 text-sm font-semibold text-gray-700">
<Link
    href="/order-list"
    className={`transition-colors duration-200 ${
      url === "/Orders"
        ? "text-green-600 border-b-2 border-green-600"
        : "text-gray-700 hover:text-green-600"
    }`}
  >
    Pending
  </Link>

  {/* Accepted → FILTER */}
 <Link
    href="/order-list"
    className={`transition-colors duration-200 ${
      url === "/Orders"
        ? "text-green-600 border-b-2 border-green-600"
        : "text-gray-700 hover:text-green-600"
    }`}
  >
    Accepted
  </Link>


     <Link
    href="/order-listRejected"
    className={`transition-colors duration-200 ${
      url === "/OrdersCompleted"
        ? "text-green-600 border-b-2 border-green-600"
        : "text-gray-700 hover:text-green-600"
    }`}
  >
    Rejected
  </Link>
     <button
    onClick={() => setFilter("completed")}
    className={`transition-colors duration-200 ${
      filter === "completed"
        ? "text-green-600 border-b-2 border-green-600"
        : "text-gray-700 hover:text-green-600"
    }`}
  >
    Completed
  </button>

  {/* Completed → FILTER */}

</div>
                                        </div>


                    {/* Cards */}
                    {filteredTrades.length === 0 ? (
                        <p className="text-gray-500">No orders match this filter.</p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredTrades.map((trade) => (
                                <div
                                    key={trade.id}
                                    className="bg-white group hover:shadow-lg hover:scale-[1.02] transition-transform shadow-md rounded-lg w-full p-6 border border-gray-200"
                                >
                                    {/* Status */}
                                    <div className="mb-2">
                                        <p
                                            className={`text-sm rounded-md py-1 text-white text-center w-full
                                                ${trade.status === "pending" ? "bg-amber-400" : ""}
                                                ${trade.status === "accepted" ? "bg-green-500" : ""}
                                                ${trade.status === "rejected" ? "bg-red-500" : ""}
                                                ${trade.status === "cancelled" ? "bg-red-500" : ""}
                                            `}
                                        >
                                            <span className="font-semibold uppercase">

                                            </span>
                                        </p>
                                    </div>

                                    {/* User */}
                                    <div className="w-full text-center text-xs mb-2">
                                        {!isUser ? trade.user.name : "Owner"}
                                    </div>

                                    {/* Item */}
                                    <div className="flex justify-center">
                                        <Link href={`/materials/${trade.material.id}`}>
                                            <div className="text-center">
                                                <img
                                                    src={`/storage/${JSON.parse(trade.material.image)[0]}`}
                                                    alt={trade.material.material_name}
                                                    className="w-20 h-20 object-cover rounded-md mx-auto"
                                                />
                                                <p className="font-bold text-sm mt-1">
                                                    {trade.material.material_name}

                                                </p>
                                                <p>
                                                    <span className="text-green-500 font-bold">P{(trade.material.price * trade.quantity)}</span>  <span className="font-bold">[ {trade.quantity} ]</span>
                                                </p>
                                            </div>
                                        </Link>
                                    </div>

                                    {/* Actions */}
                                    {isUser ? (
                                        <div className="w-full mt-4 gap-3 flex flex-col sm:flex-row justify-between">
                                            <button
                                                disabled={
                                                    trade.status === "rejected" ||
                                                    trade.status === "cancelled"
                                                }
                                                onClick={() => cancelDonate(trade.id)}
                                                className={`px-3 py-2 rounded-md text-white w-full sm:w-auto text-sm
                                                ${
                                                    trade.status === "rejected" ||
                                                    trade.status === "cancelled"
                                                        ? "bg-gray-400 cursor-not-allowed"
                                                        : "bg-red-500 hover:bg-red-600"
                                                }`}
                                            >
                                                Cancel
                                            </button>
                                            <Link
                                                href={`/message/${trade.material_id}`}
                                                className="flex items-center justify-center gap-1 bg-blue-500 text-white px-3 py-2 rounded-md text-sm w-full sm:w-auto"
                                            >
                                                <MessageCircle className="w-4 h-4" />

                                            </Link>
                                        </div>
                                    ) : (
                                        <div className="w-full mt-4 gap-3 flex flex-col sm:flex-row justify-between">
                                                {trade.status === "pending" && (
                                                <button
                                                disabled={
                                                    trade.status === "rejected" ||
                                                    trade.status === "cancelled" ||
                                                    trade.status === "accepted"
                                                }
                                                onClick={() => rejectDonate(trade.id)}
                                                className={`px-3 py-2 rounded-md text-white w-full sm:w-auto text-sm
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
                                                )}

                                                {trade.status === "accepted" && (
                                            <button
                                                disabled={
                                                    trade.status === "rejected" ||
                                                    trade.status === "cancelled"
                                                }
                                                onClick={() => cancelDonate(trade.id)}
                                                className={`px-3 py-2 rounded-md text-white w-full sm:w-auto text-sm
                                                ${
                                                    trade.status === "rejected" ||
                                                    trade.status === "cancelled"
                                                        ? "bg-gray-400 cursor-not-allowed"
                                                        : "bg-red-500 hover:bg-red-600"
                                                }`}
                                            >
                                                Cancel
                                            </button>
                                            )}

                                            {trade.status === "pending" && (
                                            <button
                                                onClick={() => acceptDonate(trade.id)}
                                                disabled={
                                                    trade.status === "rejected" ||
                                                    trade.status === "cancelled" ||
                                                    trade.status === "accepted"
                                                }
                                                className={`px-3 py-2 rounded-md text-white w-full sm:w-auto text-sm
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
                                                )}
                                            {trade.status === "accepted" && (
                                            <button
                                                disabled={
                                                    trade.status === "rejected" ||
                                                    trade.status === "cancelled"
                                                }
                                                onClick={() => completeOrder(trade.id)}
                                                className={`px-3 py-2 rounded-md text-white w-full sm:w-auto text-sm
                                                ${
                                                    trade.status === "rejected" ||
                                                    trade.status === "cancelled"
                                                        ? "bg-gray-400 cursor-not-allowed"
                                                        : "bg-green-500 hover:bg-green-600"
                                                }`}
                                            >
                                                Complete
                                            </button>
                                            )}
                                        </div>
                                    )}
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
