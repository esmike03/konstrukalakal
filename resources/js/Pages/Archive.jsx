import React, { useState, useEffect } from "react";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { ArrowLeft, CheckCircle, X } from "lucide-react";

export default function Archive({ trades, isUser }) {
    const { post } = useForm();
    const { flash } = usePage().props;
    const [showMessage, setShowMessage] = useState(false);
    const [filter, setFilter] = useState("all");

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
            <Head title="History" />

            <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 py-10 px-6">
                {/* Flash message */}
                {flash?.message && (
                    <div
                        className={`fixed bottom-6 right-6 flex items-center gap-2 px-4 py-3 rounded-xl shadow-lg text-white z-50 transition-all duration-500 transform
                            ${
                                flash.message.toLowerCase().includes("added")
                                    ? "bg-green-500/80 backdrop-blur-lg"
                                    : "bg-red-500/80 backdrop-blur-lg"
                            }
                            ${showMessage ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}
                        `}
                    >
                        {flash.message.toLowerCase().includes("added") ? (
                            <CheckCircle size={20} className="text-white" />
                        ) : (
                            <X size={20} className="text-white" />
                        )}
                        <span>{flash.message}</span>
                    </div>
                )}

                {/* Header & Filter */}
                <div className="max-w-6xl mx-auto flex justify-between items-center mb-8">
                    <div className="flex items-center gap-4">
                        <a href="/materials" className="p-2 rounded-full hover:bg-white/40 transition">
                            <ArrowLeft className="hover:scale-110 transition" />
                        </a>
                        <h1 className="text-3xl font-bold text-gray-800">History</h1>
                    </div>
                    <div className="bg-white/40 backdrop-blur-md px-3 py-2 rounded-lg shadow-sm border border-white/50">
                        <label className="mr-2 font-medium text-gray-700"></label>
                        <select
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className="bg-transparent outline-none"
                        >
                            <option value="all">All</option>

                        </select>
                    </div>
                </div>

                {/* Trades */}
                {filteredTrades.length === 0 ? (
                    <p className="text-center text-gray-600">No items match this filter.</p>
                ) : (
                    <div className="max-w-6xl mx-auto space-y-5">
                        {filteredTrades.map((trade) => (
                            <div
                                key={trade.id}
                                className="flex items-center justify-between p-5 rounded-2xl shadow-md border border-white/40 bg-white/30 backdrop-blur-md hover:bg-white/40 transition"
                            >
                                {/* Left: Image + Info */}
                                <div className="flex items-center gap-4">
                                    <img
                                        src={`/storage/${trade.material.image}`}
                                        alt={trade.material.material_name}
                                        className="w-16 h-16 object-cover rounded-lg shadow-sm border border-white/60"
                                    />
                                    <div>
                                        <p className="font-semibold text-gray-800">
                                            {trade.material.material_name}
                                        </p>
                                        <span
                                            className={`inline-block mt-1 text-xs px-2 py-1 rounded-md text-white
                                                ${trade.status === "pending" ? "bg-amber-400" : ""}
                                                ${trade.status === "accepted" ? "bg-green-500" : ""}
                                                ${trade.status === "rejected" ? "bg-red-500" : ""}
                                                ${trade.status === "cancelled" ? "bg-red-500" : ""}
                                            `}
                                        >
                                            {trade.status.toUpperCase()}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}
