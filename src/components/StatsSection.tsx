import { useRef, useEffect, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import mirrorVideo from "../../public/mirror-robot.mp4.asset.json";

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
    <section
      id="results"
      ref={sectionRef}
      className="py-[15vh] relative overflow-hidden"
    >
      {/* Video background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-[0]"
        src={mirrorVideo.url}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 z-[1]"
        style={{ background: "linear-gradient(180deg, hsl(240 15% 4% / 0.78) 0%, hsl(240 15% 6% / 0.68) 50%, hsl(240 15% 4% / 0.75) 100%)" }} />

      <motion.div
        className="absolute top-0 left-0 h-[1px] z-[2]"
        style={{ width: lineWidth, background: "linear-gradient(90deg, hsl(190 80% 55% / 0.5), hsl(255 70% 55% / 0.3))" }}
      />
      <motion.div
        className="absolute bottom-0 right-0 h-[1px] z-[2]"
        style={{ width: lineWidth, background: "linear-gradient(90deg, hsl(255 70% 55% / 0.3), hsl(190 80% 55% / 0.5))" }}
      />

      <div className="container max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              className="text-center py-8 rounded-lg border cursor-default"
              style={{
                background: "hsl(240 15% 10% / 0.8)",
                borderColor: "hsl(240 10% 20%)",
              }}
              initial={{ opacity: 0, scale: 0.93 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.42, 0, 0.58, 1] }}
              whileHover={{
                boxShadow: "0 12px 40px -4px hsl(190 80% 55% / 0.2), 0 0 20px hsl(190 80% 55% / 0.08)",
                borderColor: "hsl(190 80% 55% / 0.25)",
                transition: { duration: 0.3 },
              }}
            >
              <div className="font-calligraphy text-5xl mb-2 tabular-nums" style={{ color: "hsl(0 0% 95%)" }}>
                <CountUp target={s.numericValue} suffix={s.suffix} inView={isInView} />
              </div>
              <div className="font-display text-xs tracking-widest uppercase mb-1" style={{ color: "hsl(190 80% 55%)" }}>{s.label}</div>
              <div className="text-xs" style={{ color: "hsl(240 6% 50%)" }}>{s.sub}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
