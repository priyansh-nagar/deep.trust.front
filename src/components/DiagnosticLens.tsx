import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import scanningVideo from "../../public/scanning-room.mp4.asset.json";

const processSteps = [
  {
    label: "FACIAL_ANALYSIS",
    status: "Detecting GAN artifacts…",
    confidence: 97.3,
    color: "hsl(190 80% 55%)",
  },
  {
    label: "AUDIO_FORENSICS",
    status: "Analyzing spectral patterns…",
    confidence: 94.1,
    color: "hsl(270 60% 60%)",
  },
  {
    label: "METADATA_SCAN",
    status: "Checking EXIF consistency…",
    confidence: 99.2,
    color: "hsl(160 70% 50%)",
  },
  {
    label: "PIXEL_INTEGRITY",
    status: "Scanning compression layers…",
    confidence: 91.8,
    color: "hsl(45 90% 55%)",
  },
];

const waveformBars = Array.from({ length: 15 }, (_, i) => i);

const DiagnosticLens = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const scanLineY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="diagnostic-lens"
      ref={sectionRef}
      className="relative py-[20vh] overflow-hidden"
      style={{ background: "hsl(220 25% 4%)" }}
    >
      {/* Video background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-[0]"
        style={{ opacity: 0.5 }}
        src={scanningVideo.url}
      />

      {/* Dark overlay for readability */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(180deg, hsl(220 25% 4% / 0.6) 0%, hsl(220 25% 6% / 0.5) 50%, hsl(220 25% 4% / 0.65) 100%)",
        }}
      />

      {/* Cyan tint */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, hsl(190 80% 50% / 0.1), transparent 70%)",
        }}
      />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none z-[2]"
        style={{
          backgroundImage: `linear-gradient(hsl(190 80% 55%) 1px, transparent 1px), linear-gradient(90deg, hsl(190 80% 55%) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Scan line sweeping */}
      <motion.div
        className="absolute inset-x-0 h-[2px] z-[3] pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent 5%, hsl(190 80% 55%) 50%, transparent 95%)",
          boxShadow:
            "0 0 20px hsl(190 80% 55% / 0.6), 0 0 60px hsl(190 80% 55% / 0.3)",
        }}
        animate={{ top: ["0%", "100%", "0%"] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
      />

      {/* Radar rings */}
      {[0, 0.8, 1.6].map((delay, idx) => (
        <motion.div
          key={idx}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border pointer-events-none z-[2]"
          style={{ borderColor: "hsl(190 80% 55% / 0.2)" }}
          animate={{
            width: [0, 500],
            height: [0, 500],
            opacity: [0.5, 0],
          }}
          transition={{
            duration: 2.4,
            repeat: Infinity,
            delay,
            ease: "easeOut",
          }}
        />
      ))}

      {/* Corner reticles */}
      <div
        className="absolute top-6 left-6 w-10 h-10 border-t-2 border-l-2 z-[4] pointer-events-none"
        style={{ borderColor: "hsl(190 80% 55% / 0.5)" }}
      />
      <div
        className="absolute top-6 right-6 w-10 h-10 border-t-2 border-r-2 z-[4] pointer-events-none"
        style={{ borderColor: "hsl(190 80% 55% / 0.5)" }}
      />
      <div
        className="absolute bottom-6 left-6 w-10 h-10 border-b-2 border-l-2 z-[4] pointer-events-none"
        style={{ borderColor: "hsl(190 80% 55% / 0.5)" }}
      />
      <div
        className="absolute bottom-6 right-6 w-10 h-10 border-b-2 border-r-2 z-[4] pointer-events-none"
        style={{ borderColor: "hsl(190 80% 55% / 0.5)" }}
      />

      {/* Content */}
      <div className="container max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.2, 0, 0, 1] }}
        >
          <span
            className="font-display text-xs tracking-widest uppercase block mb-4"
            style={{ color: "hsl(190 80% 55% / 0.7)" }}
          >
            // How it works
          </span>
          <h2
            className="font-calligraphy text-4xl md:text-6xl tracking-tight mb-4"
            style={{
              color: "hsl(0 0% 95%)",
              textShadow: "0 2px 20px hsl(0 0% 0% / 0.5)",
            }}
          >
            The Diagnostic{" "}
            <span
              style={{
                color: "hsl(190 80% 60%)",
                textShadow: "0 0 30px hsl(190 80% 55% / 0.5)",
              }}
            >
              Lens
            </span>
          </h2>
          <p style={{ color: "hsl(0 0% 70%)" }} className="max-w-xl text-lg">
            Our multi-layer neural scanner examines every pixel, exposing hidden
            artifacts, metadata anomalies, and generation fingerprints.
          </p>
        </motion.div>

        {/* Process panels */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {processSteps.map((step, i) => (
            <motion.div
              key={step.label}
              className="relative overflow-hidden rounded-lg border p-6"
              style={{
                background: "hsl(220 20% 8% / 0.75)",
                borderColor: `${step.color}20`,
                backdropFilter: "blur(12px)",
              }}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: 0.2 + i * 0.12,
                ease: [0.42, 0, 0.58, 1],
              }}
            >
              {/* Top accent */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px]"
                style={{ background: step.color, opacity: 0.6 }}
              />

              <div
                className="font-display text-[10px] tracking-widest uppercase mb-3"
                style={{ color: step.color }}
              >
                {step.label}
              </div>
              <p
                className="text-sm mb-4"
                style={{ color: "hsl(0 0% 60%)" }}
              >
                {step.status}
              </p>

              {/* Animated confidence bar */}
              <div className="relative h-1.5 rounded-full overflow-hidden mb-2"
                style={{ background: "hsl(0 0% 100% / 0.08)" }}>
                <motion.div
                  className="absolute inset-y-0 left-0 rounded-full"
                  style={{ background: step.color }}
                  initial={{ width: "0%" }}
                  animate={isInView ? { width: `${step.confidence}%` } : {}}
                  transition={{
                    duration: 1.4,
                    delay: 0.5 + i * 0.15,
                    ease: [0.34, 1.56, 0.64, 1],
                  }}
                />
              </div>
              <div className="flex justify-between items-center">
                <span
                  className="font-display text-[9px] tracking-wider uppercase"
                  style={{ color: "hsl(0 0% 45%)" }}
                >
                  Confidence
                </span>
                <motion.span
                  className="font-display text-sm tabular-nums"
                  style={{ color: step.color }}
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.8 + i * 0.15 }}
                >
                  {step.confidence}%
                </motion.span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom bar: waveform + tags */}
        <motion.div
          className="flex items-center justify-between flex-wrap gap-6"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          {/* Waveform */}
          <div className="flex items-end gap-[3px]">
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
            <span
              className="font-display text-[8px] tracking-widest uppercase ml-2 self-center"
              style={{ color: "hsl(0 0% 40%)" }}
            >
              waveform
            </span>
          </div>

          {/* Floating tags */}
          <div className="flex gap-3">
            <motion.div
              className="font-display text-[10px] tracking-widest uppercase px-3 py-1.5 rounded border"
              style={{
                color: "hsl(190 80% 55%)",
                borderColor: "hsl(190 80% 55% / 0.3)",
                background: "hsl(190 80% 55% / 0.05)",
              }}
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              FACE_ANALYSIS
            </motion.div>
            <motion.div
              className="font-display text-[10px] tracking-widest uppercase px-3 py-1.5 rounded border"
              style={{
                color: "hsl(270 60% 60%)",
                borderColor: "hsl(270 60% 60% / 0.3)",
                background: "hsl(270 60% 60% / 0.05)",
              }}
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{
                duration: 2.3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
            >
              AUDIO_SCAN
            </motion.div>
            <motion.div
              className="font-display text-[10px] tracking-widest uppercase px-3 py-1.5 rounded border"
              style={{
                color: "hsl(160 70% 50%)",
                borderColor: "hsl(160 70% 50% / 0.3)",
                background: "hsl(160 70% 50% / 0.05)",
              }}
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{
                duration: 2.6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
            >
              DOCUMENT_VERIFY
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DiagnosticLens;
