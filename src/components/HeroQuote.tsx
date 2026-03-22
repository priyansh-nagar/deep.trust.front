import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Image, Mic, ScanEye, AudioLines } from "lucide-react";
import labVideo from "../../public/lab-robots.mp4.asset.json";

const words = ["Trust", "is", "no", "longer", "a", "default", "—", "it's", "a", "calculation."];

const floatingIcons = [
  { Icon: Image, pos: "top-[12%] left-[8%]", delay: 0 },
  { Icon: Mic, pos: "top-[10%] right-[10%]", delay: 0.5 },
  { Icon: ScanEye, pos: "bottom-[14%] left-[6%]", delay: 1 },
  { Icon: AudioLines, pos: "bottom-[12%] right-[8%]", delay: 1.5 },
];

const HeroQuote = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0.1, 0.35, 0.65, 0.9], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0.1, 0.35, 0.65, 0.9], [80, 0, 0, -80]);
  const scale = useTransform(scrollYProgress, [0.1, 0.35, 0.65, 0.9], [0.9, 1, 1, 0.95]);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-[0]"
        src={labVideo.url}
      />

      {/* Dark overlay for text readability — semi-transparent so video shows through */}
      <div className="absolute inset-0 z-[1]"
        style={{ background: "linear-gradient(180deg, hsl(240 15% 4% / 0.7) 0%, hsl(240 15% 6% / 0.6) 50%, hsl(240 15% 4% / 0.75) 100%)" }} />

      {/* Cyan tint overlay for color matching */}
      <div className="absolute inset-0 z-[1] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, hsl(190 80% 50% / 0.08), transparent 70%)" }} />

      {/* Floating corner icons — brighter */}
      {floatingIcons.map(({ Icon, pos, delay }) => (
        <motion.div
          key={pos}
          className={`absolute ${pos} z-[3] pointer-events-none`}
          animate={{ y: [-8, 8, -8] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay }}
        >
          <Icon className="w-6 h-6" strokeWidth={1.5} style={{ color: "hsl(190 80% 55% / 0.5)" }} />
        </motion.div>
      ))}

      {/* Visible glow orbs */}
      <motion.div
        className="absolute top-[20%] left-[15%] w-[500px] h-[500px] rounded-full z-[2] pointer-events-none"
        style={{ background: "radial-gradient(circle, hsl(190 80% 55% / 0.15), transparent 70%)", filter: "blur(40px)" }}
        animate={{ y: [-20, 20, -20], x: [-10, 10, -10] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] rounded-full z-[2] pointer-events-none"
        style={{ background: "radial-gradient(circle, hsl(255 70% 55% / 0.15), transparent 70%)", filter: "blur(50px)" }}
        animate={{ y: [15, -15, 15], x: [8, -8, 8] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container max-w-5xl mx-auto px-6 text-center relative z-10">
        <motion.div style={{ opacity, y, scale }}>
          <motion.div className="inline-flex items-center gap-2 border px-4 py-2 mb-10 rounded-full"
            style={{ borderColor: "hsl(190 80% 55% / 0.3)", background: "hsl(240 15% 10% / 0.7)", backdropFilter: "blur(10px)" }}>
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "hsl(190 80% 55%)" }} />
            <span className="font-display text-xs tracking-wider uppercase" style={{ color: "hsl(190 80% 55% / 0.8)" }}>
              Advanced AI Detection
            </span>
          </motion.div>

          {/* Word-by-word animated headline */}
          <h2 className="font-calligraphy text-5xl md:text-7xl lg:text-8xl tracking-tight leading-[0.95] mb-8" style={{ color: "hsl(0 0% 95%)" }}>
            {words.map((word, i) => (
              <motion.span
                key={i}
                className="inline-block mr-[0.3em]"
                style={
                  word === "calculation."
                    ? {
                        backgroundImage: "linear-gradient(135deg, hsl(190 80% 60%), hsl(255 70% 60%), hsl(200 80% 60%))",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        filter: "drop-shadow(0 0 20px hsl(190 80% 55% / 0.4))",
                      }
                    : { color: "hsl(0 0% 95%)", textShadow: "0 2px 20px hsl(0 0% 0% / 0.5)" }
                }
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.15, ease: [0.42, 0, 0.58, 1] }}
              >
                {word}
                {(word === "no" || word === "a" && i === 4) ? <br className="hidden md:inline" /> : null}
              </motion.span>
            ))}
          </h2>

          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed font-body" style={{ color: "hsl(0 0% 75%)", textShadow: "0 1px 10px hsl(0 0% 0% / 0.5)" }}>
            DeepTrust uses multi-layered neural analysis to distinguish between
            organic capture and synthetic generation in real-time.
          </p>

          <div className="flex items-center justify-center gap-6 mb-16">
            <motion.a
              href="https://deeptrust-sandy.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="relative bg-primary text-primary-foreground px-8 py-4 font-display text-sm tracking-wider hover:opacity-90 transition-all duration-150 uppercase rounded-lg shadow-deep inline-block"
              whileHover={{ scale: 1.03 }}
            >
              <motion.span
                className="absolute inset-0 rounded-lg pointer-events-none"
                style={{ border: "2px solid hsl(255 70% 55% / 0.5)" }}
                animate={{ scale: [1, 1.15, 1], opacity: [0.7, 0, 0.7] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
              Start Free Trial
            </motion.a>
            <button className="border px-8 py-4 font-display text-sm tracking-wider transition-all duration-150 uppercase rounded-lg"
              style={{ borderColor: "hsl(190 80% 55% / 0.3)", color: "hsl(0 0% 85%)", background: "hsl(240 15% 10% / 0.6)", backdropFilter: "blur(10px)" }}>
              View Demo
            </button>
          </div>

          <div className="flex justify-center gap-16">
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
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroQuote;
