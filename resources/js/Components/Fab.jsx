import React, { useState } from "react";
import { MessageCircle, X } from "lucide-react";


export default function FloatingQuickMessages({ onSelect }) {
  const [open, setOpen] = useState(false);

  // Quick messages (you can customize)
  const messages = [
    "Hello!",
    "Can you help me?",
    "What are your working hours?",
    "I want to book an appointment.",
  ];

  return (
    <div className="fixed bottom-6 right-6 flex flex-col items-end space-y-2">
      {/* Quick message list */}
      {open &&
        messages.map((msg, index) => (
          <button
            key={index}
            onClick={() => {
              onSelect(msg);
              setOpen(false);
            }}
            className="bg-white text-gray-700 shadow-md border rounded-full px-4 py-2 mb-2 hover:bg-gray-100 transition"
          >
            {msg}
          </button>
        ))}

      {/* Floating Action Button */}
      <button
        onClick={() => setOpen(!open)}
        className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all"
      >
        {open ? <X size={24} /> : <MessageCircle size={24} />}
      </button>
    </div>
  );
}
