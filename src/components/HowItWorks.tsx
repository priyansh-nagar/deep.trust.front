import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const steps = [
  { num: "01", title: "Upload Media", desc: "Upload your video or image files securely through our platform or API." },
  { num: "02", title: "AI Analysis", desc: "Our advanced AI models analyze facial features, artifacts, and inconsistencies." },
  { num: "03", title: "Get Results", desc: "Receive detailed reports with confidence scores and manipulation indicators." },
  { num: "04", title: "Export & Share", desc: "Download reports, export data, and share results with your team." },
];

const HowItWorks = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="py-[20vh] relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, hsl(240 15% 5%) 0%, hsl(250 20% 10%) 50%, hsl(240 15% 5%) 100%)" }}
    >
      {/* Color accents */}
      <div className="absolute top-[10%] right-[5%] w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, hsl(255 70% 55% / 0.07), transparent 65%)", filter: "blur(60px)" }} />
      <div className="absolute bottom-[10%] left-[5%] w-[450px] h-[450px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, hsl(190 80% 55% / 0.06), transparent 65%)", filter: "blur(55px)" }} />
      <div className="absolute top-[40%] left-[40%] w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, hsl(320 50% 40% / 0.05), transparent 60%)", filter: "blur(70px)" }} />

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

      <div className="container max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-16">
          {isInView && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.42, 0, 0.58, 1] }}
            >
              <span className="font-display text-xs tracking-widest uppercase block mb-4"
                style={{ color: "hsl(190 80% 55% / 0.6)" }}>
                // Process
              </span>
              <h2 className="font-calligraphy text-4xl md:text-6xl tracking-tight" style={{ color: "hsl(0 0% 93%)" }}>
                Four steps to <span style={{ color: "hsl(255 70% 55%)", textShadow: "0 0 30px hsl(255 70% 55% / 0.3)" }}>verification</span>
              </h2>
            </motion.div>
          )}
        </div>

        <div className="grid md:grid-cols-4 gap-4">
          {steps.map((s, i) => (
            <div
              key={s.num}
              className="p-8 relative group overflow-hidden rounded-lg border cursor-default transition-shadow transition-colors duration-300"
              style={{
                background: "linear-gradient(135deg, hsl(240 18% 12%) 0%, hsl(240 15% 8%) 100%)",
                borderColor: "hsl(240 10% 20%)",
                opacity: isInView ? 1 : 0,
                transform: isInView ? "translateY(0)" : "translateY(40px)",
                transition: `opacity 0.5s ${0.2 + i * 0.12}s ease, transform 0.5s ${0.2 + i * 0.12}s ease`,
              }}
            >
              <div
                className="font-calligraphy text-7xl mb-6 font-bold"
                style={{
                  color: "hsl(255 70% 65% / 0.35)",
                  textShadow: "0 0 30px hsl(255 70% 55% / 0.15)",
                }}
              >
                {s.num}
              </div>
              <h3 className="font-display text-sm tracking-tight mb-3" style={{ color: "hsl(0 0% 90%)" }}>{s.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "hsl(240 6% 55%)" }}>{s.desc}</p>
              <div className="absolute bottom-0 left-0 right-0 h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                style={{ background: "linear-gradient(90deg, hsl(190 80% 55%), hsl(255 70% 55%))" }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
