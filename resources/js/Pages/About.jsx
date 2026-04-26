import { Head, Link } from "@inertiajs/react";

export default function About() {
    return (
        <>
            <Head title="About KonstruKalakal" />

            {/* ── Hero ── */}
            <div className="relative overflow-hidden bg-white border-b border-gray-100">
                <div
                    className="absolute inset-0 -z-10"
                    style={{
                        backgroundImage: `
              linear-gradient(rgba(22,163,74,0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(22,163,74,0.04) 1px, transparent 1px)
            `,
                        backgroundSize: "40px 40px",
                    }}
                />
                <div
                    className="absolute top-0 right-0 w-72 h-72 rounded-full -z-10"
                    style={{
                        background:
                            "radial-gradient(circle, rgba(34,197,94,0.08) 0%, transparent 70%)",
                    }}
                />

                <div className="max-w-4xl mx-auto px-5 sm:px-8 py-16 sm:py-20">
                    <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase px-3 py-1 rounded-full border border-green-200 bg-green-50 text-green-600 mb-4">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                        About Us
                    </span>
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight mb-4">
                        About{" "}
                        <span className="text-green-500">KonstruKalakal</span>
                    </h1>
                    <p className="text-sm sm:text-base text-gray-500 leading-relaxed max-w-2xl">
                        Your trusted platform for browsing, trading, and
                        donating construction materials — built to reduce waste,
                        save costs, and support communities.
                    </p>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-5 sm:px-8 py-12 flex flex-col gap-10">
                {/* ── Mission ── */}
                <div className="flex flex-col gap-3">
                    <p className="text-sm text-gray-600 leading-relaxed">
                        We built{" "}
                        <span className="font-semibold text-gray-800">
                            KonstruKalakal
                        </span>{" "}
                        with a simple mission: to reduce waste, save costs, and
                        support communities by giving unused or surplus
                        construction materials a second life. Whether you're a
                        builder, contractor, architect, or simply someone with
                        leftover materials at home, our platform makes it easy
                        to connect with others who can use them.
                    </p>
                </div>

                {/* ── Purpose card ── */}
                <div className="p-6 rounded-2xl bg-green-50 border border-green-100">
                    <div className="flex items-center gap-2 mb-3">
                        <span className="w-1.5 h-5 rounded-full bg-green-500" />
                        <h2 className="text-base font-extrabold text-gray-900">
                            Our Purpose
                        </h2>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">
                        Every year, tons of construction materials go unused or
                        end up in landfills. KonstruKalakal aims to change that.
                        By creating a digital space for responsible trading and
                        donations, we promote sustainability, affordability, and
                        collaboration within the construction industry.
                    </p>
                </div>

                {/* ── What you can do ── */}
                <div>
                    <div className="flex items-center gap-2 mb-4">
                        <span className="w-1.5 h-5 rounded-full bg-green-500" />
                        <h2 className="text-base font-extrabold text-gray-900">
                            What You Can Do Here
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {[
                            {
                                icon: "🧱",
                                title: "Browse",
                                desc: "Discover available materials from individuals and businesses near you.",
                                accent: "border-gray-200 hover:border-green-200",
                            },
                            {
                                icon: "🔁",
                                title: "Trade or Sell",
                                desc: "Post your extra materials and connect with buyers easily.",
                                accent: "border-gray-200 hover:border-blue-200",
                            },
                            {
                                icon: "❤️",
                                title: "Donate",
                                desc: "Help communities and organizations by giving materials you no longer need.",
                                accent: "border-gray-200 hover:border-red-200",
                            },
                        ].map((item) => (
                            <div
                                key={item.title}
                                className={`p-4 rounded-xl bg-white border ${item.accent} hover:shadow-sm transition-all duration-200`}
                            >
                                <span className="text-2xl mb-2 block">
                                    {item.icon}
                                </span>
                                <h3 className="text-sm font-bold text-gray-800 mb-1">
                                    {item.title}
                                </h3>
                                <p className="text-xs text-gray-500 leading-relaxed">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── Vision ── */}
                <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100">
                    <div className="flex items-center gap-2 mb-3">
                        <span className="w-1.5 h-5 rounded-full bg-green-500" />
                        <h2 className="text-base font-extrabold text-gray-900">
                            Our Vision
                        </h2>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">
                        A future where construction is sustainable, affordable,
                        and community-driven. Through KonstruKalakal, we hope to
                        empower people to build smarter — not just for
                        themselves, but for the environment and others.
                    </p>
                </div>

                {/* ── CTA ── */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-2xl bg-green-500">
                    <div>
                        <h3 className="text-base font-extrabold text-white">
                            Ready to get started?
                        </h3>
                        <p className="text-xs text-green-100 mt-0.5">
                            Join hundreds of builders already on the platform.
                        </p>
                    </div>
                    <Link
                        href="/materials"
                        className="shrink-0 px-6 py-2.5 rounded-full bg-white text-green-600 font-bold text-sm hover:bg-green-50 active:scale-95 transition-all duration-200 shadow-sm"
                    >
                        Browse Materials →
                    </Link>
                </div>
            </div>
        </>
    );
}
