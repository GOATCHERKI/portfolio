/*
 * Licensed under the MIT License. See LICENSE file in the project root for full license text.
 */

"use client"

import React, { useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import { assets } from '../../assets/assets'

const Navbar = () => {
    const sideMenuRef = useRef();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isDark, setIsDark] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Styles for light and dark mode text colors
    const navStyles = {
        navLink: {
            color: isDark ? '#ffffff' : '#111827', // white for dark, gray-900 for light
            transition: 'color 0.3s ease',
        },
        navLinkHover: {
            color: isDark ? '#e5e7eb' : '#374151', // gray-200 for dark, gray-700 for light
        },
        connectButton: {
            color: isDark ? '#ffffff' : '#111827',
            border: '1px solid',
            borderColor: isDark ? 'rgba(255, 255, 255, 0.4)' : '#6b7280',
            transition: 'all 0.3s ease',
        },
        connectButtonHover: {
            backgroundColor: isDark ? 'rgba(255, 255, 255, 0.2)' : '#f3f4f6',
            borderColor: isDark ? 'rgba(255, 255, 255, 0.6)' : '#4b5563',
        }
    };

    useEffect(() => {
        const applyTheme = (dark) => {
            if (dark) document.documentElement.classList.add('dark');
            else document.documentElement.classList.remove('dark');
            try {
                document.documentElement.style.colorScheme = dark ? 'dark' : 'light';
                document.body && document.body.style.removeProperty('background-color');
            } catch (_) {}
        };
        // Check if mobile on mount and resize
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        
        checkIfMobile();
        window.addEventListener('resize', checkIfMobile);

        // Scroll effect
        const scrollEl = document.querySelector('.snap-container') || window;
        const getScrollTop = () =>
            scrollEl === window ? window.scrollY : scrollEl.scrollTop;

        const onScroll = () => {
            setIsScrolled(getScrollTop() > 16);
        };

        onScroll();
        scrollEl.addEventListener('scroll', onScroll, { passive: true });

        // Initialize theme from localStorage or system preference
        const storedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        const enableDark = storedTheme ? storedTheme === 'dark' : systemPrefersDark;
        applyTheme(enableDark);
        setIsDark(enableDark);

        // Watch system preference changes when no manual preference is set
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleSystemChange = (e) => {
            const hasManualPreference = !!localStorage.getItem('theme');
            if (!hasManualPreference) {
                applyTheme(e.matches);
                setIsDark(e.matches);
            }
        };
        mediaQuery.addEventListener('change', handleSystemChange);

        return () => {
            scrollEl.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', checkIfMobile);
            mediaQuery.removeEventListener('change', handleSystemChange);
        };
    }, []);

    const openMenu = () => {
        sideMenuRef.current.style.transform = 'translateX(-16rem)'
        setIsMenuOpen(true)
    }
    
    const closeMenu = () => {
        sideMenuRef.current.style.transform = 'translateX(16rem)'
        setIsMenuOpen(false)
    }

    const toggleTheme = () => {
        const nextIsDark = !isDark;
        setIsDark(nextIsDark);
        localStorage.setItem('theme', nextIsDark ? 'dark' : 'light');
        if (nextIsDark) document.documentElement.classList.add('dark');
        else document.documentElement.classList.remove('dark');
        try {
            document.documentElement.style.colorScheme = nextIsDark ? 'dark' : 'light';
            document.body && document.body.style.removeProperty('background-color');
        } catch (_) {}
    }

    return (
        <>
            {/* Mobile navbar with white 60% opacity background */}
            <nav className={`
                w-full fixed px-5 lg:px-8 xl:px-[8%] py-4 flex items-center justify-between z-100 transition-all duration-300
                ${isMobile ? 'bg-white/50 dark:bg-white/10 backdrop-blur-xl border-b border-black/10 dark:border-white/10 shadow-sm' : ''}
            `}>
                <a href="#top" className={`mr-14 transition-all duration-300 ${isScrolled ? 'rounded-full px-5 py-2 bg-white/50 dark:bg-white/10 backdrop-blur-xl border border-black/10 dark:border-white/10 shadow-sm' : ''}`}>
                    <Image src={isDark ? assets.logo_dark : assets.logo} className='w-28 cursor-pointer' alt=""/>
                </a>

                <ul className='hidden md:flex items-center gap-6 lg:gap-8 rounded-full px-6 py-2 bg-white/50 dark:bg-white/10 backdrop-blur-xl border border-black/10 dark:border-white/10 shadow-sm absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform'>
                    <li>
                        <a 
                            className={`font-mozilla-headline cursor-pointer transition-all duration-300 hover:scale-110 hover:translate-y-[-2px] relative group ${
                                isDark ? 'text-white' : 'text-gray-900'
                            }`} 
                            href="#top"
                        >
                            Home
                            <span className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${
                                isDark ? 'bg-cyan-800' : 'bg-cyan-800'
                            }`}></span>
                        </a>
                    </li>
                    <li>
                        <a 
                            className={`font-mozilla-headline cursor-pointer transition-all duration-300 hover:scale-110 hover:translate-y-[-2px] relative group ${
                                isDark ? 'text-white' : 'text-gray-900'
                            }`} 
                            href="#about"
                        >
                            About
                            <span className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${
                                isDark ? 'bg-cyan-800' : 'bg-cyan-800'
                            }`}></span>
                        </a>
                    </li>
                    <li>
                        <a 
                            className={`font-mozilla-headline cursor-pointer transition-all duration-300 hover:scale-110 hover:translate-y-[-2px] relative group ${
                                isDark ? 'text-white' : 'text-gray-900'
                            }`} 
                            href="#experience"
                        >
                            Experience
                            <span className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${
                                isDark ? 'bg-cyan-800' : 'bg-cyan-800'
                            }`}></span>
                        </a>
                    </li>
                    <li>
                        <a 
                            className={`font-mozilla-headline cursor-pointer transition-all duration-300 hover:scale-110 hover:translate-y-[-2px] relative group ${
                                isDark ? 'text-white' : 'text-gray-900'
                            }`} 
                            href="#projects"
                        >
                            Projects
                            <span className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${
                                isDark ? 'bg-cyan-800' : 'bg-cyan-800'
                            }`}></span>
                        </a>
                    </li>
                    <li>
                        <a 
                            className={`font-mozilla-headline cursor-pointer transition-all duration-300 hover:scale-110 hover:translate-y-[-2px] relative group ${
                                isDark ? 'text-white' : 'text-gray-900'
                            }`} 
                            href="#contact"
                        >
                            Contact
                            <span className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${
                                isDark ? 'bg-cyan-800' : 'bg-cyan-800'
                            }`}></span>
                        </a>
                    </li>
                </ul>

                <div className='flex items-center gap-4'>
                    <button 
                        onClick={toggleTheme} 
                        aria-label="Toggle theme"
                        className={`hidden md:inline-flex p-2 rounded-full transition-all duration-300 hover:scale-110 hover:rotate-12
                            ${isDark 
                                ? 'border border-white/10 bg-white/10 hover:bg-white/20 hover:border-white/20'
                                : 'border border-black/10 bg-white/50 hover:bg-black/5 hover:border-black/20'
                            }`}
                    >
                        <Image src={isDark ? assets.sun_icon : assets.moon_icon} alt='' className='w-6'/>
                    </button>
                    
                    <a href="https://www.linkedin.com/in/mohamed-zakaria-cherki/" 
                       target="_blank" 
                       rel="noopener noreferrer" 
                       className={`hidden lg:flex items-center gap-3 px-10 py-2.5 rounded-full ml-4 font-mozilla-headline transition-all duration-300 hover:scale-105 hover:translate-y-[-1px] hover:shadow-lg
                            ${isDark 
                                ? 'border border-white/10 bg-white/10 hover:bg-white/20 hover:border-white/20 text-white' 
                                : 'border border-black/10 bg-white/50 hover:bg-black/5 hover:border-black/20 text-gray-900'
                            }`}
                    >
                        Connect 
                        <Image 
                            src={isDark ? assets.arrow_icon_dark : assets.arrow_icon} 
                            className='w-3 transition-transform duration-300 group-hover:translate-x-1' 
                            alt=""
                        />
                    </a>

                    <button className='block md:hidden ml-3 p-2 rounded-full transition-all duration-300 hover:scale-110 hover:bg-black/5 dark:hover:bg-white/10'>
                        <Image onClick={openMenu} src={isDark ? assets.menu_white : assets.menu_black} className='w-6' alt=""/>
                    </button>
                </div>

                {/* Mobile menu backdrop overlay */}
                <div 
                    className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-100 transition-opacity duration-500 ease-out ${
                        isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                    }`}
                    onClick={closeMenu}
                />

                {/* Enhanced Mobile menu */}
                <div 
                    ref={sideMenuRef} 
                    className='flex md:hidden flex-col fixed -right-64 top-0 bottom-0 w-64 z-100 h-screen transition-all duration-500 ease-out'
                    style={{
                        background: isDark 
                            ? 'rgb(17, 24, 39)' 
                            : 'rgb(255, 255, 255)',
                        borderLeft: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)',
                        boxShadow: isDark 
                            ? '-10px 0 30px rgba(0, 0, 0, 0.5)' 
                            : '-10px 0 30px rgba(0, 0, 0, 0.15)'
                    }}
                >
                    {/* Close button */}
                    <div className='absolute right-6 top-6' onClick={closeMenu}>
                        <div className='p-2 rounded-full transition-all duration-300 hover:bg-black/10 dark:hover:bg-white/10 hover:scale-110 cursor-pointer'>
                            <Image 
                                src={isDark ? assets.close_white : assets.close_black} 
                                alt='' 
                                className='w-5 transition-transform duration-300 hover:rotate-90' 
                            />
                        </div>
                    </div>

                    {/* Menu header */}
                    <div className='pt-20 pb-8 px-8 border-b border-black/10 dark:border-white/10'>
                        <div className='flex items-center gap-3'>
                            <div 
                                className='w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110'
                                style={{
                                    backgroundColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)',
                                    border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.1)'}`
                                }}
                            >
                                <span 
                                    className='text-sm font-bold font-mono'
                                    style={{ color: isDark ? '#ffffff' : '#111827' }}
                                >
                                    MZ
                                </span>
                            </div>
                            <div>
                                <h3 
                                    className='font-mozilla-headline font-semibold text-sm' 
                                    style={{ color: isDark ? '#ffffff' : '#111827' }}
                                >
                                    Mohamed Zakaria
                                </h3>
                                <p 
                                    className='text-xs opacity-70' 
                                    style={{ color: isDark ? '#e5e7eb' : '#6b7280' }}
                                >
                                    Software Engineer
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Navigation links */}
                    <nav className='flex-1 py-8'>
                        <ul className='space-y-2 px-6'>
                            {[
                                { href: '#top', label: 'Home', icon: '⌂' },
                                { href: '#about', label: 'About', icon: '∞' },
                                { href: '#experience', label: 'Experience', icon: '⚡' },
                                { href: '#projects', label: 'Projects', icon: '⟨/⟩' },
                                { href: '#contact', label: 'Contact', icon: '✉' }
                            ].map((item, index) => (
                                <li key={item.href}>
                                    <a 
                                        href={item.href}
                                        onClick={closeMenu}
                                        className={`flex items-center gap-4 px-4 py-3 rounded-xl font-mozilla-headline transition-all duration-300 hover:scale-105 hover:translate-x-2 group ${
                                            isDark 
                                                ? 'text-white hover:bg-white/10' 
                                                : 'text-gray-900 hover:bg-black/5'
                                        }`}
                                    >
                                        <span className='text-sm opacity-80 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300'>
                                            {item.icon}
                                        </span>
                                        <span className='font-medium group-hover:font-semibold transition-all duration-300'>{item.label}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Footer with theme toggle and connect button */}
                    <div className='p-6 border-t border-black/10 dark:border-white/10 space-y-4'>
                        {/* Theme toggle */}
                        <div className='flex items-center justify-between'>
                            <span 
                                className='text-sm font-mozilla-headline' 
                                style={{ color: isDark ? '#e5e7eb' : '#6b7280' }}
                            >
                                Theme
                            </span>
                            <button 
                                onClick={toggleTheme}
                                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 hover:scale-105 hover:translate-y-[-1px] ${
                                    isDark 
                                        ? 'bg-white/10 border border-white/20 hover:bg-white/15 hover:border-white/30' 
                                        : 'bg-black/5 border border-black/10 hover:bg-black/8 hover:border-black/20'
                                }`}
                            >
                                <Image 
                                    src={isDark ? assets.sun_icon : assets.moon_icon} 
                                    alt='' 
                                    className='w-4 transition-transform duration-300 hover:rotate-12'
                                />
                                <span 
                                    className='text-sm font-medium' 
                                    style={{ color: isDark ? '#ffffff' : '#111827' }}
                                >
                                    {isDark ? 'Light' : 'Dark'}
                                </span>
                            </button>
                        </div>

                        {/* Connect button */}
                        <a 
                            href="https://www.linkedin.com/in/mohamed-zakaria-cherki/" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            onClick={closeMenu}
                            className={`flex items-center justify-center gap-3 w-full py-3 px-4 rounded-lg font-mozilla-headline font-medium transition-all duration-300 hover:scale-[1.02] hover:translate-y-[-1px] hover:shadow-lg ${
                                isDark 
                                    ? 'bg-white/10 border border-white/20 text-white hover:bg-white/15 hover:border-white/30' 
                                    : 'bg-black/8 border border-black/15 text-gray-900 hover:bg-black/12 hover:border-black/20'
                            }`}
                        >
                            <span>Connect</span>
                            <Image 
                                src={isDark ? assets.arrow_icon_dark || assets.arrow_icon : assets.arrow_icon} 
                                className='w-3 transition-transform duration-300 group-hover:translate-x-1' 
                                alt=""
                            />
                        </a>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar