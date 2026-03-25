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

  // Image shrinks faster and DeepTrust appears earlier, overlapping
  const imageScale = useTransform(scrollYProgress, [0, 0.15, 0.3], [1, 0.4, 0]);
  const imageOpacity = useTransform(scrollYProgress, [0.15, 0.28], [1, 0]);
  const imageBorderRadius = useTransform(scrollYProgress, [0, 0.15], [0, 24]);

  // DeepTrust appears as image starts shrinking — overlapping timing
  const titleOpacity = useTransform(scrollYProgress, [0.1, 0.22], [0, 1]);
  const titleY = useTransform(scrollYProgress, [0.1, 0.22], [40, 0]);
  const titleScale = useTransform(scrollYProgress, [0.1, 0.22], [0.9, 1]);

  const quoteOpacity = useTransform(scrollYProgress, [0.28, 0.4], [0, 1]);
  const quoteY = useTransform(scrollYProgress, [0.28, 0.4], [30, 0]);

  // Vibrant background fades in early
  const bgOpacity = useTransform(scrollYProgress, [0.05, 0.2], [0, 1]);

  const revealRadius = 98;
  const ringSize = 196;

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

        {/* Vibrant background — dark, light, aesthetic colors */}
        <motion.div
          className="absolute inset-0 z-0"
          style={{ opacity: bgOpacity }}
        >
          {/* Rich multi-tone gradient */}
          <div className="absolute inset-0" style={{
            background: "radial-gradient(ellipse at 25% 20%, hsl(270 45% 18%) 0%, hsl(240 30% 10%) 35%, hsl(220 25% 8%) 60%, hsl(200 35% 12%) 100%)"
          }} />

          {/* Warm accent top-right */}
          <div className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, hsl(320 50% 40% / 0.15), transparent 65%)", filter: "blur(80px)" }} />

          {/* Cool accent bottom-left */}
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, hsl(190 80% 45% / 0.12), transparent 65%)", filter: "blur(70px)" }} />

          {/* Violet center glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, hsl(255 60% 50% / 0.1), transparent 60%)", filter: "blur(90px)" }} />

          {/* Subtle warm light streak */}
          <div className="absolute top-[30%] left-[40%] w-[500px] h-[200px] pointer-events-none"
            style={{ background: "radial-gradient(ellipse, hsl(40 60% 55% / 0.06), transparent 70%)", filter: "blur(50px)", transform: "rotate(-15deg)" }} />
        </motion.div>

        {/* Soft gradient blobs (visible initially, fade out) */}
        <motion.div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ opacity: useTransform(scrollYProgress, [0.05, 0.2], [1, 0]) }}>
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-30"
            style={{ background: "radial-gradient(circle, hsl(255 70% 55% / 0.15), transparent 70%)" }} />
          <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full opacity-20"
            style={{ background: "radial-gradient(circle, hsl(200 80% 60% / 0.12), transparent 70%)" }} />
        </motion.div>

        {/* Image container that shrinks and fades quickly */}
        <motion.div
          ref={containerRef}
          className="relative cursor-none z-10 overflow-hidden"
          style={{
            scale: imageScale,
            opacity: imageOpacity,
            borderRadius: imageBorderRadius,
            width: "100vw",
            height: "100vh",
          }}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <img
            src={humanImg}
            alt="Human subject"
            className="absolute inset-0 w-full h-full object-cover object-top"
          />

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
                filter: "contrast(1.12) saturate(0.92)",
              }}
            />
          </div>

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
        </motion.div>

        {/* "DeepTrust" — bold, visible, with text-shadow instead of backdrop-blur */}
        <motion.h1
          className="absolute z-20 leading-none tracking-tight pointer-events-none select-none whitespace-nowrap"
          style={{
            opacity: titleOpacity,
            y: titleY,
            scale: titleScale,
            fontFamily: "'Georgia', 'Times New Roman', serif",
            fontSize: "clamp(4rem, 14vw, 14rem)",
            fontWeight: 900,
            fontStyle: "italic",
            letterSpacing: "-0.02em",
            color: "hsl(0 0% 97%)",
            textShadow: "0 0 60px hsl(255 70% 55% / 0.6), 0 0 120px hsl(190 80% 55% / 0.3), 0 4px 20px hsl(0 0% 0% / 0.7), 0 8px 40px hsl(320 50% 45% / 0.2)",
          }}
        >
          DeepTrust
        </motion.h1>

        <motion.p
          className="absolute z-20 bottom-[18%] text-xl md:text-3xl lg:text-4xl italic text-center max-w-3xl px-8 pointer-events-none select-none"
          style={{
            opacity: quoteOpacity,
            y: quoteY,
            fontFamily: "'Georgia', serif",
            color: "hsl(0 0% 82%)",
            textShadow: "0 4px 20px hsl(0 0% 0% / 0.6)",
          }}
        >
          "Trust is no longer a default — it's a calculation."
        </motion.p>

        {/* Status indicator — no backdrop-blur */}
        <motion.div
          className="absolute bottom-6 right-6 z-20 flex items-center gap-2 px-3 py-2 border border-white/10 rounded-lg"
          style={{ background: "hsl(240 20% 10% / 0.8)" }}
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
