import { useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import humanImg from "@/assets/human-portrait.jpg";
import robotImg from "@/assets/robot-wireframe.jpg";

const HeroReveal = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isHovering, setIsHovering] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Scroll-driven transforms — image shrinks, text appears
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.55, 0.45]);
  const imageBorderRadius = useTransform(scrollYProgress, [0, 0.5], [0, 24]);
  const titleOpacity = useTransform(scrollYProgress, [0.25, 0.45], [0, 1]);
  const titleY = useTransform(scrollYProgress, [0.25, 0.45], [60, 0]);
  const quoteOpacity = useTransform(scrollYProgress, [0.45, 0.65], [0, 1]);
  const quoteY = useTransform(scrollYProgress, [0.45, 0.65], [40, 0]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 0.5]);
  const revealRadius = 98;
  const ringSize = 196;
  const robotTransform = "none";

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {/* Soft background gradient blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-30"
            style={{ background: "radial-gradient(circle, hsl(255 70% 55% / 0.15), transparent 70%)" }} />
          <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full opacity-20"
            style={{ background: "radial-gradient(circle, hsl(200 80% 60% / 0.12), transparent 70%)" }} />
        </div>

        {/* Image container that shrinks on scroll */}
        <motion.div
          ref={containerRef}
          className="relative cursor-none z-10 overflow-hidden"
          style={{
            scale: imageScale,
            borderRadius: imageBorderRadius,
            width: "100vw",
            height: "100vh",
          }}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {/* Base: Human portrait */}
          <img
            src={humanImg}
            alt="Human subject"
            className="absolute inset-0 w-full h-full object-cover object-top"
          />

          {/* Dark overlay that grows on scroll */}
          <motion.div
            className="absolute inset-0 z-[1] pointer-events-none bg-foreground/0"
            style={{ opacity: overlayOpacity }}
          />

          {/* Robot reveal on hover */}
          <div
            className="absolute inset-0 z-[2] transition-opacity duration-300"
            style={{
              maskImage: isHovering
                ? `radial-gradient(circle ${revealRadius}px at ${mousePos.x}% ${mousePos.y}%, black 0 56%, transparent 76%)`
                : "none",
              WebkitMaskImage: isHovering
                ? `radial-gradient(circle ${revealRadius}px at ${mousePos.x}% ${mousePos.y}%, black 0 56%, transparent 76%)`
                : "none",
              opacity: isHovering ? 1 : 0,
            }}
          >
            <img
              src={robotImg}
              alt="AI wireframe overlay"
              className="w-full h-full object-cover object-top pointer-events-none"
              style={{
                transform: robotTransform,
                transformOrigin: "center top",
                filter: "contrast(1.12) saturate(0.92)",
              }}
            />
          </div>

          {/* Cursor ring */}
          {isHovering && (
            <div
              className="absolute z-[5] rounded-full border border-primary/30 pointer-events-none"
              style={{
                left: `${mousePos.x}%`,
                top: `${mousePos.y}%`,
                width: ringSize,
                height: ringSize,
                transform: "translate(-50%, -50%)",
                boxShadow: "0 0 40px hsl(var(--primary) / 0.16), inset 0 0 40px hsl(var(--primary) / 0.06)",
              }}
            />
          )}

          {/* Scanning line */}
          <div className="absolute inset-x-0 z-[3] h-[1px] scanning-line animate-scan-line pointer-events-none" />
        </motion.div>

        {/* "DeepTrust" calligraphy text — appears on scroll over the image */}
        <motion.h1
          className="absolute z-20 font-calligraphy text-7xl md:text-[10rem] lg:text-[14rem] leading-none tracking-tight pointer-events-none select-none"
          style={{
            opacity: titleOpacity,
            y: titleY,
            color: "hsl(var(--foreground) / 0.82)",
            textShadow: "0 10px 30px hsl(var(--background) / 0.22)",
            fontStyle: "italic",
            fontWeight: 700,
          }}
        >
          Deep Trust
        </motion.h1>

        <motion.p
          className="absolute z-20 bottom-[18%] font-quote text-xl md:text-3xl lg:text-4xl italic text-center max-w-3xl px-8 pointer-events-none select-none"
          style={{
            opacity: quoteOpacity,
            y: quoteY,
            color: "hsl(var(--foreground) / 0.74)",
            textShadow: "0 8px 24px hsl(var(--background) / 0.18)",
          }}
        >
          "Trust is no longer a default — it's a calculation."
        </motion.p>

        {/* Status indicator */}
        <motion.div
          className="absolute bottom-6 right-6 z-20 flex items-center gap-2 bg-card/80 backdrop-blur-sm px-3 py-2 border border-border rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
          <span className="font-display text-[10px] tracking-widest text-primary uppercase">
            {isHovering ? "Analyzing" : "Hover to scan"}
          </span>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroReveal;
