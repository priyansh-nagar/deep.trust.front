import { useRef, useEffect } from "react";
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

// Cinematic flowing particle/data-stream canvas background
const useFlowCanvas = (canvasRef: React.RefObject<HTMLCanvasElement | null>) => {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const dpr = window.devicePixelRatio || 1;

    const resize = () => {
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
    };
    resize();
    window.addEventListener("resize", resize);

    // Flowing particles — horizontal data streams
    interface Particle {
      x: number; y: number; vx: number; vy: number;
      size: number; opacity: number; hue: number; trail: { x: number; y: number }[];
    }

    const particles: Particle[] = [];
    const count = 80;

    const spawnParticle = (): Particle => {
      const fromLeft = Math.random() > 0.3;
      return {
        x: fromLeft ? -10 : canvas.width + 10,
        y: Math.random() * canvas.height,
        vx: (fromLeft ? 1 : -1) * (0.3 + Math.random() * 1.2) * dpr,
        vy: (Math.random() - 0.5) * 0.3 * dpr,
        size: (1 + Math.random() * 2) * dpr,
        opacity: 0.15 + Math.random() * 0.5,
        hue: Math.random() > 0.6 ? 255 : 190, // cyan or violet
        trail: [],
      };
    };

    for (let i = 0; i < count; i++) {
      const p = spawnParticle();
      p.x = Math.random() * canvas.width;
      particles.push(p);
    }

    // Vertical scan lines
    let scanOffset = 0;

    // Hexagonal grid points for connections
    const gridNodes: { x: number; y: number; pulse: number }[] = [];
    for (let gx = 0; gx < 12; gx++) {
      for (let gy = 0; gy < 8; gy++) {
        gridNodes.push({
          x: (gx / 11) * canvas.width,
          y: (gy / 7) * canvas.height + (gx % 2 === 0 ? 0 : canvas.height / 14),
          pulse: Math.random() * Math.PI * 2,
        });
      }
    }

    let time = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.016;

      // --- Layer 1: Faint grid connections that pulse ---
      const maxConn = 180 * dpr;
      for (let i = 0; i < gridNodes.length; i++) {
        const a = gridNodes[i];
        const pulseA = 0.03 + Math.sin(time * 0.8 + a.pulse) * 0.02;
        // Draw node dot
        ctx.fillStyle = `hsla(190, 80%, 55%, ${pulseA * 2})`;
        ctx.beginPath();
        ctx.arc(a.x, a.y, 1.5 * dpr, 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < gridNodes.length; j++) {
          const b = gridNodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxConn) {
            const lineAlpha = pulseA * (1 - dist / maxConn);
            ctx.strokeStyle = `hsla(190, 70%, 50%, ${lineAlpha})`;
            ctx.lineWidth = 0.5 * dpr;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // --- Layer 2: Flowing particles with trails ---
      for (const p of particles) {
        p.trail.push({ x: p.x, y: p.y });
        if (p.trail.length > 12) p.trail.shift();

        p.x += p.vx;
        p.y += p.vy + Math.sin(time * 2 + p.x * 0.005) * 0.15 * dpr;

        // Draw trail
        if (p.trail.length > 1) {
          for (let t = 1; t < p.trail.length; t++) {
            const trailAlpha = (t / p.trail.length) * p.opacity * 0.4;
            ctx.strokeStyle = `hsla(${p.hue}, 80%, 55%, ${trailAlpha})`;
            ctx.lineWidth = p.size * 0.5;
            ctx.beginPath();
            ctx.moveTo(p.trail[t - 1].x, p.trail[t - 1].y);
            ctx.lineTo(p.trail[t].x, p.trail[t].y);
            ctx.stroke();
          }
        }

        // Draw particle
        ctx.fillStyle = `hsla(${p.hue}, 80%, 60%, ${p.opacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Glow
        ctx.fillStyle = `hsla(${p.hue}, 80%, 55%, ${p.opacity * 0.15})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2);
        ctx.fill();

        // Reset if off-screen
        if (p.x < -50 || p.x > canvas.width + 50 || p.y < -50 || p.y > canvas.height + 50) {
          Object.assign(p, spawnParticle());
        }
      }

      // --- Layer 3: Vertical scan sweep ---
      scanOffset = (scanOffset + 0.003) % 1;
      const scanX = scanOffset * canvas.width;
      const scanGrad = ctx.createLinearGradient(scanX - 80 * dpr, 0, scanX + 80 * dpr, 0);
      scanGrad.addColorStop(0, "hsla(190, 80%, 55%, 0)");
      scanGrad.addColorStop(0.5, "hsla(190, 80%, 55%, 0.06)");
      scanGrad.addColorStop(1, "hsla(190, 80%, 55%, 0)");
      ctx.fillStyle = scanGrad;
      ctx.fillRect(scanX - 80 * dpr, 0, 160 * dpr, canvas.height);

      // --- Layer 4: Horizontal data lines (like flowing code) ---
      for (let line = 0; line < 5; line++) {
        const ly = (canvas.height * (line + 1)) / 6;
        const lineProgress = ((time * 0.5 + line * 0.7) % 3) / 3;
        const lineX = lineProgress * canvas.width;
        const lineWidth = 120 * dpr;

        const lineGrad = ctx.createLinearGradient(lineX - lineWidth, ly, lineX, ly);
        lineGrad.addColorStop(0, "hsla(255, 70%, 55%, 0)");
        lineGrad.addColorStop(0.7, `hsla(255, 70%, 55%, 0.08)`);
        lineGrad.addColorStop(1, "hsla(255, 70%, 55%, 0)");
        ctx.strokeStyle = lineGrad;
        ctx.lineWidth = 1 * dpr;
        ctx.beginPath();
        ctx.moveTo(lineX - lineWidth, ly);
        ctx.lineTo(lineX, ly);
        ctx.stroke();
      }

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, [canvasRef]);
};

const FeaturesGrid = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  useFlowCanvas(canvasRef);

  return (
    <section
      id="features"
      ref={sectionRef}
      className="py-[20vh] relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, hsl(240 15% 5%) 0%, hsl(240 18% 8%) 40%, hsl(240 20% 10%) 70%, hsl(240 15% 6%) 100%)" }}
    >
      {/* Animated canvas background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full z-[1] pointer-events-none"
      />

      {/* Large ambient glow orbs */}
      <motion.div
        className="absolute top-[5%] left-[10%] w-[600px] h-[600px] rounded-full pointer-events-none z-[1]"
        style={{ background: "radial-gradient(circle, hsl(190 80% 50% / 0.1), transparent 70%)", filter: "blur(40px)" }}
        animate={{ y: [-30, 30, -30], x: [-15, 15, -15] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[0%] right-[5%] w-[500px] h-[500px] rounded-full pointer-events-none z-[1]"
        style={{ background: "radial-gradient(circle, hsl(255 70% 55% / 0.12), transparent 70%)", filter: "blur(50px)" }}
        animate={{ y: [20, -20, 20], x: [10, -10, 10] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-[40%] right-[30%] w-[400px] h-[400px] rounded-full pointer-events-none z-[1]"
        style={{ background: "radial-gradient(circle, hsl(220 70% 50% / 0.06), transparent 70%)", filter: "blur(50px)" }}
        animate={{ y: [15, -15, 15] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Subtle grid overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-[2]"
        style={{
          backgroundImage: `linear-gradient(hsl(190 80% 55%) 1px, transparent 1px), linear-gradient(90deg, hsl(190 80% 55%) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }} />

      {/* Dark overlay to ensure text readability */}
      <div className="absolute inset-0 z-[3] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, transparent 30%, hsl(240 15% 5% / 0.5) 100%)" }} />

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
              className="group relative overflow-hidden rounded-lg border cursor-default p-8"
              style={{
                background: "hsl(240 15% 10% / 0.65)",
                borderColor: "hsl(240 10% 18%)",
              }}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.15 + i * 0.1, ease: [0.42, 0, 0.58, 1] }}
              whileHover={{
                scale: 1.02,
                boxShadow: "0 8px 40px -4px hsl(190 80% 50% / 0.25), 0 0 20px hsl(190 80% 50% / 0.1)",
                borderColor: "hsl(190 80% 50% / 0.3)",
                transition: { duration: 0.4, ease: "easeInOut" },
              }}
            >
              {/* Top accent line */}
              <div className="absolute top-0 left-0 right-0 h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-t-lg"
                style={{ background: "linear-gradient(90deg, hsl(190 80% 55%), hsl(255 70% 55%))" }} />

              {/* Card inner glow on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-lg"
                style={{ background: "radial-gradient(ellipse at top, hsl(190 80% 55% / 0.05), transparent 70%)" }} />

              <motion.div
                className="mb-6 relative"
                animate={{
                  rotate: [0, 2, -2, 0],
                  scale: [1, 1.05, 1, 1.05, 1],
                }}
                transition={{
                  duration: 4 + i * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <f.icon
                  className="w-5 h-5"
                  strokeWidth={1.5}
                  style={{ color: "hsl(190 80% 55%)" }}
                />
                {/* Icon glow */}
                <div className="absolute -inset-2 rounded-full opacity-30 group-hover:opacity-60 transition-opacity duration-500"
                  style={{ background: "radial-gradient(circle, hsl(190 80% 55% / 0.3), transparent 70%)" }} />
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
