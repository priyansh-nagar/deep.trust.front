import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const HeroQuote = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0.1, 0.35, 0.65, 0.9], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0.1, 0.35, 0.65, 0.9], [80, 0, 0, -80]);
  const scale = useTransform(scrollYProgress, [0.1, 0.35, 0.65, 0.9], [0.9, 1, 1, 0.95]);
  const glowOpacity = useTransform(scrollYProgress, [0.2, 0.4, 0.6, 0.8], [0, 1, 1, 0]);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-background" />
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          opacity: glowOpacity,
          background: "radial-gradient(circle, hsl(255 70% 55% / 0.06) 0%, transparent 70%)",
        }}
      />

      <div className="container max-w-5xl mx-auto px-6 text-center relative z-10">
        <motion.div style={{ opacity, y, scale }}>
          <motion.div className="inline-flex items-center gap-2 border border-border px-4 py-2 mb-10 rounded-full bg-card">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="font-display text-xs tracking-wider text-muted-foreground uppercase">
              Advanced AI Detection
            </span>
          </motion.div>

          <h2 className="font-calligraphy text-5xl md:text-7xl lg:text-8xl tracking-tight leading-[0.95] mb-8">
            <span className="text-foreground">Trust is no</span>
            <br />
            <span className="text-foreground">longer a </span>
            <span
              className="text-transparent bg-clip-text"
              style={{
                backgroundImage: "linear-gradient(135deg, hsl(255 70% 55%), hsl(280 60% 50%), hsl(200 80% 55%))",
              }}
            >
              default.
            </span>
          </h2>

          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed font-body">
            DeepTrust uses multi-layered neural analysis to distinguish between
            organic capture and synthetic generation in real-time.
          </p>

          <div className="flex items-center justify-center gap-6 mb-16">
            <a href="https://deeptrust-sandy.vercel.app/" target="_blank" rel="noopener noreferrer" className="bg-primary text-primary-foreground px-8 py-4 font-display text-sm tracking-wider hover:opacity-90 transition-all duration-150 uppercase rounded-lg shadow-deep inline-block">
              Start Free Trial
            </a>
            <button className="border border-border px-8 py-4 font-display text-sm tracking-wider text-muted-foreground hover:border-foreground hover:text-foreground transition-all duration-150 uppercase rounded-lg bg-card">
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
                <div className="font-display text-3xl tabular-nums text-foreground">{stat.value}</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroQuote;
