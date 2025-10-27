import React, { useState, useEffect } from "react";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { ArrowLeft, ArrowRight, MessageCircle, CheckCircle, X, ChevronDown } from "lucide-react";
import { router } from "@inertiajs/react";

export default function MyTrades({ trades, isUser }) {
    const { post } = useForm();
    const { flash } = usePage().props;
    const [showMessage, setShowMessage] = useState(false);
    const [filter, setFilter] = useState("all");

          const handleChange = (e) => {
        const value = e.target.value;
        if (value) router.visit(value); // Redirect to selected page
      };

    useEffect(() => {
        if (flash?.message) {
            setShowMessage(true);
            const timer = setTimeout(() => setShowMessage(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [flash]);

    const rejectTrade = (id) => {
        if (confirm("Are you sure you want to reject this trade?")) {
            post(`/trades/${id}/reject`);
        }
    };

    const cancelTrade = (id) => {
        if (confirm("Are you sure you want to cancel this trade?")) {
            post(`/trades/${id}/cancel`);
        }
    };

    const acceptTrade = (id) => {
        if (confirm("Are you sure you want to accept this trade?")) {
            post(`/trades/${id}/accept`);
        }
    };

    const completeTrade = (id) => {
        if (confirm("Are you sure you want to complete this Trade?")) {
            post(`/trades/${id}/complete`);
        }
    };

    const filteredTrades = trades.filter(
        (trade) => filter === "all" || trade.status === filter
    );

    return (
        <>
            <Head title="My Trades" />

            <div className="min-h-screen bg-white py-10 px-6">
                {/* Flash message */}
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
                <div className="mb-6 w-full flex justify-between items-center">
                    <div className="flex gap-4 items-center">
                        <a
                            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
                            href="/uploaded"
                        >
                            <ArrowLeft />
                        </a>
                        <div className="relative inline-block">
                                                                           {/* Dropdown (styled like a title) */}
                                                    <select
                                                        onChange={handleChange}
                                                        defaultValue="/trade-list"
                                                        className="appearance-none bg-transparent text-3xl font-extrabold text-gray-800 pr-8 pl-2 cursor-pointer focus:outline-none"
                                                    >
                                                        <option value="/order-list">Orders List</option>
                                                        <option value="/trade-list">Trade List</option>
                                                        <option value="/donate-list">Donate List</option>
                                                    </select>

                                                    {/* Dropdown Icon */}
                                                    <ChevronDown
                                                        className="absolute right-0 top-1/2 -translate-y-1/2 text-green-500 pointer-events-none"
                                                        size={20}
                                                    />
                                                    </div>
                    </div>
                    <div className="backdrop-blur-md bg-gray-100 rounded-xl px-4 py-2 border border-gray-200">
                        <label className="mr-2 font-semibold text-gray-700">

                        </label>
                        <select
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className="bg-transparent text-gray-800 font-medium focus:outline-none"
                        >
                            <option value="all">All</option>
                            <option value="pending">Pending</option>
                            <option value="accepted">Accepted</option>
                            <option value="rejected">Rejected</option>
                            <option value="cancelled">Cancelled</option>
                        </select>
                    </div>
                </div>

                {/* Trades */}
                {filteredTrades.length === 0 ? (
                    <p className="text-gray-500 text-center text-lg">
                        No trades match this filter.
                    </p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredTrades.map((trade) => (
                            <div
                                key={trade.id}
                                className="backdrop-blur-md bg-white/70 border border-gray-200 hover:shadow-xl hover:scale-[1.02] transition-all shadow-md rounded-2xl p-6"
                            >
                                {/* Status label */}
                                <div className="mb-3">
                                    <p
                                        className={`text-xs font-bold uppercase tracking-wide text-center rounded-full px-3 py-1 w-fit mx-auto text-white ${
                                            trade.status === "pending"
                                                ? "bg-amber-400"
                                                : trade.status === "accepted"
                                                ? "bg-green-500"
                                                : "bg-red-500"
                                        }`}
                                    >
                                        {trade.status}
                                    </p>
                                </div>

                                {/* Trader info */}
                                <p className="text-sm text-center mb-3 text-gray-600">
                                    by {trade.user.name}
                                </p>

                                {/* Items */}
                                <div className="flex items-center justify-center gap-6">
                                    <div className="text-center">
                                        <img
                                            src={`/storage/${trade.item_image}`}
                                            alt={trade.item_title}
                                            className="w-20 h-20 object-cover rounded-xl shadow-md"
                                        />
                                        <p className="text-sm mt-2 text-gray-600">From</p>
                                        <p className="font-bold text-gray-800 text-base">
                                            {trade.item_title}
                                        </p>
                                    </div>

                                    <ArrowRight className="w-6 h-6 text-gray-500" />

                                    <Link href={`/materials/${trade.material.id}`}>
                                        <div className="text-center">
                                            <img
                                                src={`/storage/${trade.material.image}`}
                                                alt={trade.material.material_name}
                                                className="w-20 h-20 object-cover rounded-xl shadow-md"
                                            />
                                            <p className="text-sm mt-2 text-gray-600">For</p>
                                            <p className="font-bold text-gray-800 text-base">
                                                {trade.material.material_name}
                                            </p>
                                        </div>
                                    </Link>
                                </div>

                                {/* Actions */}
                                {isUser ? (
                                    <div className="mt-5 flex flex-col sm:flex-row gap-3">
                                        <button
                                            disabled={
                                                trade.status === "rejected" ||
                                                trade.status === "cancelled"
                                            }
                                            onClick={() => cancelTrade(trade.id)}
                                            className={`flex-1 px-3 py-2 rounded-lg font-medium text-white transition ${
                                                trade.status === "rejected" ||
                                                trade.status === "cancelled"
                                                    ? "bg-gray-400 cursor-not-allowed"
                                                    : "bg-red-500 hover:bg-red-600"
                                            }`}
                                        >
                                            Cancel
                                        </button>
                                        <Link
                                            href={`/message/${trade.trade_for}`}
                                            className="flex items-center justify-center gap-1 flex-1 px-3 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition"
                                        >
                                            <MessageCircle className="w-4 h-4" />
                                            Message
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="mt-5 flex flex-col sm:flex-row gap-3">
                                        {trade.status == 'pending' &&(



                                        <button
                                            disabled={
                                                trade.status === "rejected" ||
                                                trade.status === "cancelled" ||
                                                trade.status === "accepted"
                                            }
                                            onClick={() => rejectTrade(trade.id)}
                                            className={`flex-1 px-3 py-2 rounded-lg font-medium text-white transition ${
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

                                        {trade.status == 'accepted' &&(

                                            <button
                                            disabled={
                                                trade.status === "rejected" ||
                                                trade.status === "cancelled"
                                            }
                                            onClick={() => cancelTrade(trade.id)}
                                            className={`flex-1 px-3 py-2 rounded-lg font-medium text-white transition ${
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
                                                href={`/messagext/${trade.item_title}`}
                                                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition"
                                                >
                                                <MessageCircle className="w-4 h-4" />

                                            </Link>
                                        {trade.status == 'pending' &&(


                                        <button
                                            onClick={() => acceptTrade(trade.id)}
                                            disabled={
                                                trade.status === "rejected" ||
                                                trade.status === "cancelled" ||
                                                trade.status === "accepted"
                                            }
                                            className={`flex-1 px-3 py-2 rounded-lg font-medium text-white transition ${
                                                trade.status === "rejected" ||
                                                trade.status === "cancelled" ||
                                                trade.status === "accepted"
                                                    ? "bg-gray-400 cursor-not-allowed"
                                                    : "bg-green-500 hover:bg-green-600"
                                            }`}
                                        >
                                            Trade
                                        </button>
                                        )}

                                        {trade.status == 'accepted' &&(


                                        <button
                                            onClick={() => completeTrade(trade.id)}
                                            disabled={
                                                trade.status === "rejected" ||
                                                trade.status === "cancelled"
                                            }
                                            className={`flex-1 px-3 py-2 rounded-lg font-medium text-white transition ${
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
            </div>
        </>
    );
}
