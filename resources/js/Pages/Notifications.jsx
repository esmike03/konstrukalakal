import React from "react";
import { usePage, Link } from "@inertiajs/react";

export default function Index() {
  const { allNotifications } = usePage().props;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Notifications
        </h1>

        {allNotifications.data.length > 0 ? (
          <ul className="space-y-4">
            {allNotifications.data.map((notif, i) => (
              <li
                key={i}
                className="flex items-center gap-4 p-4 rounded-2xl shadow-md border border-white/40 bg-white/30 backdrop-blur-md hover:bg-white/40 transition"
              >
                {/* Notification Image */}
                <img
  src={
    notif.image
      ? notif.image.startsWith("http")
        ? notif.image
        : `/storage/${notif.image}`
      : "https://img.icons8.com/clr-gls/1200/appointment-reminders.jpg"
  }
  alt="Notif"
  className="w-12 h-12 rounded-full object-cover border border-white/60 shadow-sm"
/>



                {/* Notification Text */}
                <div className="flex-1">
                  <p className="text-sm text-gray-800">{notif.message}</p>
                  <span className="text-xs text-gray-500">
                    {new Date(notif.created_at).toLocaleString()}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-600">
            No notifications yet.
          </p>
        )}

        {/* Pagination */}
        <div className="mt-6 flex justify-center space-x-2">
          {allNotifications.links.map((link, i) => (
            <Link
              key={i}
              href={link.url || "#"}
              className={`px-3 py-1 rounded-md text-sm transition ${
                link.active
                  ? "bg-indigo-500 text-white"
                  : "bg-white/50 text-gray-700 hover:bg-white/80"
              }`}
              dangerouslySetInnerHTML={{ __html: link.label }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
