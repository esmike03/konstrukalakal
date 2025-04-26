import { useForm, Link, usePage } from "@inertiajs/react";
import { useState, useEffect } from "react";
import { ArrowLeft, ShoppingCart, CheckCircle, X } from "lucide-react";

export default function Show({ material, user }) {
    const { flash } = usePage().props;
    const [showMessage, setShowMessage] = useState(false);
    const [buttonText, setButtonText] = useState("");
    const { post, processing } = useForm({
        material_id: material.id,
        quantity: 1,
    });

    useEffect(() => {
        // Update the button text based on the material's `forbdt` value
        if (material.forbdt === "Sale") {
          setButtonText("Add to Cart");
        } else if (material.forbdt === "Trade") {
          setButtonText("Trade");
        } else if (material.forbdt === "Donation") {
          setButtonText("Inquire");
        }
      }, [material.forbdt]); // Re-run the effect when `material.forbdt` changes

    useEffect(() => {
        if (flash?.message) {
            setShowMessage(true); // Show the message
            const timer = setTimeout(() => {
                setShowMessage(false); // Hide after 2 seconds
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [flash]);

    function addToCart(e) {
        e.preventDefault();
        if (status === 401) {
            // Trigger your login modal here
            openLoginModal();
          }else{

            post('/cart/add', {
                onSuccess: () => {
                    console.log('Added to cart successfully!');
                },
                onError: () => {
                    console.log('Failed to add to cart.');
                },
            });
          }

    }

    return (
        <>
            <div className="max-w-5xl mx-auto p-6 rounded-lg flex gap-8 mt-10">
            {flash?.message && (
                <div
                    className={`${
                        flash.message.toLowerCase().includes("added")
                            ? "bg-green-400 border border-green-600"
                            : "bg-red-400 border border-red-600"
                    } shadow-lg bottom-4 flex items-center gap-2 w-fit right-4 absolute text-white p-3 rounded-md z-100 mb-4 transition-all duration-500 transform ${
                        showMessage ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5"
                    }`}
                >
                    {flash.message.toLowerCase().includes("added") ? (
                        <CheckCircle size={20} className="text-white" />
                    ) : (
                        <X size={20} className="text-white" />
                    )}
                    {flash.message}
                </div>
            )}

                {/* Product Image Section */}
                <Link href={`/back`}>
                    <button className="absolute top-20 text-gray-500 font-semibold cursor-pointer flex items-center">
                        <ArrowLeft size={20} className="mt-0.5" /> Back
                    </button>
                </Link>

                <div className="w-1/2">
                    <img
                        src={`/storage/${material.image}`}
                        alt={material.material_name}
                        className="w-full h-auto object-cover rounded-lg"
                    />
                </div>

                {/* Product Details Section */}
                <div className="w-1/2">
                    <div className="flex gap-2 item-center border-b-2 pb-4 mb-4 border-gray-200">
                            <img
                                src={`/storage/${user.profile_image}`}
                                alt={user.name}
                                className="h-10 w-10 object-cover shadow-md rounded-full"
                            />
                            <div className="">
                                <p className="text-sm">{user.name}</p>
                                <p className="text-xs text-gray-700">{user.contact}</p>
                            </div>

                    </div>
                    <p className="absolute right-40 bg-green-500 text-white px-2 rounded-md">
                        For {material.forbdt}
                    </p>
                    <h1 className="text-2xl font-bold">{material.material_name}</h1>
                    <div className="flex gap-2">
                        <p className="w-fit text-xs bg-gray-400 text-white px-2 rounded-xs mt-2">
                            {material.category}
                        </p>
                        <p className="w-fit text-xs bg-gray-400 text-white px-2 rounded-xs mt-2">
                            {material.condition}
                        </p>
                    </div>

                    <div className="flex items-center mt-2 space-x-4">
                        <p className="text-lg font-bold text-gray-800">
                            Price: <span className="text-green-600">₱{material.price}</span>
                        </p>
                    </div>

                    {/* Product Description */}
                    <div className="mt-4">
                        <p className="text-gray-700 font-semibold">Product Description:</p>
                        <p className="text-gray-600 mt-1">{material.description}</p>
                    </div>
                    <p className="text-gray-500 mt-4 text-sm">
                        <span className="font-semibold">Availability:</span>{" "}
                        {material.quantity > 0 ? "In Stock" : "Out of Stock"}
                    </p>

                    {/* Buttons */}
                    <div className="mt-6 flex flex-wrap gap-4">
                        {/* Add to Cart Button */}
                        <button
                        onClick={addToCart}
                        disabled={false} // You can replace this with a processing state if needed
                        className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-all duration-200"
                      >
                        <ShoppingCart size={18} />
                        <span className="text-sm">{buttonText}</span>
                      </button>



                        {/* Message Button */}
                        <Link href={`/message/${material.id}`} className="flex items-center gap-2 bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition-all duration-200">
                            ✉️ <span className="text-sm">Message</span>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
