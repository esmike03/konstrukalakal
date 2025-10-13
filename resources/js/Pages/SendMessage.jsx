import { useForm, Link, usePage } from "@inertiajs/react";
import { ArrowLeft } from "lucide-react";

export default function SendMessage({ material, user, messages, conversationId }) {
  const { data, setData, post, reset, processing } = useForm({
    message: "",
    recipient_id: user.id,
    material_id: material.id,
    start: conversationId || "",
  });

  // get the currently authenticated user
  const {
    auth: { user: authUser },
  } = usePage().props;

const handleSend = (e) => {
  e.preventDefault();
  if (!data.message.trim()) return;

  post("/messages/send", data, {
    preserveScroll: true,
    onSuccess: (res) => {
      reset("message");
      if (res.start) setData("start", res.start); // update conversationId after first message
    },
  });
};


  return (
    <>
      <div className="max-w-5xl mx-auto p-6 rounded-lg gap-8 mt-10 mb-24">
        {/* Back Button */}
        <Link href="/messages">
          <button className="absolute top-20 text-gray-500 font-semibold flex items-center">
            <ArrowLeft size={20} className="mr-1" /> Back
          </button>
        </Link>

        {/* Product Preview Card */}
        <div className="w-full flex justify-center mt-0">
          <div className="w-[300px] h-[100px] bg-white rounded-md shadow-md p-4 flex gap-4">

            <div className="w-[40%] relative">

              <img
                src={`/storage/${material.image}`}
                alt={material.material_name}
                className="w-full h-full object-cover rounded-md"
              />
               {material.status === 'off' &&(
                <p className="absolute top-1 left-1 bg-red-500 text-[10px] text-white px-1 py-0.5 rounded">

                   Deleted
                </p>
                )}

                {material.status === 'on' &&(
                <p className="absolute top-1 left-1 bg-green-500 text-[10px] text-white px-1 py-0.5 rounded">

                   For {material.forbdt}
                </p>
                )}


            </div>
            <div className="w-[60%]">
              <div className="flex items-center gap-2 border-b pb-1 mb-1 border-gray-200">
                <img
                  src={`/storage/${user.profile_image}`}
                  alt={user.name}
                  className="h-4 w-4 object-cover rounded-full shadow"
                />
                <div>
                  <p className="text-xs font-medium">{user.name}</p>
                  <p className="text-[8px] text-gray-500">{user.contact}</p>
                </div>
              </div>
              <h1 className="text-xs font-bold leading-tight">
                {material.material_name}
              </h1>
              <p className="text-xs font-semibold text-gray-800 mt-2">

                {(!material.forbdt === "Donation" || !material.forbdt === "Trade" || material.forbdt === "Sale") && (

                <span className="text-green-600 text-xs">
                  Price:{" "}
                  ₱{material.price}

                </span>

                )}

              </p>
            </div>
          </div>
        </div>
        <div className="max-w-5xl mx-auto px-4 mt-4 w-full  items-center justify-center text-center">
            <p className="text-xs text-gray-500">
                {conversationId || "New conversation"}
            </p>
        </div>

        {/* Conversation Messages */}
        <div className="h-[60vh] overflow-y-auto mt-6 px-4 space-y-2">
          {messages.length === 0 ? (
            <p className="text-center text-gray-400 text-sm">
              No messages yet.
            </p>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.sender_id === authUser.id
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`px-4 py-2 rounded-lg text-sm max-w-xs ${
                    msg.sender_id === authUser.id
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                          {msg.sender_id !== authUser.id && (
                                <div className="flex items-center gap-1 mb-1">
                                {msg.sender_avatar && (
                                    <img src={`/storage/${msg.sender_avatar}`} alt={msg.sender_name} className="h-4 w-4 rounded-full object-cover" />
                                )}
                                <p className="text-[10px] font-semibold text-gray-600">{msg.sender_name}</p>
                                </div>
                            )}
                  {msg.content}
                  <div className="text-[10px] text-gray-700 mt-1 text-right">
                    {new Date(msg.created_at).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Message Input Fixed Bottom */}
      <form onSubmit={handleSend}>
        <div className="fixed bottom-0 left-0 w-full bg-white px-4 py-2 shadow-md">
          <div className="max-w-3xl mx-auto flex items-center gap-2">
            <input
              type="text"
              name="message"
              value={data.message}
              onChange={(e) => setData("message", e.target.value)}
              placeholder="Type your message..."
              className="flex-1 border rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="conversationId"
              hidden
              value={data.start}
              onChange={(e) => setData("conversationID", e.target.value)}

              className="flex-1 border rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              disabled={processing}
              className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm hover:bg-blue-600 transition disabled:opacity-50"
            >
              {processing ? "Sending..." : "Send"}
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
