import { motion } from "framer-motion";
import Image from "next/image";

const CustomSlider: React.FC<{ images: string[] }> = ({ images }) => {
  const totalImages = images.concat(images); // Duplicate images for seamless scrolling

  return (
    <div className="relative w-full h-[18vh] overflow-hidden rounded-lg">
      <motion.div
        className="flex items-center h-full"
        animate={{ x: ["-100%", "0%"] }}
        transition={{
          repeat: Infinity,
          duration: 40, // Adjust duration for desired speed
          ease: "linear",
        }}
        style={{
          width: `${totalImages.length * (100 / images.length)}%`, // Ensure space for all images
        }}
      >
        {totalImages.map((src, index) => (
          <div
            key={index}
            className="relative h-full mx-2 flex-shrink-0"
            style={{
              width: `${100 / images.length}%`, // Keep the same proportion for each image
            }}
          >
            <div className="absolute inset-0 bg-gray-900 flex items-center justify-center rounded-lg shadow-md">
              <Image
                src={src}
                alt={`slide-${index}`}
                layout="fill"
                className="rounded-lg object-cover"
              />
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default CustomSlider;
