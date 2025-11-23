import { useForm, Link, usePage, router } from "@inertiajs/react";
import { useState, useEffect } from "react";
import { ArrowLeft, ShoppingCart, CheckCircle, X, AlertCircle, Trash2 } from "lucide-react";

export default function Show({ material, user }) {

  const [open, setOpen] = useState(false);

  const reasons = [
    "Incorrect Item Listed",
    "Incorrect Product Name",
    "Incorrect or Misleading Image",
    "Scam or Fraudulent Activity",
    "Poor Quality or Damaged",
    "Counterfeit or Fake Product",
  ];


  const { auth } = usePage().props;
  const authUserId = auth?.user?.id ?? null;
  const isBlocked = authUserId ? user.blocked?.includes(authUserId) : false;
  const { flash } = usePage().props;
  const [showMessage, setShowMessage] = useState(false);
  const [buttonText, setButtonText] = useState("");
  const { data, setData, post, processing } = useForm({
    material_id: material.id,
    quantity: 1,
    user_idx: user.id,
  });

  const handleClick = (e) => {
    if (data.quantity > material.quantity) {
      e.preventDefault(); // stop Inertia navigation
      alert(`You can only order up to ${material.quantity}.`);
    }
  };

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
      <div className="relative max-w-6xl mx-auto mt-12 p-6 sm:p-10 rounded-2xl flex flex-col md:flex-row gap-8
        bg-gradient-to-br from-white/20 to-green-200/30 backdrop-blur-xl border border-white/30 shadow-xl">

        {/* Flash Message */}
        {flash?.message && (
          <div
            className={`fixed top-4 right-4 px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 text-white backdrop-blur-lg
      ${/(added|success|updated|deleted)/i.test(flash.message)
                ? "bg-green-500/80"
                : "bg-red-500/80"}
      transition-all duration-500 ${showMessage ? "opacity-100" : "opacity-0"}`}
          >
            {/(added|success|updated|deleted)/i.test(flash.message) ? (
              <CheckCircle size={18} />
            ) : (
              <X size={18} />
            )}
            <span className="text-sm">{flash.message}</span>
          </div>
        )}


        {/* Back Button */}
        <Link href={`/back`} className="absolute -top-10 left-0 text-gray-500 hover:text-gray-800 flex items-center gap-1">
          <ArrowLeft size={18} /> <span className="text-sm">Back</span>
        </Link>

        {/* Product Image Section */}
        <div className="w-full md:w-1/2">
          <button
            onClick={() => setOpen(!open)}
            className="w-fit absolute text-left px-2 text-yellow-500 py-2 hover:bg-red-100"
          >
            <AlertCircle />
          </button>

          {/* Dropdown */}
          {open && (
            <div className="absolute left-0 mt-8 w-48 bg-white border rounded-md shadow-md z-50">
              {reasons.map((reason, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setOpen(false);

                    // You may send this to backend later.
                    router.post("/report-item", {
                      user_id: user.id, // pass the ID of the user being reported
                      reason: reason,
                      itemer: material.id,
                    });
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                >
                  {reason}
                </button>
              ))}
            </div>
          )}

          <img
            src={`/storage/${material.image}`}
            alt={material.material_name}
            className="w-full h-auto object-cover rounded-2xl shadow-lg"
          />
        </div>

        {/* Product Details */}
        <div className="w-full md:w-1/2 flex flex-col">
          {auth?.user?.name === 'Admin' && (
            <Link href={`/uploads/delete/${material.id}`}>
              <button
                className="bg-red-600 right-0 absolute mr-10 text-white p-2 rounded-full hover:bg-red-700 transition flex items-center justify-center"
                onClick={(e) => {
                  if (!window.confirm("Are you sure you want to delete this item?")) {
                    e.preventDefault();
                  }
                }}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </Link>
          )}
          {/* Seller */}
          <Link href={`/profile-view/${user.id}`}>

            <div className="flex items-center gap-3 border-b border-white/40 pb-4 mb-4">

              <img
                src={`/storage/${user.profile_image}`}
                alt={user.name}
                className="h-12 w-12 object-cover shadow-md rounded-full border border-white/40"
              />
              <div>
                <p className="text-sm font-semibold text-gray-800">{user.name} {'>'}</p>
                <p className="text-xs text-gray-600">{user.contact}</p>
              </div>
            </div>
          </Link>
          {/* For Sale / Donation / Trade */}
          <p className="bg-gradient-to-r from-green-500 to-green-700 text-white px-3 py-1 rounded-full text-xs w-fit mb-2 shadow">
            For {material.forbdt}
          </p>

          {/* Title */}
          <h1 className="text-2xl font-bold text-gray-900">{material.material_name}</h1>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-3">
            <span className="px-3 py-1 text-xs rounded-full bg-white/30 text-gray-800 backdrop-blur-md shadow">
              {material.category}
            </span>
            <span className="px-3 py-1 text-xs rounded-full bg-white/30 text-gray-800 backdrop-blur-md shadow">
              {material.condition}
            </span>
            <span className="px-3 py-1 text-xs rounded-full bg-white/30 text-gray-800 backdrop-blur-md shadow">
              Cash on Delivery
            </span>
          </div>

          {/* Price */}
          {(material.forbdt === "Sale") && (
            <p className="mt-3 text-lg font-bold text-green-600">
              ₱ {material.price}
            </p>
          )}

          {/* Description */}
          <div className="mt-4">
            <p className="text-gray-700 font-semibold">Product Description:</p>
            <p className="text-gray-600 mt-1 text-sm leading-relaxed">
              {material.description}
            </p>
          </div>

          {/* Stock */}
          <p className="text-gray-500 mt-4 text-sm">
            <span className="font-semibold">Availability:</span>{" "}
            {material.quantity > 0 ? "In Stock " : "Out of Stock "}({material.quantity})
          </p>
          <div className="flex items-center mt-2 text-gray-700">
            <label htmlFor="quantity" className="mr-2">Quantity:</label>
            <input
              id="quantity"
              className="w-20 h-8 border border-gray-300 rounded-md px-2"
              type="number"
              min="1"
              defaultValue="1"
              max={material.quantity}
              value={data.quantity}
              onChange={(e) => setData("quantity", e.target.value)}
            />
          </div>



          {/* Buttons */}
          <div className="mt-4 flex flex-wrap gap-3">
  {auth?.user?.id === user.id ? (
    <p className="text-sm text-gray-700">You can edit this in My Uploads.</p>
  ) : (
    <>
      {!isBlocked ? (
        <>
          {material.forbdt === "Sale" ? (
            <button
              onClick={addToCart}
              className="flex items-center justify-center gap-2 px-5 py-2 rounded-full
              bg-gradient-to-r from-green-500 to-green-700 text-white font-medium shadow-md hover:scale-105 transition"
            >
              <ShoppingCart size={18} /> {buttonText}
            </button>
          ) : material.forbdt === "Trade" ? (
            <Link
              href="/trade/create"
              data={{
                material,
                quantity: data.quantity,
              }}
              onClick={handleClick}
              method="get"
              as="button"
              className="flex items-center justify-center gap-2 px-5 py-2 rounded-full
              bg-gradient-to-r from-blue-500 to-blue-700 text-white font-medium shadow-md hover:scale-105 transition"
            >
              <ShoppingCart size={18} /> Trade
            </Link>
          ) : (
            <button
              onClick={addToDonate}
              className="flex items-center justify-center gap-2 px-5 py-2 rounded-full
              bg-gradient-to-r from-purple-500 to-purple-700 text-white font-medium shadow-md hover:scale-105 transition"
            >
              <ShoppingCart size={18} /> {buttonText}
            </button>
          )}

          {/* Message button */}
          {auth?.user && (
            <Link
              href={`/message/${material.id}`}
              className="flex items-center justify-center gap-2 px-5 py-2 rounded-full
              bg-white/40 text-gray-800 font-medium shadow hover:bg-white/60 transition backdrop-blur-md"
            >
              ✉️ Message
            </Link>
          )}
        </>
      ) : (
        <p className="text-red-500 font-semibold">Unavailable</p>
      )}
    </>
  )}
</div>

        </div>
      </div >
    </>
  );
}
