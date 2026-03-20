import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

const stats = [
  { value: "99.7%", label: "Detection Accuracy", sub: "Industry-leading precision" },
  { value: "250+", label: "Active Users", sub: "Organizations trusting us" },
  { value: "5K+", label: "Files Analyzed", sub: "Images scanned to date" },
  { value: "24/7", label: "Support Available", sub: "Always-on monitoring" },
];

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
              className="text-center py-8 bg-card rounded-lg border border-border"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.2, 0, 0, 1] }}
            >
              <motion.div
                className="font-calligraphy text-5xl text-foreground mb-2"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.12, type: "spring", stiffness: 200 }}
              >
                {s.value}
              </motion.div>
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
