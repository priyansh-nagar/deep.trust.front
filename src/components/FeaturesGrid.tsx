import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Brain, Zap, Shield, Layers, FileText, Code } from "lucide-react";
import labVideo from "../../public/lab-robots.mp4.asset.json";

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
    >
      {/* Video background — same video continues from HeroQuote */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-[0]"
        src={labVideo.url}
      />

      {/* Dark overlay — lets video show through with readable text */}
      <div className="absolute inset-0 z-[1]"
        style={{ background: "linear-gradient(180deg, hsl(240 15% 4% / 0.72) 0%, hsl(240 15% 6% / 0.62) 50%, hsl(240 15% 4% / 0.68) 100%)" }} />

      {/* Cyan tint */}
      <div className="absolute inset-0 z-[1] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, hsl(190 80% 50% / 0.08), transparent 70%)" }} />

      {/* Glow orbs — matching HeroQuote */}
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

      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none z-[2]"
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
            style={{ color: "hsl(190 80% 55% / 0.7)" }}>
            // Capabilities
          </span>
          <h2 className="font-calligraphy text-4xl md:text-6xl tracking-tight" style={{ color: "hsl(0 0% 95%)", textShadow: "0 2px 20px hsl(0 0% 0% / 0.5)" }}>
            Powerful Features for<br />
            <span style={{ color: "hsl(190 80% 60%)", textShadow: "0 0 30px hsl(190 80% 55% / 0.5)" }}>Complete Protection</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              className="group relative overflow-hidden rounded-lg border cursor-default p-8"
              style={{
                background: "hsl(240 15% 8% / 0.7)",
                borderColor: "hsl(190 80% 55% / 0.12)",
                backdropFilter: "blur(12px)",
              }}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.15 + i * 0.1, ease: [0.42, 0, 0.58, 1] }}
              whileHover={{
                scale: 1.02,
                boxShadow: "0 8px 40px -4px hsl(190 80% 50% / 0.3), 0 0 25px hsl(190 80% 50% / 0.15)",
                borderColor: "hsl(190 80% 55% / 0.4)",
                transition: { duration: 0.4, ease: "easeInOut" },
              }}
            >
              {/* Top accent line */}
              <div className="absolute top-0 left-0 right-0 h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-t-lg"
                style={{ background: "linear-gradient(90deg, hsl(190 80% 55%), hsl(255 70% 60%))" }} />

              {/* Card inner glow on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-lg"
                style={{ background: "radial-gradient(ellipse at top, hsl(190 80% 55% / 0.08), transparent 70%)" }} />

              <motion.div
                className="mb-6 relative"
                animate={{
                  rotate: [0, 3, -3, 0],
                  scale: [1, 1.08, 1, 1.08, 1],
                }}
                transition={{
                  duration: 4 + i * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <f.icon
                  className="w-6 h-6"
                  strokeWidth={1.5}
                  style={{ color: "hsl(190 80% 60%)", filter: "drop-shadow(0 0 8px hsl(190 80% 55% / 0.5))" }}
                />
                {/* Icon glow — more visible */}
                <div className="absolute -inset-3 rounded-full opacity-50 group-hover:opacity-80 transition-opacity duration-500"
                  style={{ background: "radial-gradient(circle, hsl(190 80% 55% / 0.35), transparent 70%)" }} />
              </motion.div>
              <h3 className="font-display text-sm tracking-tight mb-3" style={{ color: "hsl(0 0% 93%)", textShadow: "0 1px 8px hsl(0 0% 0% / 0.3)" }}>{f.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "hsl(0 0% 65%)" }}>{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesGrid;
