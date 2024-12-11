"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Linkedin, Instagram, Facebook } from "lucide-react";
import { useEffect, useRef, useMemo, useState } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import Popup from "./popup";
import "./globals.css";

export default function Home() {
  const mainImageRef = useRef(null);
  const scrollRef = useRef(null);
  const controls = useAnimation();
  const [openDivIndex, setOpenDivIndex] = useState<number | null>(0);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    const isSmallScreen = window.matchMedia("(max-width: 768px)").matches;

    if (isSmallScreen) {
      gsap.fromTo(
        mainImageRef.current,
        { scale: 0.5, y: -200 }, // Smaller initial scale and offsets
        {
          scale: 1,
          y: 0,
          duration: 1,
          ease: "expo.out",
          delay: 0.5, // Shorter delay for small screens
        }
      );
    } else {
      gsap.fromTo(
        mainImageRef.current,
        { scale: 1.2, x: -50, y: 50 },
        {
          scale: 1,
          x: 0,
          y: 0,
          duration: 1.5,
          ease: "expo.out",
          delay: 1, // Adds a slight delay for dramatic effect
        }
      );
    }
    controls.start("visible");
  }, [controls]);

  const containerVariants = useMemo(
    () => ({
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          delayChildren: 1,
          staggerChildren: 0.2,
        },
      },
    }),
    []
  );

  const itemVariants = useMemo(
    () => ({
      hidden: { scale: 0.8, opacity: 0 },
      visible: {
        scale: 1,
        opacity: 1,
        transition: {
          duration: 0.5,
          ease: "easeOut",
        },
      },
    }),
    []
  );

  const toggleDiv = (index: number) => {
    setOpenDivIndex(openDivIndex === index ? null : index); // Toggle div state
  };

  const handlePopupOpen = () => {
    setIsPopupOpen(true);
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false);
  };

  return (
    <motion.div
      ref={scrollRef}
      className="bg-[black] min-h-screen p-3 md:p-5 text-gray-200"
      initial="hidden"
      animate={controls}
      variants={containerVariants}
    >
      <motion.header
        variants={itemVariants}
        className="flex flex-col bg-[#60c4e6] rounded-2xl sm:flex-row justify-between items-center mb-3"
      >
        <Image
          src="/Logo.png"
          alt="Logo"
          width={70}
          height={40}
          className="pl-4"
        />
        <nav className="space-x-4 mr-4 pr-4">
          <Link
            href="#projects"
            className="text-sm text-[white] hover:text-[white]"
          >
            PROJECTS
          </Link>
          <Link
            href="#about"
            className="text-sm text-[white] hover:text-[white]"
          >
            ABOUT
          </Link>
          <Link
            href="#contact"
            className="text-sm text-[white] hover:text-[white]"
          >
            CONTACT
          </Link>
        </nav>
      </motion.header>

      <div className="grid grid-cols-12 gap-4 min-h-[88vh]">
        <motion.div
          variants={itemVariants}
          className="bg-[#60c4e6] p-6 rounded-2xl col-span-12 md:col-span-6 lg:col-span-5 flex flex-col justify-evenly row-span-1"
        >
          <div className="flex row items-center">
            <h1 className="md:text-3xl text-2xl lg:text-6xl font-bold font-serif mb-2 leading-tight text-[white]">
              Do you have a graphic design wish? Welcome to{" "}
              <span className="text-[#f0ce17]">Littie!</span>
            </h1>
          </div>
        </motion.div>

        <div
          ref={mainImageRef}
          className="bg-[#2a499b] rounded-2xl flex items-end justify-center main_image col-span-12 md:col-span-5 lg:col-span-3 row-span-1"
        >
          <Image
            src="/Lot.png"
            alt="Lot"
            width={280}
            height={300}
            className="max-w-[280px] h-auto object-cover pt-5"
          />
        </div>

        <motion.div
          variants={itemVariants}
          className="bg-[#f0ce17] p-4 rounded-2xl flex flex-col justify-evenly col-span-12 md:col-span-7 lg:col-span-4 row-span-2 max-h-[100vh] lg:max-h-[88vh] overflow-y-auto hide-scrollbar "
        >
          <div className="interactive-div">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => toggleDiv(0)}
              className="div-header"
            >
              <h2>Art Exhibition - Kane</h2>
              <p>Uitleg project</p>
            </motion.div>
            <AnimatePresence>
              {openDivIndex === 0 && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "fit-content", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="div-content"
                >
                  <div className="flex items-center justify-between space-x-4">
                    <Image
                      src="/Opdracht-1a-min.jpg"
                      alt="1a"
                      width={80}
                      height={80}
                      className="shadow-md"
                    />
                    <Image
                      src="/Opdracht-1b-min.jpg"
                      alt="1b"
                      width={100}
                      height={100}
                      className="shadow-md"
                    />
                    <Image
                      src="/Opdracht-1c-min.jpg"
                      alt="1c"
                      width={100}
                      height={100}
                      className="shadow-md"
                    />
                    <Image
                      src="/Opdracht-1d-min.jpg"
                      alt="1d"
                      width={100}
                      height={100}
                      className="shadow-md"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="interactive-div">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => toggleDiv(1)}
              className="div-header"
            >
              <h2>EP - Dave</h2>
              <p>Uitleg project</p>
            </motion.div>
            <AnimatePresence>
              {openDivIndex === 1 && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "fit-content", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="div-content"
                >
                  <div className="flex items-center justify-evenly">
                    <Image
                      src="/Opdracht-2a-min.jpg"
                      alt="1a"
                      width={100}
                      height={100}
                      className="shadow-md"
                    />
                    <Image
                      src="/Opdracht-2b-min.png"
                      alt="1b"
                      width={100}
                      height={100}
                      className="shadow-md"
                    />
                    <Image
                      src="/Opdracht-2c-min.png"
                      alt="1c"
                      width={100}
                      height={100}
                      className="shadow-md"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="interactive-div">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => toggleDiv(2)}
              className="div-header"
            >
              <h2>Take it to the bridge</h2>
              <p>Uitleg project</p>
            </motion.div>
            <AnimatePresence>
              {openDivIndex === 2 && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "fit-content", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="div-content"
                >
                  <div className="flex items-center justify-evenly">
                    <Image
                      src="/Opdracht-3a-min.png"
                      alt="1a"
                      width={100}
                      height={100}
                      className="shadow-md"
                    />
                    <Image
                      src="/Opdracht-3b-min.png"
                      alt="1b"
                      width={100}
                      height={100}
                      className="shadow-md"
                    />
                    <Image
                      src="/Opdracht-3c-min.png"
                      alt="1c"
                      width={100}
                      height={100}
                      className="shadow-md"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="interactive-div">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => toggleDiv(3)}
              className="div-header"
            >
              <h2>SlipIn</h2>
              <p>Uitleg project</p>
            </motion.div>
            <AnimatePresence>
              {openDivIndex === 3 && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "fit-content", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="div-content"
                >
                  <div className="grid grid-cols-2 items-center justify-items-center md:flex md:items-center md:justify-between md:space-x-4 gap-2">
                    <Image
                      src="/Opdracht-4a-min.png"
                      alt="4a"
                      width={100}
                      height={100}
                      className="shadow-md"
                    />
                    <Image
                      src="/Opdracht-4b-min.png"
                      alt="4b"
                      width={100}
                      height={100}
                      className="shadow-md"
                    />
                    <Image
                      src="/Opdracht-4c-min.png"
                      alt="4c"
                      width={100}
                      height={100}
                      className="shadow-md"
                    />
                    <Image
                      src="/Opdracht-4d-min.png"
                      alt="4d"
                      width={100}
                      height={100}
                      className="shadow-md"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="bg-[#60c4e6] p-6 rounded-2xl flex flex-col justify-between col-span-12 md:col-span-6 lg:col-span-4"
        >
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-bold text-[white]">Portofolio</h3>
            <motion.div
              whileHover={{ scale: 1.2, rotate: 20 }}
              whileTap={{ scale: 0.9 }}
              onClick={handlePopupOpen} // Open the popup on click
            >
              <ArrowUpRight
                className="mb-2 text-[white] cursor-pointer"
                size={30}
              />
            </motion.div>
          </div>
          <h3 className="font-bold text-[white]">
            Littie is a talented graphic designer blending creativity with
            precision. She excels in logo design, brand identity, and digital
            illustrations, creating visually captivating and meaningful designs.
          </h3>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="bg-[#60c4e6] p-6 rounded-2xl col-span-12 md:col-span-6 lg:col-span-4 flex flex-col justify-between row-span-1"
        >
          <div className="flex justify-between items-center">
            <h3 className="text-4xl md:text-5xl mt-4 font-sans font-semibold text-[#ffecdd]">
              Contact me
            </h3>
            <motion.div
              whileHover={{ scale: 1.2, rotate: 20 }}
              whileTap={{ scale: 0.9 }}
            >
              <Link href="mailto:lot@vanegdom.net">
                <ArrowUpRight
                  className="mb-2 text-[white] cursor-pointer"
                  size={30}
                />
              </Link>
            </motion.div>
          </div>
          <div className="flex justify-evenly items-center col-span-12">
            {[
              {
                href: "https://www.linkedin.com/in/lot-van-egdom?originalSubdomain=nl",
                Icon: Linkedin,
              },
              {
                href: "https://www.instagram.com/lot.is.egdom/",
                Icon: Instagram,
              },
              {
                href: "https://www.facebook.com/login/?next=https%3A%2F%2Fwww.facebook.com%2Flot.vanegdom%2F",
                Icon: Facebook,
              },
            ].map(({ href, Icon }) => (
              <Link
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <motion.div
                  className="text-[#6B4D30] hover:text-[white]"
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon size={30} />
                </motion.div>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
      <Popup isOpen={isPopupOpen} onClose={handlePopupClose} />
    </motion.div>
  );
}
