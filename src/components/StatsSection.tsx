import { useRef, useEffect, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

const stats = [
  { value: "99.7%", numericValue: 99.7, suffix: "%", label: "Detection Accuracy", sub: "Industry-leading precision" },
  { value: "250+", numericValue: 250, suffix: "+", label: "Active Users", sub: "Organizations trusting us" },
  { value: "5K+", numericValue: 5, suffix: "K+", label: "Files Analyzed", sub: "Images scanned to date" },
  { value: "24/7", numericValue: 24, suffix: "/7", label: "Support Available", sub: "Always-on monitoring" },
];

const CountUp = ({ target, suffix, inView }: { target: number; suffix: string; inView: boolean }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1400;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // spring-like easing
      const eased = 1 - Math.pow(1 - progress, 3);
      start = eased * target;
      setCount(Number(start.toFixed(target % 1 !== 0 ? 1 : 0)));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target]);

  return <>{count}{suffix}</>;
};

const StatsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const lineWidth = useTransform(scrollYProgress, [0.2, 0.6], ["0%", "100%"]);

  return (
    <section id="results" ref={sectionRef} className="py-[15vh] relative">
      <motion.div
        className="absolute top-0 left-0 h-[1px] bg-primary/30"
        style={{ width: lineWidth }}
      />
      <motion.div
        className="absolute bottom-0 right-0 h-[1px] bg-primary/30"
        style={{ width: lineWidth }}
      />

      <div className="container max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              className="text-center py-8 bg-card rounded-lg border border-border transition-all duration-[400ms] ease-in-out cursor-default"
              initial={{ opacity: 0, scale: 0.93 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.42, 0, 0.58, 1] }}
              whileHover={{
                y: -5,
                boxShadow: "0 8px 24px -4px hsl(255 70% 55% / 0.15), 0 2px 8px hsl(255 70% 55% / 0.08)",
              }}
            >
              <div className="font-calligraphy text-5xl text-foreground mb-2 tabular-nums">
                <CountUp target={s.numericValue} suffix={s.suffix} inView={isInView} />
              </div>
              <div className="font-display text-xs tracking-widest text-primary uppercase mb-1">{s.label}</div>
              <div className="text-xs text-muted-foreground">{s.sub}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
