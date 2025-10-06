import React, { useState, useEffect } from "react";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { ArrowLeft, MessageCircle, CheckCircle, X } from "lucide-react";

export default function Orders({ trades, isUser }) {
    const { post } = useForm();
    const { flash } = usePage().props;
    const [showMessage, setShowMessage] = useState(false);
    const [filter, setFilter] = useState("pending");

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

    const filteredTrades = trades.filter(
        (trade) => filter === "all" || trade.status === filter
    );

    return (
        <>
            <Head title="Orders" />

            <div className="min-h-screen bg-white">
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

                    {/* Header + Filter */}
                    <div className="mb-6 w-full flex justify-between items-center">
                                        <div className="flex gap-4 items-center">
                                            <a className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition" href="/cart">
                                                <ArrowLeft />
                                            </a>
                                            <h1 className="text-3xl font-extrabold text-gray-800">
                                                Orders
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

                    {/* Cards */}
                    {filteredTrades.length === 0 ? (
                        <p className="text-gray-500">No orders match this filter.</p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
                                                {trade.status}
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
                                                    src={`/storage/${trade.material.image}`}
                                                    alt={trade.material.material_name}
                                                    className="w-20 h-20 object-cover rounded-md mx-auto"
                                                />
                                                <p className="font-bold text-sm mt-1">
                                                    {trade.material.material_name}
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
                                            <Link
                                                href={`/messagexx/${trade.material_id}/${trade.user_id}`}
                                                className="flex items-center justify-center gap-1 bg-blue-500 text-white px-3 py-2 rounded-md text-sm w-full sm:w-auto"
                                            >
                                                <MessageCircle className="w-4 h-4" />

                                            </Link>
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
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
