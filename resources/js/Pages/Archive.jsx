import React, { useState, useEffect } from "react";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { ArrowLeft, MessageCircle, CheckCircle, X } from "lucide-react";

export default function Archive({ trades, isUser }) {
    const { post } = useForm();
    const { flash } = usePage().props;
    const [showMessage, setShowMessage] = useState(false);
    const [filter, setFilter] = useState("all"); // ✅ filter state

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

    // ✅ Filtered trades
    const filteredTrades = trades.filter(
        (trade) => filter === "all" || trade.status === filter
    );

    return (
        <>
            <Head title="History" />

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
                <div className="flex gap-4">
                <a className="mt-1 flex" href="/cart">
                <ArrowLeft className="hover:scale-110 "/>
                </a>
                <h1 className="text-2xl font-bold mb-6">History</h1></div>
                    <div>
                        <label className="mr-2 font-semibold">Filter by status:</label>
                            <select
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                                className="border rounded-md px-3 py-1"
                            >
                                <option value="all">All</option>

                            </select>
                    </div>

                </div>

                {filteredTrades.length === 0 ? (
                    <p className="text-gray-500">No item match this filter.</p>
                ) : (
                    <div className="space-y-4">
                        {filteredTrades.map((trade) => (
                            <div
                            key={trade.id}
                            className="bg-white hover:shadow-md transition rounded-md border p-4 flex items-center justify-between"
                            >
                            {/* Left Section: Image + Info */}
                            <div className="flex items-center gap-4">
                                <img
                                src={`/storage/${trade.material.image}`}
                                alt={trade.material.material_name}
                                className="w-14 h-14 object-cover rounded-md"
                                />
                                <div>
                                <p className="font-bold">{trade.material.material_name}</p>

                                <span
                                    className={`text-xs px-2 py-1 rounded-md text-white
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

                            {/* Right Section: Actions */}

                            </div>
                        ))}
                        </div>

                )}
            </div>
        </>
    );
}
