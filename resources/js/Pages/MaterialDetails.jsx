import { useForm, Link, usePage, router } from "@inertiajs/react";
import { useState, useEffect } from "react";
import {
    ArrowLeft,
    ShoppingCart,
    CheckCircle,
    X,
    AlertCircle,
    Trash2,
    MessageCircle,
} from "lucide-react";

export default function Show({ material, user }) {
    const [open, setOpen] = useState(false);
    const { auth, flash } = usePage().props;
    const [showMessage, setShowMessage] = useState(false);
    const authUserId = auth?.user?.id ?? null;
    const isBlocked = authUserId ? user.blocked?.includes(authUserId) : false;
    const images = material.image ? JSON.parse(material.image) : [];
    const [mainImage, setMainImage] = useState(images[0]);
    const [buttonText, setButtonText] = useState("");

    const { data, setData, post, processing } = useForm({
        material_id: material.id,
        quantity: 1,
        user_idx: user.id,
    });

    const reasons = [
        "Incorrect Item Listed",
        "Incorrect Product Name",
        "Incorrect or Misleading Image",
        "Scam or Fraudulent Activity",
        "Poor Quality or Damaged",
        "Counterfeit or Fake Product",
    ];

    const tagStyles = {
        Sale: {
            bg: "bg-green-50",
            text: "text-green-700",
            border: "border-green-200",
            btn: "bg-green-500 hover:bg-green-600",
        },
        Trade: {
            bg: "bg-blue-50",
            text: "text-blue-700",
            border: "border-blue-200",
            btn: "bg-blue-500 hover:bg-blue-600",
        },
        Donation: {
            bg: "bg-purple-50",
            text: "text-purple-700",
            border: "border-purple-200",
            btn: "bg-purple-500 hover:bg-purple-600",
        },
    };
    const tag = tagStyles[material.forbdt] || tagStyles.Sale;

    useEffect(() => {
        if (material.forbdt === "Sale") setButtonText("Add to Cart");
        else if (material.forbdt === "Trade") setButtonText("Trade");
        else if (material.forbdt === "Donation") setButtonText("Inquire");
    }, [material.forbdt]);

    useEffect(() => {
        if (flash?.message) {
            setShowMessage(true);
            const timer = setTimeout(() => setShowMessage(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [flash]);

    const handleClick = (e) => {
        if (data.quantity > material.quantity) {
            e.preventDefault();
            alert(`You can only order up to ${material.quantity}.`);
        }
    };

    function addToCart(e) {
        e.preventDefault();
        if (data.quantity > material.quantity) {
            alert(`You can only order up to ${material.quantity}.`);
            return;
        }
        post("/cart/add");
    }

    function addToDonate(e) {
        e.preventDefault();
        post("/donate/submit");
    }

    return (
        <>
            {/* ── Flash toast ── */}
            {flash?.message && (
                <div
                    className={`fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs text-white shadow-lg border transition-all duration-500 ${
                        showMessage
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 -translate-y-2 pointer-events-none"
                    } ${
                        /(added|success|updated|deleted)/i.test(flash.message)
                            ? "bg-green-500 border-green-400"
                            : "bg-red-500 border-red-400"
                    }`}
                >
                    {/(added|success|updated|deleted)/i.test(flash.message) ? (
                        <CheckCircle size={14} />
                    ) : (
                        <X size={14} />
                    )}
                    <span>{flash.message}</span>
                </div>
            )}

            <div className="max-w-5xl mx-auto px-5 sm:px-8 py-10">
                {/* ── Back button ── */}
                <Link
                    href="/back"
                    className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-green-600 transition-colors duration-200 mb-6"
                >
                    <ArrowLeft size={14} /> Back to listings
                </Link>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    {/* ══ LEFT — Images ══ */}
                    <div className="p-5 flex flex-col gap-3">
                        {/* Report button */}
                        {auth?.user && auth.user.id !== user.id && (
                            <div className="relative w-fit">
                                <button
                                    onClick={() => setOpen(!open)}
                                    className="flex items-center gap-1 text-xs text-gray-400 hover:text-red-500 transition-colors duration-200"
                                >
                                    <AlertCircle size={14} /> Report
                                </button>
                                {open && (
                                    <div className="absolute top-6 left-0 w-52 bg-white border border-gray-100 rounded-xl shadow-lg z-50 overflow-hidden">
                                        {reasons.map((reason, i) => (
                                            <button
                                                key={i}
                                                onClick={() => {
                                                    setOpen(false);
                                                    router.post(
                                                        "/report-item",
                                                        {
                                                            user_id: user.id,
                                                            reason,
                                                            itemer: material.id,
                                                        },
                                                    );
                                                }}
                                                className="w-full text-left px-4 py-2.5 text-xs text-gray-600 hover:bg-green-50 hover:text-green-700 transition-colors duration-150"
                                            >
                                                {reason}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Main image */}
                        <div className="rounded-xl overflow-hidden bg-gray-50 border border-gray-100">
                            <img
                                src={`/storage/${mainImage}`}
                                alt={material.material_name}
                                className="w-full h-64 md:h-72 object-cover"
                            />
                        </div>

                        {/* Thumbnails */}
                        {images.length > 1 && (
                            <div className="flex gap-2 flex-wrap">
                                {images.slice(0, 5).map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setMainImage(img)}
                                        className={`w-14 h-14 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                                            img === mainImage
                                                ? "border-green-500"
                                                : "border-transparent hover:border-gray-300"
                                        }`}
                                    >
                                        <img
                                            src={`/storage/${img}`}
                                            alt={`Thumbnail ${idx + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* ══ RIGHT — Details ══ */}
                    <div className="p-5 flex flex-col gap-4 border-l border-gray-100">
                        {/* Admin delete */}
                        {auth?.user?.name === "Admin" && (
                            <Link
                                href={`/uploads/delete/${material.id}`}
                                className="w-fit"
                            >
                                <button
                                    className="flex items-center gap-1.5 text-xs text-red-500 border border-red-200 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-all duration-200"
                                    onClick={(e) => {
                                        if (
                                            !window.confirm("Delete this item?")
                                        )
                                            e.preventDefault();
                                    }}
                                >
                                    <Trash2 size={13} /> Delete listing
                                </button>
                            </Link>
                        )}

                        {/* Seller */}
                        <Link href={`/profile-view/${user.id}`}>
                            <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-green-50 border border-gray-100 hover:border-green-200 transition-all duration-200">
                                <img
                                    src={`/storage/${user.profile_image}`}
                                    alt={user.name}
                                    className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
                                />
                                <div>
                                    <p className="text-sm font-semibold text-gray-800">
                                        {user.name}
                                    </p>
                                    <p className="text-xs text-gray-400">
                                        {user.contact}
                                    </p>
                                </div>
                                <ArrowLeft
                                    size={12}
                                    className="ml-auto text-gray-300 rotate-180"
                                />
                            </div>
                        </Link>

                        {/* Type badge */}
                        <span
                            className={`inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-full border w-fit ${tag.bg} ${tag.text} ${tag.border}`}
                        >
                            For {material.forbdt}
                        </span>

                        {/* Title */}
                        <h1 className="text-xl font-extrabold text-gray-900 leading-tight">
                            {material.material_name}
                        </h1>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2">
                            {[
                                material.category,
                                material.condition,
                                "Pickup / Delivery",
                            ].map((t) => (
                                <span
                                    key={t}
                                    className="text-xs px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 border border-gray-200"
                                >
                                    {t}
                                </span>
                            ))}
                        </div>

                        {/* Price */}
                        {material.forbdt === "Sale" && (
                            <p className="text-2xl font-extrabold text-green-600">
                                ₱ {Number(material.price).toLocaleString()}
                            </p>
                        )}

                        {/* Description */}
                        <div className="text-sm text-gray-500 leading-relaxed border-t border-gray-100 pt-3">
                            <p className="text-xs font-semibold text-gray-700 uppercase tracking-widest mb-1">
                                Description
                            </p>
                            <p>{material.description}</p>
                        </div>

                        {/* Stock + Quantity */}
                        <div className="flex flex-col gap-2 border-t border-gray-100 pt-3">
                            <p className="text-xs text-gray-500">
                                <span className="font-semibold text-gray-700">
                                    Availability:
                                </span>{" "}
                                <span
                                    className={
                                        material.quantity > 0
                                            ? "text-green-600 font-semibold"
                                            : "text-red-500 font-semibold"
                                    }
                                >
                                    {material.quantity > 0
                                        ? "In Stock"
                                        : "Out of Stock"}
                                </span>
                                <span className="text-gray-400 ml-1">
                                    ({material.quantity} available)
                                </span>
                            </p>

                            <div className="flex items-center gap-3">
                                <label className="text-xs font-semibold text-gray-700">
                                    Quantity
                                </label>
                                <input
                                    type="number"
                                    min="1"
                                    max={material.quantity}
                                    value={data.quantity}
                                    onChange={(e) =>
                                        setData("quantity", e.target.value)
                                    }
                                    className="w-20 h-8 text-sm border border-gray-200 rounded-lg px-2 focus:outline-none focus:border-green-400 transition-colors"
                                />
                            </div>
                        </div>

                        {/* Action buttons */}
                        <div className="flex flex-wrap gap-2 pt-1">
                            {auth?.user?.id === user.id ? (
                                <p className="text-xs text-gray-400">
                                    You can edit this in My Uploads.
                                </p>
                            ) : !isBlocked ? (
                                <>
                                    {material.forbdt === "Sale" && (
                                        <button
                                            onClick={addToCart}
                                            disabled={processing}
                                            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-sm font-bold ${tag.btn} active:scale-95 transition-all duration-200 shadow-sm`}
                                        >
                                            <ShoppingCart size={15} />{" "}
                                            {buttonText}
                                        </button>
                                    )}

                                    {material.forbdt === "Trade" && (
                                        <Link
                                            href="/trade/create"
                                            data={{
                                                material,
                                                quantity: data.quantity,
                                            }}
                                            onClick={handleClick}
                                            method="get"
                                            as="button"
                                            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-sm font-bold ${tag.btn} active:scale-95 transition-all duration-200 shadow-sm`}
                                        >
                                            <ShoppingCart size={15} /> Trade
                                        </Link>
                                    )}

                                    {material.forbdt === "Donation" && (
                                        <button
                                            onClick={addToDonate}
                                            disabled={processing}
                                            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-sm font-bold ${tag.btn} active:scale-95 transition-all duration-200 shadow-sm`}
                                        >
                                            <ShoppingCart size={15} />{" "}
                                            {buttonText}
                                        </button>
                                    )}

                                    {auth?.user && (
                                        <Link
                                            href={`/message/${material.id}`}
                                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 active:scale-95 transition-all duration-200"
                                        >
                                            <MessageCircle size={15} /> Message
                                        </Link>
                                    )}
                                </>
                            ) : (
                                <p className="text-xs text-red-500 font-semibold">
                                    This listing is unavailable.
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
