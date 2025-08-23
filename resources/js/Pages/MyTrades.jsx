import React, { useState, useEffect } from "react";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { ArrowRight, MessageCircle, CheckCircle, X } from "lucide-react";

export default function MyTrades({ trades, isUser }) {
    const { post } = useForm();
    const { flash } = usePage().props;
    const [showMessage, setShowMessage] = useState(false);
    const [filter, setFilter] = useState("pending"); // ✅ filter state

    useEffect(() => {
        if (flash?.message) {
            setShowMessage(true);
            const timer = setTimeout(() => {
                setShowMessage(false);
            }, 3000);
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

    // ✅ Filtered trades
    const filteredTrades = trades.filter(
        (trade) => filter === "all" || trade.status === filter
    );

    return (
        <>
            <Head title="My Trades" />

            <div className="max-w-6xl mx-auto py-10 px-6">
                {/* Flash message */}
                {flash?.message && (
                    <div
                        className={`${
                            flash.message.toLowerCase().includes("added")
                                ? "bg-green-400 border border-green-600"
                                : "bg-red-400 border border-red-600"
                        } shadow-lg bottom-4 flex items-center gap-2 w-fit right-4 absolute text-white p-3 rounded-md z-100 mb-4 transition-all duration-500 transform ${
                            showMessage
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 -translate-y-5"
                        }`}
                    >
                        {flash.message.toLowerCase().includes("added") ? (
                            <CheckCircle size={20} className="text-white" />
                        ) : (
                            <X size={20} className="text-white" />
                        )}
                        {flash.message}
                    </div>
                )}



                {/* ✅ Filter Dropdown */}
                <div className="mb-6  w-full flex justify-between">
                <div><h1 className="text-2xl font-bold mb-6">My Trades</h1></div>
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

                {filteredTrades.length === 0 ? (
                    <p className="text-gray-500">No trades match this filter.</p>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredTrades.map((trade) => (
                            <div
                                key={trade.id}
                                className="bg-white group hover:shadow-lg hover:scale-[1.02] transition-transform shadow-md rounded-lg w-fit py-2 px-6 border border-gray-200 block"
                            >
                                {/* Status label */}
                                <div className="mb-2">
                                    <p
                                        className={`text-sm rounded-md py-1 text-gray-50 text-center w-full
                                            ${trade.status === "pending" ? "bg-amber-400" : ""}
                                            ${trade.status === "accepted" ? "bg-green-500" : ""}
                                            ${trade.status === "rejected" ? "bg-red-500" : ""}
                                            ${trade.status === "cancelled" ? "bg-red-500" : ""}
                                        `}
                                    >
                                        <span className="font-semibold uppercase">
                                            {trade.status}
                                        </span>
                                    </p>
                                </div>

                                {/* Trader info */}
                                <div className="w-full text-center mb-2">
                                    by {trade.user.name}
                                </div>

                                {/* Items */}
                                <div className="flex items-center gap-4">
                                    <div className="text-center">
                                        <img
                                            src={`/storage/${trade.item_image}`}
                                            alt={trade.item_title}
                                            className="w-16 h-16 object-cover rounded-md mx-auto"
                                        />
                                        <p className="text-sm mt-1 text-gray-600">From</p>
                                        <p className="font-bold text-sm">{trade.item_title}</p>
                                    </div>

                                    <div className="flex items-center text-gray-500">
                                        <ArrowRight className="w-5 h-5" />
                                    </div>

                                    <Link href={`/materials/${trade.material.id}`}>
                                        <div className="text-center">
                                            <img
                                                src={`/storage/${trade.material.image}`}
                                                alt={trade.material.material_name}
                                                className="w-16 h-16 object-cover rounded-md mx-auto"
                                            />
                                            <p className="text-sm mt-1 text-gray-600">For</p>
                                            <p className="font-bold text-sm">
                                                {trade.material.material_name}
                                            </p>
                                        </div>
                                    </Link>
                                </div>

                                {/* Actions */}
                                {isUser ? (
                                    <div className="w-full py-2 gap-3 flex justify-between">
                                        <button
                                            disabled={
                                                trade.status === "rejected" ||
                                                trade.status === "cancelled"
                                            }
                                            onClick={() => cancelTrade(trade.id)}
                                            className={`px-2 py-1 rounded-md text-white
                                            ${
                                                trade.status === "rejected" ||
                                                trade.status === "cancelled"
                                                    ? "bg-gray-400 cursor-not-allowed"
                                                    : "bg-red-500 hover:bg-red-600"
                                            }`}
                                        >
                                            Cancel Trade
                                        </button>
                                        <Link
                                            href={`/message/${trade.trade_for}`}
                                            className="flex items-center gap-1 bg-blue-500 text-white px-2 py-1 rounded-md"
                                        >
                                            <MessageCircle className="w-4 h-4" />
                                            Message
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
                                            onClick={() => rejectTrade(trade.id)}
                                            className={`px-2 py-1 rounded-md text-white
                                            ${
                                                trade.status === "rejected" ||
                                                trade.status === "cancelled" ||
                                                trade.status === "accepted"
                                                    ? "bg-gray-400 cursor-not-allowed"
                                                    : "bg-red-500 hover:bg-red-600"
                                            }`}
                                        >
                                            Reject Trade
                                        </button>

                                        <button
                                            onClick={() => acceptTrade(trade.id)}
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
