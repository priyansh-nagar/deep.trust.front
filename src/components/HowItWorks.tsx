import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import mirrorVideo from "../../public/mirror-robot.mp4.asset.json";

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
        style={{ background: "linear-gradient(180deg, hsl(240 15% 4% / 0.75) 0%, hsl(240 15% 6% / 0.65) 50%, hsl(240 15% 4% / 0.70) 100%)" }} />

      {/* Grid overlay */}
      <div className="absolute inset-0 z-[1] opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(hsl(255 70% 55%) 1px, transparent 1px), linear-gradient(90deg, hsl(255 70% 55%) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }} />

      <div className="container max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
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

        <div className="grid md:grid-cols-4 gap-4">
          {steps.map((s, i) => (
            <motion.div
              key={s.num}
              className="p-8 relative group overflow-hidden rounded-lg border cursor-default"
              style={{
                background: "hsl(240 15% 14% / 0.7)",
                borderColor: "hsl(240 10% 22%)",
              }}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.12, ease: [0.42, 0, 0.58, 1] }}
              whileHover={{
                boxShadow: "0 12px 40px -4px hsl(255 70% 55% / 0.2)",
                borderColor: "hsl(255 70% 55% / 0.3)",
                transition: { duration: 0.3 },
              }}
            >
              <div
                className="font-calligraphy text-7xl mb-6 font-bold"
                style={{
                  color: "transparent",
                  WebkitTextStroke: "1.5px hsl(190 80% 55% / 0.5)",
                  textShadow: "0 0 40px hsl(190 80% 55% / 0.15)",
                }}
              >
                {s.num}
              </div>
              <h3 className="font-display text-sm tracking-tight mb-3" style={{ color: "hsl(0 0% 90%)" }}>{s.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "hsl(240 6% 55%)" }}>{s.desc}</p>
              <div className="absolute bottom-0 left-0 right-0 h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                style={{ background: "linear-gradient(90deg, hsl(190 80% 55%), hsl(255 70% 55%))" }} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
