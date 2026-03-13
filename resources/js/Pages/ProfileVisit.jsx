import { usePage, Link, router } from "@inertiajs/react";
import { useState, useEffect } from "react";
import { useModal } from "@/context/ModalContext";
import {
    Search,
    Grid,
    List,
    Filter,
    CheckCircle,
    ChevronDown,
    ChevronUp,
    Star,
    MoreHorizontal,
    MessageCircle,
    ShieldOff,
    ShieldCheck,
    UserX,
} from "lucide-react";

export default function ProfileVisit({
    label = "Reviews",
    placeholder = "Write a Review",
}) {
    const { auth, materials, reviews, user, flash } = usePage().props;
    const [openReview, setOpenReview] = useState(false);
    const [openMenu, setOpenMenu] = useState(false);
    const [view, setView] = useState("grid");
    const [showMessage, setShowMessage] = useState(false);
    const [open, setOpen] = useState(false);
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedConditions, setSelectedConditions] = useState([]);
    const [showFilters, setShowFilters] = useState(false);

    const authUserId = auth?.user?.id ?? null;
    const isBlocked = authUserId ? user.blocked?.includes(authUserId) : false;

    const reasons = [
        "Spam or misleading",
        "Harassment or bullying",
        "Hate speech",
        "Scam or fraud",
        "Inappropriate content",
        "Fake account",
    ];

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

    const tagStyles = {
        Trade: "bg-blue-50 text-blue-600 border-blue-200",
        Sale: "bg-red-50 text-red-600 border-red-200",
        Donation: "bg-green-50 text-green-600 border-green-200",
    };

    useEffect(() => {
        if (flash?.message) {
            setShowMessage(true);
            const t = setTimeout(() => setShowMessage(false), 2500);
            return () => clearTimeout(t);
        }
    }, [flash]);

    const submitReview = () => {
        router.post(
            `/reviews/${user.id}`,
            { comment, rating },
            {
                onSuccess: () => {
                    setRating(0);
                    setHover(0);
                    setComment("");
                },
            },
        );
    };

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

    return (
        <div className="max-w-5xl mx-auto px-5 sm:px-8 py-8">
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

            {/* ── Cover + Avatar ── */}
            <div className="relative">
                <div className="h-32 sm:h-40 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 overflow-hidden">
                    {/* Menu trigger */}
                    <div className="absolute top-3 right-3">
                        <button
                            onClick={() => setOpenMenu(!openMenu)}
                            className="flex items-center justify-center w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all duration-200"
                        >
                            <MoreHorizontal size={16} />
                        </button>

                        {openMenu && (
                            <div className="absolute right-0 mt-1 w-44 bg-white rounded-xl border border-gray-100 shadow-lg z-50 overflow-hidden">
                                <Link href="/materials">
                                    <button className="w-full text-left px-4 py-2.5 text-xs text-gray-600 hover:bg-gray-50 transition-colors">
                                        ← Back to listings
                                    </button>
                                </Link>

                                {authUserId && authUserId !== user.id && (
                                    <>
                                        <div className="border-t border-gray-100" />

                                        {/* Report */}
                                        <div className="relative">
                                            <button
                                                onClick={() => setOpen(!open)}
                                                className="w-full text-left px-4 py-2.5 text-xs text-gray-600 hover:bg-gray-50 transition-colors"
                                            >
                                                Report user
                                            </button>
                                            {open && (
                                                <div className="absolute right-full top-0 w-48 bg-white border border-gray-100 rounded-xl shadow-lg z-50 overflow-hidden mr-1">
                                                    {reasons.map(
                                                        (reason, i) => (
                                                            <button
                                                                key={i}
                                                                onClick={() => {
                                                                    setOpen(
                                                                        false,
                                                                    );
                                                                    router.post(
                                                                        "/report-user",
                                                                        {
                                                                            user_id:
                                                                                user.id,
                                                                            reason,
                                                                        },
                                                                    );
                                                                }}
                                                                className="w-full text-left px-4 py-2 text-xs text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors"
                                                            >
                                                                {reason}
                                                            </button>
                                                        ),
                                                    )}
                                                </div>
                                            )}
                                        </div>

                                        {/* Block / Unblock */}
                                        {!isBlocked ? (
                                            <button
                                                onClick={() =>
                                                    router.post("/block-user", {
                                                        user_id: user.id,
                                                    })
                                                }
                                                className="w-full text-left px-4 py-2.5 text-xs text-red-500 hover:bg-red-50 transition-colors"
                                            >
                                                Block user
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() =>
                                                    router.post(
                                                        "/unblock-user",
                                                        { user_id: user.id },
                                                    )
                                                }
                                                className="w-full text-left px-4 py-2.5 text-xs text-green-600 hover:bg-green-50 transition-colors"
                                            >
                                                Unblock user
                                            </button>
                                        )}
                                    </>
                                )}

                                {!authUserId && (
                                    <p className="text-center text-xs text-gray-400 py-2">
                                        Login to access options
                                    </p>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Avatar */}
                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2">
                    <img
                        src={
                            user.profile_image
                                ? `/storage/${user.profile_image}`
                                : "/images/user.png"
                        }
                        alt={user.name}
                        className="w-20 h-20 rounded-full border-4 border-white object-cover shadow-md"
                    />
                </div>
            </div>

            {/* ── Profile card ── */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mt-14">
                {/* Disabled banner */}
                {user.status === "disabled" && (
                    <div className="mb-4 text-center text-xs font-semibold text-red-600 bg-red-50 border border-red-200 py-2 rounded-lg">
                        This account has been disabled
                    </div>
                )}

                {/* Name + actions */}
                <div className="flex flex-col items-center gap-3 mb-6">
                    <h1 className="text-lg font-extrabold text-gray-900">
                        {user.name}
                    </h1>

                    <div className="flex flex-wrap gap-2 justify-center">
                        {authUserId && authUserId !== user.id && !isBlocked && (
                            <Link href={`/direct/${50}/${user.id}`}>
                                <button className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white transition-all duration-200">
                                    <MessageCircle size={13} /> Message
                                </button>
                            </Link>
                        )}
                        {isBlocked && (
                            <span className="text-xs font-semibold text-red-500 border border-red-200 px-3 py-1.5 rounded-full bg-red-50">
                                Blocked
                            </span>
                        )}
                        {!authUserId && (
                            <span className="text-xs text-gray-400">
                                Login to message
                            </span>
                        )}
                        {auth?.user?.name === "Admin" && (
                            <Link
                                href={`/${user.status === "enabled" ? "disable" : "enable"}/${user.id}`}
                            >
                                <button
                                    className={`inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-full transition-all duration-200 ${
                                        user.status === "enabled"
                                            ? "bg-red-500 hover:bg-red-600 text-white"
                                            : "bg-green-500 hover:bg-green-600 text-white"
                                    }`}
                                >
                                    {user.status === "enabled" ? (
                                        <>
                                            <UserX size={13} /> Disable
                                        </>
                                    ) : (
                                        <>
                                            <ShieldCheck size={13} /> Enable
                                        </>
                                    )}
                                </button>
                            </Link>
                        )}
                    </div>
                </div>

                {/* Details */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-gray-100 pt-5">
                    {[
                        { label: "Email", value: user.email },
                        {
                            label: "Address",
                            value: user.address || "No address provided",
                        },
                        {
                            label: "Contact",
                            value: user.contact || "No contact provided",
                        },
                    ].map((d) => (
                        <div key={d.label}>
                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-0.5">
                                {d.label}
                            </p>
                            <p className="text-sm text-gray-700">{d.value}</p>
                        </div>
                    ))}
                </div>

                {/* ── Reviews ── */}
                <div className="mt-6 border-t border-gray-100 pt-5">
                    <button
                        type="button"
                        onClick={() => setOpenReview(!openReview)}
                        className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
                    >
                        <span className="text-sm font-semibold text-gray-700">
                            {label}
                        </span>
                        {openReview ? (
                            <ChevronUp size={16} className="text-gray-400" />
                        ) : (
                            <ChevronDown size={16} className="text-gray-400" />
                        )}
                    </button>

                    <div
                        className={`overflow-hidden transition-all duration-300 ${openReview ? "max-h-[1000px] mt-3" : "max-h-0"}`}
                    >
                        {/* Review list */}
                        <div className="flex flex-col gap-3 mb-4">
                            {reviews.length === 0 && (
                                <p className="text-xs text-center text-gray-400 py-4">
                                    No reviews yet.
                                </p>
                            )}
                            {reviews.map((review) => (
                                <div
                                    key={review.id}
                                    className="p-3 rounded-xl bg-gray-50 border border-gray-100"
                                >
                                    <div className="flex items-center gap-2 mb-1">
                                        <p className="text-xs font-semibold text-gray-800">
                                            {review.owner?.name}
                                        </p>
                                        <div className="flex gap-0.5">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <Star
                                                    key={star}
                                                    size={12}
                                                    className={
                                                        review.rating >= star
                                                            ? "fill-yellow-400 text-yellow-400"
                                                            : "text-gray-300"
                                                    }
                                                />
                                            ))}
                                        </div>
                                    </div>
                                    <p className="text-xs text-gray-600 leading-relaxed">
                                        {review.comment}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Write review */}
                        {authUserId && authUserId !== user.id && (
                            <div className="border-t border-gray-100 pt-4">
                                <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">
                                    Leave a review
                                </p>
                                <div className="flex gap-1 mb-3">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Star
                                            key={star}
                                            size={20}
                                            className={`cursor-pointer transition-colors ${(hover || rating) >= star ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                                            onMouseEnter={() => setHover(star)}
                                            onMouseLeave={() => setHover(0)}
                                            onClick={() => setRating(star)}
                                        />
                                    ))}
                                    {rating > 0 && (
                                        <span className="ml-2 text-xs text-gray-500">
                                            {rating}/5
                                        </span>
                                    )}
                                </div>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={comment}
                                        onChange={(e) =>
                                            setComment(e.target.value)
                                        }
                                        placeholder={placeholder}
                                        className="flex-1 text-sm px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-green-400 transition-colors"
                                    />
                                    <button
                                        onClick={submitReview}
                                        disabled={!rating || !comment}
                                        className="px-4 py-2 rounded-lg text-xs font-bold text-white bg-green-500 hover:bg-green-600 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed transition-all duration-200"
                                    >
                                        Submit
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* ── Materials section ── */}
            <div className="mt-6">
                <div className="flex flex-col md:flex-row gap-5">
                    {/* Filters sidebar */}
                    <div className="w-full md:w-48 shrink-0">
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="md:hidden w-full flex items-center justify-between px-4 py-2 rounded-lg bg-gray-100 text-sm font-semibold text-gray-700 mb-2"
                        >
                            <span className="flex items-center gap-1.5">
                                <Filter size={14} /> Filters
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
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">
                                Filters
                            </p>

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
                                                    setSelectedCategories(
                                                        (prev) =>
                                                            prev.includes(c)
                                                                ? prev.filter(
                                                                      (x) =>
                                                                          x !==
                                                                          c,
                                                                  )
                                                                : [...prev, c],
                                                    )
                                                }
                                            />
                                            {c}
                                        </label>
                                    ))}
                                </div>
                            </div>

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
                                                    setSelectedConditions(
                                                        (prev) =>
                                                            prev.includes(c)
                                                                ? prev.filter(
                                                                      (x) =>
                                                                          x !==
                                                                          c,
                                                                  )
                                                                : [...prev, c],
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

                    {/* Main content */}
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
                            <div className="flex items-center gap-1.5">
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

                        {/* Material cards */}
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
                                            <div className="overflow-hidden h-36">
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
                                                    className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${tagStyles[material.forbdt] || "bg-gray-50 text-gray-600 border-gray-200"}`}
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

                                            <Link
                                                href={`/materials/${material.id}`}
                                            >
                                                <button className="w-full mt-1 py-2 rounded-lg text-xs font-bold text-white bg-green-500 hover:bg-green-600 active:scale-95 transition-all duration-200">
                                                    View Details
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center gap-2 py-16 text-center">
                                <span className="text-3xl">📦</span>
                                <p className="text-sm text-gray-400">
                                    No materials found.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
