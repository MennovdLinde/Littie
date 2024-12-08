"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Linkedin, Github, Mail } from 'lucide-react';
import { useEffect, useRef, useMemo, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { gsap } from "gsap";

export default function Home() {
  const mainImageRef = useRef(null);
  const scrollRef = useRef(null);
  const controls = useAnimation();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const isSmallScreen = window.matchMedia("(max-width: 768px)").matches;

    if (isSmallScreen) {
      gsap.fromTo(
        mainImageRef.current,
        { scale: 0.8, y: -200 }, // Smaller initial scale and offsets
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
        { opacity: 1, scale: 1.5, x: -50, y: 50 },
        {
          opacity: 1,
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

  return (
    <motion.div
      ref={scrollRef}
      className="bg-[#11120d] min-h-screen p-3 md:p-5 text-gray-200"
      initial="hidden"
      animate={controls}
      variants={containerVariants}
    >
      <motion.header
        variants={itemVariants}
        className="flex flex-col bg-[#60c4e6] rounded-2xl p-4 sm:flex-row justify-between items-center mb-3"
      >
        <h1 className="text-xl font-bold font-serif italic text-[white] ml-4 mb-4 sm:mb-0">
          Littie!
        </h1>
        <nav className="space-x-4 mr-4">
          <Link
            href="#projects"
            className="text-sm text-[#6B4D30] hover:text-[white]"
          >
            PROJECTS
          </Link>
          <Link
            href="#about"
            className="text-sm text-[#6B4D30] hover:text-[white]"
          >
            ABOUT
          </Link>
          <Link
            href="#contact"
            className="text-sm text-[#6B4D30] hover:text-[white]"
          >
            CONTACT
          </Link>
        </nav>
      </motion.header>

      <div className="grid grid-cols-12 gap-4">
        <motion.div
          variants={itemVariants}
          className="bg-[#60c4e6] p-6 rounded-2xl col-span-12 md:col-span-6 lg:col-span-5 flex flex-col justify-evenly row-span-1"
        >
          <motion.div
            variants={itemVariants}
            className="flex justify-end items-center"
          ></motion.div>
          <h2 className="md:text-3xl text-2xl lg:text-4xl font-bold font-serif mb-2 leading-tight text-[white]">
            Do you have a graphic design wish? Welcome to Littie!
          </h2>
        </motion.div>

        <div
          ref={mainImageRef}
          className="bg-[#2a499b] rounded-2xl flex items-end justify-center main_image col-span-12 md:col-span-5 lg:col-span-3 row-span-1"
        >
          <Image
            src="/Lot.png"
            alt="Lot"
            width={250}
            height={250}
            className="max-w-[240px] h-auto object-cover pt-12"
            priority
          />
        </div>

        <motion.div
          variants={itemVariants}
          className="bg-[#f0ce17] p-4 rounded-2xl flex flex-col justify-evenly col-span-12 md:col-span-7 lg:col-span-4 row-span-2"
        >
          <div className="interactive-div">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(!isOpen)}
              className="div-header"
            >
              <h2>Illustration</h2>
              <p>Graphic Design, Logo Design</p>
            </motion.div>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="div-content"
              >
                <p>
                  Additional details about the illustration go here. You can add
                  links or other interactive elements.
                </p>
              </motion.div>
            )}
          </div>
          <div className="interactive-div">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(!isOpen)}
              className="div-header"
            >
              <h2>Illustration</h2>
              <p>Graphic Design, Logo Design</p>
            </motion.div>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="div-content"
              >
                <p>
                  Additional details about the illustration go here. You can add
                  links or other interactive elements.
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="bg-[#60c4e6] p-6 rounded-2xl col-span-12 md:col-span-6 lg:col-span-4 flex flex-col justify-between lg:h-60"
        >
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-thin mb-2 text-[#ffddc3]">
              Have some questions?
            </h3>
            <motion.div
              whileHover={{ scale: 1.2, rotate: 20 }}
              whileTap={{ scale: 0.9 }}
            >
              <Link href="mailto:fullstack.kush@gmail.com">
                <ArrowUpRight
                  className="mb-2 text-[#D4C6B8] cursor-pointer"
                  size={20}
                />
              </Link>
            </motion.div>
          </div>
          <h3 className="text-4xl md:text-5xl mt-4 font-sans font-semibold text-[#ffecdd]">
            Contact me
          </h3>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="bg-[#60c4e6] p-4 rounded-2xl flex justify-evenly items-center col-span-12 md:col-span-6 lg:col-span-4"
        >
          {[
            {
              href: "https://www.linkedin.com/in/kushsharma738",
              Icon: Linkedin,
            },
            { href: "https://github.com/Kushhhhhhhh", Icon: Github },
            { href: "mailto:fullstack.kush@gmail.com", Icon: Mail },
          ].map(({ href, Icon }) => (
            <Link key={href} href={href}>
              <motion.div
                className="text-[#6B4D30] hover:text-[white]"
                whileHover={{ scale: 1.2, rotate: 10 }}
                whileTap={{ scale: 0.9 }}
              >
                <Icon size={30} />
              </motion.div>
            </Link>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
