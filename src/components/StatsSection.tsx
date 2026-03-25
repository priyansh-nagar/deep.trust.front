import { useRef, useEffect, useState } from "react";
import { useInView } from "framer-motion";

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
    const duration = 1400;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Number((eased * target).toFixed(target % 1 !== 0 ? 1 : 0)));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target]);

  return <>{count}{suffix}</>;
};

const StatsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      id="results"
      ref={sectionRef}
      className="py-[15vh] relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, hsl(240 15% 5%) 0%, hsl(250 22% 11%) 50%, hsl(240 15% 5%) 100%)" }}
    >
      {/* Color accents */}
      <div className="absolute top-[15%] left-[15%] w-[450px] h-[450px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, hsl(190 80% 55% / 0.07), transparent 65%)", filter: "blur(55px)" }} />
      <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, hsl(255 70% 55% / 0.07), transparent 65%)", filter: "blur(55px)" }} />
      <div className="absolute top-[50%] right-[30%] w-[350px] h-[350px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, hsl(320 50% 40% / 0.05), transparent 60%)", filter: "blur(60px)" }} />

      {/* White constellation pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.18]"
        style={{
          backgroundImage: `radial-gradient(1.5px 1.5px at 20px 30px, hsl(0 0% 100%) 50%, transparent 50%),
            radial-gradient(1px 1px at 80px 60px, hsl(0 0% 100%) 50%, transparent 50%),
            radial-gradient(1.5px 1.5px at 140px 120px, hsl(0 0% 100%) 50%, transparent 50%),
            radial-gradient(1px 1px at 200px 80px, hsl(0 0% 100%) 50%, transparent 50%),
            radial-gradient(2px 2px at 60px 150px, hsl(0 0% 100%) 50%, transparent 50%),
            radial-gradient(1px 1px at 180px 20px, hsl(0 0% 100%) 50%, transparent 50%),
            radial-gradient(1.5px 1.5px at 100px 180px, hsl(0 0% 100%) 50%, transparent 50%),
            radial-gradient(1px 1px at 240px 160px, hsl(0 0% 100%) 50%, transparent 50%)`,
          backgroundSize: "260px 200px",
        }} />

      {/* Top/bottom accent lines */}
      <div className="absolute top-0 left-0 right-0 h-[1px]"
        style={{ background: "linear-gradient(90deg, transparent, hsl(190 80% 55% / 0.2), hsl(255 70% 55% / 0.15), transparent)" }} />
      <div className="absolute bottom-0 left-0 right-0 h-[1px]"
        style={{ background: "linear-gradient(90deg, transparent, hsl(255 70% 55% / 0.15), hsl(190 80% 55% / 0.2), transparent)" }} />

      <div className="container max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="text-center py-8 rounded-lg border cursor-default transition-shadow duration-300 hover:shadow-lg"
              style={{
                background: "linear-gradient(135deg, hsl(240 18% 12%) 0%, hsl(240 15% 8%) 100%)",
                borderColor: "hsl(240 10% 20%)",
                opacity: isInView ? 1 : 0,
                transform: isInView ? "scale(1)" : "scale(0.93)",
                transition: `opacity 0.5s ${i * 0.1}s ease, transform 0.5s ${i * 0.1}s ease`,
              }}
            >
              <div className="font-calligraphy text-5xl mb-2 tabular-nums" style={{ color: "hsl(0 0% 95%)" }}>
                <CountUp target={s.numericValue} suffix={s.suffix} inView={isInView} />
              </div>
              <div className="font-display text-xs tracking-widest uppercase mb-1" style={{ color: "hsl(190 80% 55%)" }}>{s.label}</div>
              <div className="text-xs" style={{ color: "hsl(240 6% 50%)" }}>{s.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
