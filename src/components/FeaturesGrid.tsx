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
      className="py-[20vh] relative"
      style={{ background: "hsl(240 20% 99%)" }}
    >
      <div className="container max-w-7xl mx-auto px-6">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.2, 0, 0, 1] }}
        >
          <span className="font-display text-xs tracking-widest text-muted-foreground uppercase block mb-4">
            // Capabilities
          </span>
          <h2 className="font-calligraphy text-4xl md:text-6xl tracking-tight text-foreground">
            Powerful Features for<br />
            <span className="text-primary text-glow">Complete Protection</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              className="bg-card p-8 group relative overflow-hidden border border-border rounded-lg transition-all duration-[400ms] ease-in-out hover:scale-[1.02]"
              style={{
                transitionProperty: "transform, box-shadow",
              }}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.15 + i * 0.1, ease: [0.42, 0, 0.58, 1] }}
              whileHover={{
                boxShadow: "0 8px 32px -4px hsl(190 80% 50% / 0.2), 0 4px 16px -2px hsl(190 80% 50% / 0.1)",
              }}
            >
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-t-lg" />
              <motion.div
                className="mb-6"
                whileHover={{
                  rotate: [0, -10, 10, -5, 0],
                  scale: [1, 1.15, 1.15, 1.1, 1],
                  transition: { duration: 0.6, ease: "easeInOut" },
                }}
              >
                <f.icon
                  className="w-5 h-5 text-primary group-hover:drop-shadow-[0_0_10px_hsl(190_80%_50%/0.5)] transition-all duration-[400ms] ease-in-out"
                  strokeWidth={1.5}
                />
              </motion.div>
              <h3 className="font-display text-sm tracking-tight text-foreground mb-3">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesGrid;
