/*
 * Licensed under the MIT License. See LICENSE file in the project root for full license text.
 */

"use client"

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { assets } from '../../assets/assets'
import styled from 'styled-components'

const Header = () => {
  const [typedLines, setTypedLines] = useState([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  const codeLines = [
    { number: 1, content: "const softwareEngineer = {" },
    { number: 2, content: "  name: 'Mohamed Zakaria Cherki'," },
    { number: 3, content: "  skills: ['React', 'SQL', 'MySQL', 'MongoDB', 'C', 'Java']," },
    { number: 4, content: "  hardWorker: true," },
    { number: 5, content: "  quickLearner: true," },
    { number: 6, content: "  problemSolver: true," },
    { number: 7, content: "  hireable() {" },
    { number: 8, content: "    return (" },
    { number: 9, content: "      this.hardWorker && this.quickLearner" },
    { number: 10, content: "        && this.problemSolver" },
    { number: 11, content: "        && this.skills.length >= 5" },
    { number: 12, content: "    );" },
    { number: 13, content: "  };" },
    { number: 14, content: "};" }
  ];

  useEffect(() => {
    if (currentLineIndex < codeLines.length) {
      const currentLine = codeLines[currentLineIndex];
      const timer = setTimeout(() => {
        if (currentCharIndex < currentLine.content.length) {
          setTypedLines(prev => {
            const newLines = [...prev];
            if (!newLines[currentLineIndex]) {
              newLines[currentLineIndex] = { ...currentLine, content: '' };
            }
            newLines[currentLineIndex].content = currentLine.content.substring(0, currentCharIndex + 1);
            return newLines;
          });
          setCurrentCharIndex(prev => prev + 1);
        } else {
          setCurrentLineIndex(prev => prev + 1);
          setCurrentCharIndex(0);
        }
      }, Math.random() * 50 + 30); // Random typing speed between 30-80ms

      return () => clearTimeout(timer);
    } else {
      // Typing is complete
      setIsTypingComplete(true);
    }
  }, [currentLineIndex, currentCharIndex, codeLines]);

  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => clearInterval(cursorTimer);
  }, []);

  useEffect(() => {
    // Remove slide-in-up class after animation ends
    const letters = document.querySelectorAll('.interactive-letter.slide-in-up');
    function handleAnimationEnd(e) {
      e.target.classList.remove('slide-in-up');
      e.target.style.animationDelay = ''; // Remove inline delay
    }
    letters.forEach(letter => {
      letter.addEventListener('animationend', handleAnimationEnd);
    });
    // Cleanup
    return () => {
      letters.forEach(letter => {
        letter.removeEventListener('animationend', handleAnimationEnd);
      });
    };
  }, []);

  const renderCodeLine = (line, index) => {
    // Function to apply syntax highlighting
    const highlightSyntax = (content) => {
      let highlightedContent = content;
  
      // 1. Highlight Strings first to prevent conflicts
      highlightedContent = highlightedContent.replace(/'([^']*)'/g, '<span class="code-string">\'$1\'</span>');
      highlightedContent = highlightedContent.replace(/\[/g, '<span class="code-bracket">[</span>');
      highlightedContent = highlightedContent.replace(/\]/g, '<span class="code-bracket">]</span>');
  
      // 2. Highlight Keywords (`const`, `return`, etc.)
      highlightedContent = highlightedContent.replace(/\b(const|function|return|true|false)\b/g, '<span class="code-keyword">$&</span>');
  
      // 3. Highlight numbers
      highlightedContent = highlightedContent.replace(/\b(\d+)\b/g, '<span class="code-number">$1</span>');
  
      // 4. Highlight `this` keyword
      highlightedContent = highlightedContent.replace(/\b(this)\b/g, '<span class="code-keyword">$1</span>');
  
      // 5. Highlight properties (followed by a colon or parenthesis)
      highlightedContent = highlightedContent.replace(/\b(name|skills|hardWorker|quickLearner|problemSolver|hireable)\b/g, '<span class="code-property">$&</span>');
  
      // 6. Highlight operators and punctuation
      highlightedContent = highlightedContent.replace(/([{}();,&|])/g, '<span class="code-operator">$1</span>');
  
      // 7. Highlight variables after other replacements
      highlightedContent = highlightedContent.replace(/\b(softwareEngineer)\b/g, '<span class="code-variable">$&</span>');
  
      // 8. Handle a specific color for the dot operator
      highlightedContent = highlightedContent.replace(/\./g, '<span class="code-operator">.</span>');
  
      return highlightedContent;
    };
  
    // Get the content of the line with proper indentation
    const content = line.content;
  
    // Split into leading whitespace and the rest of the content
    const leadingWhitespace = content.match(/^\s*/)[0];
    const codeContent = content.substring(leadingWhitespace.length);
  
    const highlightedContent = highlightSyntax(codeContent);
  
    return (
      <div
        key={index}
        className="code-line"
        style={{
          opacity: 0,
          animation: `fadeInLine 0.3s ease-out ${index * 0.1}s forwards`,
        }}
      >
        <span className="line-number">{line.number}</span>
        <span className="code-indent">{leadingWhitespace}</span>
        <span dangerouslySetInnerHTML={{ __html: highlightedContent }} />
        {index === currentLineIndex && !isTypingComplete && (
          <span className={`cursor ${showCursor ? 'visible' : 'hidden'}`}>|</span>
        )}
        {index === codeLines.length - 1 && isTypingComplete && (
          <span className={`final-cursor ${showCursor ? 'visible' : 'hidden'}`}>|</span>
        )}
      </div>
    );
  };

  return (
    <StyledWrapper>
      <div id='top' className='header-root min-h-screen flex items-center justify-center relative overflow-hidden snap-section'>
        {/* Enhanced animated background dots */}
        <div className="background-pattern">
          <div className="dot-grid"></div>
        </div>

        {/* Enhanced floating code elements */}
        <div className="floating-code">
          <div className="code-snippet code-1">{'<div>'}</div>
          <div className="code-snippet code-2">{'</>'}</div>
          <div className="code-snippet code-3">{'{ }'}</div>
          <div className="code-snippet code-4">{'const'}</div>
          <div className="code-snippet code-5">function()</div>
          <div className="code-snippet code-6">{'=> {}'}</div>
        </div>

        <div className='w-full px-6 md:px-10 relative z-10'>
          {/* Main content container - side by side layout */}
          <div className="main-content">
            {/* Left side - Code terminal with typing animation */}
            <div className="code-section">
              <div className="code-display-wrapper">
                <div className="terminal-header">
                  <div className="terminal-buttons">
                    <span className="btn-close"></span>
                    <span className="btn-minimize"></span>
                    <span className="btn-maximize"></span>
                  </div>
                  <div className="terminal-title">portfolio.js</div>
                </div>
                <div className="code-display">
                  {typedLines.map((line, index) => renderCodeLine(line, index))}
                </div>
              </div>
            </div>

            {/* Right side - Text content with staggered animations */}
            <div className="text-section">
              <div className="greeting-section">
                <h3 className='greeting-text'>
                  Hi! I'm Mohamed Zakaria Cherki 
                  <Image src={assets.hand_icon} alt='wave' className='hand-wave'/>    
                </h3>
              </div>

              {/* Main title with enhanced interactive letters */}
              <div className="title-section">
                <h1 className='main-title interactive-title'>
                  <span className="title-line">
                    {'Software'.split('').map((letter, index) => (
                      <span 
                        key={index}
                        className="interactive-letter slide-in-up"
                        style={{ animationDelay: `${0.5 + index * 0.1}s` }}
                      >
                        {letter}
                      </span>
                    ))}
                  </span>
                  <span className="title-line">
                    {'Engineer.'.split('').map((letter, index) => (
                      <span 
                        key={index}
                        className="interactive-letter slide-in-up"
                        style={{ animationDelay: `${1.3 + index * 0.1}s` }}
                      >
                        {letter}
                      </span>
                    ))}
                  </span>
                </h1>
                
                <div className="accent-line"></div>
              </div>
              
              {/* Enhanced description with fade-in */}
              <div className="description-container">
                <p className='description-text'>
                  Final-year Software Engineering student passionate about building 
                  <span className="highlight"> real-world tech solutions </span>
                  and continuously improving my skills. Specialized in 
                  <span className="highlight"> full-stack development </span>
                  and mobile app design, enthusiast about <span className="highlight">AI and cybersecurity.</span>
                </p>
               
                {/* Social links with staggered animation */}
                <ul className="example-2">
                  <li className="icon-content" style={{ animationDelay: '2.5s' }}>
                    <a href="https://www.linkedin.com/in/mohamed-zakaria-cherki/" target='_blank' aria-label="LinkedIn" data-social="linkedin">
                      <div className="filled" />
                      <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-linkedin" viewBox="0 0 16 16" xmlSpace="preserve">
                        <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" fill="currentColor" />
                      </svg>
                    </a>
                    <div className="tooltip">LinkedIn</div>
                  </li>
                  <li className="icon-content" style={{ animationDelay: '2.6s' }}>
                    <a href="https://github.com/GOATCHERKI" target='_blank' aria-label="GitHub" data-social="github">
                      <div className="filled" />
                      <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-github" viewBox="0 0 16 16" xmlSpace="preserve">
                        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" fill="currentColor" />
                      </svg>
                    </a>
                    <div className="tooltip">GitHub</div>
                  </li>
                  {/*
                  <li className="icon-content" style={{ animationDelay: '2.7s' }}>
                    <a href="https://www.instagram.com/" target='_blank' aria-label="Instagram" data-social="instagram">
                      <div className="filled" />
                      <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-instagram" viewBox="0 0 16 16" xmlSpace="preserve">
                        <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" fill="currentColor" />
                      </svg>
                    </a>
                    <div className="tooltip">Instagram</div>
                  </li>
                  <li className="icon-content" style={{ animationDelay: '2.8s' }}>
                    <a href="https://youtube.com/" target='_blank' aria-label="Youtube" data-social="youtube">
                      <div className="filled" />
                      <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-youtube" viewBox="0 0 16 16" xmlSpace="preserve">
                        <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.01 2.01 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.01 2.01 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31 31 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.01 2.01 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A100 100 0 0 1 7.858 2zM6.4 5.209v4.818l4.157-2.408z" fill="currentColor" />
                      </svg>
                    </a>
                    <div className="tooltip">Youtube</div>
                  </li>*/}
                </ul>
              </div>

              
              {/* Enhanced CTA buttons with animation */}
              <div className='cta-section'>
                <a href="https://www.linkedin.com/in/mohamed-zakaria-cherki/" className='cta-primary text-center ' target='_blank'>
                  <span>Let's Connect</span>
                  <svg className="cta-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </a>

                <a href="/Mohamed_Zakaria_Cherki_Resume.pdf" 
                   target="_blank" 
                   rel="noopener noreferrer" 
                   download 
                   className='cta-secondary text-center md:text-left'>
                  <svg className="cta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>
                  </svg>
                  <span>Download Resume</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </StyledWrapper>
  )
};

const StyledWrapper = styled.div`
  /* Clean white background with subtle pattern */
  .bg-gradient {
    background: #ffffff;
    position: relative;
  }

  .background-pattern {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.03;
    pointer-events: none;
  }

  .dot-grid {
    background-image: radial-gradient(circle, #000000 1px, transparent 1px);
    background-size: 30px 30px;
    width: 100%;
    height: 100%;
    animation: dotMove 20s infinite linear;
  }

  @keyframes dotMove {
    0% { background-position: 0 0; }
    100% { background-position: 30px 30px; }
  }

  /* Dark mode overrides */
  .dark & .dot-grid {
    background-image: radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px);
  }
  .dark & .code-snippet {
    color: rgba(255, 255, 255, 0.3);
  }
  .dark & .greeting-text { color: #e5e7eb; }
  .dark & .main-title { color: #ffffff; }
  .dark & .accent-line { background: #ffffff; }
  .dark & .description-text { color: #d1d5db; }
  .dark & .highlight { color: #ffffff; }
  .dark & .tech-badge {
    background: transparent;
    border-color: #ffffff;
    color: #ffffff;
  }
  .dark & .tech-badge:hover {
    background: rgba(255,255,255,0.1);
    color: #ffffff;
    box-shadow: 0 8px 25px rgba(255, 255, 255, 0.1);
  }
  .dark & .cta-primary {
    background: #ffffff;
    color: #000000;
  }
  .dark & .cta-secondary {
    background: transparent;
    color: #ffffff;
    border-color: #ffffff;
  }
  .dark & .cta-secondary:hover {
    background: rgba(255,255,255,0.1);
    color: #ffffff;
    border-color: #ffffff;
  }
  .dark & .code-display-wrapper {
    border: 1px solid rgba(255,255,255,0.15);
  }

  /* Root container to reserve space for fixed navbar on small screens */
  .header-root {
    /* default no extra padding on large screens */
  }

  /* Main content layout - side by side */
  .main-content {
    display: grid;
    grid-template-columns: 1fr 1fr; 
    gap: 3rem;
    align-items: center;
    min-height: 100vh;
  }

  /* Enhanced floating code elements */
  .floating-code {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    overflow: hidden;
  }

  .code-snippet {
    position: absolute;
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
    font-size: 18px;
    color: rgba(0, 0, 0, 0.3);
    font-weight: 600;
    animation: floatEnhanced 20s infinite ease-in-out;
    z-index: 1;
  }

  .code-1 {
    top: 15%;
    left: 15%;
    animation-delay: 0s;
  }

  .code-2 {
    top: 70%;
    right: 15%;
    animation-delay: -5s;
  }

  .code-3 {
    top: 85%;
    left: 25%;
    animation-delay: -10s;
  }

  .code-4 {
    top: 25%;
    right: 25%;
    animation-delay: -15s;
  }

  .code-5 {
    top: 30%;
    right: 50%;
    animation-delay: -15s;
  }

  .code-6 {
    top: 60%;
    left: 5%;
    animation-delay: -8s;
  }

  @keyframes floatEnhanced {
    0%, 100% { 
      transform: translateY(0px) rotate(0deg); 
      opacity: 0.15; 
    }
    25% { 
      transform: translateY(-30px) rotate(2deg); 
      opacity: 0.25; 
    }
    50% { 
      transform: translateY(-20px) rotate(-1deg); 
      opacity: 0.2; 
    }
    75% { 
      transform: translateY(15px) rotate(1deg); 
      opacity: 0.22; 
    }
  }

  /* Code section (left side) with enhanced animation */
  .code-section {
    animation: slideInFromLeft 1.2s ease-out;
    justify-self: start; 
    margin-left: clamp(48px, 8vw, 112px);
  }

  .code-display-wrapper {
    background: #000000;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
    border: 1px solid rgba(0, 0, 0, 0.1);
    width: clamp(550px, 40vw, 760px);
    max-width: 100%;
    transform: translateY(20px);
    animation: slideUpAndFade 1s ease-out 0.3s forwards;
  }

  .terminal-header {
    background: #2d2d2d;
    padding: 12px 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .terminal-buttons {
    display: flex;
    gap: 8px;
  }

  .terminal-buttons span {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    animation: buttonPulse 2s ease-in-out infinite;
  }

  @keyframes buttonPulse {
    0%, 100% { transform: scale(1); opacity: 0.8; }
    50% { transform: scale(1.1); opacity: 1; }
  }

  .btn-close {
    background: #ff5f57;
    animation-delay: 0s;
  }

  .btn-minimize {
    background: #ffbd2e;
    animation-delay: 0.2s;
  }

  .btn-maximize {
    background: #28ca42;
    animation-delay: 0.4s;
  }

  .terminal-title {
    color: #ffffff;
    font-size: 12px;
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
    font-weight: 500;
  }

  .code-display {
    padding: 24px;
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
    font-size: 14px;
    line-height: 1.6;
    color: #d4d4d4; /* Base code color for better contrast */
    overflow-x: auto;
    min-height: 400px;
    white-space: pre; /* Preserve indentation and spacing */
  }

  /* Enhanced code line animation */
  .code-line {
    display: flex;
    align-items: baseline; /* Align text baselines for cleaner look */
    margin-bottom: 2px; /* Tighten vertical spacing */
    gap: 6px;
    opacity: 0;
    white-space: pre; /* Ensure inner spacing is preserved */
  }

  @keyframes fadeInLine {
    from {
      opacity: 0;
      transform: translateX(-20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  .code-indent {
    display: inline-block;
  }
  .indent-1 { width: 24px; }
  .indent-2 { width: 48px; }

  .line-number {
    color: #6b7280; /* Muted gray */
    margin-right: 12px;
    width: 28px; /* Wider for alignment */
    text-align: right;
    font-size: 12px;
    user-select: none;
    opacity: 0.8;
  }

  .code-keyword {
    color: #c586c0; /* VS Code Dark+ keyword */
  }

  .code-variable {
    color: #9cdcfe;
  }

  .code-number {
    color: #b5cea8;
  }

  .code-property {
    color: #4fc1ff;
  }

  .code-operator {
    color: #d4d4d4;
  }

  .code-string {
    color: #ce9178;
  }

  .code-bracket {
    color: #ffd700;
  }

  /* Enhanced cursor animations */
  .cursor, .final-cursor {
    color: #ffffff;
    animation: cursorBlink 1s infinite;
    font-weight: bold;
  }

  .cursor.hidden, .final-cursor.hidden {
    opacity: 0;
  }

  .cursor.visible, .final-cursor.visible {
    opacity: 1;
  }

  @keyframes cursorBlink {
    0%, 50% { opacity: 1; }
    51%, 100% { opacity: 0; }
  }

  /* Text section (right side) with enhanced animations */
  .text-section {
    animation: slideInFromRight 1.2s ease-out 0.2s both;
  }

  .greeting-section {
    margin-bottom: 2rem;
    opacity: 0;
    animation: fadeInUp 0.8s ease-out 0.8s forwards;
  }

  .greeting-text {
    font-size: 1.5rem;
    font-weight: 500;
    color: #222222;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-family: var(--font-mozilla-text), ui-sans-serif, system-ui, sans-serif;
    justify-content: flex-start;
  }

  .hand-wave {
    width: 1.5rem;
    height: 1.5rem;
    animation: enhancedWave 2s infinite;
  }

  @keyframes enhancedWave {
    0%, 100% { transform: rotate(0deg) scale(1); }
    15% { transform: rotate(20deg) scale(1.1); }
    30% { transform: rotate(-10deg) scale(1.05); }
    45% { transform: rotate(15deg) scale(1.1); }
    60% { transform: rotate(-5deg) scale(1.05); }
    75% { transform: rotate(10deg) scale(1.1); }
    90% { transform: rotate(0deg) scale(1); }
  }

  /* Enhanced interactive title with better animations */
  .title-section {
    margin-bottom: 2rem;
    opacity: 0;
    animation: fadeInUp 0.8s ease-out 1.2s forwards;
  }

  .main-title {
    font-size: clamp(2.5rem, 6vw, 4rem);
    font-weight: 500;
    font-style: italic;
    line-height: 1.1;
    margin-bottom: 1rem;
    font-family: var(--font-sensation), ui-sans-serif, system-ui, sans-serif;
    color: #000000;
  }

  .title-line {
    display: block;
  }

  .interactive-letter {
    display: inline-block;
    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    cursor: pointer;
    transform-origin: center;
  }

  .interactive-letter:hover {
    color: #7baeff;
    animation: enhancedSqueeze 0.6s ease-in-out both;
    text-shadow: 0 5px 15px rgba(59, 130, 246, 0.4);
    /* Do NOT reapply .slide-in-up here */
  }

  .accent-line {
    width: 80px;
    height: 4px;
    background: #000000;
    border-radius: 2px;
    margin-bottom: 1rem;
    transform: scaleX(0);
    transform-origin: left;
    animation: lineGrow 0.8s ease-out 1.8s forwards;
  }

  @keyframes lineGrow {
    to { transform: scaleX(1); }
  }

  /* Enhanced description section */
  .description-container {
    margin-bottom: 3rem;
    opacity: 0;
    animation: fadeInUp 0.8s ease-out 2s forwards;
  }

  .description-text {
    font-size: 1.125rem;
    line-height: 1.7;
    color: #222222;
    max-width: 600px;
    margin-bottom: 2rem;
    font-family: var(--font-mozilla-text), ui-sans-serif, system-ui, sans-serif;
  }

  .highlight {
    font-weight: 600;
    color: #000000;
    position: relative;
    transition: all 0.3s ease;
  }

  .highlight:hover {
    color: #7baeff;
    transform: translateY(-1px);
  }

  .tech-badge {
    padding: 0.5rem 1rem;
    background: #ffffff;
    border: 2px solid #000000;
    border-radius: 25px;
    font-size: 0.875rem;
    font-weight: 600;
    color: #000000;
    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }

  .tech-badge:hover {
    background: #000000;
    color: #ffffff;
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  }

  /* Enhanced social section */
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .example-2 {
    display: flex;
    align-items: center;
    margin: 1rem 0 0;
  }

  .example-2 .icon-content {
    margin: 0 10px;
    position: relative;
    opacity: 0;
    transform: translateY(20px);
    animation: popUp 0.6s ease-out forwards;
  }

  @keyframes popUp {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .example-2 .icon-content .tooltip {
    position: absolute;
    left: 50%;
    bottom: calc(100% + 8px);
    transform: translateX(-50%) translateY(4px);
    color: #fff;
    padding: 6px 10px;
    border-radius: 5px;
    opacity: 0;
    visibility: hidden;
    font-size: 14px;
    white-space: nowrap;
    pointer-events: none;
    z-index: 10;
    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }

  .example-2 .icon-content:hover .tooltip {
    opacity: 1;
    visibility: visible;
    transform: translateX(-50%) translateY(0);
  }

  .example-2 .icon-content a {
    position: relative;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    color: #4d4d4d;
    background-color: #fff;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    transform: scale(1);
  }

  .example-2 .icon-content a:hover {
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    transform: scale(1.1) translateY(-3px);
  }

  .example-2 .icon-content a svg {
    position: relative;
    z-index: 1;
    width: 30px;
    height: 30px;
    transition: transform 0.3s ease;
  }

  .example-2 .icon-content a:hover svg {
    transform: scale(1.1);
  }

  .example-2 .icon-content a:hover {
    color: white;
  }

  .example-2 .icon-content a .filled {
    position: absolute;
    top: auto;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 0;
    background-color: #000;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }

  .example-2 .icon-content a:hover .filled {
    height: 100%;
  }

  .example-2 .icon-content a[data-social="linkedin"] .filled,
  .example-2 .icon-content a[data-social="linkedin"] ~ .tooltip {
    background-color: #0274b3;
  }

  .example-2 .icon-content a[data-social="github"] .filled,
  .example-2 .icon-content a[data-social="github"] ~ .tooltip {
    background-color: #24262a;
  }

  .example-2 .icon-content a[data-social="instagram"] .filled,
  .example-2 .icon-content a[data-social="instagram"] ~ .tooltip {
    background: linear-gradient(
      45deg,
      #405de6,
      #5b51db,
      #b33ab4,
      #c135b4,
      #e1306c,
      #fd1f1f
    );
  }

  .example-2 .icon-content a[data-social="youtube"] .filled,
  .example-2 .icon-content a[data-social="youtube"] ~ .tooltip {
    background-color: #ff0000;
  }

  /* Enhanced CTA section */
  .cta-section {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    opacity: 0;
    transform: translateY(20px);
    animation: fadeInUp 0.8s ease-out 2.4s forwards;
  }

  .cta-primary {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 1rem 2rem;
    background: #000000;
    color: #ffffff;
    border-radius: 50px;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
    transform: scale(1);
  }

  .cta-primary:hover {
    transform: translateY(-5px) scale(1.05);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25);
  }

  .cta-arrow {
    width: 20px;
    height: 20px;
    transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }

  .cta-primary:hover .cta-arrow {
    transform: translateX(8px) rotate(45deg);
  }

  .cta-secondary {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 1rem 2rem;
    background: #ffffff;
    color: #000000;
    border: 1px solid #000000;
    border-radius: 50px;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    transform: scale(1);
  }

  .cta-secondary:hover {
    background: #000000;
    color: #ffffff;
    transform: translateY(-5px) scale(1.05);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
    border: 1px solid #000000;
  }

  .cta-icon {
    width: 20px;
    height: 20px;
    transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }

  .cta-secondary:hover .cta-icon {
    transform: translateY(-3px) rotate(180deg);
  }

  /* New enhanced animations */
  @keyframes slideInFromLeft {
    from {
      opacity: 0;
      transform: translateX(-100px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes slideInFromRight {
    from {
      opacity: 0;
      transform: translateX(100px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes slideUpAndFade {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideInUp {
    from {
      opacity: 0;
      transform: translateY(50px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes enhancedSqueeze {
    0% {
      transform: scale(1, 1) translateY(0);
    }
    25% {
      transform: scale(1.2, 0.8) translateY(-8px);
    }
    50% {
      transform: scale(0.9, 1.1) translateY(-5px);
    }
    75% {
      transform: scale(1.05, 0.95) translateY(-3px);
    }
    100% {
      transform: scale(1, 1) translateY(-5px);
    }
  }

  /* ------------------- */
  /* RESPONSIVE BREAKPOINTS */
  /* ------------------- */

  /* Large desktop scaling (1500px and down) */
  @media (max-width: 1500px) {
    .main-content {
      gap: 2rem;
    }

    .code-section {
      margin-left: clamp(32px, 6vw, 80px);
    }

    .code-display-wrapper {
      width: clamp(480px, 38vw, 680px);
      overflow: hidden;
    }

    .code-display {
      overflow-x: auto;
      padding-bottom: 10px;
    }

    .code-display::-webkit-scrollbar {
      height: 6px;
    }
    .code-display::-webkit-scrollbar-track {
      background: #1a1a1a;
    }
    .code-display::-webkit-scrollbar-thumb {
      background: #3b82f6;
      border-radius: 3px;
    }

    .main-title {
      font-size: clamp(2.2rem, 5.5vw, 3.5rem);
    }

    .description-text {
      font-size: 1.05rem;
    }
  }

  /* Tablet landscape and small desktop (990px and down) */
@media (max-width: 990px) {
  .header-root {
    padding-top: 120px;
    min-height: auto;
  }

  /* Change grid to flex column layout */
  .main-content {
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
    text-align: center;
    padding: 0 1rem 2rem;
    min-height: auto;
  }

  /* Code section - now appears first */
  .code-section {
    order: 1;
    width: 100%;
    margin: 0 auto 2rem;
    padding: 0;
  }

  /* Text section - now appears second */
  .text-section {
    order: 2;
    padding: 0;
  }

  .code-display-wrapper {
    width: 100%;
    max-width: 700px;
    margin: 0 auto;
  }

  /* Center all text elements */
  .greeting-text,
  .accent-line,
  .description-text {
    justify-content: center;
    margin-left: auto;
    margin-right: auto;
  }

  .greeting-text {
    flex-direction: row;
  }

  .example-2 {
    justify-content: center;
  }

  .cta-section {
    justify-content: center;
  }

  /* Reduce floating code visibility */
  .floating-code {
    opacity: 0.3;
  }
}

  /* Phone responsiveness (768px and down) */
  @media (max-width: 768px) {
 .header-root {
    padding-top: 100px;
  }

  .main-content {
    gap: 2rem;
  }

  .code-display-wrapper {
    max-width: 100%;
    border-radius: 8px;
  }

  .code-display {
    padding: 12px;
    font-size: 11px;
  }

  .greeting-text {
    font-size: 1.25rem;
  }

  .description-text {
    font-size: 0.95rem;
    max-width: 100%;
  }

  .cta-section {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 0.75rem;
  }

  .cta-primary,
  .cta-secondary {
    padding: 0.75rem 1.25rem;
    font-size: 0.9rem;
  }
  }

/* ------------------- */
  /* PHONE RESPONSIVENESS */
  /* ------------------- */
  
  /* Phone-specific styles (600px and below) */
  @media (max-width: 600px) {
    .header-root {
      padding: 60px 0.5rem 1rem;
      min-height: auto;
    }

    /* Main content grid - changed to flex column */
    .main-content {
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
      padding: 0 0.5rem;
    }

    /* Hide code snippet completely */
    .code-section {
      display: none;
    }

    /* Name/Title Section */
    .greeting-section {
      order: 1;
      text-align: center;
    }

    .greeting-text {
      font-size: 1.4rem;
      flex-direction: column;
      align-items: center;
      gap: 0.25rem;
      margin-bottom: 0.5rem;
      margin-top:1rem;
    }

    .hand-wave {
      width: 1.4rem;
      height: 1.4rem;
    }

    .main-title {
      font-size: 2.5rem;
      line-height: 1.2;
      margin-bottom: 0.5rem;
    }

    .accent-line {
      width: 50px;
      height: 2px;
      margin: 0 auto 0.75rem;
    }

    /* Description text */
    .description-text {
      font-size: 0.85rem;
      line-height: 1.5;
      margin: 0 auto 1.25rem;
      max-width: 95%;
    }

    /* Buttons */
    .cta-section {
      order: 2;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      margin: 0 auto 1rem;
      width: 100%;
      max-width: 220px;
    }

    .cta-primary,
    .cta-secondary {
      padding: 0.6rem 1rem;
      font-size: 0.85rem;
      width: 100%;
      justify-content: center;
      text-align: center;
    }

    .cta-arrow,
    .cta-icon {
      width: 16px;
      height: 16px;
    }

    /* Social icons */
    .example-2 {
      order: 3;
      justify-content: center;
      margin: 0.75rem auto;
    }

    .example-2 .icon-content a {
      width: 36px;
      height: 36px;
    }

    .example-2 .icon-content a svg {
      width: 18px;
      height: 18px;
    }

    /* Disable complex animations on mobile */
    .floating-code {
      display: none;
    }

    .code-snippet {
      animation: none;
    }
  }

  /* Very small phones (400px and below) */
  @media (max-width: 400px) {
    .header-root {
      padding-top: 80px;
    }

    .main-title {
      font-size: 2.5rem;
    }

    .description-text {
      font-size: 0.8rem;
    }

    .cta-primary,
    .cta-secondary {
      padding: 0.5rem 0.8rem;
      font-size: 0.8rem;
      max-width: 200px;
    }

    .example-2 .icon-content a {
      width: 32px;
      height: 32px;
    }

    .example-2 .icon-content a svg {
      width: 16px;
      height: 16px;
    }
  }

  .slide-in-up {
  opacity: 0;
  animation: slideInUp 0.6s ease-out forwards;
  animation-fill-mode: forwards;
}
`;

export default Header;