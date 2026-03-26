import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Image, Mic, ScanEye, AudioLines } from "lucide-react";
const LAB_VIDEO_URL = "https://id-preview--dd787150-4892-446d-9755-e5c772d18242.lovable.app/__l5e/assets-v1/675fdc9e-c9d5-4d3a-b2b8-0431b4f75816/lab-robots.mp4";

const words = ["Trust", "is", "built", "on", "truth,", "not", "appearances."];

const floatingIcons = [
  { Icon: Image, pos: "top-[12%] left-[8%]", delay: 0 },
  { Icon: Mic, pos: "top-[10%] right-[10%]", delay: 0.5 },
  { Icon: ScanEye, pos: "bottom-[14%] left-[6%]", delay: 1 },
  { Icon: AudioLines, pos: "bottom-[12%] right-[8%]", delay: 1.5 },
];

const HeroQuote = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-[0]"
        src={LAB_VIDEO_URL}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 z-[1]"
        style={{ background: "linear-gradient(180deg, hsl(240 15% 4% / 0.72) 0%, hsl(240 15% 6% / 0.62) 50%, hsl(240 15% 4% / 0.68) 100%)" }} />

      {/* Cyan tint */}
      <div className="absolute inset-0 z-[1] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, hsl(190 80% 50% / 0.08), transparent 70%)" }} />

      {/* Floating corner icons */}
      {floatingIcons.map(({ Icon, pos, delay }) => (
        <motion.div
          key={pos}
          className={`absolute ${pos} z-[3] pointer-events-none`}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1, y: [-6, 6, -6] } : {}}
          transition={{ opacity: { duration: 0.5 }, y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay } }}
        >
          <Icon className="w-6 h-6" strokeWidth={1.5} style={{ color: "hsl(190 80% 55% / 0.5)" }} />
        </motion.div>
      ))}

      {/* Glow orbs */}
      <div
        className="absolute top-[20%] left-[15%] w-[500px] h-[500px] rounded-full z-[2] pointer-events-none"
        style={{ background: "radial-gradient(circle, hsl(190 80% 55% / 0.12), transparent 70%)", filter: "blur(40px)" }}
      />
      <div
        className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] rounded-full z-[2] pointer-events-none"
        style={{ background: "radial-gradient(circle, hsl(255 70% 55% / 0.12), transparent 70%)", filter: "blur(50px)" }}
      />

      <div className="container max-w-5xl mx-auto px-6 text-center relative z-10">
        <div>
          <motion.div
            className="inline-flex items-center gap-2 border px-4 py-2 mb-10 rounded-full"
            style={{ borderColor: "hsl(190 80% 55% / 0.3)", background: "hsl(240 15% 10% / 0.7)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "hsl(190 80% 55%)" }} />
            <span className="font-display text-xs tracking-wider uppercase" style={{ color: "hsl(190 80% 55% / 0.8)" }}>
              Advanced AI Detection
            </span>
          </motion.div>

          {/* Word-by-word slideshow headline */}
          <h2 className="font-calligraphy text-5xl md:text-7xl lg:text-8xl tracking-tight leading-[1.1] mb-8" style={{ color: "hsl(0 0% 95%)" }}>
            {words.map((word, i) => (
              <motion.span
                key={i}
                className="inline-block mr-[0.3em]"
                style={
                  word === "truth," || word === "appearances."
                    ? {
                        backgroundImage: "linear-gradient(135deg, hsl(190 80% 60%), hsl(255 70% 60%), hsl(200 80% 60%))",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        filter: "drop-shadow(0 0 20px hsl(190 80% 55% / 0.4))",
                      }
                    : { color: "hsl(0 0% 95%)", textShadow: "0 2px 20px hsl(0 0% 0% / 0.5)" }
                }
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.2, ease: [0.42, 0, 0.58, 1] }}
              >
                {word}
              </motion.span>
            ))}
          </h2>

          <motion.p
            className="text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed font-body"
            style={{ color: "hsl(0 0% 75%)", textShadow: "0 1px 10px hsl(0 0% 0% / 0.5)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 1.8 }}
          >
            DeepTrust uses multi-layered neural analysis to distinguish between
            organic capture and synthetic generation in real-time.
          </motion.p>

          <motion.div
            className="flex items-center justify-center gap-6 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 2.0 }}
          >
            <a
              href="https://deeptrust-sandy.vercel.app/"
              className="relative bg-primary text-primary-foreground px-8 py-4 font-display text-sm tracking-wider hover:opacity-90 transition-opacity duration-150 uppercase rounded-lg shadow-deep inline-block"
            >
              <span
                className="absolute inset-0 rounded-lg pointer-events-none animate-pulse-glow"
                style={{ border: "2px solid hsl(255 70% 55% / 0.5)" }}
              />
              Start Free Trial
            </a>
            <button className="border px-8 py-4 font-display text-sm tracking-wider transition-opacity duration-150 hover:opacity-80 uppercase rounded-lg"
              style={{ borderColor: "hsl(190 80% 55% / 0.3)", color: "hsl(0 0% 85%)", background: "hsl(240 15% 10% / 0.6)" }}>
              View Demo
            </button>
          </motion.div>

          <motion.div
            className="flex justify-center gap-16"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 2.2 }}
          >
            {[
              { value: "99.8%", label: "Accuracy" },
              { value: "40ms", label: "Latency" },
              { value: "Enterprise", label: "Grade" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-display text-3xl tabular-nums" style={{ color: "hsl(0 0% 95%)", textShadow: "0 0 15px hsl(190 80% 55% / 0.3)" }}>{stat.value}</div>
                <div className="text-xs uppercase tracking-wider mt-1" style={{ color: "hsl(190 80% 55% / 0.6)" }}>{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroQuote;
