import { usePage, Link, useForm } from "@inertiajs/react";
import React, { useState, useEffect } from "react";
import { CheckCircle, X, MessageCircle, CheckSquare, Square, ShoppingBasketIcon  } from "lucide-react";

export default function Cart() {
  const { cartItems, flash, auth, donateItemCount, tradeItemCount, orderItemCount, cartItemCount } = usePage().props;
  const [showMessage, setShowMessage] = useState(false);
  const [filter, setFilter] = useState("all");
  const form = useForm({ material_id: null, ids:[] });
  const { post, setData } = form;
  const { url } = usePage();


  const [selectedItems, setSelectedItems] = useState([]);
    const toggleSelectItem = (id) => {
    setSelectedItems((prev) =>
        prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
    };

const selectAllItems = () => {
  const allIds = cartItems.map(item => item.id);
  setSelectedItems(allIds);
  setData("ids", allIds); // sync with form
};

const deselectAllItems = () => {
  setSelectedItems([]);
  setData("ids", []); // sync with form
};


    const totalPrice = cartItems
  .filter((item) => selectedItems.includes(item.id))
  .reduce((sum, item) => sum + item.material.price * item.quantity, 0);

  const rejectDonate = (id) => confirm("Reject this inquiry?") && post(`/donate/${id}/reject`);
  const cancelDonate = (id) => confirm("Cancel this item?") && post(`/cart/delete/${id}`);
  const handleConfirm = (id) => confirm("Confirm this item?") && post(`/order/${id}/submit`);
  const acceptDonate = (id) => confirm("Accept this inquiry?") && post(`/donate/${id}/accept`);

  const tabs = [
    { href: "/cart", label: "Buy Cart", count: cartItemCount },
    { href: "/cart/donate", label: "Donation Cart", count: donateItemCount },
    { href: "/my-trades", label: "Trades Cart", count: tradeItemCount },
    { href: "/Orders", label: "My Orders", count: orderItemCount },
  ];

  const filteredTrades = cartItems.filter((trade) => filter === "all" || trade.status === filter);

  useEffect(() => {
    if (flash?.message) {
      setShowMessage(true);
      const timer = setTimeout(() => setShowMessage(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [flash]);

  // Group trades by owner
  const groupedBySeller = filteredTrades.reduce((acc, trade) => {
    const ownerId = trade.owner.id;
    if (!acc[ownerId]) acc[ownerId] = { owner: trade.owner, items: [] };
    acc[ownerId].items.push(trade);
    return acc;
  }, {});

  const updateQuantity = (id, newQty) => {
    console.log("Updating:", id, newQty);
    if (newQty < 1) return;
    post(`/cart/update/${id}/${newQty}`, {
      quantity: newQty,
    }, {
      preserveScroll: true,
    });

  };
  // Add this inside your Cart component
useEffect(() => {
    // Sync selectedItems to form data instantly
    setData("ids", selectedItems);
}, [selectedItems]); // runs whenever selectedItems changes


  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Sidebar Tabs */}
      <aside className="md:w-64 w-full top-0 md:h-screen md:left-0">
        <div className="flex md:flex-col flex-row md:space-y-4 space-x-4 md:space-x-0 p-4 justify-center md:justify-start">
          {tabs.map((tab, idx) => {
            const isActive = url.startsWith(tab.href);
            return (
              <div key={idx} className="relative">
                <span className="absolute -top-2 -right-2 z-50 bg-red-600 text-xs text-white rounded-full px-2 py-0.5 shadow-md">
                  {tab.count}
                </span>
                <Link
                  href={tab.href}
                  className={`block text-center text-xs font-semibold px-4 py-2 rounded-lg border shadow-md backdrop-blur-md transition ${isActive
                    ? "bg-green-600 text-white border-green-700 shadow-lg"
                    : "bg-white/70 hover:bg-white/90 text-gray-800 border-gray-200"
                    }`}
                >
                  {tab.label}
                </Link>
              </div>
            );
          })}
        </div>
      </aside>

      <main className="flex-1 w-full p-4">
        {/* Flash Message */}
        {flash?.message && (
          <div
            className={`fixed top-4 right-4 px-4 z-100 py-2 rounded-lg shadow-lg flex items-center gap-2 text-white backdrop-blur-lg ${/(added|success|updated|deleted)/i.test(flash.message)
              ? "bg-green-500/80"
              : "bg-red-500/80"
              } transition-all duration-500 ${showMessage ? "opacity-100" : "opacity-0"}`}
          >
            {/(added|success|updated|deleted)/i.test(flash.message) ? <CheckCircle size={18} /> : <X size={18} />}
            <span className="text-sm">{flash.message}</span>
          </div>
        )}
       <h1 className="text-center border-2 mb-6 border-green-600 text-xl sm:text-2xl md:text-3xl rounded-md mx-4 sm:mx-10 md:mx-20 lg:mx-40 text-green-600">
  Checkout Cart
</h1>
<div className="fixed bottom-0 pb-2 pt-2 left-0 right-0 z-50 px-4 sm:px-8 bg-gray-100 border-t-2 border-gray-200 shadow-[0_-4px_6px_rgba(0,0,0,0.1)]">
<div className="flex justify-between items-center mb-4 ">
  <div>
    <button
      onClick={selectAllItems}
      className="px-3 py-1 rounded bg-green-500 text-white hover:bg-green-600 mr-2"
    >
      <CheckSquare className="w-4 h-4"/>
    </button>
    <button
      onClick={deselectAllItems}
      className="px-3 py-1 rounded bg-gray-500 text-white hover:bg-gray-600"
    >
      <Square className="w-4 h-4"/>
    </button>
  </div>
  <div className="text-lg font-bold">
    Total: <span className="text-green-700">₱{totalPrice}</span>
  </div>
</div>
<div className="flex justify-between">
<div></div>
    {selectedItems.length > 0 && (
    <button
  onClick={() => {
    if (selectedItems.length === 0) {
      alert("No item selected!");
      return;
    }

    if (confirm(`Confirm checkout for ${selectedItems.length} selected item(s)?`)) {
      post("/cart/bulk-checkout"); // form.data.ids is already up-to-date
    }
  }}
  disabled={selectedItems.length === 0}
  className={`px-4 py-2 flex justify-center items-center gap-2 text-xs rounded mb-4 text-white ${
    selectedItems.length === 0 ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
  }`}
>
  <ShoppingBasketIcon className="w-4"/> Checkout ({selectedItems.length})
</button>

    )}
</div>
</div>



        {/* Trades grouped by seller */}
        {Object.values(groupedBySeller).length === 0 ? (
          <p className="text-gray-500 text-center text-lg">No items found.</p>
        ) : (
          <div className="space-y-8 max-w-6xl mx-auto">
            {Object.values(groupedBySeller).map(({ owner, items }) => (
              <div key={owner.id} className="space-y-4">
                {/* Seller Header */}
                    <Link href={`/profile-view/${owner.id}`}>
                <p className="text-lg font-bold text-gray-800 mb-2 border-b pb-2 border-gray-300">{owner.name} - <span className="text-xs font-normal">{owner.address}</span></p>
</Link>


                {/* Seller's Items */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {items.map((trade) => {
                    const isUser = trade.user_id === auth.user.id;
                    return (
                      <div
                        key={trade.id}
                        className="relative h-50 rounded-2xl overflow-hidden shadow-lg group transition-transform hover:scale-[1.02] cursor-pointer"
                      >
                        {/* Background Image */}
                        <img
                          src={`/storage/${trade.material.image}`}
                          alt={trade.material.material_name}
                          className="absolute inset-0 w-full h-full object-cover transition duration-300 group-hover:scale-105"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                        <div className="absolute top-2 left-2">
                        <input
                            type="checkbox"
                            checked={selectedItems.includes(trade.id)}
                            onChange={() => toggleSelectItem(trade.id)}
                            className="w-5 h-5 accent-green-500"
                        />
                        </div>
                        {/* Material Info */}
                        <div className="absolute bottom-0 left-0 right-0 p-4 text-white flex justify-between items-end">
                          <div>
                            <Link href={`/materials/${trade.material.id}`}>
                              <h3 className="text-sm font-bold drop-shadow-md">{trade.material.material_name}</h3>
                            </Link>
                            <p className="text-xs opacity-90">
                              {!isUser ? trade.user.name : ""}                                              {/**trade.qunatity*/}
                              <span className="text-green-400 text-lg font-bold"> ₱{trade.material.price} </span>
                              <span className="font-bold">x {trade.quantity}</span>
                            </p>
                          </div>

                          <div className="flex absolute right-2 top-0  mb-4   items-center  rounded-full px-1.5 ">
                            <button
                              onClick={() => updateQuantity(trade.id, (trade.quantity - 1))}
                              className=" font-extrabold bg-green-400 rounded-sm  hover:text-red-500 text-white-400 text-sm px-1 transition"
                            >
                              −
                            </button>
                            <span className="mx-2 text-xs font-extrabold text-white-400  w-6 text-center">
                              {trade.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(trade.id, (trade.quantity + 1))}
                              className=" hover:text-green-500 bg-green-400 rounded-sm font-extrabold text-white-400 text-sm px-1 transition"
                            >
                              +
                            </button>
                          </div>
                          {/* Buttons */}
                          <div className="flex gap-2">
                            {isUser ? (
                              <>
                                <button
                                  onClick={() => cancelDonate(trade.id)}
                                  disabled={["rejected", "cancelled"].includes(trade.status)}
                                  className={`p-2 rounded-full text-sm font-medium shadow-md transition ${["rejected", "cancelled"].includes(trade.status)
                                    ? "bg-gray-500/40 cursor-not-allowed"
                                    : "bg-red-500 hover:bg-red-600"
                                    }`}
                                  title="Cancel"
                                >
                                  <X size={16} />
                                </button>
                                {/*
                                <button
                                onClick={() => handleConfirm(trade.id)}
                                className="p-2 rounded-full bg-green-500 hover:bg-green-600 shadow-md transition"
                                title="Confirm"
                                >
                                <CheckCircle size={16} />
                                </button>
                                */}

                                <Link
                                  href={`/message/${trade.material_id}`}
                                  className="p-2 rounded-full bg-blue-500 hover:bg-blue-600 shadow-md transition"
                                  title="Chat"
                                >
                                  <MessageCircle size={16} />
                                </Link>
                              </>
                            ) : (
                              <>
                                <button
                                  onClick={() => rejectDonate(trade.id)}
                                  disabled={["rejected", "cancelled", "accepted"].includes(trade.status)}
                                  className={`p-2 rounded-full text-sm font-medium shadow-md transition ${["rejected", "cancelled", "accepted"].includes(trade.status)
                                    ? "bg-gray-500/40 cursor-not-allowed"
                                    : "bg-red-500 hover:bg-red-600"
                                    }`}
                                  title="Reject"
                                >
                                  <X size={16} />
                                </button>
                                <Link
                                  href={`/messagex/${trade.material_id}/${trade.user_id}`}
                                  className="p-2 rounded-full bg-blue-500 hover:bg-blue-600 shadow-md transition"
                                  title="Chat"
                                >
                                  <MessageCircle size={16} />
                                </Link>
                                <button
                                  onClick={() => acceptDonate(trade.id)}
                                  disabled={["rejected", "cancelled", "accepted"].includes(trade.status)}
                                  className={`p-2 rounded-full text-sm font-medium shadow-md transition ${["rejected", "cancelled", "accepted"].includes(trade.status)
                                    ? "bg-gray-500/40 cursor-not-allowed"
                                    : "bg-green-500 hover:bg-green-600"
                                    }`}
                                  title="Accept"
                                >
                                  <CheckCircle size={16} />
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
