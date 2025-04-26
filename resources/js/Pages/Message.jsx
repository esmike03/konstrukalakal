import { Link, usePage } from "@inertiajs/react";
import { Clock } from "lucide-react";

export default function Messages() {
  const {
    auth: { user: authUser },
    conversations = [],
  } = usePage().props;

  // Exclude the current user from the conversations list
  const otherChats = conversations.filter(
    (chat) => chat.user.id !== authUser.id
  );

  return (
    <div className="w-full px-4 sm:px-14 mt-6">
      <h1 className="text-2xl text-gray-800 mb-6">Messages</h1>

      {otherChats.length > 0 ? (
        <div className="space-y-3">
          {otherChats.map((chat) => (
            <Link
              key={chat.user.id}

              href={`/message/${chat.material_id}`}
              className="block"
            >
              <div className="flex items-center p-4 bg-white rounded-lg shadow hover:bg-gray-50 transition">
                <img
                  src={`/storage/${chat.user.profile_image}`}
                  alt={chat.user.name}
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div className="ml-4 flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    {chat.user.name}
                  </p>
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
