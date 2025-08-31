import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  memo
} from "react";

const ANIMATION_CONFIG = {
  SMOOTH_TAU: 0.25,
  MIN_COPIES: 2,
  COPY_HEADROOM: 2,
};

const toCssLength = (value) =>
  typeof value === "number" ? `${value}px` : (value ?? undefined);

const cx = (...parts) =>
  parts.filter(Boolean).join(" ");

const useResizeObserver = (
  callback,
  elements,
  dependencies
) => {
  useEffect(() => {
    if (!window.ResizeObserver) {
      const handleResize = () => callback();
      window.addEventListener("resize", handleResize);
      callback();
      return () => window.removeEventListener("resize", handleResize);
    }

    const observers = elements.map((ref) => {
      if (!ref.current) return null;
      const observer = new ResizeObserver(callback);
      observer.observe(ref.current);
      return observer;
    });

    callback();

    return () => {
      observers.forEach((observer) => observer?.disconnect());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
};

const useImageLoader = (
  seqRef,
  onLoad,
  dependencies
) => {
  useEffect(() => {
    const images = seqRef.current?.querySelectorAll("img") ?? [];

    if (images.length === 0) {
      onLoad();
      return;
    }

    let remainingImages = images.length;
    const handleImageLoad = () => {
      remainingImages -= 1;
      if (remainingImages === 0) {
        onLoad();
      }
    };

    images.forEach((img) => {
      const htmlImg = img;
      if (htmlImg.complete) {
        handleImageLoad();
      } else {
        htmlImg.addEventListener("load", handleImageLoad, { once: true });
        htmlImg.addEventListener("error", handleImageLoad, { once: true });
      }
    });

    return () => {
      images.forEach((img) => {
        img.removeEventListener("load", handleImageLoad);
        img.removeEventListener("error", handleImageLoad);
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
};

const useAnimationLoop = (
  trackRef,
  targetVelocity,
  seqWidth,
  isHovered,
  pauseOnHover
) => {
  const rafRef = useRef(null);
  const lastTimestampRef = useRef(null);
  const offsetRef = useRef(0);
  const velocityRef = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (seqWidth > 0) {
      offsetRef.current =
        ((offsetRef.current % seqWidth) + seqWidth) % seqWidth;
      track.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`;
    }

    if (prefersReduced) {
      track.style.transform = "translate3d(0, 0, 0)";
      return () => {
        lastTimestampRef.current = null;
      };
    }

    const animate = (timestamp) => {
      if (lastTimestampRef.current === null) {
        lastTimestampRef.current = timestamp;
      }

      const deltaTime =
        Math.max(0, timestamp - lastTimestampRef.current) / 1000;
      lastTimestampRef.current = timestamp;

      const target = pauseOnHover && isHovered ? 0 : targetVelocity;

      const easingFactor =
        1 - Math.exp(-deltaTime / ANIMATION_CONFIG.SMOOTH_TAU);
      velocityRef.current += (target - velocityRef.current) * easingFactor;

      if (seqWidth > 0) {
        let nextOffset = offsetRef.current + velocityRef.current * deltaTime;
        nextOffset = ((nextOffset % seqWidth) + seqWidth) % seqWidth;
        offsetRef.current = nextOffset;

        const translateX = -offsetRef.current;
        track.style.transform = `translate3d(${translateX}px, 0, 0)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      lastTimestampRef.current = null;
    };
  }, [targetVelocity, seqWidth, isHovered, pauseOnHover, trackRef]);
};

export const LogoLoop = memo(
  ({
    logos,
    speed = 120,
    direction = "left",
    width = "100%",
    logoHeight = 28,
    gap = 32,
    pauseOnHover = true,
    fadeOut = false,
    fadeOutColor,
    scaleOnHover = false,
    ariaLabel = "Partner logos",
    className,
    style,
  }) => {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
      const checkTheme = () => {
        const isDarkMode = document.documentElement.classList.contains('dark');
        setIsDark(isDarkMode);
      };

      checkTheme();
      const observer = new MutationObserver(checkTheme);
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class']
      });

      return () => observer.disconnect();
    }, []);
    const containerRef = useRef(null);
    const trackRef = useRef(null);
    const seqRef = useRef(null);

         const [seqWidth, setSeqWidth] = useState(0);
     const [copyCount, setCopyCount] = useState(
       ANIMATION_CONFIG.MIN_COPIES
     );
     const [isHovered, setIsHovered] = useState(false);
     const [hoveredItem, setHoveredItem] = useState(null);

    const targetVelocity = useMemo(() => {
      const magnitude = Math.abs(speed);
      const directionMultiplier = direction === "left" ? 1 : -1;
      const speedMultiplier = speed < 0 ? -1 : 1;
      return magnitude * directionMultiplier * speedMultiplier;
    }, [speed, direction]);

    const updateDimensions = useCallback(() => {
      const containerWidth = containerRef.current?.clientWidth ?? 0;
      const sequenceWidth =
        seqRef.current?.getBoundingClientRect?.()?.width ?? 0;

      if (sequenceWidth > 0) {
        setSeqWidth(Math.ceil(sequenceWidth));
        const copiesNeeded =
          Math.ceil(containerWidth / sequenceWidth) +
          ANIMATION_CONFIG.COPY_HEADROOM;
        setCopyCount(Math.max(ANIMATION_CONFIG.MIN_COPIES, copiesNeeded));
      }
    }, []);

    useResizeObserver(
      updateDimensions,
      [containerRef, seqRef],
      [logos, gap, logoHeight]
    );

    useImageLoader(seqRef, updateDimensions, [logos, gap, logoHeight]);

    useAnimationLoop(
      trackRef,
      targetVelocity,
      seqWidth,
      isHovered,
      pauseOnHover
    );

    const cssVariables = useMemo(
      () =>
      ({
        "--logoloop-gap": `${gap}px`,
        "--logoloop-logoHeight": `${logoHeight}px`,
        ...(fadeOutColor && { "--logoloop-fadeColor": fadeOutColor }),
      }),
      [gap, logoHeight, fadeOutColor]
    );

         const rootClasses = useMemo(() =>
       cx(
         "relative overflow-x-hidden group logoloop-container",
         "[--logoloop-gap:32px]",
         "[--logoloop-logoHeight:28px]",
         "[--logoloop-fadeColorAuto:#ffffff]",
         "dark:[--logoloop-fadeColorAuto:#0b0b0b]",
         scaleOnHover && "py-[calc(var(--logoloop-logoHeight)*0.1)]",
         "pb-12",
         className
       ),
       [scaleOnHover, className]
     );

    const handleMouseEnter = useCallback(() => {
      if (pauseOnHover) setIsHovered(true);
    }, [pauseOnHover]);

    const handleMouseLeave = useCallback(() => {
      if (pauseOnHover) setIsHovered(false);
    }, [pauseOnHover]);

                   const renderLogoItem = useCallback((item, key) => {
        const isNodeItem = "node" in item;
        const isItemHovered = hoveredItem === key;

        const content = isNodeItem ? (
          <span
            className={cx(
              "inline-flex items-center",
              "motion-reduce:transition-none",
              scaleOnHover &&
              "transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover/item:scale-120"
            )}
            aria-hidden={!!item.href && !item.ariaLabel}
          >
            {(item).node}
          </span>
        ) : (
          <img
            className={cx(
              "h-[var(--logoloop-logoHeight)] w-auto block object-contain",
              "[-webkit-user-drag:none]",
              "[image-rendering:-webkit-optimize-contrast]",
              "motion-reduce:transition-none",
              scaleOnHover &&
              "transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover/item:scale-120"
            )}
            src={(item).src}
            srcSet={(item).srcSet}
            sizes={(item).sizes}
            width={(item).width}
            height={(item).height}
            alt={(item).alt ?? ""}
            title={(item).title}
            loading="lazy"
            decoding="async"
            draggable={false}
          />
        );

        const itemAriaLabel = isNodeItem
          ? (item.ariaLabel ?? item.title)
          : (item.alt ?? item.title);

        const inner = (item).href ? (
          <a
            className={cx(
              "inline-flex items-center no-underline rounded",
              "transition-opacity duration-200 ease-linear",
              "hover:opacity-80",
              "focus-visible:outline focus-visible:outline-current focus-visible:outline-offset-2"
            )}
            href={(item).href}
            aria-label={itemAriaLabel || "logo link"}
            target="_blank"
            rel="noreferrer noopener"
          >
            {content}
          </a>
        ) : (
          content
        );

                 return (
           <li
             className={cx(
               "flex-none mr-[var(--logoloop-gap)] text-[length:var(--logoloop-logoHeight)] leading-[1] relative",
               scaleOnHover && "overflow-visible group/item"
             )}
             key={key}
             role="listitem"
             onMouseEnter={() => setHoveredItem(key)}
             onMouseLeave={() => setHoveredItem(null)}
           >
                           <div className="relative flex flex-col items-center" style={{ paddingBottom: '20px' }}>
                {inner}
                                 {/* Tooltip */}
                 {isItemHovered && itemAriaLabel && (
                   <div
                     className="absolute top-full mt-1 px-2 py-1 rounded text-xs font-medium whitespace-nowrap transition-all duration-300 z-50"
                     style={{
                       backgroundColor: isDark ? 'rgba(255, 255, 255, 0.95)' : 'rgba(0, 0, 0, 0.95)',
                       color: isDark ? '#000000' : '#ffffff',
                       boxShadow: isDark 
                         ? '0 2px 8px rgba(0,0,0,0.3)' 
                         : '0 2px 8px rgba(0,0,0,0.2)',
                       transform: 'translateY(0) scale(1)',
                       minWidth: 'max-content',
                       textAlign: 'center',
                       border: isDark 
                         ? '1px solid rgba(0, 0, 0, 0.1)' 
                         : '1px solid rgba(255, 255, 255, 0.1)'
                     }}
                     onMouseEnter={() => setHoveredItem(key)}
                     onMouseLeave={() => setHoveredItem(null)}
                   >
                     {itemAriaLabel}
                     {/* Arrow */}
                     <div
                       className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-3 border-r-3 border-b-3 border-transparent"
                       style={{
                         borderBottomColor: isDark ? 'rgba(255, 255, 255, 0.95)' : 'rgba(0, 0, 0, 0.95)'
                       }}
                     />
                   </div>
                 )}
              </div>
           </li>
         );
      },
      [scaleOnHover, hoveredItem]
    );

    const logoLists = useMemo(
      () =>
        Array.from({ length: copyCount }, (_, copyIndex) => (
          <ul
            className="flex items-center"
            key={`copy-${copyIndex}`}
            role="list"
            aria-hidden={copyIndex > 0}
            ref={copyIndex === 0 ? seqRef : undefined}
          >
            {logos.map((item, itemIndex) =>
              renderLogoItem(item, `${copyIndex}-${itemIndex}`)
            )}
          </ul>
        )),
      [copyCount, logos, renderLogoItem]
    );

    const containerStyle = useMemo(() => ({
      width: toCssLength(width) ?? "100%",
      ...cssVariables,
      ...style,
    }),
      [width, cssVariables, style]
    );

    return (
      <div
        ref={containerRef}
        className={rootClasses}
        style={containerStyle}
        role="region"
        aria-label={ariaLabel}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {fadeOut && (
          <>
            <div
              aria-hidden
              className={cx(
                "pointer-events-none absolute inset-y-0 left-0 z-[1]",
                "w-[clamp(24px,8%,120px)]",
                "bg-[linear-gradient(to_right,var(--logoloop-fadeColor,var(--logoloop-fadeColorAuto))_0%,rgba(0,0,0,0)_100%)]"
              )}
            />
            <div
              aria-hidden
              className={cx(
                "pointer-events-none absolute inset-y-0 right-0 z-[1]",
                "w-[clamp(24px,8%,120px)]",
                "bg-[linear-gradient(to_left,var(--logoloop-fadeColor,var(--logoloop-fadeColorAuto))_0%,rgba(0,0,0,0)_100%)]"
              )}
            />
          </>
        )}

                          <div
           className={cx(
             "flex w-max will-change-transform select-none",
             "motion-reduce:transform-none"
           )}
           ref={trackRef}
           style={{
             scrollbarWidth: 'none',
             msOverflowStyle: 'none'
           }}
         >
           {logoLists}
         </div>
       </div>
     );
   }
 );

LogoLoop.displayName = "LogoLoop";

export default LogoLoop;
