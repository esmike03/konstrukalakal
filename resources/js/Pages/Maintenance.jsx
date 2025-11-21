import { motion } from "framer-motion";
import { RefreshCw } from "lucide-react";

export default function Maintenance() {
  return (
    <div className="flex flex-col absolute top-0 w-full items-center justify-center min-h-screen bg-gradient-to-br from-indigo-800 via-purple-600 to-pink-800 text-white px-6 text-center">
      {/* Animated icon */}
      <motion.div
        className="mb-8"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 8,
          ease: "linear",
        }}
      >
        <RefreshCw className="w-24 h-24 text-white drop-shadow-xl" />

      </motion.div>

      {/* Title */}
      <motion.h1
        className="text-4xl md:text-6xl font-extrabold mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Maintenance Ongoing 🚧
      </motion.h1>

      {/* Description */}
      <motion.p
        className="text-lg md:text-xl max-w-xl mb-8 opacity-90"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        Our website is currently undergoing scheduled maintenance.
        We’re working hard to make it even better. Please check back later!
      </motion.p>

      {/* Floating elements for effect */}
      <motion.div
        className="absolute top-10 left-10 w-10 h-10 bg-white/20 rounded-full blur-xl"
        animate={{ y: [0, 30, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-16 h-16 bg-white/20 rounded-full blur-2xl"
        animate={{ y: [0, -40, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Contact or back button */}

    </div>
  );
}
