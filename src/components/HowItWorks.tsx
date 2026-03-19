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
    <section ref={sectionRef} className="py-[20vh]">
      <div className="container max-w-7xl mx-auto px-6">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.2, 0, 0, 1] }}
        >
          <span className="font-display text-xs tracking-widest text-muted-foreground uppercase block mb-4">
            // Process
          </span>
          <h2 className="font-calligraphy text-4xl md:text-6xl tracking-tight text-foreground">
            Four steps to <span className="text-primary text-glow">verification</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-4">
          {steps.map((s, i) => (
            <motion.div
              key={s.num}
              className="bg-card p-8 relative group overflow-hidden border border-border rounded-lg"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.15, ease: [0.2, 0, 0, 1] }}
            >
              <motion.div
                className="font-calligraphy text-6xl text-muted/30 mb-6"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.15, ease: [0.2, 0, 0, 1] }}
              >
                {s.num}
              </motion.div>
              <h3 className="font-display text-sm tracking-tight text-foreground mb-3">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
