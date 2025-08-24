/**
 * Copyright (c) 2024 Mohamed Zakaria Cherki. All rights reserved.
 * This portfolio website is the exclusive property of Mohamed Zakaria Cherki.
 * Unauthorized copying, reproduction, or claiming of this work is prohibited.
 */

"use client"

import React, { useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";

const ITEM_GAP_PX = 72; // vertical spacing between numbers

const SectionScroller = () => {
  const [sections, setSections] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const found = Array.from(document.querySelectorAll(".snap-section"));
    setSections(found);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = found.indexOf(entry.target);
            if (idx !== -1) setActiveIndex(idx);
          }
        });
      },
      { rootMargin: "0px", threshold: 0.6 }
    );

    found.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const trackHeight = useMemo(() => {
    return Math.max(0, (sections.length - 1) * ITEM_GAP_PX);
  }, [sections.length]);

  const thumbTop = useMemo(() => {
    return activeIndex * ITEM_GAP_PX;
  }, [activeIndex]);

  const handleClick = (idx) => {
    const el = sections[idx];
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (sections.length === 0) return null;

  return (
    <Wrapper aria-label="Section scroller" ref={containerRef}>
      <ul className="steps">
        {sections.map((_, idx) => (
          <li key={idx} className={idx === activeIndex ? "step active" : "step"}>
            <button type="button" onClick={() => handleClick(idx)}>
              {String(idx + 1).padStart(2, "0")}
            </button>
          </li>
        ))}
      </ul>
      <div className="rail" style={{ height: `${trackHeight}px` }}>
        <span className="progress" style={{ height: `${thumbTop + 40}px` }} />
        <span className="thumb" style={{ transform: `translateY(${thumbTop}px)` }} />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.nav`
  position: fixed;
  right: 24px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 40;
  display: flex;
  align-items: center;
  gap: 12px;
  pointer-events: none; /* prevent blocking content; buttons re-enable */

  .steps {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: ${ITEM_GAP_PX - 12}px;
  }

  .step button {
    pointer-events: auto;
    background: transparent;
    border: none;
    color: #334155; /* slate-700 */
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
    font-size: 12px;
    padding: 0;
    cursor: pointer;
    transition: color 0.2s ease;
  }

  .step.active button { color: #0f172a; } /* slate-900 */
  .step button:hover { color: #0f172a; }
  .dark & .step button { color: #94a3b8; }
  .dark & .step.active button { color: #ffffff; }
  .dark & .step button:hover { color: #ffffff; }

  .rail {
    position: relative;
    width: 2px;
    background: rgba(15, 23, 42, 0.25);
    overflow: hidden;
  }

  /* progress line that grows as you scroll */
  .progress {
    position: absolute;
    left: 50%;
    translate: -50% 0;
    width: 2px;
    background: rgba(15, 23, 42, 0.65);
    transition: height 0.18s ease;
  }

  .thumb {
    position: absolute;
    left: 50%;
    translate: -50% 0;
    width: 4px;
    height: 40px;
    background: #0f172a;
    border-radius: 999px;
    box-shadow: 0 0 8px rgba(15, 23, 42, 0.35);
    transition: transform 0.18s ease;
  }

  .dark & .rail { background: rgba(255,255,255,0.25); }
  .dark & .progress { background: rgba(255,255,255,0.7); }
  .dark & .thumb { background: #ffffff; box-shadow: 0 0 8px rgba(255,255,255,0.35); }

  @media (max-width: 1024px) {
    display: none; /* hide on small screens */
  }
`;

export default SectionScroller;


