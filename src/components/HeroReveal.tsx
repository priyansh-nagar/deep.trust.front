import { useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import humanImg from "@/assets/human-portrait.jpg";
import robotImg from "@/assets/robot-wireframe.jpg";

const scanDocuments = [
  { label: "passport_scan.pdf", status: "VERIFIED", confidence: "99.2%", x: "5%", y: "8%", delay: 0 },
  { label: "id_front.jpg", status: "ANALYZING", confidence: "87.4%", x: "68%", y: "12%", delay: 0.3 },
  { label: "bank_statement.pdf", status: "FLAGGED", confidence: "34.1%", x: "12%", y: "55%", delay: 0.6 },
  { label: "medical_report.png", status: "VERIFIED", confidence: "96.8%", x: "60%", y: "62%", delay: 0.9 },
  { label: "contract_v2.pdf", status: "SCANNING", confidence: "—", x: "35%", y: "35%", delay: 1.2 },
  { label: "diploma_cert.jpg", status: "VERIFIED", confidence: "98.1%", x: "78%", y: "40%", delay: 0.4 },
  { label: "invoice_2026.pdf", status: "ANALYZING", confidence: "72.6%", x: "3%", y: "80%", delay: 0.7 },
  { label: "photo_evidence.png", status: "FLAGGED", confidence: "21.3%", x: "55%", y: "85%", delay: 1.0 },
];

const statusColor: Record<string, string> = {
  VERIFIED: "text-emerald-400",
  ANALYZING: "text-amber-400",
  FLAGGED: "text-red-400",
  SCANNING: "text-sky-400",
};

const HeroReveal = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isHovering, setIsHovering] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.55, 0.45]);
  const imageBorderRadius = useTransform(scrollYProgress, [0, 0.5], [0, 24]);
  const titleOpacity = useTransform(scrollYProgress, [0.25, 0.45], [0, 1]);
  const titleY = useTransform(scrollYProgress, [0.25, 0.45], [60, 0]);
  const quoteOpacity = useTransform(scrollYProgress, [0.45, 0.65], [0, 1]);
  const quoteY = useTransform(scrollYProgress, [0.45, 0.65], [40, 0]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 0.5]);

  // Background transitions: dark bg + scanning elements appear as image shrinks
  const bgOpacity = useTransform(scrollYProgress, [0.15, 0.45], [0, 1]);
  const gridOpacity = useTransform(scrollYProgress, [0.2, 0.5], [0, 0.06]);
  const scanElementsOpacity = useTransform(scrollYProgress, [0.3, 0.55], [0, 1]);
  const lensX = useTransform(scrollYProgress, [0.2, 0.8], ["15%", "65%"]);
  const lensY = useTransform(scrollYProgress, [0.2, 0.5, 0.8], ["20%", "50%", "75%"]);
  const scanLineY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

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

        {/* Dark scanning background — revealed as image shrinks */}
        <motion.div
          className="absolute inset-0 z-0"
          style={{ opacity: bgOpacity }}
        >
          {/* Deep dark base */}
          <div className="absolute inset-0" style={{ background: "hsl(240 20% 6%)" }} />

          {/* Subtle radial highlights */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-[10%] left-[15%] w-[500px] h-[500px] rounded-full"
              style={{ background: "radial-gradient(circle, hsl(255 70% 55% / 0.08), transparent 70%)" }} />
            <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] rounded-full"
              style={{ background: "radial-gradient(circle, hsl(200 80% 50% / 0.06), transparent 70%)" }} />
            <div className="absolute top-[50%] left-[50%] w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{ background: "radial-gradient(circle, hsl(255 40% 30% / 0.05), transparent 60%)" }} />
          </div>

          {/* Grid overlay */}
          <motion.div
            className="absolute inset-0"
            style={{
              opacity: gridOpacity,
              backgroundImage: `linear-gradient(hsl(255 70% 55%) 1px, transparent 1px), linear-gradient(90deg, hsl(255 70% 55%) 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
            }}
          />

          {/* Floating scan document cards */}
          <motion.div className="absolute inset-0" style={{ opacity: scanElementsOpacity }}>
            {scanDocuments.map((doc, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{ left: doc.x, top: doc.y }}
                initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.7, delay: doc.delay, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true, amount: 0.1 }}
              >
                <div className="backdrop-blur-xl border border-white/[0.06] rounded-lg px-4 py-3 shadow-2xl"
                  style={{ background: "hsl(240 20% 10% / 0.7)" }}>
                  <div className="font-display text-[10px] tracking-wider text-white/50">{doc.label}</div>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${doc.status === "VERIFIED" ? "bg-emerald-400" : doc.status === "FLAGGED" ? "bg-red-400" : doc.status === "ANALYZING" ? "bg-amber-400" : "bg-sky-400"}`} />
                    <span className={`font-display text-[9px] tracking-widest uppercase ${statusColor[doc.status]}`}>{doc.status}</span>
                    <span className="font-display text-[9px] tracking-wider text-white/30 ml-auto tabular-nums">{doc.confidence}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Floating glassmorphism lens */}
          <motion.div
            className="absolute w-[220px] h-[220px] pointer-events-none z-10"
            style={{
              left: lensX,
              top: lensY,
              opacity: scanElementsOpacity,
            }}
          >
            <div className="w-full h-full rounded-2xl backdrop-blur-2xl border border-white/[0.08] overflow-hidden"
              style={{ background: "hsl(240 20% 14% / 0.5)" }}>
              {/* Scanning line inside lens */}
              <motion.div
                className="absolute inset-x-0 h-[1px] z-20"
                style={{
                  top: scanLineY,
                  background: "linear-gradient(90deg, transparent, hsl(255 70% 55%), transparent)",
                  boxShadow: "0 0 20px hsl(255 70% 55% / 0.5)",
                }}
              />
              {/* Heatmap overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-red-500/10 mix-blend-overlay" />
              {/* Corner brackets */}
              <div className="absolute top-3 left-3 w-5 h-5 border-t border-l border-white/20" />
              <div className="absolute top-3 right-3 w-5 h-5 border-t border-r border-white/20" />
              <div className="absolute bottom-3 left-3 w-5 h-5 border-b border-l border-white/20" />
              <div className="absolute bottom-3 right-3 w-5 h-5 border-b border-r border-white/20" />
              {/* Lens label */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="font-display text-[9px] tracking-widest text-emerald-400 uppercase">Anomaly Scan</div>
                <div className="font-display text-[9px] tracking-wider text-white/40 mt-1">Confidence: 97.3%</div>
              </div>
            </div>
          </motion.div>

          {/* Horizontal scan line across the whole background */}
          <motion.div
            className="absolute inset-x-0 h-[1px] z-[5] pointer-events-none"
            style={{
              top: scanLineY,
              background: "linear-gradient(90deg, transparent 10%, hsl(255 70% 55% / 0.3) 50%, transparent 90%)",
              boxShadow: "0 0 30px hsl(255 70% 55% / 0.15)",
            }}
          />
        </motion.div>

        {/* Soft gradient blobs (visible initially) */}
        <motion.div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ opacity: useTransform(scrollYProgress, [0.1, 0.4], [1, 0]) }}>
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-30"
            style={{ background: "radial-gradient(circle, hsl(255 70% 55% / 0.15), transparent 70%)" }} />
          <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full opacity-20"
            style={{ background: "radial-gradient(circle, hsl(200 80% 60% / 0.12), transparent 70%)" }} />
        </motion.div>

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
          <img
            src={humanImg}
            alt="Human subject"
            className="absolute inset-0 w-full h-full object-cover object-top"
          />

          <motion.div
            className="absolute inset-0 z-[1] pointer-events-none bg-foreground/0"
            style={{ opacity: overlayOpacity }}
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
                transform: robotTransform,
                transformOrigin: "center top",
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

          <div className="absolute inset-x-0 z-[3] h-[1px] scanning-line animate-scan-line pointer-events-none" />
        </motion.div>

        {/* "DeepTrust" calligraphy text */}
        <motion.h1
          className="absolute z-20 font-calligraphy text-7xl md:text-[10rem] lg:text-[14rem] leading-none tracking-tight pointer-events-none select-none font-black"
          style={{
            opacity: titleOpacity,
            y: titleY,
            color: "hsl(0 0% 95%)",
            textShadow: "0 4px 30px hsl(255 70% 55% / 0.3), 0 12px 60px hsl(0 0% 0% / 0.5)",
            fontStyle: "italic",
            fontWeight: 900,
            letterSpacing: "-0.02em",
          }}
        >
          Deep Trust
        </motion.h1>

        <motion.p
          className="absolute z-20 bottom-[18%] font-quote text-xl md:text-3xl lg:text-4xl italic text-center max-w-3xl px-8 pointer-events-none select-none"
          style={{
            opacity: quoteOpacity,
            y: quoteY,
            color: "hsl(0 0% 80%)",
            textShadow: "0 8px 24px hsl(0 0% 0% / 0.4)",
          }}
        >
          "Trust is no longer a default — it's a calculation."
        </motion.p>

        {/* Status indicator */}
        <motion.div
          className="absolute bottom-6 right-6 z-20 flex items-center gap-2 backdrop-blur-sm px-3 py-2 border border-white/10 rounded-lg"
          style={{ background: "hsl(240 20% 10% / 0.6)" }}
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
