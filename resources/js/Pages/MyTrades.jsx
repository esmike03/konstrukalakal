import React, { useState, useEffect } from "react";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { ArrowLeft, ArrowRight, MessageCircle, CheckCircle, X } from "lucide-react";

export default function MyTrades({ trades, isUser }) {
    const { post } = useForm();
    const { flash } = usePage().props;
    const [showMessage, setShowMessage] = useState(false);
    const [filter, setFilter] = useState("pending");

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
                        className={`backdrop-blur-lg bg-black/70 text-white shadow-lg fixed bottom-6 right-6 flex items-center gap-2 px-5 py-3 rounded-xl border ${
                            flash.message.toLowerCase().includes("added")
                                ? "border-green-400"
                                : "border-red-400"
                        } transition-all duration-500 transform ${
                            showMessage
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-5"
                        }`}
                    >
                        {flash.message.toLowerCase().includes("added") ? (
                            <CheckCircle size={20} className="text-green-300" />
                        ) : (
                            <X size={20} className="text-red-300" />
                        )}
                        <span className="font-medium">{flash.message}</span>
                    </div>
                )}

                {/* Header + Filter */}
                <div className="mb-6 w-full flex justify-between items-center">
                    <div className="flex gap-4 items-center">
                        <a
                            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
                            href="/cart"
                        >
                            <ArrowLeft />
                        </a>
                        <h1 className="text-3xl font-extrabold text-gray-800">
                            My Trades
                        </h1>
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
