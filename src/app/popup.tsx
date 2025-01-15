import { motion } from "framer-motion";
import "./globals.css";

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Popup({ isOpen, onClose }: PopupProps) {
  if (!isOpen) return null;

  const title = "About Littie";
  const content =
    "Littie is a brand that embodies creativity and passion. It all started with a dream and a lot of hard work to turn imagination into reality. From sketching ideas on paper to transforming them into stunning designs, Littie has been a journey of love, persistence, and artistic expression.";

  const image1Url = "/Art-1-min.JPG";
  const image2Url = "/Art-2-min.JPG";

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-gradient-to-r from-blue-400 via-teal-500 to-green-400 text-white p-6 rounded-lg shadow-2xl w-11/12 max-w-md h-[80vh] flex flex-col justify-between"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex flex-col h-full overflow-y-auto hide-scrollbar">
          {/* Title and Image */}
          <div className="mb-4">
            <img
              src={image1Url}
              alt="About Littie Image 1"
              className="w-full h-40 object-cover rounded-lg mb-4 shadow-md"
            />
            <h2 className="text-3xl font-extrabold mb-2">{title}</h2>
          </div>

          {/* Content (Scrollable) */}
          <div className="flex-grow mb-4 pr-2">
            <p className="leading-relaxed">{content}</p>
            <img
              src={image2Url}
              alt="About Littie Image 2"
              className="w-full h-40 object-cover rounded-lg mt-4 shadow-md"
            />
            <p className="leading-relaxed pt-2">{content}</p>
          </div>

          {/* Close Button */}
        </div>
        <button
          onClick={onClose}
          className="bg-white text-teal-500 px-4 py-2 mt-2 rounded-lg hover:bg-gray-200 transition self-end shadow"
        >
          Close
        </button>
      </motion.div>
    </motion.div>
  );
}
