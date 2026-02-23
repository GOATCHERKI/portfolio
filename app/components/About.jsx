"use client"

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { assets, infoList } from '../../assets/assets'
import LogoLoop from './LogoLoop'

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
  const sectionRef = useRef(null);

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

        <div className='flex w-full flex-col lg:flex-row items-center justify-center gap-20 max-w-6xl mx-auto'>
            <div className={`w-64 sm:w-80 rounded-3xl max-w-none transition-all duration-1000 delay-200 ${
              animate ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 -translate-x-10 scale-95'
            }`}>
                <Image src={assets.user_image} alt='' className='w-full rounded-3xl'/>
            </div>
            <div className='flex-1 my-8 max-w-2xl'>
                <p 
                  style={aboutStyles.text} 
                  className={`mb-10 font-mozilla-text text-center lg:text-left transition-all duration-1000 delay-300 ${
                    animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                >
                    I'm a Graduate Software Engineer,
                     passionate about building real-world tech solutions and continuously improving my skills.
                      With a background in full-stack web development and mobile app design, 
                      I've worked on various projects from management and booking systems to real-time chat apps and basketball-themed platforms.
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
        <div className={`flex flex-col items-center  transition-all duration-1000 delay-700 ${
          animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <img 
            src="https://media.giphy.com/media/QssGEmpkyEOhBCb7e1/giphy.gif" 
            width="45" 
            height="45" 
            alt="Tech stack animation"
            className="mb-3"
          />
          <h2 style={aboutStyles.text} className='text-center text-3xl font-mozilla-headline font-medium mb-8'>Tech Stack</h2>
          
          <div style={{ height: '200px', position: 'relative', overflow: 'hidden', width: '100%', maxWidth: '1200px' }}>
            <LogoLoop
              logos={techIcons.map((icon, index) => ({
                src: icon,
                alt: getTechName(icon),
                title: getTechName(icon)
              }))}
              speed={80}
              direction="left"
              logoHeight={56}
              gap={80}
              pauseOnHover
              scaleOnHover
              fadeOut
              fadeOutColor={isDark ? "#000000" : "#ffffff"}
              ariaLabel="Technology stack"
            />
          </div>
        </div>


    </div>
  )
}

export default About