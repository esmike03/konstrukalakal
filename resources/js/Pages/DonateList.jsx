import React, { useState, useEffect } from "react";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { ArrowLeft, MessageCircle, CheckCircle, X, ChevronDown } from "lucide-react";
import { router } from "@inertiajs/react";

export default function DonateCart({ trades, isUser }) {
    const { post } = useForm();
    const { flash } = usePage().props;
    const [showMessage, setShowMessage] = useState(false);
    const [filter, setFilter] = useState("pending");

          const handleChange = (e) => {
        const value = e.target.value;
        if (value) router.visit(value); // Redirect to selected page
      };

        const { cartItems, auth, donateItemCount, tradeItemCount, orderItemCount, cartItemCount, order, donate, trader } = usePage().props;
            const { url } = usePage();
             const tabs = [
          { href: "/order-list", label: "Order List", count: order },
          { href: "/donate-list", label: "Donation List", count: donate },
          { href: "/trade-list", label: "Trades List", count: trader },

        ];

    useEffect(() => {
        if (flash?.message) {
            setShowMessage(true);
            const timer = setTimeout(() => setShowMessage(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [flash]);

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

    const acceptDonate = (id) => {
        if (confirm("Are you sure you want to accept this Inquiry?")) {
            post(`/donate/${id}/accept`);
        }
    };
    const completeOrder = (id) => {
        if (confirm("Are you sure you want to complete this Inquiry?")) {
            post(`/donate/${id}/complete`);
        }
    };

    const filteredTrades = trades.filter(
        (trade) => filter === "Pending" || trade.status === filter
    );

    return (
        <>
            <Head title="Donates" />

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
                <div className="mb-6 w-full flex justify-end">

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
                   href="/donate-listRejected"
                   className={`transition-colors duration-200 ${
                     url === "/OrdersRejected"
                       ? "text-green-600 border-b-2 border-green-600"
                       : "text-gray-700 hover:text-green-600"
                   }`}
                 >
                   Rejected
                 </Link>
                <Link
                   href="/donate-listCompleted"
                   className={`transition-colors duration-200 ${
                     url === "/OrdersCompleted"
                       ? "text-green-600 border-b-2 border-green-600"
                       : "text-gray-700 hover:text-green-600"
                   }`}
                 >
                   Completed
                 </Link>
</div>
                </div>

                {/* Trades */}
                {filteredTrades.length === 0 ? (
                    <p className="text-gray-500 text-center text-lg">
                        No items match this filter.
                    </p>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredTrades.map((trade) => (
                            <div
                                key={trade.id}
                                className="backdrop-blur-md bg-white/70 border border-gray-200 group hover:scale-[1.02] transition-all shadow-lg rounded-2xl p-6"
                            >
                                {/* Status */}
                                <div className="mb-3">
                                    <p
                                        className={`text-xs w-full font-bold uppercase tracking-wide text-center rounded-full px-3 py-1 w-fit mx-auto text-white ${
                                            trade.status === "pending"
                                                ? "bg-amber-400"
                                                : trade.status === "accepted"
                                                ? "bg-green-500"
                                                : "bg-red-500"
                                        }`}
                                    >

                                    </p>
                                </div>

                                {/* Trader info */}
                                <p className="text-sm text-center mb-3 text-gray-600">
                                    {!isUser ? trade.user.name : "Owner"}
                                </p>

                                {/* Material */}
                                <Link href={`/materials/${trade.material.id}`}>
                                    <div className="flex flex-col items-center">
                                        <img
                                            src={`/storage/${JSON.parse(trade.material.image)[0]}`}
                                            alt={trade.material.material_name}
                                            className="w-20 h-20 object-cover rounded-xl shadow-md"
                                        />
                                        <p className="font-bold text-base mt-2 text-gray-800">
                                            {trade.material.material_name}
                                        </p>
                                    </div>
                                </Link>

                                {/* Actions */}
                                {isUser ? (
                                    <div className="mt-4 flex justify-between">
                                        <button
                                            disabled={
                                                trade.status === "rejected" ||
                                                trade.status === "cancelled"
                                            }
                                            onClick={() => cancelDonate(trade.id)}
                                            className={`px-3 py-1.5 rounded-lg font-medium text-white transition ${
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
                                            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition"
                                        >
                                            <MessageCircle className="w-4 h-4" />

                                        </Link>
                                    </div>
                                ) : (
                                    <div className="mt-4 flex gap-1 justify-between">
                                    {trade.status === "pending" && (
                                        <button
                                            disabled={
                                                trade.status === "rejected" ||
                                                trade.status === "cancelled" ||
                                                trade.status === "accepted"
                                            }
                                            onClick={() => rejectDonate(trade.id)}
                                            className={`px-3 py-1.5 rounded-lg font-medium text-white transition ${
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
                                        <Link
                                            href={`/messagex/${trade.material_id}/${trade.user_id}`}
                                            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition"
                                        >
                                            <MessageCircle className="w-4 h-4" />

                                        </Link>
                                        {trade.status === "pending" && (
                                        <button
                                            onClick={() => acceptDonate(trade.id)}
                                            disabled={
                                                trade.status === "rejected" ||
                                                trade.status === "cancelled" ||
                                                trade.status === "accepted"
                                            }
                                            className={`px-3 py-1.5 rounded-lg font-medium text-white transition ${
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
        </>
    );
}
