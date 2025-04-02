"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useMemo, useState } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { createPortal } from "react-dom";
import CustomSlider from "./customSlider";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
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

  const handleNavClick = (sectionId: string) => {
    setIsHomeRefreshed(false);
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

  useEffect(() => {
    let portalDiv = document.getElementById("portal-root");
    if (!portalDiv) {
      portalDiv = document.createElement("div");
      portalDiv.id = "portal-root";
      document.body.appendChild(portalDiv);
    }
    setPortalContainer(portalDiv);
  }, []);

  useEffect(() => {
    const isSmallScreen = window.matchMedia("(max-width: 768px)").matches;
    const timeline = gsap.timeline({
      onComplete: () => {
        if (lotImageRef.current) {
          const rect = lotImageRef.current.getBoundingClientRect();
          setLotImagePosition({
            top: rect.top + window.scrollY,
            left: rect.left + window.scrollX,
          });
        }
        setAnimationDone(true);
      },
    });

    if (isSmallScreen) {
      gsap.fromTo(
        mainImageRef.current,
        { scale: 0.5, y: -200 },
        {
          scale: 1,
          y: 0,
          duration: 1,
          ease: "expo.out",
          delay: 1,
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
          height: "100%",
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

  const portfolioItems = [
    {
      id: 1,
      title: "LOGO DESIGN",
      titleColor: "#076447",
      description: "littie makes logo's based on your preferences, and always with her own distinct style. for more information, you can contact litttie",
      descriptionColor: "black",
      bgColor: "#076447",
      title2: "process",
      description2: [
        "1. DISCOVERY",
        "I begin by understanding your goals, target audience, and unique challenges. This phase involves research and collaboration to establish a clear direction.",
        "2. IDEATION",
        "I explore creative ideas and concepts, focusing on designs that are both visually appealing and strategically aligned with your needs.",
        "3. DESIGN",
        "Based on your feedback, I refine the selected concept into a final design that embodies your brand and vision.",
        "4. IMPLEMENTATION",
        "Once the design is complete, I deliver a comprehensive logo package tailored for your use across all platforms and formats, ensuring you're fully equipped to bring your brand to life.",
      ],
      images: [
        "/porto-logo-1.png",
        "/Opdracht-3b-min.png",
        "/Opdracht-3a-min.png",
        "/porto-logo-2.png",
      ],
    },
    {
      id: 2,
      title: "illustration",
      titleColor: "#f8bcd2",
      description: "whether for peronal projects or for clients, littie creates dstinct, abstract illustrations. each piece is designed to capture attention, tell a story, and add a unique visual flair to any project.",
      descriptionColor: "black",
      images: [
        "/porto-illus-1.jpg",
        "/porto-illus-2.jpg",
        "/porto-illus-3.jpg",
        "/porto-illus-4.png",
        "/porto-illus-5.jpg",
      ],
    },
    {
      id: 3,
      title: "graphic design",
      titleColor: "#F76F2A",
      description: "bringing creativity and attention to detail. litttie crafts designs that communicate efficiently and leave a lasting impression. from branding to layouts and costum visuals.",
      descriptionColor: "#076447",
      bgColor: "#F76F2A",
      title2: "process",
      description2: [
        "1. DISCOVERY",
        "I begin by understanding your goals, target audience, and unique challenges. This phase involves research and collaboration to establish a clear direction.",
        "2. IDEATION",
        "I explore creative ideas and concepts, focusing on designs that are both visually appealing and strategically aligned with your needs.",
        "3. DESIGN",
        "Based on your feedback, I refine the selected concept into a final design that embodies your brand and vision.",
        "4. IMPLEMENTATION",
        "Once the design is complete, I deliver a comprehensive logo package tailored for your use across all platforms and formats, ensuring you're fully equipped to bring your brand to life.",
      ],
      images: [
        "/porto-graph-1.jpg",
        "/porto-graph-2.jpg",
        "/porto-graph-3.jpg",
      ],
    },
  ];

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
        <nav className="flex space-x-4 justify-between sm:items-center pr-0 md:pr-4">
          <button
            onClick={() => handleNavClick("home")}
            className={`text-[#076447] px-1 md:px-5   ${
              currentSection === "home" ? "border-b-2 border-[#076447]" : ""
            }`}
          >
            <h3>ABOUT</h3>
          </button>
          <button
            onClick={() => handleNavClick("portofolio")}
            className={`text-[#076447] px-1 md:px-5 ${
              currentSection === "portofolio"
                ? "border-b-2 border-[#076447]"
                : ""
            }`}
          >
            <h3>PORTOFOLIO</h3>
          </button>
          <button
            onClick={() => handleNavClick("contact")}
            className={`text-[#076447] px-1 md:px-5 ${
              currentSection === "contact" ? "border-b-2 border-[#076447]" : ""
            }`}
          >
            <h3>CONTACT</h3>
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
                  width={340}
                  height={340}
                  className="max-w-[350px] h-auto object-cover"
                />
              </div>
              <div className="hidden md:block">
                <Image
                  ref={lotImageRef}
                  src="/Lot.png"
                  alt="Lot"
                  width={340}
                  height={340}
                  className="max-w-[350px] h-auto object-cover"
                />
                {animationDone &&
                  portalContainer &&
                  currentSection === "home" &&
                  createPortal(
                    <Image
                      src="/Lot.png"
                      alt="Lot"
                      width={340}
                      height={340}
                      className="max-w-[350px] h-auto object-cover hidden md:block"
                      style={{
                        position: "absolute",
                        top: lotImagePosition.top,
                        left: lotImagePosition.left,
                        zIndex: 3,
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
                  onClick={() => handleNavClick("portofolio")}
                >
                  <ArrowUpRight
                    className="mb-2 text-[#F6F3EE] cursor-pointer"
                    size={30}
                  />
                </motion.div>
              </div>
              <h1
                className="text-[#F6F3EE] ms-1 w-10"
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
                          src="/freehand.png"
                          alt="freehand"
                          width={250}
                          height={200}
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
              <h4 className="text-[#076447] mt-auto">
                Litttie brings stories to life with bold visuals, offering
                creative solutions in graphic design and illustration—from
                unique logos and branding to impactful designs for print and
                digital platforms.
              </h4>
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
              <h4 className="text-[#F6F3EE] mb-auto" style={{ marginTop: -30 }}>
                Questions?
              </h4>
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
                        width={40}
                        height={40}
                        className="object-cover"
                      />
                    </motion.div>
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>
        )}
        {currentSection === "portofolio" && (
          <div id="portofolio" className="relative w-full">
            <Swiper
              modules={[Navigation]}
              navigation={{
                prevEl: ".swiper-button-prev-custom",
                nextEl: ".swiper-button-next-custom",
              }}
              spaceBetween={20}
              slidesPerView={1}
              loop={true}
              speed={600}
              className="portfolio-swiper hidden md:block"
            >
              {portfolioItems.map((item) => (
                <SwiperSlide key={item.id}>
                  <div className="grid grid-cols-24 grid-rows-6 gap-4 h-[90vh] w-[95%] mx-auto">
                    <div className="row-span-3 col-span-10 bg-[#F6F3EE] rounded-2xl shadow-lg">
                      <div className="ms-[10%] mt-[5%] w-[75%]">
                        <h1
                          className="text-start p-3"
                          style={{ color: item.titleColor }}
                        >
                          {item.title}
                        </h1>
                        <h2
                          className="text-start p-3 text-md"
                          style={{ color: item.descriptionColor }}
                        >
                          {item.description}
                        </h2>
                      </div>
                    </div>

                    {item.id === 3 ? (
                      <div className="row-span-6 col-span-6 bg-[#F6F3EE] rounded-2xl shadow-lg">
                        <Image
                          src={item.images[0]}
                          width={200}
                          height={400}
                          alt={`${item.title} image`}
                          className="w-full h-full object-cover rounded-2xl"
                        />
                      </div>
                    ) : (
                      <div className="row-span-3 col-span-6 bg-[#F6F3EE] rounded-2xl shadow-lg">
                        <Image
                          src={item.images[0]}
                          width={200}
                          height={200}
                          alt={`${item.title} image`}
                          className="w-full h-full object-cover rounded-2xl"
                        />
                      </div>
                    )}

                    {item.id !== 2 ? (
                      <div
                        className="row-span-6 col-span-8 rounded-2xl shadow-lg"
                        style={{ backgroundColor: item.bgColor }}
                      >
                        <h1 className="text-white whitespace-nowrap text-center py-[5%]">
                          {item.title2}
                        </h1>
                        {Array.isArray(item.description2) &&
                          item.description2.map((text, idx) => {
                            const isTitle = idx % 2 === 0; // Titles are at even indexes
                            return isTitle ? (
                              <div
                                key={idx}
                                className="flex items-start gap-3 text-white px-4"
                              >
                                <div className="bg-white text-[#076447] font-bold w-6 h-6 rounded-full flex items-center justify-center">
                                  {text[0]}
                                </div>
                                <h2 className="uppercase">{text.slice(3)}</h2>
                              </div>
                            ) : (
                              <p
                                key={idx}
                                className="text-white text-[1vw] w-[90%] pl-9 ms-4 mb-[5%] leading-relaxed"
                              >
                                {text}
                              </p>
                            );
                          })}
                      </div>
                    ) : (
                      <div className="row-span-6 col-span-8 rounded-2xl shadow-lg">
                        <Image
                          src={item.images[4]}
                          width={200}
                          height={200}
                          alt={`${item.title} image`}
                          className="w-full h-full object-cover rounded-2xl"
                        />
                      </div>
                    )}

                    <div className="row-span-3 col-span-5 bg-[#F6F3EE] rounded-2xl shadow-lg">
                      <Image
                        src={item.images[1]}
                        width={150}
                        height={150}
                        alt={`${item.title} image`}
                        className="w-full h-full object-contain rounded-2xl"
                      />
                    </div>
                    <div className="row-span-3 col-span-5 bg-[#F6F3EE] rounded-2xl shadow-lg">
                      <Image
                        src={item.images[2]}
                        width={150}
                        height={150}
                        alt={`${item.title} image`}
                        className="w-full h-full object-contain rounded-2xl"
                      />
                    </div>

                    {item.id !== 3 ? (
                      <div className="row-span-3 col-span-6 bg-[#F6F3EE] rounded-2xl shadow-lg">
                        <Image
                          src={item.images[3]}
                          width={200}
                          height={200}
                          alt={`${item.title} image`}
                          className="w-full h-full object-cover rounded-2xl"
                        />
                      </div>
                    ) : null}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="absolute inset-y-0 left-[-10px] right-[-10px] hidden md:flex justify-between items-center z-10 pointer-events-none">
              <button className="swiper-button-prev-custom h-[50vh] w-[40px] bg-[#F6F3EE]/60 hover:bg-[#F6F3EE]/90 rounded-xl flex items-center justify-center text-[#076447] text-4xl font-bold pointer-events-auto">
                ‹
              </button>
              <button className="swiper-button-next-custom h-[50vh] w-[40px] bg-[#F6F3EE]/60 hover:bg-[#F6F3EE]/90 rounded-xl flex items-center justify-center text-[#076447] text-4xl font-bold pointer-events-auto">
                ›
              </button>
            </div>
            <div className="flex flex-col gap-5 w-full md:hidden">
              {portfolioItems.map((item) => (
                <div
                  key={item.id}
                  className="rounded-lg shadow-lg bg-[#F6F3EE] flex flex-col items-center justify-center p-5"
                >
                  <h2
                    className="whitespace-nowrap text-center p-2"
                    style={{ color: item.titleColor }}
                  >
                    {item.title}
                  </h2>

                  <div className="flex flex-row gap-5">
                    {item.images.slice(0, 2).map((img, imgIndex) => (
                      <Image
                        key={imgIndex}
                        src={img}
                        alt={`${item.title} ${imgIndex + 1}`}
                        width={120}
                        height={120}
                        alt={`${item.title} image`}
                        className="object-cover rounded-lg shadow-lg"
                      />
                    ))}
                  </div>

                  <div className="p-3" style={{ color: item.titleColor }}>
                    <h5 className="text-left">{item.description}</h5>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {currentSection === "contact" && (
          <div
            id="contact"
            className="p-5 bg-[#F6F3EE] rounded-2xl shadow-xl w-[90%] md:w-[50%] mx-auto"
          >
            <h2 className="text-[#076447] text-center text-2xl mb-4">
              Contact
            </h2>
            <form className="flex flex-col space-y-4 mx-auto">
              <input
                type="text"
                placeholder="Naam"
                className="p-3 rounded-lg shadow-md"
                required
              />
              <input
                type="email"
                placeholder="E-mailadres"
                className="p-3 rounded-lg shadow-md"
                required
              />
              <textarea
                placeholder="Uw bericht"
                className="p-3 rounded-lg shadow-md h-32"
                required
              ></textarea>
              <button
                type="submit"
                className=" text-[#F6F3EE] bg-[#076447] p-3 rounded-lg shadow-md hover:bg-opacity-90"
              >
                Verstuur
              </button>
            </form>
          </div>
        )}
      </div>
    </motion.div>
  );
}
