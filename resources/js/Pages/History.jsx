import React, { useState, useEffect } from "react";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { ArrowLeft, MessageCircle, CheckCircle, X } from "lucide-react";

export default function History({ trades, isUser }) {
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

    const filteredTrades = trades.filter(
        (trade) => filter === "all" || trade.status === filter
    );

    return (
        <>
            <Head title="Donates" />

            <div className="max-w-6xl mx-auto py-10 px-6">
                {/* ✅ Flash message */}
                {flash?.message && (
                    <div
                        className={`fixed bottom-6 right-6 px-4 py-2 rounded-xl shadow-lg backdrop-blur-md bg-white/10 border border-white/20 flex items-center gap-2 text-sm text-white transition-all duration-500 transform ${
                            showMessage
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-4"
                        }`}
                    >
                        {flash.message.toLowerCase().includes("added") ? (
                            <CheckCircle size={20} className="text-green-300" />
                        ) : (
                            <X size={20} className="text-red-300" />
                        )}
                        {flash.message}
                    </div>
                )}

                {/* ✅ Header & Filter */}
                <div className="mb-6 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <a href="/cart" className="p-2 rounded-full hover:bg-white/10 transition">
                            <ArrowLeft className="hover:scale-110 transition" />
                        </a>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                            History
                        </h1>
                    </div>

                    <div>
                        <label className="mr-2 font-semibold text-gray-700">Filter:</label>
                        <select
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className="px-3 py-2 rounded-lg bg-white/20 border border-white/30 backdrop-blur-md text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                        >
                            <option value="all">All</option>
                            <option value="pending">Pending</option>
                            <option value="accepted">Accepted</option>
                            <option value="rejected">Rejected</option>
                            <option value="cancelled">Cancelled</option>
                        </select>
                    </div>
                </div>

                {/* ✅ No Trades */}
                {filteredTrades.length === 0 ? (
                    <p className="text-center text-gray-400 italic">
                        No trades match this filter.
                    </p>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {filteredTrades.map((trade) => (
                            <div
                                key={trade.id}
                                className="p-4 rounded-2xl backdrop-blur-md bg-white/20 border border-white/30 shadow-lg hover:scale-[1.02] hover:shadow-2xl transition-transform duration-300"
                            >
                                {/* Status */}
                                <div className="mb-3">
                                    <p
                                        className={`text-xs font-semibold rounded-lg py-1 text-center text-white ${
                                            trade.status === "pending"
                                                ? "bg-amber-400/80"
                                                : trade.status === "accepted"
                                                ? "bg-green-500/80"
                                                : "bg-red-500/80"
                                        }`}
                                    >
                                        {trade.status.toUpperCase()}
                                    </p>
                                </div>

                                {/* Trader Info */}
                                <div className="text-center text-sm mb-2 text-gray-700">
                                    {!isUser ? trade.user.name : "Owner"}
                                </div>

                                {/* Material */}
                                <Link href={`/materials/${trade.material.id}`}>
                                    <div className="flex flex-col items-center">
                                        <img
                                            src={`/storage/${trade.material.image}`}
                                            alt={trade.material.material_name}
                                            className="w-20 h-20 object-cover rounded-lg shadow-md"
                                        />
                                        <p className="mt-2 font-bold text-gray-800">
                                            {trade.material.material_name}
                                        </p>
                                    </div>
                                </Link>

                                {/* Actions */}
                                <div className="mt-4 flex justify-between gap-2">
                                    {isUser ? (
                                        <>
                                            <button
                                                disabled={
                                                    ["rejected", "cancelled"].includes(trade.status)
                                                }
                                                onClick={() => cancelDonate(trade.id)}
                                                className={`px-3 py-1 rounded-lg text-sm text-white transition ${
                                                    ["rejected", "cancelled"].includes(trade.status)
                                                        ? "bg-gray-400 cursor-not-allowed"
                                                        : "bg-red-500 hover:bg-red-600"
                                                }`}
                                            >
                                                Cancel
                                            </button>
                                            <Link
                                                href={`/message/${trade.material_id}`}
                                                className="flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg text-sm transition"
                                            >
                                                <MessageCircle className="w-4 h-4" />
                                                Message
                                            </Link>
                                        </>
                                    ) : (
                                        <>
                                            <button
                                                disabled={
                                                    ["rejected", "cancelled", "accepted"].includes(
                                                        trade.status
                                                    )
                                                }
                                                onClick={() => rejectDonate(trade.id)}
                                                className={`px-3 py-1 rounded-lg text-sm text-white transition ${
                                                    ["rejected", "cancelled", "accepted"].includes(
                                                        trade.status
                                                    )
                                                        ? "bg-gray-400 cursor-not-allowed"
                                                        : "bg-red-500 hover:bg-red-600"
                                                }`}
                                            >
                                                Reject
                                            </button>
                                            <Link
                                                href={`/messagex/${trade.material_id}/${trade.user_id}`}
                                                className="flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg text-sm transition"
                                            >
                                                <MessageCircle className="w-4 h-4" />
                                                Message
                                            </Link>
                                            <button
                                                onClick={() => acceptDonate(trade.id)}
                                                disabled={
                                                    ["rejected", "cancelled", "accepted"].includes(
                                                        trade.status
                                                    )
                                                }
                                                className={`px-3 py-1 rounded-lg text-sm text-white transition ${
                                                    ["rejected", "cancelled", "accepted"].includes(
                                                        trade.status
                                                    )
                                                        ? "bg-gray-400 cursor-not-allowed"
                                                        : "bg-green-500 hover:bg-green-600"
                                                }`}
                                            >
                                                Accept
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}
