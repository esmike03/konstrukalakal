import { Link, usePage } from "@inertiajs/react";
import { Clock, Trash2 } from "lucide-react";


export default function Messages() {
  const {
    auth: { user: authUser },
    conversations = [],
  } = usePage().props;

  // Filter out invalid self-chat edge cases
  const otherChats = conversations.filter(
    (chat) => chat.user || chat.user.id !== authUser.id
  );

  return (
    <div className="w-full px-4 sm:px-14 mt-6">
      <h1 className="text-2xl text-gray-800 mb-6">Messages</h1>

      {otherChats.length > 0 ? (
        <div className="space-y-3">
          {otherChats.map((chat) => (
            <Link
              key={chat.conversation_id} // ✅ unique conversation ID
              href={`/message2/${chat.conversation_id}`} // ✅ link by conversation ID
              className="block"
            >
              <div className="flex items-center p-4 bg-white rounded-lg shadow hover:bg-gray-50 transition">
                <img
                  src={`/storage/${chat.material_image}`}
                  alt={chat.user.name}
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div className="ml-4 flex-1">
                  <div>
                  <div className="flex">
                    <p className="text-md flex font-bold items-center content-center gap-2 text-gray-900">
                            {chat.user.name}



                    </p>
                  </div>

                    <p className="text-xs text-gray-700">
                        {chat.material_name} | <span className="text-xs text-gray-400">{chat.conversation_id.slice(0, 8) + '...'}</span>
                    </p>

                </div>
                  <p className="text-xs text-gray-500 truncate">
                    {chat.last_message.content}
                  </p>
                </div>
                <div className="flex-shrink-0 text-xs text-gray-400 flex items-center">
                  <Clock size={12} className="mr-1" />
                  {new Date(chat.last_message.created_at).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                  <Link href={`/conversation/delete/${chat.conversation_id}`} className="">
                                        <button
                                          className=""
                                          onClick={(e) => {
                                            if (!window.confirm("Are you sure you want to delete this conversation?")) {
                                              e.preventDefault(); // stop navigation if cancelled
                                            }
                                          }}
                                        >
                                          <Trash2 className="w-4 text-red-500 mx-2" />
                                        </button>
                                      </Link>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-center mt-20 text-gray-500">No Messages</p>
      )}
    </div>
  );
}
