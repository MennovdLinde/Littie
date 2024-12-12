import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

const CustomSlider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Automatically loop through the images
  useEffect(() => {
    // Trigger the first slide immediately
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);

    // Set up the interval for subsequent slides
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000); // Change images every 3 seconds

    return () => clearInterval(interval); // Clear interval on unmount
  }, [images.length]);

  return (
    <div className="relative w-full h-[18vh] overflow-hidden rounded-lg">
      <motion.div
        className="flex items-center justify-evenly w-full h-full"
        animate={{ x: `-${currentIndex * (100 / images.length)}%` }}
        transition={{
          repeat: Infinity,
          duration: 5, // Duration for smooth sliding
          ease: "linear", // Ensure linear continuous motion
        }}
        style={{
          width: `${images.length * (100 / 3)}%`, // Total width accounting for visible images
        }}
      >
        {images.concat(images).map((src, index) => (
          <div
            key={index}
            className="relative w-[8vw] h-[18vh] group mx-2 flex-shrink-0"
            style={{
              width: "calc(100% / 3)", // Ensure each image container takes 1/3 of visible area
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
