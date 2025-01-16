"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useMemo, useState } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { createPortal } from "react-dom";
import CustomSlider from "./customSlider";
import "./globals.css";

export default function Home() {
  const mainImageRef = useRef(null);
  const lotImageRef = useRef<HTMLImageElement | null>(null);
  const scrollRef = useRef(null);
  const controls = useAnimation();
  const [openDivIndex, setOpenDivIndex] = useState<number | null>(0);
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(
    null
  );
  const [animationDone, setAnimationDone] = useState(false);
  const [lotImagePosition, setLotImagePosition] = useState({ top: 0, left: 0 });
  const [currentSection, setCurrentSection] = useState("home");
  const [isHomeRefreshed, setIsHomeRefreshed] = useState(true);

  const handleNavClick = (sectionId) => {
    setIsHomeRefreshed(false); // Set to false when navigating
    setCurrentSection(sectionId);
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (!isHomeRefreshed) {
      setAnimationDone(false);
      controls.start("hidden");
    } else {
      controls.start("visible");
    }
  }, [isHomeRefreshed, controls]);

  // Dynamically create the portal root if it doesn't exist
  useEffect(() => {
    let portalDiv = document.getElementById("portal-root");
    if (!portalDiv) {
      portalDiv = document.createElement("div");
      portalDiv.id = "portal-root";
      document.body.appendChild(portalDiv); // Append it to the body
    }
    setPortalContainer(portalDiv);
  }, []);

  useEffect(() => {
    const isSmallScreen = window.matchMedia("(max-width: 768px)").matches;
    const timeline = gsap.timeline({
      onComplete: () => {
        // Measure the position of Lot.png at the end of the animation
        if (lotImageRef.current) {
          const rect = lotImageRef.current.getBoundingClientRect();
          setLotImagePosition({
            top: rect.top + window.scrollY, // Adjust for scroll position
            left: rect.left + window.scrollX, // Adjust for scroll position
          });
        }
        setAnimationDone(true);
      },
    });

    if (isSmallScreen) {
      gsap.fromTo(
        mainImageRef.current,
        { scale: 0.5, y: -200 }, // Smaller initial scale and offsets
        {
          scale: 1,
          y: 0,
          duration: 1,
          ease: "expo.out",
          delay: 1, // Shorter delay for small screens
        }
      );
    } else {
      timeline.fromTo(
        mainImageRef.current,
        { scale: 1.2, x: -50, y: 50, height: 350 },
        {
          scale: 1,
          x: 0,
          y: 0,
          height: 440,
          duration: 1,
          ease: "expo.out",
          delay: 1,
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

  return (
    <motion.div
      ref={scrollRef}
      className="bg-[#AFD4E6] min-h-screen p-3 md:p-5 text-gray-200"
      initial="hidden"
      animate={controls}
      variants={isHomeRefreshed ? containerVariants : undefined}
    >
      <motion.header
        variants={isHomeRefreshed ? itemVariants : undefined}
        className="flex flex-col relative z-[3] bg-[#F6F3EE] rounded-2xl shadow-lg sm:flex-row justify-between items-center mb-3"
      >
        <Image
          src="/Logo.png"
          alt="Logo"
          width={70}
          height={40}
          className="pl-4"
        />
        <nav className="flex space-x-4 mr-4 pr-4 justify-between">
          <button
            onClick={() => handleNavClick("home")}
            className="text-[#076447] hover:text-[white]"
          >
            <h2>HOME</h2>
          </button>
          <button
            onClick={() => handleNavClick("projects")}
            className="text-[#076447] hover:text-[white]"
          >
            <h2>PROJECTS</h2>
          </button>
        </nav>
      </motion.header>

      <div>
        {currentSection === "home" && (
          <div id="home" className="grid grid-cols-12 gap-4">
            <motion.div
              variants={isHomeRefreshed ? itemVariants : undefined}
              className="bg-[#F6F3EE] p-6 rounded-2xl shadow-lg col-span-12 md:col-span-6 lg:col-span-5 flex flex-col justify-evenly row-span-2"
            >
              <div className="flex row items-center">
                <h1 className="mb-2 text-[#076447]">
                  Design that tells a story, illustrations that speak. <br></br>
                  <span className="text-[#F76F2A]">Welcome to Litttie!</span>
                </h1>
              </div>
            </motion.div>

            {animationDone && (
              <Image
                src="/Swirl.png"
                alt="Swirl"
                width={1000}
                height={200}
                className="absolute z-[2] top-[7vh] left-[55%] transform -translate-x-1/2 -translate-y-1/4 hidden md:block animate-fadeIn"
              />
            )}

            <div
              ref={mainImageRef}
              className="bg-[#EDCCE3] bg-opacity-80 rounded-2xl shadow-lg flex items-end justify-center main_image col-span-12 md:col-span-5 lg:col-span-3 row-span-2"
            >
              <div className="block md:hidden">
                <Image
                  src="/Lot.png"
                  alt="Lot"
                  width={320}
                  height={320}
                  className="max-w-[350px] h-auto object-cover"
                />
              </div>
              <div className="hidden md:block">
                <Image
                  ref={lotImageRef}
                  src="/Lot.png"
                  alt="Lot"
                  width={320}
                  height={320}
                  className="max-w-[350px] h-auto object-cover"
                />
                {animationDone &&
                  portalContainer &&
                  currentSection === "home" &&
                  createPortal(
                    <Image
                      src="/Lot.png"
                      alt="Lot"
                      width={320}
                      height={320}
                      className="max-w-[350px] h-auto object-cover hidden md:block"
                      style={{
                        position: "absolute",
                        top: lotImagePosition.top,
                        left: lotImagePosition.left,
                      }}
                    />,
                    portalContainer
                  )}
              </div>
            </div>

            <motion.div
              variants={isHomeRefreshed ? itemVariants : undefined}
              className="bg-[#1A91D4] z-[3] p-4 rounded-2xl shadow-lg flex flex-col justify-evenly col-span-12 md:col-span-7 lg:col-span-4 row-span-3 min-h-[80vh] sm:max-h-[82vh] overflow-y-auto hide-scrollbar"
            >
              <div className="flex justify-end">
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 20 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ArrowUpRight
                    className="mb-2 text-[#F6F3EE] cursor-pointer"
                    size={30}
                  />
                </motion.div>
              </div>
              <h1
                className="text-[#F6F3EE] ms-1 relative"
                style={{ marginTop: -30 }}
              >
                Portofolio
              </h1>
              <div className="interactive-div group p-0 rounded-xl shadow-lg">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => toggleDiv(0)}
                  className="div-header"
                >
                  <h2 className="text-left">Freehand Illustrations</h2>
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
                      <div className="relative mx-auto overflow-hidden rounded-lg">
                        <Image
                          src="/freehand.png" // Use the first image as the static one
                          alt="freehand"
                          width={250} // Provide a large width for the image source
                          height={200} // Ensure the aspect ratio remains square
                          className="rounded-lg object-cover mx-auto mb-2"
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="interactive-div group p-0 rounded-xl shadow-lg">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => toggleDiv(1)}
                  className="div-header"
                >
                  <h2 className="text-left">EP - Dave</h2>
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
                      <CustomSlider
                        images={[
                          "/Opdracht-2a-min.png",
                          "/Opdracht-2b-min.png",
                          "/Opdracht-2c-min.png",
                          "/Opdracht-2d-min.png",
                          "/Opdracht-2e-min.png",
                        ]}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="interactive-div group p-0 rounded-xl shadow-lg">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => toggleDiv(2)}
                  className="div-header"
                >
                  <h2 className="text-left">Take it to the Bridge</h2>
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
                      <CustomSlider
                        images={[
                          "/Opdracht-3a-min.png",
                          "/Opdracht-3b-min.png",
                          "/Opdracht-3c-min.png",
                          "/Opdracht-3d-min.png",
                        ]}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="interactive-div group p-0 rounded-xl shadow-lg">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => toggleDiv(3)}
                  className="div-header"
                >
                  <h2 className="text-left">SlipIn</h2>
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
                      <CustomSlider
                        images={[
                          "/Opdracht-4a-min.png",
                          "/Opdracht-4b-min.png",
                          "/Opdracht-4c-min.png",
                          "/Opdracht-4d-min.png",
                          "/Opdracht-4e-min.png",
                          "/Opdracht-4f-min.png",
                        ]}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            <motion.div
              variants={isHomeRefreshed ? itemVariants : undefined}
              className="bg-[#F6F3EE] p-6 rounded-2xl shadow-lg flex flex-col justify-between col-span-12 md:col-span-6 lg:col-span-4 row-span-2"
            >
              <div className="flex justify-end">
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 20 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ArrowUpRight
                    className="mb-2 text-[#F6F3EE] cursor-pointer"
                    size={30}
                  />
                </motion.div>
              </div>
              <h3 className="text-[#076447]">
                Litttie brings stories to life with bold visuals, offering
                creative solutions in graphic design and illustration—from
                unique logos and branding to impactful designs for print and
                digital platforms.
              </h3>
            </motion.div>

            <motion.div
              variants={isHomeRefreshed ? itemVariants : undefined}
              className="bg-[#076447] p-6 rounded-2xl shadow-lg col-span-12 md:col-span-6 lg:col-span-4 flex flex-col justify-between row-span-2"
            >
              <div className="flex justify-end">
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 20 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Link href="mailto:lot@vanegdom.net">
                    <ArrowUpRight
                      className="mb-2 text-[#F6F3EE] cursor-pointer"
                      size={30}
                    />
                  </Link>
                </motion.div>
              </div>
              <h3 className="text-[#F6F3EE] mb-auto" style={{ marginTop: -30 }}>
                Questions?
              </h3>
              <h1 className="text-[#EDCCE3] text-opacity-80 mt-auto">
                CONTACT
              </h1>
            </motion.div>
            <motion.div
              variants={isHomeRefreshed ? itemVariants : undefined}
              className="bg-[#F6F3EE] p-6 rounded-2xl shadow-lg col-span-12 md:col-span-6 lg:col-span-4 flex flex-col row-span-1"
            >
              <div className="flex justify-end items-center col-span-12">
                {[
                  {
                    href: "/linkedin-icon.png",
                    link: "https://www.linkedin.com/in/lot-van-egdom?originalSubdomain=nl",
                    alt: "LinkedIn",
                  },
                  {
                    href: "/instagram-icon.png",
                    link: "https://www.instagram.com/lot.is.egdom/",
                    alt: "Instagram",
                  },
                ].map(({ href, link, alt }) => (
                  <Link
                    key={link}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <motion.div
                      className="text-[#076447] px-2"
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Image
                        src={href}
                        alt={alt}
                        width={40} // Adjust the width
                        height={40} // Adjust the height
                        className="object-cover"
                      />
                    </motion.div>
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>
        )}
        {currentSection === "projects" && (
          <div id="projects">Projects Content</div>
        )}
      </div>
    </motion.div>
  );
}
