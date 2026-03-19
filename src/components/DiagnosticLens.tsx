import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import evidenceImg from "@/assets/evidence-grid.jpg";

const DiagnosticLens = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const lensX = useTransform(scrollYProgress, [0.1, 0.9], ["10%", "70%"]);
  const lensY = useTransform(scrollYProgress, [0.1, 0.5, 0.9], ["10%", "40%", "70%"]);
  const scanLineY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={sectionRef} className="relative py-[20vh]">
      <div className="container max-w-7xl mx-auto px-6 mb-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.2, 0, 0, 1] }}
          viewport={{ once: true }}
        >
          <span className="font-display text-xs tracking-widest text-muted-foreground uppercase block mb-4">
            // How it works
          </span>
          <h2 className="font-display text-4xl md:text-6xl tracking-tighter text-foreground mb-4">
            The Diagnostic <span className="text-primary">Lens</span>
          </h2>
          <p className="text-muted-foreground max-w-xl text-lg">
            Our multi-layer neural scanner examines every pixel, exposing hidden
            artifacts, metadata anomalies, and generation fingerprints.
          </p>
        </motion.div>
      </div>

      {/* Evidence grid with floating lens */}
      <div className="relative mx-auto max-w-7xl px-6 overflow-hidden">
        <div className="relative border border-border overflow-hidden" style={{ height: '60vh' }}>
          {/* Background evidence image */}
          <img
            src={evidenceImg}
            alt="Evidence grid"
            className="w-full h-full object-cover opacity-60"
          />

          {/* The floating glass lens */}
          <motion.div
            className="absolute w-[280px] h-[280px] glass-lens z-10 pointer-events-none overflow-hidden"
            style={{
              left: lensX,
              top: lensY,
            }}
          >
            {/* Inner scanning line */}
            <motion.div
              className="absolute inset-x-0 h-[1px] scanning-line z-20"
              style={{ top: scanLineY }}
            />

            {/* Heatmap overlay effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-destructive/20 mix-blend-overlay" />

            {/* Corner brackets */}
            <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-primary/60" />
            <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-primary/60" />
            <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-primary/60" />
            <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-primary/60" />

            {/* Label */}
            <div className="absolute bottom-4 left-4 right-4">
              <div className="font-display text-[9px] tracking-widest text-primary uppercase">
                Anomaly Detected
              </div>
              <div className="font-display text-[9px] tracking-wider text-muted-foreground mt-1">
                Confidence: 97.3% — GAN Artifact
              </div>
            </div>
          </motion.div>

          {/* Grid overlay */}
          <div className="absolute inset-0 opacity-[0.04]" style={{
            backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }} />
        </div>
      </div>
    </section>
  );
};

export default DiagnosticLens;
