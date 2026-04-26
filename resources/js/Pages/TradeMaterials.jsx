import { useState, useEffect } from "react";
import { useModal } from "@/context/ModalContext";
import {
    CheckCircle,
    Search,
    Grid,
    List,
    Upload,
    Filter,
    Trash2,
    ChevronDown,
    ChevronUp,
} from "lucide-react";
import { usePage, Link } from "@inertiajs/react";

const CATEGORIES = [
    "Structural Materials",
    "Wood",
    "Concrete & Cement",
    "Metal",
    "Insulation",
    "Doors & Windows",
    "Roofing",
    "Flooring",
    "Wall Materials",
    "Aggregates",
    "Glass Materials",
];
const CONDITIONS = ["New", "Like New", "Good", "Fair", "Restorable"];
const TAG_STYLES = {
    Trade: "bg-blue-50 text-blue-600 border-blue-200",
    Sale: "bg-red-50 text-red-600 border-red-200",
    Donation: "bg-green-50 text-green-600 border-green-200",
};

export default function Materials() {
    const { openMaterialModal } = useModal();
    const { materials, flash, auth } = usePage().props;

    const [view, setView] = useState("grid");
    const [showMessage, setShowMessage] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedConditions, setSelectedConditions] = useState([]);
    const [showFilters, setShowFilters] = useState(false);

    useEffect(() => {
        if (flash?.message) {
            setShowMessage(true);
            const t = setTimeout(() => setShowMessage(false), 2500);
            return () => clearTimeout(t);
        }
    }, [flash]);

    const toggleFilter = (list, setList, value) =>
        setList((prev) =>
            prev.includes(value)
                ? prev.filter((x) => x !== value)
                : [...prev, value],
        );

    const filteredMaterials = materials
        .filter((m) =>
            m.material_name.toLowerCase().includes(searchQuery.toLowerCase()),
        )
        .filter(
            (m) =>
                selectedCategories.length === 0 ||
                selectedCategories.includes(m.category),
        )
        .filter(
            (m) =>
                selectedConditions.length === 0 ||
                selectedConditions.includes(m.condition),
        );

    const activeFilters = selectedCategories.length + selectedConditions.length;

    return (
        <div className="min-h-screen bg-white">
            {/* ── Flash toast ── */}
            {flash?.message && (
                <div
                    className={`fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs text-white shadow-lg border border-green-400 bg-green-500 transition-all duration-500 ${
                        showMessage
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 -translate-y-2 pointer-events-none"
                    }`}
                >
                    <CheckCircle size={14} /> {flash.message}
                </div>
            )}

            <div className="max-w-6xl mx-auto px-5 sm:px-8 py-8">
                {/* ── Header ── */}
                {auth?.user && (
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
                        <div>
                            <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold mb-0.5">
                                Listings
                            </p>
                            <h1 className="text-xl font-extrabold text-gray-900">
                                Trade Materials
                            </h1>
                        </div>
                        {auth?.user?.name !== "Admin" && (
                            <button
                                onClick={openMaterialModal}
                                className="cursor-pointer inline-flex items-center gap-1.5 bg-green-500 hover:bg-green-600 active:scale-95 text-white text-xs font-bold px-4 py-2 rounded-full transition-all duration-200 shadow-sm"
                            >
                                <Upload size={13} /> Upload Material
                            </button>
                        )}
                    </div>
                )}

                <div className="flex flex-col md:flex-row gap-5">
                    {/* ── Filters sidebar ── */}
                    <div className="w-full md:w-48 shrink-0">
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="md:hidden w-full flex items-center justify-between px-4 py-2 rounded-lg bg-gray-100 text-xs font-semibold text-gray-700 mb-2"
                        >
                            <span className="flex items-center gap-1.5">
                                <Filter size={13} /> Filters
                                {activeFilters > 0 && (
                                    <span className="ml-1 px-1.5 py-0.5 rounded-full bg-green-500 text-white text-xs">
                                        {activeFilters}
                                    </span>
                                )}
                            </span>
                            {showFilters ? (
                                <ChevronUp size={14} />
                            ) : (
                                <ChevronDown size={14} />
                            )}
                        </button>

                        <div
                            className={`bg-white border border-gray-100 rounded-xl p-4 ${showFilters ? "block" : "hidden md:block"}`}
                        >
                            <div className="flex items-center justify-between mb-3">
                                <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest">
                                    Filters
                                </p>
                                {activeFilters > 0 && (
                                    <button
                                        onClick={() => {
                                            setSelectedCategories([]);
                                            setSelectedConditions([]);
                                        }}
                                        className="text-xs text-gray-400 hover:text-red-500 transition-colors"
                                    >
                                        Clear all
                                    </button>
                                )}
                            </div>

                            {/* Categories */}
                            <div className="mb-4">
                                <p className="text-xs font-semibold text-gray-700 mb-2">
                                    Category
                                </p>
                                <div className="space-y-1.5">
                                    {CATEGORIES.map((c) => (
                                        <label
                                            key={c}
                                            className="flex items-center gap-2 text-xs text-gray-600 cursor-pointer"
                                        >
                                            <input
                                                type="checkbox"
                                                className="rounded border-gray-300 text-green-500 focus:ring-green-400"
                                                checked={selectedCategories.includes(
                                                    c,
                                                )}
                                                onChange={() =>
                                                    toggleFilter(
                                                        selectedCategories,
                                                        setSelectedCategories,
                                                        c,
                                                    )
                                                }
                                            />
                                            {c}
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Condition */}
                            <div>
                                <p className="text-xs font-semibold text-gray-700 mb-2">
                                    Condition
                                </p>
                                <div className="space-y-1.5">
                                    {CONDITIONS.map((c) => (
                                        <label
                                            key={c}
                                            className="flex items-center gap-2 text-xs text-gray-600 cursor-pointer"
                                        >
                                            <input
                                                type="checkbox"
                                                className="rounded border-gray-300 text-green-500 focus:ring-green-400"
                                                checked={selectedConditions.includes(
                                                    c,
                                                )}
                                                onChange={() =>
                                                    toggleFilter(
                                                        selectedConditions,
                                                        setSelectedConditions,
                                                        c,
                                                    )
                                                }
                                            />
                                            {c}
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ── Main content ── */}
                    <div className="flex-1 min-w-0">
                        {/* Search + view toggle */}
                        <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center mb-4">
                            <div className="relative flex-1 w-full">
                                <input
                                    type="text"
                                    placeholder="Search materials..."
                                    value={searchQuery}
                                    onChange={(e) =>
                                        setSearchQuery(e.target.value)
                                    }
                                    className="w-full text-sm px-4 py-2 pl-9 border border-gray-200 rounded-lg focus:outline-none focus:border-green-400 transition-colors"
                                />
                                <Search
                                    size={14}
                                    className="absolute left-3 top-2.5 text-gray-400"
                                />
                            </div>
                            <div className="flex items-center gap-1.5 shrink-0">
                                <button
                                    onClick={() => setView("grid")}
                                    className={`p-1.5 rounded-lg transition-colors ${view === "grid" ? "bg-green-100 text-green-600" : "text-gray-400 hover:bg-gray-100"}`}
                                >
                                    <Grid size={16} />
                                </button>
                                <button
                                    onClick={() => setView("list")}
                                    className={`p-1.5 rounded-lg transition-colors ${view === "list" ? "bg-green-100 text-green-600" : "text-gray-400 hover:bg-gray-100"}`}
                                >
                                    <List size={16} />
                                </button>
                            </div>
                        </div>

                        {/* Results count */}
                        <p className="text-xs text-gray-400 mb-3">
                            {filteredMaterials.length} material
                            {filteredMaterials.length !== 1 ? "s" : ""} found
                        </p>

                        {/* ── Cards ── */}
                        {filteredMaterials.length > 0 ? (
                            <div
                                className={
                                    view === "grid"
                                        ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                                        : "flex flex-col gap-3"
                                }
                            >
                                {filteredMaterials.map((material) => (
                                    <div
                                        key={material.id}
                                        className="group bg-white flex flex-col rounded-xl border border-gray-100 overflow-hidden hover:border-green-200 hover:shadow-md hover:shadow-green-50 transition-all duration-200"
                                    >
                                        {material.image && (
                                            <div className="overflow-hidden h-36 bg-gray-50">
                                                <img
                                                    src={`/storage/${JSON.parse(material.image)[0]}`}
                                                    alt={material.material_name}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                />
                                            </div>
                                        )}

                                        <div className="p-3 flex flex-col gap-2 flex-grow">
                                            <div className="flex items-center justify-between">
                                                <span
                                                    className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${TAG_STYLES[material.forbdt] || "bg-gray-50 text-gray-600 border-gray-200"}`}
                                                >
                                                    For {material.forbdt}
                                                </span>
                                                <p className="text-xs text-gray-400">
                                                    📍 {material.location}
                                                </p>
                                            </div>

                                            <h3 className="text-sm font-bold text-gray-800 line-clamp-1">
                                                {material.material_name}
                                            </h3>
                                            <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed flex-grow">
                                                {material.description}
                                            </p>

                                            <div className="flex items-center justify-between mt-1">
                                                {material.forbdt === "Sale" && (
                                                    <p className="text-sm font-extrabold text-green-600">
                                                        ₱{" "}
                                                        {Number(
                                                            material.price,
                                                        ).toLocaleString()}
                                                    </p>
                                                )}
                                                <p className="text-xs text-gray-400 ml-auto">
                                                    Qty: {material.quantity}
                                                </p>
                                            </div>

                                            <div className="flex items-center gap-2 mt-1">
                                                <Link
                                                    href={`/materials/${material.id}`}
                                                    className="flex-1"
                                                >
                                                    <button className="w-full py-2 rounded-lg text-xs font-bold text-white bg-green-500 hover:bg-green-600 active:scale-95 transition-all duration-200">
                                                        View Details
                                                    </button>
                                                </Link>

                                                {auth?.user?.name ===
                                                    "Admin" && (
                                                    <Link
                                                        href={`/uploads/delete/${material.id}`}
                                                    >
                                                        <button
                                                            className="p-2 rounded-lg bg-red-50 border border-red-200 text-red-500 hover:bg-red-100 transition-all duration-200"
                                                            onClick={(e) => {
                                                                if (
                                                                    !window.confirm(
                                                                        "Delete this item?",
                                                                    )
                                                                )
                                                                    e.preventDefault();
                                                            }}
                                                        >
                                                            <Trash2 size={13} />
                                                        </button>
                                                    </Link>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center gap-3 py-20 text-center">
                                <span className="text-4xl">📦</span>
                                <p className="text-sm text-gray-400">
                                    No materials found.
                                </p>
                                {activeFilters > 0 && (
                                    <button
                                        onClick={() => {
                                            setSelectedCategories([]);
                                            setSelectedConditions([]);
                                        }}
                                        className="text-xs text-green-600 border border-green-200 px-4 py-2 rounded-full hover:bg-green-50 transition"
                                    >
                                        Clear filters
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
