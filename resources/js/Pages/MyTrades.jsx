import React from "react";
import { Head, Link } from "@inertiajs/react";
import { ArrowRight } from "lucide-react";

export default function MyTrades({ trades }) {
    return (
        <>
            <Head title="My Trades" />

            <div className="max-w-6xl mx-auto py-10 px-6">
                <h1 className="text-2xl font-bold mb-6">My Trades</h1>

                {trades.length === 0 ? (
                    <p className="text-gray-500">You have no trades yet.</p>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {trades.map((trade) => (
                            <Link
                                key={trade.id}
                                href={`/materials/${trade.material.id}`} // ✅ route to material details
                                className="bg-white group hover:shadow-lg hover:scale-[1.02] transition-transform shadow-md rounded-lg w-fit py-2 px-6 border border-gray-200 block"
                            >
                                <div className="mb-2">
                                    <p className="text-sm text-gray-600 text-center w-full">
                                        Status:{" "}
                                        <span className="font-semibold">
                                            {trade.status}
                                        </span>
                                    </p>
                                </div>

                                <div className="flex items-center gap-4">
                                    {/* Offered Item */}
                                    <div className="text-center">
                                        <img
                                            src={`/storage/${trade.item_image}`}
                                            alt={trade.item_title}
                                            className="w-16 h-16 object-cover rounded-md mx-auto"
                                        />
                                        <p className="text-sm mt-1 text-gray-600">
                                            You Offered
                                        </p>
                                        <p className="font-bold text-sm">
                                            {trade.item_title}
                                        </p>
                                    </div>

                                    <div className="flex items-center text-gray-500">
                                        <ArrowRight className="w-5 h-5" />
                                    </div>

                                    {/* Requested Item */}
                                    <div className="text-center">
                                        <img
                                            src={`/storage/${trade.material.image}`}
                                            alt={trade.material.material_name}
                                            className="w-16 h-16 object-cover rounded-md mx-auto"
                                        />
                                        <p className="text-sm mt-1 text-gray-600">
                                            You Want
                                        </p>
                                        <p className="font-bold text-sm">
                                            {trade.material.material_name}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}
