import {useForm, Link } from "@inertiajs/react";
import { Head } from "@inertiajs/react";
export default function About() {


    return (
        <>
            <Head title="About KonstruKalakal" />
            <div className="max-w-4xl mx-auto px-6 py-12 text-gray-800">
                <h1 className="text-3xl font-bold mb-6 text-green-600">
                    About KonstruKalakal
                </h1>

                <p className="mb-6 leading-relaxed">
                    Welcome to <span className="font-semibold">KonstruKalakal</span> — your trusted
                    platform for browsing, trading, and donating construction materials.
                </p>

                <p className="mb-10 leading-relaxed">
                    We built KonstruKalakal with a simple mission: to reduce waste, save costs, and
                    support communities by giving unused or surplus construction materials a second
                    life. Whether you’re a builder, contractor, architect, or simply someone with
                    leftover materials at home, our platform makes it easy to connect with others who
                    can use them.
                </p>

                <h2 className="text-2xl font-semibold mb-4 text-green-500">Our Purpose</h2>
                <p className="mb-8 leading-relaxed">
                    Every year, tons of construction materials go unused or end up in landfills.
                    KonstruKalakal aims to change that. By creating a digital space for responsible
                    trading and donations, we promote sustainability, affordability, and
                    collaboration within the construction industry.
                </p>

                <h2 className="text-2xl font-semibold mb-4 text-green-500">What You Can Do Here</h2>
                <ul className="space-y-3 mb-10">
                    <li>🧱 <span className="font-semibold">Browse:</span> Discover available materials from individuals and businesses near you.</li>
                    <li>🔁 <span className="font-semibold">Trade or Sell:</span> Post your extra materials and connect with buyers easily.</li>
                    <li>❤️ <span className="font-semibold">Donate:</span> Help communities, students, and organizations by giving materials you no longer need.</li>
                </ul>

                <h2 className="text-2xl font-semibold mb-4 text-green-500">Our Vision</h2>
                <p className="leading-relaxed">
                    A future where construction is sustainable, affordable, and community-driven.
                    Through KonstruKalakal, we hope to empower people to build smarter — not just for
                    themselves, but for the environment and others.
                </p>
            </div>
        </>
    );
}
