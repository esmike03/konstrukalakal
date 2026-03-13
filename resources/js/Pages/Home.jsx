import { Link, usePage, Head } from "@inertiajs/react";
import { useState, useEffect } from "react";
import { useModal } from "@/context/ModalContext";
import { CheckCircle, XCircle } from "lucide-react";
export default function Home() {
    const { component } = usePage();
    const { materials } = usePage().props;
    const { flash } = usePage().props;
    const [showMessage, setShowMessage] = useState(false);
    const { openRegisterModal } = useModal();

    const { props } = usePage();
    const user = props.auth?.user;
    useEffect(() => {
        if (flash?.message) {
            setShowMessage(true); // Show the message
            const timer = setTimeout(() => {
                setShowMessage(false); // Hide after 2 seconds
            }, 10000);

            return () => clearTimeout(timer);
        }
    }, [flash]);

    return (
        <>
            <Head title={component} />
            <section className="relative overflow-hidden bg-white">
                {/* ── Flash toast ── */}
                {flash?.message && (
                    <div
                        className={`fixed bottom-5 right-5 z-50 flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs text-white shadow-lg border transition-all duration-500 ${
                            showMessage
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-4 pointer-events-none"
                        } ${
                            flash.message.toLowerCase().includes("disabled")
                                ? "bg-red-500 border-red-400"
                                : "bg-green-500 border-green-400"
                        }`}
                    >
                        {flash.message.toLowerCase().includes("disabled") ? (
                            <XCircle size={14} />
                        ) : (
                            <CheckCircle size={14} />
                        )}
                        <span>{flash.message}</span>
                    </div>
                )}

                {/* ── Background grid ── */}
                <div
                    className="absolute inset-0 -z-10"
                    style={{
                        backgroundImage: `
        linear-gradient(rgba(22,163,74,0.05) 1px, transparent 1px),
        linear-gradient(90deg, rgba(22,163,74,0.05) 1px, transparent 1px)
      `,
                        backgroundSize: "40px 40px",
                    }}
                />

                {/* ── Soft glow ── */}
                <div
                    className="absolute top-0 right-0 w-72 h-72 rounded-full -z-10"
                    style={{
                        background:
                            "radial-gradient(circle, rgba(34,197,94,0.1) 0%, transparent 70%)",
                    }}
                />

                <div className="max-w-5xl mx-auto px-5 sm:px-8 py-12 sm:py-16">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                        {/* ══ LEFT — Text ══ */}
                        <div className="flex flex-col gap-4 text-center lg:text-left">
                            {/* Eyebrow */}
                            <div className="flex justify-center lg:justify-start">
                                <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.15em] uppercase px-3 py-1 rounded-full border border-green-200 bg-green-50 text-green-600">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                    Buy · Sell · Donate · Trade
                                </span>
                            </div>

                            {/* Headline */}
                            <div>
                                <h1 className="text-3xl sm:text-4xl lg:text-4xl xl:text-5xl font-extrabold leading-tight tracking-tight text-gray-900">
                                    Sustainable
                                    <span className="text-green-500">
                                        {" "}
                                        Construction
                                    </span>
                                </h1>
                                <h1 className="text-3xl sm:text-4xl lg:text-4xl xl:text-5xl font-extrabold leading-tight tracking-tight text-gray-900">
                                    Materials
                                    <span className="text-green-500">
                                        {" "}
                                        Exchange
                                    </span>
                                </h1>
                            </div>

                            {/* Description */}
                            <p className="text-sm leading-relaxed text-gray-500 max-w-sm mx-auto lg:mx-0">
                                Join our community of builders and contribute to
                                sustainable construction practices through
                                material trading and donations.
                            </p>

                            {/* Stat pills */}
                            <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                                {[
                                    { icon: "♻️", label: "1,000+ recycled" },
                                    { icon: "🏗️", label: "Active builders" },
                                    { icon: "🌱", label: "Eco-friendly" },
                                ].map((s) => (
                                    <span
                                        key={s.label}
                                        className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full bg-green-50 text-green-700 border border-green-200"
                                    >
                                        {s.icon} {s.label}
                                    </span>
                                ))}
                            </div>

                            {/* CTA */}
                            <div className="flex flex-col sm:flex-row gap-2.5 justify-center lg:justify-start mt-1">
                                <Link
                                    href="#second"
                                    className="px-6 py-2.5 rounded-full bg-green-500 hover:bg-green-600 active:scale-95 text-white font-bold text-xs tracking-widest uppercase transition-all duration-200 shadow-md shadow-green-100 text-center"
                                >
                                    Get Started
                                </Link>
                                <Link
                                    href="about"
                                    className="px-6 py-2.5 rounded-full border-2 border-green-500 text-green-600 font-bold text-xs tracking-widest uppercase hover:bg-green-500 hover:text-white active:scale-95 transition-all duration-200 text-center"
                                >
                                    Learn More
                                </Link>
                            </div>

                            {/* Trust row */}
                            <div className="flex items-center gap-2.5 justify-center lg:justify-start">
                                <div className="flex -space-x-2">
                                    {[
                                        "bg-green-400",
                                        "bg-emerald-500",
                                        "bg-teal-400",
                                        "bg-lime-500",
                                    ].map((c, i) => (
                                        <div
                                            key={i}
                                            className={`w-6 h-6 rounded-full ${c} border-2 border-white flex items-center justify-center text-white text-xs font-bold`}
                                        >
                                            {["B", "S", "C", "A"][i]}
                                        </div>
                                    ))}
                                </div>
                                <p className="text-xs text-gray-400">
                                    Trusted by{" "}
                                    <span className="font-semibold text-gray-600">
                                        500+
                                    </span>{" "}
                                    builders
                                </p>
                            </div>
                        </div>

                        {/* ══ RIGHT — Visual ══ */}
                        <div className="relative flex items-center justify-center h-64 sm:h-72 lg:h-80">
                            {/* Top-left image */}
                            <img
                                src="/images/const1.jpg"
                                alt="Construction material"
                                className="absolute top-0 left-4 w-32 h-32 sm:w-36 sm:h-36 lg:w-44 lg:h-44 object-cover rounded-xl shadow-md border-b-4 border-r-4 border-green-500 rotate-6 hidden sm:block"
                            />

                            {/* Bottom-right image */}
                            <img
                                src="/images/const2.jpg"
                                alt="Construction material"
                                className="absolute bottom-0 right-4 w-32 h-32 sm:w-36 sm:h-36 lg:w-44 lg:h-44 object-cover rounded-xl shadow-md border-t-4 border-l-4 border-green-500 -rotate-6 hidden sm:block"
                            />

                            {/* Center card */}
                            <div
                                className="relative z-10 flex flex-col items-center gap-2.5 px-6 py-5 rounded-2xl text-center shadow-xl -rotate-1 w-56 sm:w-60 border border-gray-100"
                                style={{
                                    background: "rgba(255,255,255,0.92)",
                                    backdropFilter: "blur(12px)",
                                }}
                            >
                                <span
                                    className="w-2 h-2 rounded-full bg-green-400"
                                    style={{
                                        boxShadow:
                                            "0 0 0 4px rgba(74,222,128,0.15), 0 0 10px rgba(74,222,128,0.4)",
                                    }}
                                />
                                <div>
                                    <h2 className="text-lg font-extrabold text-gray-900 leading-tight">
                                        Eco-friendly
                                        <br />
                                        Impact
                                    </h2>
                                    <p className="text-xs text-gray-400 mt-0.5">
                                        Join the circular economy
                                    </p>
                                </div>
                                <div className="w-full px-3 py-2 rounded-lg bg-green-50 border border-green-100">
                                    <p className="text-xl font-extrabold text-green-500">
                                        1,000+
                                    </p>
                                    <p className="text-xs text-gray-400">
                                        materials recycled
                                    </p>
                                </div>
                                <div className="flex gap-1.5 flex-wrap justify-center">
                                    {["🌱 Sustainable", "🔄 Circular"].map(
                                        (t) => (
                                            <span
                                                key={t}
                                                className="text-xs px-2 py-0.5 rounded-full bg-green-50 text-green-600 border border-green-200"
                                            >
                                                {t}
                                            </span>
                                        ),
                                    )}
                                </div>
                            </div>

                            {/* Decorative ring */}
                            <div className="absolute inset-0 m-auto w-52 h-52 rounded-full border border-green-100 -z-10" />
                        </div>
                    </div>
                </div>
            </section>

            <section
                id="second"
                className="bg-white py-12 relative overflow-hidden"
            >
                {/* Subtle background grid */}
                <div
                    className="absolute inset-0 -z-10"
                    style={{
                        backgroundImage: `
        linear-gradient(rgba(22,163,74,0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(22,163,74,0.03) 1px, transparent 1px)
      `,
                        backgroundSize: "40px 40px",
                    }}
                />

                <div className="max-w-5xl mx-auto px-5 sm:px-8">
                    {/* ── Section header ── */}
                    <div className="flex flex-col items-center gap-1 mb-10">
                        <span className="text-xs font-semibold tracking-[0.2em] uppercase text-green-600">
                            Browse listings
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 text-center">
                            <Link
                                href="/materials"
                                className="hover:text-green-500 transition-colors duration-200"
                            >
                                Featured Materials
                            </Link>
                        </h2>
                        <p className="text-sm text-gray-400 mt-1 text-center max-w-sm">
                            Discover available materials from builders in your
                            community
                        </p>
                        {/* Underline accent */}
                        <div className="w-10 h-0.5 rounded-full bg-green-500 mt-2" />
                    </div>

                    {/* ── Grid ── */}
                    {materials.data && materials.data.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                            {materials.data.map((material) => {
                                const tagStyles = {
                                    Trade: {
                                        bg: "bg-blue-50",
                                        text: "text-blue-600",
                                        border: "border-blue-200",
                                    },
                                    Sale: {
                                        bg: "bg-red-50",
                                        text: "text-red-600",
                                        border: "border-red-200",
                                    },
                                    Donation: {
                                        bg: "bg-green-50",
                                        text: "text-green-600",
                                        border: "border-green-200",
                                    },
                                };
                                const tag = tagStyles[material.forbdt] || {
                                    bg: "bg-gray-50",
                                    text: "text-gray-600",
                                    border: "border-gray-200",
                                };

                                return (
                                    <div
                                        key={material.id}
                                        className="group bg-white flex flex-col rounded-xl border border-gray-100 overflow-hidden hover:border-green-200 hover:shadow-lg hover:shadow-green-50 transition-all duration-200"
                                    >
                                        {/* Image */}
                                        {material.image ? (
                                            <div className="relative overflow-hidden h-40">
                                                <img
                                                    src={`/storage/${JSON.parse(material.image)[0]}`}
                                                    alt={material.materialName}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                />
                                                {/* Type badge over image */}
                                                <span
                                                    className={`absolute top-2.5 left-2.5 text-xs font-semibold px-2.5 py-1 rounded-full border ${tag.bg} ${tag.text} ${tag.border}`}
                                                >
                                                    For {material.forbdt}
                                                </span>
                                            </div>
                                        ) : (
                                            <div className="h-40 bg-gray-50 flex items-center justify-center text-gray-300 text-4xl">
                                                🏗️
                                            </div>
                                        )}

                                        {/* Content */}
                                        <div className="p-4 flex flex-col flex-grow gap-2">
                                            {/* Location */}
                                            <p className="text-xs text-gray-400 flex items-center gap-1">
                                                📍 {material.location}
                                            </p>

                                            {/* Title */}
                                            <h3 className="text-sm font-bold text-gray-800 leading-snug line-clamp-1">
                                                {material.material_name}
                                            </h3>

                                            {/* Description */}
                                            <p className="text-xs text-gray-500 leading-relaxed line-clamp-2 flex-grow">
                                                {material.description}
                                            </p>

                                            {/* Price */}
                                            {material.forbdt === "Sale" && (
                                                <p className="text-base font-extrabold text-green-600">
                                                    ₱{" "}
                                                    {Number(
                                                        material.price,
                                                    ).toLocaleString()}
                                                </p>
                                            )}

                                            {/* CTA */}
                                            <Link
                                                href={`/materials/${material.id}`}
                                                className="mt-1"
                                            >
                                                <button className="w-full py-2 rounded-lg text-xs font-bold tracking-wide uppercase bg-green-500 hover:bg-green-600 active:scale-95 text-white transition-all duration-200">
                                                    View Details
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center gap-3 py-16 text-center">
                            <span className="text-4xl">📦</span>
                            <p className="text-sm text-gray-400">
                                No materials available yet.
                            </p>
                            <Link
                                href="/materials/create"
                                className="text-xs font-semibold text-green-600 border border-green-200 px-4 py-2 rounded-full hover:bg-green-50 transition"
                            >
                                + Post a material
                            </Link>
                        </div>
                    )}

                    {/* ── View all link ── */}
                    {materials.data && materials.data.length > 0 && (
                        <div className="flex justify-center mt-8">
                            <Link
                                href="/materials"
                                className="inline-flex items-center gap-2 text-sm font-semibold text-green-600 border border-green-200 px-6 py-2.5 rounded-full hover:bg-green-50 transition-all duration-200"
                            >
                                View all materials
                                <span className="text-base">→</span>
                            </Link>
                        </div>
                    )}
                </div>
            </section>

            {/* Stats Section */}
            <section className="relative overflow-hidden bg-green-600 py-14">
                {/* Subtle grid overlay */}
                <div
                    className="absolute inset-0 -z-10"
                    style={{
                        backgroundImage: `
        linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
      `,
                        backgroundSize: "40px 40px",
                    }}
                />

                {/* Soft glow blobs */}
                <div
                    className="absolute -top-20 -left-20 w-64 h-64 rounded-full -z-10"
                    style={{
                        background:
                            "radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)",
                    }}
                />
                <div
                    className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full -z-10"
                    style={{
                        background:
                            "radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)",
                    }}
                />

                <div className="max-w-5xl mx-auto px-5 sm:px-8">
                    {/* Header */}
                    <div className="text-center mb-10">
                        <span className="text-xs font-semibold tracking-[0.2em] uppercase text-green-200">
                            by the numbers
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                            Our Impact So Far
                        </h2>
                    </div>

                    {/* Stats grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            {
                                value: "1,000+",
                                label: "Active Users",
                                icon: "👥",
                                accent: "bg-blue-400/15   border-blue-300/20",
                            },
                            {
                                value: "5,000+",
                                label: "Materials Traded",
                                icon: "🔄",
                                accent: "bg-yellow-400/15 border-yellow-300/20",
                            },
                            {
                                value: "2,000+",
                                label: "Successful Donations",
                                icon: "🎁",
                                accent: "bg-emerald-400/15 border-emerald-300/20",
                            },
                            {
                                value: "500+",
                                label: "Partner Organizations",
                                icon: "🤝",
                                accent: "bg-teal-400/15   border-teal-300/20",
                            },
                        ].map((stat, idx) => (
                            <div
                                key={idx}
                                className={`group flex flex-col items-center gap-2 p-5 rounded-xl border ${stat.accent} backdrop-blur-sm hover:bg-white/10 transition-all duration-200`}
                            >
                                <span className="text-2xl">{stat.icon}</span>
                                <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-none">
                                    {stat.value}
                                </h2>
                                <p className="text-xs text-green-100 text-center leading-snug">
                                    {stat.label}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Section */}
            <section className="bg-white py-14">
                <div className="max-w-5xl mx-auto px-5 sm:px-8">
                    {/* ── Header ── */}
                    <div className="flex flex-col items-center gap-1 mb-10 text-center">
                        <span className="text-xs font-semibold tracking-[0.2em] uppercase text-green-600">
                            why us
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
                            Why Choose Konstrukalakal?
                        </h2>
                        <p className="text-sm text-gray-400 max-w-sm mt-1">
                            A smarter, greener way to buy, sell, donate, and
                            trade construction materials.
                        </p>
                        <div className="w-10 h-0.5 rounded-full bg-green-500 mt-2" />
                    </div>

                    {/* ── Cards ── */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                        {[
                            {
                                icon: "♻️",
                                title: "Sustainable Trading",
                                desc: "Reduce waste and promote sustainability through our material exchange platform.",
                                accent: "border-blue-200 hover:border-blue-300",
                                badge: "bg-blue-50 text-blue-600 border-blue-100",
                                bar: "bg-blue-400",
                            },
                            {
                                icon: "🤝",
                                title: "Secure Transactions",
                                desc: "Safe and secure platform for trading construction materials with verified users.",
                                accent: "border-yellow-200 hover:border-yellow-300",
                                badge: "bg-yellow-50 text-yellow-600 border-yellow-100",
                                bar: "bg-yellow-400",
                            },
                            {
                                icon: "💚",
                                title: "Community Support",
                                desc: "Join a community of builders committed to sustainable construction practices.",
                                accent: "border-green-200 hover:border-green-300",
                                badge: "bg-green-50 text-green-600 border-green-100",
                                bar: "bg-green-400",
                            },
                        ].map((item, idx) => (
                            <div
                                key={idx}
                                className={`group relative flex flex-col gap-4 p-6 rounded-xl bg-white border ${item.accent} hover:shadow-md transition-all duration-200 overflow-hidden`}
                            >
                                {/* Top accent bar */}
                                <div
                                    className={`absolute top-0 left-0 right-0 h-0.5 ${item.bar}`}
                                />

                                {/* Icon badge */}
                                <span
                                    className={`w-10 h-10 rounded-lg border flex items-center justify-center text-xl ${item.badge}`}
                                >
                                    {item.icon}
                                </span>

                                {/* Text */}
                                <div>
                                    <h3 className="font-bold text-sm text-gray-900 mb-1">
                                        {item.title}
                                    </h3>
                                    <p className="text-xs text-gray-500 leading-relaxed">
                                        {item.desc}
                                    </p>
                                </div>

                                {/* Bottom arrow */}
                                <span className="text-xs font-semibold text-gray-300 group-hover:text-green-500 transition-colors duration-200 mt-auto">
                                    Learn more →
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {!user && (
                <section className="relative overflow-hidden bg-green-600 py-14">
                    {/* Grid overlay */}
                    <div
                        className="absolute inset-0 -z-10"
                        style={{
                            backgroundImage: `
          linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
        `,
                            backgroundSize: "40px 40px",
                        }}
                    />

                    {/* Glow blobs */}
                    <div
                        className="absolute -top-16 -left-16 w-56 h-56 rounded-full -z-10"
                        style={{
                            background:
                                "radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)",
                        }}
                    />
                    <div
                        className="absolute -bottom-16 -right-16 w-56 h-56 rounded-full -z-10"
                        style={{
                            background:
                                "radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)",
                        }}
                    />

                    <div className="max-w-2xl mx-auto px-5 sm:px-8 text-center flex flex-col items-center gap-5">
                        <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase px-3 py-1 rounded-full border border-white/20 bg-white/10 text-white">
                            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                            Join the community
                        </span>

                        <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                            Ready to Make an Impact?
                        </h2>

                        <p className="text-sm text-green-100 leading-relaxed max-w-md">
                            Start trading and donating construction materials
                            today. Make a positive impact on the environment
                            while saving costs.
                        </p>

                        <div className="flex flex-wrap gap-2 justify-center">
                            {[
                                "♻️ 1,000+ recycled",
                                "👥 500+ builders",
                                "🌱 Eco-friendly",
                            ].map((s) => (
                                <span
                                    key={s}
                                    className="text-xs px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white"
                                >
                                    {s}
                                </span>
                            ))}
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 mt-1">
                            <button
                                onClick={openRegisterModal}
                                className="cursor-pointer px-8 py-2.5 rounded-full bg-white text-green-600 font-bold text-sm tracking-wide hover:bg-green-50 active:scale-95 transition-all duration-200 shadow-md"
                            >
                                Sign Up Free
                            </button>
                        </div>

                        <p className="text-xs text-green-200">
                            Free to join · No credit card required
                        </p>
                    </div>
                </section>
            )}

            <footer className="relative overflow-hidden bg-gray-900 pt-12 pb-6">
                {/* Subtle grid */}
                <div
                    className="absolute inset-0 -z-10"
                    style={{
                        backgroundImage: `
        linear-gradient(rgba(34,197,94,0.04) 1px, transparent 1px),
        linear-gradient(90deg, rgba(34,197,94,0.04) 1px, transparent 1px)
      `,
                        backgroundSize: "40px 40px",
                    }}
                />

                <div className="max-w-5xl mx-auto px-5 sm:px-8">
                    {/* ── Main grid ── */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-10 border-b border-white/10">
                        {/* Brand */}
                        <div className="col-span-2 md:col-span-1 flex flex-col gap-3">
                            <div className="flex items-center gap-2">
                                <span
                                    className="w-2 h-2 rounded-full bg-green-500"
                                    style={{
                                        boxShadow:
                                            "0 0 8px rgba(74,222,128,0.6)",
                                    }}
                                />
                                <h2 className="text-white font-extrabold text-base tracking-wide">
                                    KonstruKalakal
                                </h2>
                            </div>
                            <p className="text-xs text-gray-400 leading-relaxed max-w-xs">
                                Sustainable construction material exchange
                                platform. Buy, sell, donate, and trade with your
                                community.
                            </p>
                            {/* Social icons */}
                            <div className="flex gap-2 mt-1">
                                {[
                                    { label: "Facebook", icon: "f" },
                                    { label: "Twitter", icon: "𝕏" },
                                    { label: "Instagram", icon: "▣" },
                                    { label: "LinkedIn", icon: "in" },
                                ].map((s) => (
                                    <a
                                        key={s.label}
                                        href="#"
                                        aria-label={s.label}
                                        className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-xs text-gray-400 hover:border-green-500/50 hover:text-green-400 transition-all duration-200"
                                    >
                                        {s.icon}
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div className="flex flex-col gap-3">
                            <h3 className="text-white font-semibold text-xs tracking-widest uppercase">
                                Quick Links
                            </h3>
                            <ul className="space-y-2">
                                {[
                                    "About Us",
                                    "How It Works",
                                    "FAQ",
                                    "Contact",
                                ].map((l) => (
                                    <li key={l}>
                                        <a
                                            href="#"
                                            className="text-xs text-gray-400 hover:text-green-400 transition-colors duration-200"
                                        >
                                            {l}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Legal */}
                        <div className="flex flex-col gap-3">
                            <h3 className="text-white font-semibold text-xs tracking-widest uppercase">
                                Legal
                            </h3>
                            <ul className="space-y-2">
                                {[
                                    "Privacy Policy",
                                    "Terms of Service",
                                    "Cookie Policy",
                                ].map((l) => (
                                    <li key={l}>
                                        <a
                                            href="#"
                                            className="text-xs text-gray-400 hover:text-green-400 transition-colors duration-200"
                                        >
                                            {l}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Contact */}
                        <div className="flex flex-col gap-3">
                            <h3 className="text-white font-semibold text-xs tracking-widest uppercase">
                                Contact
                            </h3>
                            <ul className="space-y-2">
                                {[
                                    {
                                        icon: "✉",
                                        text: "hello@konstrukalakal.com",
                                    },
                                    { icon: "📍", text: "Bohol, Philippines" },
                                    { icon: "🌐", text: "konstrukalakal.com" },
                                ].map((item) => (
                                    <li
                                        key={item.text}
                                        className="flex items-start gap-2"
                                    >
                                        <span className="text-green-500 text-xs mt-0.5">
                                            {item.icon}
                                        </span>
                                        <span className="text-xs text-gray-400">
                                            {item.text}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* ── Bottom bar ── */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-6">
                        <p className="text-xs text-gray-500">
                            © {new Date().getFullYear()} KonstruKalakal. All
                            rights reserved.
                        </p>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                            <span>Made with</span>
                            <span className="text-green-500">♻</span>
                            <span>for sustainable builders</span>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}
