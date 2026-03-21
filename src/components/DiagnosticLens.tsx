import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import evidenceImg from "@/assets/evidence-grid.jpg";

const DiagnosticLens = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const lensX = useTransform(scrollYProgress, [0.1, 0.9], ["10%", "70%"]);
  const lensY = useTransform(scrollYProgress, [0.1, 0.5, 0.9], ["10%", "40%", "70%"]);
  const scanLineY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const waveformBars = Array.from({ length: 15 }, (_, i) => i);

  return (
    <section
      id="diagnostic-lens"
      ref={sectionRef}
      className="relative py-[20vh]"
      style={{ background: "hsl(240 20% 5%)" }}
    >
      <div className="container max-w-7xl mx-auto px-6 mb-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.2, 0, 0, 1] }}
          viewport={{ once: true }}
        >
          <span className="font-display text-xs tracking-widest text-white/40 uppercase block mb-4">
            // How it works
          </span>
          <h2 className="font-display text-4xl md:text-6xl tracking-tighter text-white mb-4">
            The Diagnostic <span style={{ color: "hsl(190 80% 55%)" }}>Lens</span>
          </h2>
          <p className="text-white/50 max-w-xl text-lg">
            Our multi-layer neural scanner examines every pixel, exposing hidden
            artifacts, metadata anomalies, and generation fingerprints.
          </p>
        </motion.div>
      </div>

      {/* Evidence grid with floating lens */}
      <div className="relative mx-auto max-w-7xl px-6 overflow-hidden">
        <div className="relative border border-white/10 overflow-hidden rounded-lg" style={{ height: '60vh' }}>
          {/* Background evidence image */}
          <img
            src={evidenceImg}
            alt="Evidence grid"
            className="w-full h-full object-cover opacity-40"
          />

          {/* Cyan scan line sweeping top to bottom */}
          <motion.div
            className="absolute inset-x-0 h-[2px] z-30 pointer-events-none"
            style={{
              background: "linear-gradient(90deg, transparent 5%, hsl(190 80% 55%) 50%, transparent 95%)",
              boxShadow: "0 0 20px hsl(190 80% 55% / 0.6), 0 0 60px hsl(190 80% 55% / 0.3)",
            }}
            animate={{ top: ["0%", "100%", "0%"] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
          />

          {/* Radar rings expanding from center */}
          {[0, 0.8, 1.6].map((delay, idx) => (
            <motion.div
              key={idx}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border pointer-events-none z-20"
              style={{ borderColor: "hsl(190 80% 55% / 0.3)" }}
              animate={{
                width: [0, 400],
                height: [0, 400],
                opacity: [0.6, 0],
              }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                delay,
                ease: "easeOut",
              }}
            />
          ))}

          {/* Waveform bars */}
          <div className="absolute bottom-6 left-6 flex items-end gap-[3px] z-20">
            {waveformBars.map((_, i) => (
              <motion.div
                key={i}
                className="w-[3px] rounded-full"
                style={{ background: "hsl(270 60% 55%)" }}
                animate={{
                  height: [8, 20 + Math.random() * 24, 8],
                  opacity: [0.4, 0.9, 0.4],
                }}
                transition={{
                  duration: 1.2 + Math.random() * 0.6,
                  repeat: Infinity,
                  delay: i * 0.08,
                  ease: "easeInOut",
                }}
              />
            ))}
            <span className="font-display text-[8px] tracking-widest text-white/30 uppercase ml-2 self-center">
              waveform
            </span>
          </div>

          {/* Floating tags */}
          <motion.div
            className="absolute top-6 right-6 z-20 font-display text-[10px] tracking-widest uppercase px-3 py-1.5 rounded border"
            style={{
              color: "hsl(190 80% 55%)",
              borderColor: "hsl(190 80% 55% / 0.3)",
              background: "hsl(190 80% 55% / 0.05)",
            }}
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            FACE_ANALYSIS
          </motion.div>
          <motion.div
            className="absolute bottom-6 right-6 z-20 font-display text-[10px] tracking-widest uppercase px-3 py-1.5 rounded border"
            style={{
              color: "hsl(270 60% 60%)",
              borderColor: "hsl(270 60% 60% / 0.3)",
              background: "hsl(270 60% 60% / 0.05)",
            }}
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2.3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          >
            AUDIO_SCAN
          </motion.div>

          {/* Corner bracket reticles */}
          <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 z-20 pointer-events-none" style={{ borderColor: "hsl(190 80% 55% / 0.5)" }} />
          <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 z-20 pointer-events-none" style={{ borderColor: "hsl(190 80% 55% / 0.5)" }} />
          <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 z-20 pointer-events-none" style={{ borderColor: "hsl(190 80% 55% / 0.5)" }} />
          <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 z-20 pointer-events-none" style={{ borderColor: "hsl(190 80% 55% / 0.5)" }} />

          {/* The floating glass lens */}
          <motion.div
            className="absolute w-[280px] h-[280px] glass-lens z-10 pointer-events-none overflow-hidden"
            style={{
              left: lensX,
              top: lensY,
            }}
          >
            {/* Inner scanning line */}
            <motion.div
              className="absolute inset-x-0 h-[1px] scanning-line z-20"
              style={{ top: scanLineY }}
            />

            {/* Heatmap overlay effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-destructive/20 mix-blend-overlay" />

            {/* Corner brackets */}
            <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-primary/60" />
            <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-primary/60" />
            <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-primary/60" />
            <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-primary/60" />

            {/* Label */}
            <div className="absolute bottom-4 left-4 right-4">
              <div className="font-display text-[9px] tracking-widest text-primary uppercase">
                Anomaly Detected
              </div>
              <div className="font-display text-[9px] tracking-wider text-muted-foreground mt-1">
                Confidence: 97.3% — GAN Artifact
              </div>
            </div>
          </motion.div>

          {/* Grid overlay */}
          <div className="absolute inset-0 opacity-[0.04]" style={{
            backgroundImage: `linear-gradient(hsl(190 80% 55%) 1px, transparent 1px), linear-gradient(90deg, hsl(190 80% 55%) 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }} />
        </div>
      </div>
    </section>
  );
};

export default DiagnosticLens;
