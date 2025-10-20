"use client"

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { assets } from '../../assets/assets'

const Footer = () => {
  const [isDark, setIsDark] = useState(false);

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

  // Styles for light and dark mode text colors
  const footerStyles = {
    text: {
      color: isDark ? '#ffffff' : '#111827',
      transition: 'color 0.3s ease',
    },
    border: {
      borderColor: isDark ? 'rgba(255, 255, 255, 0.2)' : '#9ca3af',
      transition: 'border-color 0.3s ease',
    },
    link: {
      color: isDark ? '#ffffff' : '#111827',
      transition: 'color 0.3s ease',
    },
    linkHover: {
      color: isDark ? '#e5e7eb' : '#374151',
    }
  };

  return (
    <div className=''>
        <div className='text-center'>
            <span className='inline-block w-36 mx-auto mb-2'>
              {!isDark ? (
                <Image src={assets.logo} alt='' className='w-36 mx-auto' />
              ) : (
                <Image src={assets.logo_dark} alt='' className='w-36 mx-auto' />
              )}
            </span>

            <div className='w-max flex items-center gap-2 mx-auto'>
            {!isDark ? (
              <Image src={assets.mail_icon} alt='' className='w-6' />
            ) : (
              <Image src={assets.mail_icon_dark} alt='' className='w-6' />
            )}
            <span style={footerStyles.text}>c.zikocherki@gmail.com</span>
            </div>
        </div>

        <div 
            style={footerStyles.border}
            className='text-center sm:flex items-center justify-between border-t mx-[10%] mt-12 py-6'
        >
            <p style={footerStyles.text}>© 2025 Mohamed Zakaria Cherki. all rights reserved</p>
            <ul className='flex items-center gap-10 justify-center mt-4 sm:mt-0'>
                <li>
                    <a 
                        target='_blank' 
                        href="https://github.com/GOATCHERKI"
                        style={footerStyles.link}
                        onMouseEnter={(e) => e.target.style.color = footerStyles.linkHover.color}
                        onMouseLeave={(e) => e.target.style.color = footerStyles.link.color}
                    >
                        Github
                    </a>
                </li>
                <li>
                    <a 
                        target='_blank' 
                        href="https://www.linkedin.com/in/mohamed-zakaria-cherki/"
                        style={footerStyles.link}
                        onMouseEnter={(e) => e.target.style.color = footerStyles.linkHover.color}
                        onMouseLeave={(e) => e.target.style.color = footerStyles.link.color}
                    >
                        LinkedIn
                    </a>
                </li>               
            </ul>
        </div>
    </div>
  )
}

export default Footer