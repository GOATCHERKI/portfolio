"use client"

import { assets, experienceData } from '../../assets/assets'
import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

const Experience = () => {
  const [visibleItems, setVisibleItems] = useState(new Set())
  const [headerVisible, setHeaderVisible] = useState(false)
  const [imageVisible, setImageVisible] = useState(false)
  const [lineProgress, setLineProgress] = useState(0)
  const [isDark, setIsDark] = useState(false)
  const observerRef = useRef(null)
  const sectionRef = useRef(null)
  const timelineRef = useRef(null)

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

    // Header animation observer
    const headerObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeaderVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    // Timeline items observer
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = entry.target.getAttribute('data-index')
            if (index !== null) {
              setVisibleItems(prev => new Set([...prev, parseInt(index)]))
            }
          }
        })
      },
      {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    // Image observer
    const imageObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setImageVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    // Timeline progress observer
    const progressObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const rect = entry.boundingClientRect;
            const viewportHeight = window.innerHeight;
            const elementHeight = entry.target.offsetHeight;
            
            // Calculate progress based on scroll position
            const progress = Math.max(0, Math.min(1, 
              (viewportHeight - rect.top) / (viewportHeight + elementHeight * 0.5)
            ));
            setLineProgress(progress);
          }
        });
      },
      { threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1] }
    );

    if (sectionRef.current) {
      headerObserver.observe(sectionRef.current);
    }

    if (timelineRef.current) {
      progressObserver.observe(timelineRef.current);
    }

    observerRef.current = intersectionObserver;
    
    // Observe timeline items
    setTimeout(() => {
      const timelineItems = document.querySelectorAll('.timeline-item');
      timelineItems.forEach(item => intersectionObserver.observe(item));
      
      // Observe image
      const image = document.querySelector('.experience-image');
      if (image) imageObserver.observe(image);
    }, 100);

    return () => {
      intersectionObserver.disconnect();
      headerObserver.disconnect();
      imageObserver.disconnect();
      progressObserver.disconnect();
      observer.disconnect();
    }
  }, []);

  // Styles for light and dark mode text colors
  const experienceStyles = {
    text: {
      color: isDark ? '#ffffff' : '#222222',
      transition: 'color 0.3s ease',
    },
    card: {
      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.1)' : '#ffffff',
      borderColor: isDark ? 'rgba(255, 255, 255, 0.2)' : '#e5e7eb',
      transition: 'all 0.3s ease',
    },
    timelineLineBase: {
      background: isDark ? 'linear-gradient(to bottom, #475569, #64748b)' : 'linear-gradient(to bottom, #e5e7eb, #d1d5db)',
      transition: 'background 0.3s ease',
    },
    timelineLineProgress: {
      background: isDark ? 'linear-gradient(to bottom, #000000, #14213d)' : 'linear-gradient(to bottom, #ffffff, #e5e5e5)',
    },
    timelineDot: {
      backgroundColor: isDark ? '#ffffff' : '#000000',
      borderColor: isDark ? '#1e293b' : '#ffffff',
      transition: 'all 0.3s ease',
    }
  };

  return (
    <div 
      id='experience' 
      ref={sectionRef}
      className='w-full px-[12%] mb-10 xl:mt-0 lg:mt-0 scroll-mt-20 snap-section'
    >
      {/* Animated Header */}
      <div className={`transition-all duration-1000 transform ${
        headerVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-10'
      }`}>
        <h4 style={experienceStyles.text} className='text-center mb-2 text-lg font-mozilla-headline font-light'>My Career</h4>
        <h2 style={experienceStyles.text} className='text-center text-5xl font-mozilla-headline font-medium mb-16'>
          Experience and Education
        </h2>
        
        <p style={experienceStyles.text} className='text-center max-w-2xl mx-auto mt-5 mb-12 font-mozilla-text'>
          I am a Software Engineer graduated from Altinbas University, with experience in web development, and interest in AI & Cybersecurity.
        </p>
      </div>

      <div className='flex flex-col lg:flex-row gap-12 items-start'>
        {/* Timeline Section */}
        <div className='flex-1 relative flex flex-col items-center' ref={timelineRef}>
          {/* Animated Timeline Line */}
          <div className='absolute left-1/2 xl:left-1/2 top-0 w-[3px] h-full -translate-x-1/2 xl:-translate-x-1/2 right-timeline-line'>
            {/* Base line */}
            <div 
              style={experienceStyles.timelineLineBase}
              className='absolute inset-0 rounded-full'
            />
            {/* Progress line */}
            <div 
              style={{
                ...experienceStyles.timelineLineProgress,
                height: `${lineProgress * 100}%`,
                transition: 'height 0.3s ease-out'
              }}
              className='absolute top-0 left-0 right-0 rounded-full'
            />
          </div>

          <ul className='space-y-12 w-full max-w-4xl relative'>
            {experienceData.map(({ icon, title, time, description }, index) => (
              <li
                key={index}
                data-index={index}
                className={`timeline-item relative flex 
                            ${index % 2 === 0 ? 'justify-start' : 'justify-end'}
                            transition-all duration-700 ease-out transform
                            ${visibleItems.has(index) 
                              ? 'opacity-100 translate-y-0 scale-100' 
                              : 'opacity-0 translate-y-8 scale-95'
                            }`}
                style={{ 
                  transitionDelay: `${index * 0.2}s`, 
                  willChange: 'opacity, transform' 
                }}
              >
                <div 
                  style={experienceStyles.card}
                  className={`p-6 rounded-xl shadow-md border w-[45%] xl:w-[45%] 
                            transform transition-all duration-500 
                            hover:scale-105 hover:shadow-xl hover:-translate-y-1
                            timeline-item-content group`}
                >
                  {/* Icon with animation */}
                  <div className="transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                    <Image src={icon} alt={title} className='w-10 h-10 object-contain mb-3' />
                  </div>

                  {/* Title */}
                  <h3 style={experienceStyles.text} className='font-semibold text-lg transition-colors duration-300 group-hover:text-blue-400'>{title}</h3>

                  {/* Time */}
                  <p style={experienceStyles.text} className='text-sm mb-2'>{time}</p>

                  {/* Description */}
                  {description && <p style={experienceStyles.text} className='text-sm'>{description}</p>}
                </div>
                
                {/* Animated Timeline dot */}
                <span 
                  style={{
                    ...experienceStyles.timelineDot,
                    transform: visibleItems.has(index) ? 'translate(-50%, 0) scale(1)' : 'translate(-50%, 0) scale(0)',
                    transition: 'all 0.5s ease-out',
                    transitionDelay: `${index * 0.2 + 0.3}s`
                  }}
                  className='absolute top-6 left-1/2 xl:left-1/2 -translate-x-1/2 xl:-translate-x-1/2 w-5 h-5 border-4 rounded-full z-10 timeline-dot' 
                />

               
              
              </li>
            ))}
          </ul>
        </div>

        {/* Image Section with Animation */}
        <div className={`hidden xl:flex justify-center items-center lg:sticky lg:top-20 experience-image
                        transition-all duration-1000 transform
                        ${imageVisible 
                          ? 'opacity-100 translate-x-0 scale-100' 
                          : 'opacity-0 translate-x-10 scale-90'
                        }`}>
          <div className="relative group">
            <Image 
              src={assets.DeskTop} 
              alt='Desktop workspace' 
              className='w-full max-w-lg rounded-3xl '
              width={500}
              height={500}
            />
            {/* Floating animation container */}
            <div className="absolute inset-0 rounded-3xl " />
          </div>
        </div>
      </div>

      {/* Enhanced Animation styles */}
      <style jsx>{`
        @keyframes slideUp {
          0% {
            opacity: 0;
            transform: translateY(2rem);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInLeft {
          0% {
            opacity: 0;
            transform: translateX(-30px) scale(0.95);
          }
          100% {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }

        @keyframes slideInRight {
          0% {
            opacity: 0;
            transform: translateX(30px) scale(0.95);
          }
          100% {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }

        @keyframes float {
          0%, 100% { 
            transform: translateY(0px); 
          }
          50% { 
            transform: translateY(-10px); 
          }
        }

        .animate-slideUp {
          animation: slideUp 0.8s ease-out both;
        }

        .experience-image {
          animation: float 6s ease-in-out infinite;
        }

        .timeline-item:nth-child(odd) .timeline-item-content {
          animation: slideInLeft 0.8s ease-out both;
        }

        .timeline-item:nth-child(even) .timeline-item-content {
          animation: slideInRight 0.8s ease-out both;
        }

        @media (max-width: 1150px) {
          .right-timeline-line {
            left: auto !important;
            right: 1.5rem !important;
            transform: none !important;
          }
          
          .timeline-dot {
            left: auto !important;
            right: 1.5rem !important;
            transform: none !important;
          }
          
          .timeline-item {
            justify-content: flex-start !important;
          }
          
          .timeline-item-content {
            width: calc(100% - 3rem) !important;
            margin-right: 3rem !important;
          }

          .timeline-item:nth-child(odd) .timeline-item-content,
          .timeline-item:nth-child(even) .timeline-item-content {
            animation: slideInLeft 0.8s ease-out both;
          }
        }

        @media (max-width: 990px) {
          .timeline-item-content {
            width: calc(100% - 2rem) !important;
            margin-right: 2rem !important;
          }
        }
      `}</style>
    </div>
  )
}

export default Experience