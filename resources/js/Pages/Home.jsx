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

    const { props } = usePage()
    const user = props.auth?.user
    useEffect(() => {
        if (flash?.message) {
            setShowMessage(true); // Show the message
            const timer = setTimeout(() => {
                setShowMessage(false); // Hide after 2 seconds
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [flash]);


    return(
        <>
            <Head title={component}/>
            <section>

                    {flash?.message && (
  <div
    className={`${
      flash.message.toLowerCase().includes("disabled")
        ? "bg-red-500 border-red-600"
        : "bg-green-400 border-green-600"
    } shadow-lg bottom-4 flex items-center gap-2 w-fit right-4 absolute text-white p-3 rounded-md z-100 mb-4 transition-all duration-500 transform ${
      showMessage ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5"
    }`}
  >
    {flash.message.toLowerCase().includes("disabled") ? (
      <XCircle size={20} className="text-white" />
    ) : (
      <CheckCircle size={20} className="text-white" />
    )}

    <span>{flash.message}</span>
  </div>
)}

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
                        <Link href="#second" className="rounded-full p-3 grow text-center bg-green-500 text-white font-bold uppercase text-sm tracking-widest hover:bg-green-600 transition">
                            Get Started
                        </Link>
                        <Link href="about" className="rounded-full p-3 grow border text-center border-green-500 text-green-500 font-bold uppercase text-sm tracking-widest hover:bg-green-500 hover:text-black transition">
                            Learn More
                        </Link>
                        </div>
                    </div>


                    <div className="relative flex items-center sm:m-10">
  {/* Left Construction Material Image */}
  <img
    src="/images/const1.jpg" // <-- replace with your image path
    alt="Construction Material"
    className="absolute -top-10 md:-top-20 -left-10 sm:w-32 sm:h-32 lg:w-64 lg:h-64 object-cover rounded-lg border-green-700 border-b-4 border-r-8 max-sm:hidden rotate-12"
  />

    {/* Center Card */}
    <div className="relative z-10 bg-black/50  p-4 sm:p-4 -right-1/2 -translate-x-1/2 grow text-center shadow-2xl -rotate-2 rounded-xl text-nowrap ">
        <h2 className="text-2xl sm:text-3xl  font-extrabold text-white">
        Eco-friendly Impact
        </h2>
        <p className="mt-1 text-sm sm:text-base font-light text-gray-50 dark:text-gray-50">
        1000+ materials recycled
        </p>
    </div>

    {/* Right Construction Material Image */}
    <img
        src="/images/const2.jpg" // <-- replace with your image path
        alt="Construction Material"
        className="absolute -bottom-10 md:-bottom-20 -right-16 sm:w-32 sm:h-32 lg:w-64 lg:h-64 object-cover rounded-lg border-green-700 border-r-4 border-b-8 max-sm:hidden -rotate-12"
    />
    </div>

                    </div>
                </div>
                </div>
            </section>

            <section id="second" className="bg-white py-12">
  <div className="max-w-6xl mx-auto px-4">
    {/* Section Title */}
    <h2 className="text-3xl font-bold text-gray-800 text-center mb-10">
      <Link href="/materials">
        Featured Materials
      </Link>
    </h2>

    {/* Responsive Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {materials.data && materials.data.length > 0 ? (
        materials.data.map((material) => (
          <div
            key={material.id}
            className="bg-white flex flex-col justify-between rounded-2xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition"
          >
            {/* Image */}
           {material.image && (
  <img
    src={`/storage/${JSON.parse(material.image)[0]}`}
    alt={material.materialName}
    className="w-full h-40 object-cover"
  />
)}


            {/* Content */}
            <div className="p-4 flex flex-col flex-grow">
              {/* Tag + Location */}
              <div className="flex justify-between items-center mb-2">
                <span
                  className={`text-xs font-medium text-white px-2 py-1 rounded-md ${
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
                </span>

                <p className="text-xs text-gray-500 flex items-center gap-1">
                  📍 {material.location}
                </p>
              </div>

              {/* Title & Description */}
              <h3 className="text-lg font-bold text-gray-800 mb-1">
                {material.material_name}
              </h3>
              <p className="text-sm text-gray-600 line-clamp-2">
                {material.description}
              </p>

              {/* Price (only for Sale) */}
              {material.forbdt === "Sale" && (
                <p className="text-green-600 font-bold mt-3">
                  ₱ {material.price}
                </p>
              )}

              {/* Button */}
              <Link href={`/materials/${material.id}`} className="mt-auto">
                <button className="w-full mt-4 text-sm bg-yellow-400 text-white py-2.5 rounded-lg font-medium hover:bg-green-700 transition">
                  View Details
                </button>
              </Link>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">No materials available.</p>
      )}
    </div>

  </div>
</section>


            {/* Stats Section */}
<section className="bg-gradient-to-r from-green-700 to-teal-600 py-20">
  <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
    {[
      { value: "1000+", label: "Active Users", color: "text-blue-400" },
      { value: "5000+", label: "Materials Traded", color: "text-yellow-400" },
      { value: "2000+", label: "Successful Donations", color: "text-green-400" },
      { value: "500+", label: "Partner Organizations", color: "text-red-300" },
    ].map((stat, idx) => (
      <div
        key={idx}
        className="bg-white/10 backdrop-blur-md rounded-2xl p-8 flex flex-col items-center shadow-xl transform hover:scale-105 transition-transform duration-300"
      >
        <h2 className={`text-4xl font-extrabold ${stat.color}`}>{stat.value}</h2>
        <p className={`mt-2 text-sm ${stat.color}`}>{stat.label}</p>
      </div>
    ))}
  </div>
</section>

{/* Why Choose Section */}
<section className="bg-gray-50 text-gray-800 py-20">
  <div className="max-w-6xl mx-auto px-6 text-center">
    <h2 className="text-3xl sm:text-4xl font-bold mb-12">Why Choose Konstrukalakal?</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">

      {[
        {
          icon: "♻️",
          title: "Sustainable Trading",
          desc: "Reduce waste and promote sustainability through our material exchange platform.",
          bg: "bg-gradient-to-tr from-blue-700 to-blue-500",
          textColor: "text-white",
        },
        {
          icon: "🤝",
          title: "Secure Transactions",
          desc: "Safe and secure platform for trading construction materials with verified users.",
          bg: "bg-gradient-to-tr from-yellow-400 to-yellow-300",
          textColor: "text-gray-900",
        },
        {
          icon: "💚",
          title: "Community Support",
          desc: "Join a community of builders committed to sustainable construction practices.",
          bg: "bg-gradient-to-tr from-green-700 to-green-500",
          textColor: "text-white",
        },
      ].map((item, idx) => (
        <div
          key={idx}
          className={`${item.bg} p-8 rounded-3xl shadow-2xl flex flex-col items-center text-center hover:scale-105 transition-transform duration-300`}
        >
          <span className="text-5xl mb-4">{item.icon}</span>
          <h3 className={`font-bold text-xl mb-2 ${item.textColor}`}>{item.title}</h3>
          <p className={`text-sm ${item.textColor === "text-white" ? "text-gray-200" : "text-gray-800"}`}>
            {item.desc}
          </p>
        </div>
      ))}
    </div>
  </div>
</section>

            {!user && (
            <section className="bg-green-600 text-white py-16 text-center">
                <div className="max-w-4xl mx-auto px-4">
                    <h2 className="text-2xl font-bold">Ready to Join Our Community?</h2>
                    <p className="text-lg mt-4">
                        Start trading and donating construction materials today. Make a
                        positive impact on the environment while saving costs.
                    </p>
                    <button onClick={openRegisterModal} className="mt-6 cursor-pointer bg-white text-green-600 font-semibold px-6 py-2 rounded-full shadow-md hover:bg-gray-100 transition">
                        Sign Up
                    </button>
                </div>
            </section>
            )}

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
