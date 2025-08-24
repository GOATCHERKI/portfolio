/**
 * Copyright (c) 2024 Mohamed Zakaria Cherki. All rights reserved.
 * This portfolio website is the exclusive property of Mohamed Zakaria Cherki.
 * Unauthorized copying, reproduction, or claiming of this work is prohibited.
 */

"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import About from "./components/About"
import Experience from "./components/Experience";
import SectionScroller from "./components/SectionScroller";
import Projects from "./components/Projects";
import styled from 'styled-components';
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import LoadingScreen from "./components/LoadingScreen";

// Styled component for the animated background
const AnimatedBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  background: rgba(255, 255, 255, 0.9); /* Light mode base */
  overflow: hidden;

  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 200%;
    height: 200%;
    background: conic-gradient(
      from 0deg,
      rgba(255, 154, 162, 0.05), /* Degraded soft pink */
      rgba(255, 183, 178, 0.05), /* Degraded light peach */
      rgba(255, 218, 193, 0.05), /* Degraded pastel yellow */
      rgba(226, 240, 203, 0.05), /* Degraded mint green */
      rgba(162, 228, 255, 0.05), /* Degraded baby blue */
      rgba(201, 175, 255, 0.05), /* Degraded lavender */
      rgba(255, 183, 178, 0.05),
      rgba(255, 154, 162, 0.05)
    );
    transform: translate(-50%, -50%);
    animation: rotate 8s linear infinite;
    filter: blur(80px); /* Increased blur for more subtle effect */
    opacity: 0.4; /* Reduced opacity */
  }

  &::after {
    width: 180%;
    height: 180%;
    animation: rotate-reverse 10s linear infinite;
    opacity: 0.3; /* Further reduced opacity */
    filter: blur(100px); /* Even more blur for the second layer */
  }

  @keyframes rotate {
    0% {
      transform: translate(-50%, -50%) rotate(0deg);
    }
    100% {
      transform: translate(-50%, -50%) rotate(360deg);
    }
  }

  @keyframes rotate-reverse {
    0% {
      transform: translate(-50%, -50%) rotate(0deg);
    }
    100% {
      transform: translate(-50%, -50%) rotate(-360deg);
    }
  }

  /* Dark mode: hide the animated background entirely */
  .dark & { display: none; }
`;

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if this is the first visit
    const hasVisited = sessionStorage.getItem('hasVisited');
    if (hasVisited) {
      setIsLoading(false);
    }
  }, []);

  const handleLoadingComplete = () => {
    sessionStorage.setItem('hasVisited', 'true');
    setIsLoading(false);
  };

  if (isLoading) {
    return <LoadingScreen onLoadingComplete={handleLoadingComplete} />;
  }

  return (
    <>
      <AnimatedBackground />
      <SectionScroller />
      <Navbar />
      <div className="snap-container">
        <Header />
        <About />
        <Experience />
        <Projects />
        <Contact />
        <Footer />
      </div>
    </>
  );
}