import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Brain, Zap, Shield, Layers, FileText, Code } from "lucide-react";

const features = [
  { icon: Brain, title: "AI-Powered Detection", desc: "Advanced neural networks trained on millions of samples to identify even the most sophisticated deepfakes." },
  { icon: Zap, title: "Real-Time Analysis", desc: "Process videos and images in seconds with our optimized detection algorithms for instant results." },
  { icon: Shield, title: "Secure & Private", desc: "Your content is processed with end-to-end encryption and automatically deleted after analysis." },
  { icon: Layers, title: "Batch Processing", desc: "Upload and analyze multiple files simultaneously for efficient large-scale verification." },
  { icon: FileText, title: "Detailed Reports", desc: "Comprehensive analysis with confidence scores, manipulation indicators, and exportable data." },
  { icon: Code, title: "API Integration", desc: "Seamlessly integrate deepfake detection into your existing workflows with our RESTful API." },
];

const FeaturesGrid = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="features"
      ref={sectionRef}
      className="py-[20vh] relative overflow-hidden"
      style={{ background: "hsl(240 15% 8%)" }}
    >
      {/* Ambient glow orbs */}
      <div className="absolute top-[10%] left-[5%] w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, hsl(190 80% 50% / 0.07), transparent 70%)" }} />
      <div className="absolute bottom-[5%] right-[10%] w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, hsl(255 70% 55% / 0.08), transparent 70%)" }} />

      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(hsl(190 80% 55%) 1px, transparent 1px), linear-gradient(90deg, hsl(190 80% 55%) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }} />

      <div className="container max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.2, 0, 0, 1] }}
        >
          <span className="font-display text-xs tracking-widest uppercase block mb-4"
            style={{ color: "hsl(190 80% 55% / 0.6)" }}>
            // Capabilities
          </span>
          <h2 className="font-calligraphy text-4xl md:text-6xl tracking-tight" style={{ color: "hsl(0 0% 93%)" }}>
            Powerful Features for<br />
            <span style={{ color: "hsl(190 80% 55%)", textShadow: "0 0 30px hsl(190 80% 55% / 0.3)" }}>Complete Protection</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              className="group relative overflow-hidden rounded-lg border transition-all duration-[400ms] ease-in-out cursor-default p-8"
              style={{
                background: "hsl(240 15% 12% / 0.8)",
                borderColor: "hsl(240 10% 20%)",
                backdropFilter: "blur(12px)",
              }}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.15 + i * 0.1, ease: [0.42, 0, 0.58, 1] }}
              whileHover={{
                scale: 1.02,
                boxShadow: "0 8px 40px -4px hsl(190 80% 50% / 0.25), 0 0 20px hsl(190 80% 50% / 0.1)",
                borderColor: "hsl(190 80% 50% / 0.3)",
              }}
            >
              {/* Top accent line */}
              <div className="absolute top-0 left-0 right-0 h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-t-lg"
                style={{ background: "linear-gradient(90deg, hsl(190 80% 55%), hsl(255 70% 55%))" }} />

              <motion.div
                className="mb-6"
                whileHover={{
                  rotate: [0, -10, 10, -5, 0],
                  scale: [1, 1.15, 1.15, 1.1, 1],
                  transition: { duration: 0.6, ease: "easeInOut" },
                }}
              >
                <f.icon
                  className="w-5 h-5 transition-all duration-[400ms] ease-in-out"
                  strokeWidth={1.5}
                  style={{ color: "hsl(190 80% 55%)" }}
                />
              </motion.div>
              <h3 className="font-display text-sm tracking-tight mb-3" style={{ color: "hsl(0 0% 90%)" }}>{f.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "hsl(240 6% 55%)" }}>{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesGrid;
