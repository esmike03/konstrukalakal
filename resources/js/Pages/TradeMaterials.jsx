import { useState, useEffect } from "react";
import { useModal } from "@/context/ModalContext";
import { CheckCircle } from "lucide-react";
import { Search, Grid, List, Upload } from "lucide-react";
import { usePage } from "@inertiajs/react";

export default function Materials() {
    const [view, setView] = useState("grid");
    const { openMaterialModal } = useModal();
    const { materials } = usePage().props; // Fetch materials from Inertia
    const { flash } = usePage().props;
    const { auth } = usePage().props;
    const [showMessage, setShowMessage] = useState(false);

    useEffect(() => {
        if (flash?.message) {
            setShowMessage(true); // Show the message
            const timer = setTimeout(() => {
                setShowMessage(false); // Hide after 2 seconds
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [flash]);
    return (
        <div className="min-h-screen p-6 text-black">
            {flash?.message && (
                <div
                    className={`bg-green-400 border border-green-600 shadow-lg bottom-4 flex items-center gap-2 w-fit right-4 absolute text-white p-3 rounded-md z-100 mb-4 transition-all duration-500 transform ${
                        showMessage
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 -translate-y-5"
                    }`}
                >
                <CheckCircle size={20} className="text-white" /> {flash.message}
                </div>
            )}
            {/* Header */}

            {auth.user && (
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-green-700">Browse Materials <span className="text-xs text-gray-400 font-normal">{'>'} Trade Materials</span></h1>


                    <button onClick={openMaterialModal} className="cursor-pointer bg-green-500 text-white text-sm px-3 py-1 rounded-full flex items-center gap-1">
                        <Upload size={14} /> Upload Materials
                    </button>
                </div>
              )}

            <div className="flex gap-4 mt-4 text-gray-600">
                {/* Filters Sidebar */}
                <div className="w-1/5 bg-gray-100 p-4 rounded-lg">
                    <h2 className="text-lg font-bold">Filters</h2>
                    <div className="mt-2">
                        <h3 className="font-semibold">Categories</h3>
                        <div className="space-y-2 mt-2">
                            {["Structural Materials", "Wood & Timber", "Concrete & Cement", "Metal & Steel", "Insulation", "Doors & Windows", "Roofing"].map((category) => (
                                <label key={category} className="flex text-sm items-center space-x-2">
                                    <input type="checkbox" className="form-checkbox" />
                                    <span>{category}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="mt-2">
                        <h3 className="font-semibold">Condition</h3>
                        <div className="space-y-2 mt-2">
                            {["New", "Like New", "Good", "Fair", "Salvageable"].map((category) => (
                                <label key={category} className="flex text-sm items-center space-x-2">
                                    <input type="checkbox" className="form-checkbox" />
                                    <span>{category}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1">
                    {/* Search and Sorting */}
                    <div className="flex justify-between items-center">
                        <div className="relative w-1/2">
                            <input type="text" placeholder="Search for materials..." className="w-full px-4 text-sm py-1 border border-gray-300 rounded-full" />
                            <Search className="absolute right-3 top-1.5 text-gray-500" size={16} />
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                            <select className="border rounded-full text-gray-600 border-gray-400 text-xs px-3 py-1">
                                <option>Newest</option>
                                <option>Oldest</option>
                                <option>Price: Low to High</option>
                                <option>Price: High to Low</option>
                            </select>
                            <button onClick={() => setView("grid")}>
                                <Grid size={20} className={view === "grid" ? "text-green-400" : "text-gray-400"} />
                            </button>
                            <button onClick={() => setView("list")}>
                                <List size={20} className={view === "list" ? "text-green-400" : "text-gray-400"} />
                            </button>
                        </div>
                    </div>

                    {/* Material Cards */}
                    <div className={`mt-6 ${view === "grid" ? "grid grid-cols-3 gap-6" : "space-y-4"}`}>
                        {materials.length > 0 ? (
                            materials.map((material) => (
                                <div key={material.id} className="bg-gray-100 flex flex-col justify-between p-2 rounded-lg shadow">
                                    <div>
                                        {material.image && (
                                            <img src={`/storage/${material.image}`} alt={material.materialName} className=" w-full h-32 object-cover rounded-sm" />
                                        )}

                                        <div className="flex justify-between content-center mt-2">
                                        <div
                                        className={`text-xs text-white px-2 py-1 rounded-sm w-max ${
                                          material.forbdt === "Trade"
                                            ? "bg-blue-500"
                                            : material.forbdt === "Sale"
                                            ? "bg-red-500"
                                            : material.forbdt === "Donation"
                                            ? "bg-green-500"
                                            : "bg-gray-500"
                                        }`}
                                      >
                                        For {material.forbdt}
                                      </div>

                                            <p className="text-xs mt-0.5 text-gray-500">📍 {material.location}</p>
                                        </div>
                                        <h3 className="text-lg font-bold mt-1">{material.material_name}</h3>
                                        <p className="text-xs text-gray-600">{material.description}</p>

                                    </div>
                                    <div>
                                        <div className="flex mt-1 gap-2 justify-between">
                                            <p className="text-green-600 font-bold content-center  items-center">₱ {material.price}</p>
                                            <p className="text-xs text-gray-500 mt-1">Qty: {material.quantity}</p>
                                        </div>
                                        <button className=" bottom-0 w-full mt-2 text-sm bg-green-600 text-white py-1 rounded-full hover:bg-green-700">View Details</button>
                                    </div>

                                </div>
                            ))
                        ) : (
                            <p className="text-center text-gray-500">No materials available.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
