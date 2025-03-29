import { Link, usePage, Head } from "@inertiajs/react";
import { useState, useEffect } from "react";
export default function Home({posts}) {

    const { flash } = usePage().props;
    const { component } = usePage();
    const [flashMsg, setFlashMsg] = useState(flash?.message || null);
    const [flashMsg2, setFlashMsg2] = useState(flash?.success || null);

    useEffect(() => {
        if (flash.message || flash.success) {
            const timer = setTimeout(() => {
                setFlashMsg(null);
                setFlashMsg2(null);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [flash]);

    return(
        <>
            <Head title={component}/>
            {flashMsg && (
                <div className="absolute top-24 right-6 bg-rose-500 p-2 rounded-md shadow-lg text-sm text-white z-100">
                    {flashMsg}
                </div>
            )}
            {flashMsg2 && (
                <div className="absolute top-24 right-6 bg-green-500 p-2 rounded-md shadow-lg text-sm text-white z-100">
                    {flashMsg2}
                </div>
            )}
            <section>

                <div className="p-10 sm:p-10 m-5 rounded-3xl text-black flex items-center justify-center overflow-hidden">
                <div className="w-full max-w-6xl px-4 sm:px-6">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">

                    <div className="flex flex-col justify-center text-center md:text-left z-10">
                        <h1 className="text-2xl sm:text-2xl md:text-2xl text-gray-800 lg:text-4xl font-extrabold uppercase leading-tight tracking-tight">
                        Sustainable <span className="text-green-500">Construction</span>
                        </h1>
                        <h1 className="text-2xl sm:text-2xl md:text-2xl text-gray-800 lg:text-4xl font-extrabold uppercase leading-tight tracking-tight">
                        Materials <span className="text-green-500">Exchange</span>
                        </h1>
                        <p className="mt-4 text-base sm:text-sm md:text-sm font-medium  dark:text-gray-400 text-gray-700 text-balance">
                        Join our community of builders and contribute to sustainable construction practices through material trading and donations.
                        </p>
                        <div className="mt-6 sm:mt-8 flex flex-wrap gap-4">
                        <a href="#get-started" className="rounded-full p-3 grow text-center bg-green-500 text-white font-bold uppercase text-sm tracking-widest hover:bg-green-600 transition">
                            Get Started
                        </a>
                        <a href="#learn-more" className="rounded-full p-3 grow border text-center border-green-500 text-green-500 font-bold uppercase text-sm tracking-widest hover:bg-green-500 hover:text-black transition">
                            Learn More
                        </a>
                        </div>
                    </div>


                    <div className="relative flex items-center sm:m-10">
                        <div
                        className="absolute -top-10 md:-top-20 -left-10 sm:w-32 sm:h-32 lg:w-64 lg:h-64 bg-green-500 rotate-12 rounded-lg border-green-700 border-b-4 border-r-8 max-sm:hidden">
                        </div>
                        <div className="relative z-10 bg-white  p-4 sm:p-4 -right-1/2 -translate-x-1/2 grow text-center shadow-2xl -rotate-2 rounded-xl text-nowrap border-green-700 border-b-4 border-r-8">
                            <h2 className="text-2xl sm:text-3xl font-extrabold  text-gray-800 ">
                                Eco-friendly Impact
                            </h2>
                            <p className="mt-1 text-sm sm:text-base font-light text-gray-400 dark:text-gray-400">
                                1000+ materials recycled
                            </p>
                        </div>
                        <div className="absolute -bottom-10 md:-bottom-20 -right-16 sm:w-32 sm:h-32 lg:w-64 lg:h-64 bg-green-400 -rotate-12 rounded-lg border-green-700 border-r-4 border-b-8 max-sm:hidden"></div>
                    </div>
                    </div>
                </div>
                </div>
            </section>

            <section className="bg-white py-12">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-2xl font-extrabold text-gray-800 text-center mb-6">Featured Materials</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {/* Card 1 */}
                        <div className="bg-gray-300 rounded-xl shadow-lg overflow-hidden">
                            <img src="/images/heromaterial.jpg" alt="Reclaimed Wood" className="w-full h-48 object-cover" />
                            <div className="p-4 text-white">
                                <h3 className="font-bold text-gray-700">Reclaimed Wood</h3>
                                <p className="text-sm  text-gray-700">Vintage hardwood perfect for sustainable building projects.</p>
                                <p className="font-bold text-green-500 mt-2">For Donation</p>
                                <button className="mt-3 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md w-full">
                                    View Details
                                </button>
                            </div>
                        </div>

                        {/* Card 2 */}
                        <div className="bg-gray-300 rounded-xl shadow-lg overflow-hidden">
                            <img src="/images/heromaterial.jpg" alt="Reclaimed Wood" className="w-full h-48 object-cover" />
                            <div className="p-4 text-white">
                                <h3 className="font-bold text-gray-700">Reclaimed Wood</h3>
                                <p className="text-sm  text-gray-700">Vintage hardwood perfect for sustainable building projects.</p>
                                <p className="font-bold text-green-500 mt-2">For Donation</p>
                                <button className="mt-3 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md w-full">
                                    View Details
                                </button>
                            </div>
                        </div>

                        {/* Card 3 */}
                        <div className="bg-gray-300 rounded-xl shadow-lg overflow-hidden">
                            <img src="/images/heromaterial.jpg" alt="Reclaimed Wood" className="w-full h-48 object-cover" />
                            <div className="p-4 text-white">
                                <h3 className="font-bold text-gray-700">Reclaimed Wood</h3>
                                <p className="text-sm  text-gray-700">Vintage hardwood perfect for sustainable building projects.</p>
                                <p className="font-bold text-green-500 mt-2">For Donation</p>
                                <button className="mt-3 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md w-full">
                                    View Details
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="bg-green-700 py-12 text-white">
                <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center">
                    {/* Stat 1 */}
                    <div>
                        <h2 className="text-3xl font-bold">1000+</h2>
                        <p className="text-sm">Active Users</p>
                    </div>

                    {/* Stat 2 */}
                    <div>
                        <h2 className="text-3xl font-bold">5000+</h2>
                        <p className="text-sm">Materials Traded</p>
                    </div>

                    {/* Stat 3 */}
                    <div>
                        <h2 className="text-3xl font-bold">2000+</h2>
                        <p className="text-sm">Successful Donations</p>
                    </div>

                    {/* Stat 4 */}
                    <div>
                        <h2 className="text-3xl font-bold">500+</h2>
                        <p className="text-sm">Partner Organizations</p>
                    </div>
                </div>
            </section>
            <section className="bg-white text-gray-800 py-12">
                <div className="max-w-6xl mx-auto px-4 text-center">
                    <h2 className="text-2xl font-bold mb-8">Why Choose Konstrukalakal?</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

                        {/* Sustainable Trading */}
                        <div className="bg-green-800 p-6 rounded-lg shadow-lg flex flex-col items-center">
                            <span className="text-green-500 text-3xl">♻️</span>
                            <h3 className="font-bold mt-4 text-white">Sustainable Trading</h3>
                            <p className="text-gray-300 text-sm mt-2">
                                Reduce waste and promote sustainability through our material exchange platform.
                            </p>
                        </div>

                        {/* Secure Transactions */}
                        <div className="bg-green-800 p-6 rounded-lg shadow-lg flex flex-col items-center">
                            <span className="text-green-500 text-3xl">🤝</span>
                            <h3 className="font-bold mt-4 text-white">Secure Transactions</h3>
                            <p className="text-gray-300 text-sm mt-2">
                                Safe and secure platform for trading construction materials with verified users.
                            </p>
                        </div>

                        {/* Community Support */}
                        <div className="bg-green-800 p-6 rounded-lg shadow-lg flex flex-col items-center">
                            <span className="text-green-500 text-3xl">💚</span>
                            <h3 className="font-bold mt-4 text-white">Community Support</h3>
                            <p className="text-gray-300 text-sm mt-2">
                                Join a community of builders committed to sustainable construction practices.
                            </p>
                        </div>

                    </div>
                </div>
            </section>

            <section className="bg-green-600 text-white py-16 text-center">
                <div className="max-w-4xl mx-auto px-4">
                    <h2 className="text-2xl font-bold">Ready to Join Our Community?</h2>
                    <p className="text-lg mt-4">
                        Start trading and donating construction materials today. Make a
                        positive impact on the environment while saving costs.
                    </p>
                    <button className="mt-6 bg-white text-green-600 font-semibold px-6 py-2 rounded-full shadow-md hover:bg-gray-100 transition">
                        Sign Up
                    </button>
                </div>
            </section>

            <footer className="bg-green-800 text-gray-100 py-10">
                <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand Section */}
                    <div>
                        <h2 className="text-white font-bold text-lg">KonstruKalakal</h2>
                        <p className="mt-2 text-gray-200">
                            Sustainable construction material exchange platform.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-semibold">Quick Links</h3>
                        <ul className="mt-2 space-y-2">
                            <li><a href="#" className="hover:text-gray-900">About Us</a></li>
                            <li><a href="#" className="hover:text-gray-900">How It Works</a></li>
                            <li><a href="#" className="hover:text-gray-900">FAQ</a></li>
                            <li><a href="#" className="hover:text-gray-900">Contact</a></li>
                        </ul>
                    </div>

                    {/* Legal Links */}
                    <div>
                        <h3 className="text-white font-semibold">Legal</h3>
                        <ul className="mt-2 space-y-2">
                            <li><a href="#" className="hover:text-gray-900">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-gray-900">Terms of Service</a></li>
                            <li><a href="#" className="hover:text-gray-900">Cookie Policy</a></li>
                        </ul>
                    </div>

                    {/* Social Media */}
                    <div>
                        <h3 className="text-white font-semibold">Connect With Us</h3>
                        <div className="mt-2 flex space-x-4">
                            <a href="#" className="hover:text-gray-900"><i className="fab fa-facebook"></i></a>
                            <a href="#" className="hover:text-gray-900"><i className="fab fa-twitter"></i></a>
                            <a href="#" className="hover:text-gray-900"><i className="fab fa-instagram"></i></a>
                            <a href="#" className="hover:text-gray-900"><i className="fab fa-linkedin"></i></a>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}
