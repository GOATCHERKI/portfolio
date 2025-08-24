/**
 * Copyright (c) 2024 Mohamed Zakaria Cherki. All rights reserved.
 * This portfolio website is the exclusive property of Mohamed Zakaria Cherki.
 * Unauthorized copying, reproduction, or claiming of this work is prohibited.
 */

"use client"

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { assets, infoList } from '../../assets/assets'

const techIcons = [
  "https://skillicons.dev/icons?i=react&theme=dark",
  "https://skillicons.dev/icons?i=nextjs&theme=dark",
  "https://skillicons.dev/icons?i=angular&theme=dark",
  "https://skillicons.dev/icons?i=html&theme=dark",
  "https://skillicons.dev/icons?i=css&theme=dark",
  "https://skillicons.dev/icons?i=js&theme=dark",
  "https://skillicons.dev/icons?i=tailwind&theme=dark",
  "https://skillicons.dev/icons?i=bootstrap&theme=dark",
  "https://skillicons.dev/icons?i=nodejs&theme=dark",
  "https://skillicons.dev/icons?i=php&theme=dark",
  "https://skillicons.dev/icons?i=laravel&theme=dark",
  "https://skillicons.dev/icons?i=dotnet&theme=dark",
  "https://skillicons.dev/icons?i=cs&theme=dark",
  "https://skillicons.dev/icons?i=mongodb&theme=dark",
  "https://skillicons.dev/icons?i=mysql&theme=dark",
  "https://skillicons.dev/icons?i=c&theme=dark",
  "https://skillicons.dev/icons?i=cpp&theme=dark",
  "https://skillicons.dev/icons?i=java&theme=dark",
  "https://skillicons.dev/icons?i=azure&theme=dark",
  "https://skillicons.dev/icons?i=figma&theme=dark",
];

const About = () => {
  const [isDark, setIsDark] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);
  const [hoveredIcon, setHoveredIcon] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const sectionRef = useRef(null);
  const marqueeRef = useRef(null);

  useEffect(() => {
    // Check current theme
    const checkTheme = () => {
      const isDarkMode = document.documentElement.classList.contains('dark');
      setIsDark(isDarkMode);
    };

    // Initial check
    checkTheme();

    // Watch for theme changes
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimate(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % techIcons.length);
    }, 1200);
    return () => clearInterval(interval);
  }, []); // Empty dependency array since techIcons.length is constant

  // Enhanced tech icon with name extraction
  const getTechName = (iconUrl) => {
    const match = iconUrl.match(/icons\?i=([^&]+)/);
    if (match) {
      const tech = match[1];
      const techNames = {
        'react': 'React',
        'nextjs': 'Next.js',
        'angular': 'Angular',
        'html': 'HTML5',
        'css': 'CSS3',
        'js': 'JavaScript',
        'tailwind': 'Tailwind CSS',
        'bootstrap': 'Bootstrap',
        'nodejs': 'Node.js',
        'php': 'PHP',
        'laravel': 'Laravel',
        'dotnet': '.NET',
        'cs': 'C#',
        'mongodb': 'MongoDB',
        'mysql': 'MySQL',
        'c': 'C',
        'cpp': 'C++',
        'java': 'Java',
        'azure': 'Azure',
        'figma': 'Figma'
      };
      return techNames[tech] || tech.toUpperCase();
    }
    return '';
  };

  // Styles for light and dark mode text colors
  const aboutStyles = {
    text: {
      color: isDark ? '#ffffff' : '#222222',
      transition: 'color 0.3s ease',
    }
  };

  return (
    <div 
      id='about' 
      ref={sectionRef}
      className='w-full px-[12%] py-10 scroll-mt-20 snap-section'
    >
        <div className={`max-w-3xl mx-auto transition-all duration-1000 ${
          animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h4 style={aboutStyles.text} className='text-center mb-2 text-lg font-mozilla-headline font-light'>Introduction</h4>
          <h2 style={aboutStyles.text} className='text-center text-5xl font-mozilla-headline font-medium mb-4'>About me</h2>
        </div>

        <div className='flex w-full flex-col lg:flex-row items-center lg:items-start md:gap-20  xl:gap-20 xl:ml-24'>
            <div className={`w-64 sm:w-80 rounded-3xl max-w-none transition-all duration-1000 delay-200 ${
              animate ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 -translate-x-10 scale-95'
            }`}>
                <Image src={assets.user_image} alt='' className='w-full rounded-3xl'/>
            </div>
            <div className='flex-1 my-8'>
                <p 
                  style={aboutStyles.text} 
                  className={`mb-10 max-w-2xl font-mozilla-text text-center md:text-left transition-all duration-1000 delay-300 ${
                    animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                >
                    I'm a final-year Software Engineering student,
                     passionate about building real-world tech solutions and continuously improving my skills.
                      With a background in full-stack web development and mobile app design, 
                      I've worked on various projects from Management systems and booking systems to real-time chat apps and basketball-themed platforms.
                </p>

                <ul className='grid grid-cols-1 gap-6 max-w-2xl justify-center md:grid-cols-2 lg:grid-cols-3'>
                    {infoList.map(({icon, iconDark, title, description}, index)=>(
                        <li 
                            className={`
                              border-[0.5px] rounded-xl p-6 cursor-pointer 
                              transition-all duration-500 ease-out
                              ${animate ? 'opacity-100' : 'opacity-0'}
                              ${isDark 
                                ? 'border-white/20 hover:bg-[var(--color-darkHover)] hover:border-white/40 hover:shadow-white' 
                                : 'border-gray-400 hover:bg-[var(--color-lightHover)] hover:border-gray-500 hover:shadow-black'
                              }
                              hover:-translate-y-1
                            `}
                            key={index}
                            style={{ 
                              transitionDelay: animate ? `${400 + index * 100}ms` : '0ms',
                              animationDelay: animate ? `${400 + index * 100}ms` : '0ms',
                              animationDuration: animate ? '1000ms' : '0ms',
                              animationFillMode: 'both',
                              animationName: animate ? 'slideInUp' : 'none',
                            }}
                        >
                            {!isDark ? (
                              <Image src={icon} alt='title' className='w-7 mt-3'/>
                            ) : (
                              <Image src={iconDark} alt='title' className='w-7 mt-3'/>
                            )}
                            <h3 style={aboutStyles.text} className='my-4 font-semibold'>{title}</h3>
                            <p style={aboutStyles.text} className='text-sm'>{description}</p>
                        </li>
                    ))}
                </ul>

            </div> 
 
        </div>

        {/* Enhanced Tech Stack Section */}
        <div className={`flex flex-col items-center transition-all duration-1000 delay-700 ${
          animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <img src="https://media2.giphy.com/media/QssGEmpkyEOhBCb7e1/giphy.gif?cid=ecf05e47a0n3gi1bfqntqmob8g9aid1oyj2wr3ds3mg700bl&rid=giphy.gif" width="35"></img>
          <h2 style={aboutStyles.text} className='text-center text-3xl font-mozilla-headline font-medium'>Tech Stack</h2>
          
          {/* Main Sliding Container */}
          <div className="absolute w-full max-w-[1200px] mt-8 h-50 flex items-center justify-center overflow-hidden">
            {/* Enhanced gradient overlays */}
            <div
              className="absolute left-0 top-0 h-full w-20 z-20 pointer-events-none"
              style={{
                background: isDark
                  ? "linear-gradient(to right, #000 0%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0.2) 70%, transparent 100%)"
                  : "linear-gradient(to right, #fff 0%, rgba(255,255,255,0.6) 40%, rgba(255,255,255,0.2) 70%, transparent 100%)"
              }}
            />
            <div
              className="absolute right-0 top-0 h-full w-20 z-20 pointer-events-none"
              style={{
                background: isDark
                  ? "linear-gradient(to left, #000 0%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0.2) 70%, transparent 100%)"
                  : "linear-gradient(to left, #fff 0%, rgba(255,255,255,0.6) 40%, rgba(255,255,255,0.2) 70%, transparent 100%)"
              }}
            />

            {/* Sliding container - fix for seamless loop */}
            <div
              ref={marqueeRef}
              className="flex items-center gap-10 h-full tech-stack-marquee"
              style={{
                width: `${techIcons.length * 80 * 2}px`, // Set width inline in React for seamless loop
                animation: 'smoothSlide 25s linear infinite',
                willChange: 'transform'
              }}
            >
              {[...techIcons, ...techIcons].map((icon, idx) => {
                const techName = getTechName(icon);
                const isHovered = hoveredIcon === idx;
                return (
                  <div
                    key={`${icon}-${idx}`}
                    className="relative flex flex-col items-center justify-center group"
                    style={{ minWidth: '80px', height: '80px' }}
                    onMouseEnter={() => setHoveredIcon(idx)}
                    onMouseLeave={() => setHoveredIcon(null)}
                  >
                    {/* Tech icon */}
                    <div
                      className="relative transition-all duration-300 ease-out"
                      style={{
                        transform: isHovered 
                          ? 'scale(1.2) translateY(-8px)' 
                          : 'scale(1) translateY(0)',
                        filter: isHovered 
                          ? 'drop-shadow(0 6px 12px rgba(0,0,0,0.3)) brightness(1.1)' 
                          : 'drop-shadow(0 2px 8px rgba(0,0,0,0.2))',
                        zIndex: isHovered ? 30 : 10
                      }}
                    >
                      <img
                        src={icon}
                        alt={techName}
                        className="w-14 h-14 transition-all duration-300"
                        loading="lazy"
                      />
                      {/* Glowing effect on hover */}
                      {isHovered && (
                        <div
                          className="absolute inset-0 rounded-lg animate-pulse"
                          style={{
                            background: 'radial-gradient(circle, rgba(59,130,246,0.3) 0%, transparent 70%)',
                            filter: 'blur(6px)',
                            zIndex: -1
                          }}
                        />
                      )}
                    </div>
                    {/* Tech name tooltip */}
                    <div
                      className="absolute top-full  px-2 py-1 rounded-md text-sm font-medium whitespace-nowrap transition-all duration-300 pointer-events-none"
                      style={{
                        backgroundColor: isDark ? 'rgba(30, 30, 30, 0.6)' : 'rgba(255, 255, 255, 0.6)',
                        color: isDark ? '#ffffff' : '#222222',
                        border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                        opacity: isHovered ? 1 : 0,
                        transform: isHovered ? 'translateY(0) scale(1)' : 'translateY(-4px) scale(0.9)',
                        zIndex: 40
                      }}
                    >
                      {techName}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes smoothSlide {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          .tech-stack-marquee {
            display: flex;
            flex-direction: row;
            align-items: center;
            /* width is set inline in React for seamless loop */
          }

          /* Smooth performance optimizations */
          .tech-stack-container {
            will-change: transform;
            backface-visibility: hidden;
            perspective: 1000px;
          }

          /* Custom scrollbar for better UX */
          ::-webkit-scrollbar {
            display: none;
          }
        `}</style>
    </div>
  )
}

export default About