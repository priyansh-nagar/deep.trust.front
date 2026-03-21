import { useRef, useEffect, useCallback } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Image, Mic, ScanEye, AudioLines } from "lucide-react";

const words = ["Trust", "is", "no", "longer", "a", "default", "—", "it's", "a", "calculation."];

const floatingIcons = [
  { Icon: Image, pos: "top-[12%] left-[8%]", delay: 0 },
  { Icon: Mic, pos: "top-[10%] right-[10%]", delay: 0.5 },
  { Icon: ScanEye, pos: "bottom-[14%] left-[6%]", delay: 1 },
  { Icon: AudioLines, pos: "bottom-[12%] right-[8%]", delay: 1.5 },
];

// Simple neural network canvas
const useNeuralCanvas = (canvasRef: React.RefObject<HTMLCanvasElement | null>) => {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const nodes: { x: number; y: number; vx: number; vy: number }[] = [];
    const count = 40;

    const resize = () => {
      canvas.width = canvas.offsetWidth * (window.devicePixelRatio || 1);
      canvas.height = canvas.offsetHeight * (window.devicePixelRatio || 1);
    };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < count; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const maxDist = 150 * (window.devicePixelRatio || 1);

      // lines
      for (let i = 0; i < count; i++) {
        for (let j = i + 1; j < count; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDist) {
            ctx.strokeStyle = `hsla(190, 80%, 55%, ${0.12 * (1 - dist / maxDist)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // nodes
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
        ctx.fillStyle = "hsla(190, 80%, 55%, 0.25)";
        ctx.beginPath();
        ctx.arc(n.x, n.y, 2, 0, Math.PI * 2);
        ctx.fill();
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

const HeroQuote = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useNeuralCanvas(canvasRef);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0.1, 0.35, 0.65, 0.9], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0.1, 0.35, 0.65, 0.9], [80, 0, 0, -80]);
  const scale = useTransform(scrollYProgress, [0.1, 0.35, 0.65, 0.9], [0.9, 1, 1, 0.95]);
  const glowOpacity = useTransform(scrollYProgress, [0.2, 0.4, 0.6, 0.8], [0, 1, 1, 0]);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "hsl(240 15% 6%)" }}>
      <div className="absolute inset-0" style={{ background: "hsl(240 15% 6%)" }} />

      {/* Neural network canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full z-[1] pointer-events-none"
      />

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(hsl(190 80% 55%) 1px, transparent 1px), linear-gradient(90deg, hsl(190 80% 55%) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Blurred color orbs */}
      {[
        { color: "hsl(190 80% 55% / 0.08)", x: "20%", y: "30%", size: 400, dur: 8 },
        { color: "hsl(230 70% 50% / 0.06)", x: "70%", y: "60%", size: 350, dur: 10 },
        { color: "hsl(270 60% 55% / 0.07)", x: "50%", y: "20%", size: 300, dur: 12 },
      ].map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full z-[1] pointer-events-none"
          style={{
            left: orb.x,
            top: orb.y,
            width: orb.size,
            height: orb.size,
            background: `radial-gradient(circle, ${orb.color}, transparent 70%)`,
            filter: "blur(60px)",
          }}
          animate={{ y: [-20, 20, -20], x: [-10, 10, -10] }}
          transition={{ duration: orb.dur, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {/* Floating corner icons */}
      {floatingIcons.map(({ Icon, pos, delay }) => (
        <motion.div
          key={pos}
          className={`absolute ${pos} z-[3] pointer-events-none`}
          animate={{ y: [-8, 8, -8] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay }}
        >
          <Icon className="w-5 h-5 text-muted-foreground/30" strokeWidth={1.5} />
        </motion.div>
      ))}

      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full pointer-events-none z-[1]"
        style={{
          opacity: glowOpacity,
          background: "radial-gradient(circle, hsl(255 70% 55% / 0.06) 0%, transparent 70%)",
        }}
      />

      <div className="container max-w-5xl mx-auto px-6 text-center relative z-10">
        <motion.div style={{ opacity, y, scale }}>
          <motion.div className="inline-flex items-center gap-2 border px-4 py-2 mb-10 rounded-full"
            style={{ borderColor: "hsl(240 10% 20%)", background: "hsl(240 15% 10% / 0.8)" }}>
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "hsl(190 80% 55%)" }} />
            <span className="font-display text-xs tracking-wider uppercase" style={{ color: "hsl(240 6% 55%)" }}>
              Advanced AI Detection
            </span>
          </motion.div>

          {/* Word-by-word animated headline */}
          <h2 className="font-calligraphy text-5xl md:text-7xl lg:text-8xl tracking-tight leading-[0.95] mb-8" style={{ color: "hsl(0 0% 93%)" }}>
            {words.map((word, i) => (
              <motion.span
                key={i}
                className={`inline-block mr-[0.3em]`}
                style={
                  word === "calculation."
                    ? {
                        backgroundImage: "linear-gradient(135deg, hsl(190 80% 55%), hsl(255 70% 55%), hsl(200 80% 55%))",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }
                    : { color: "hsl(0 0% 93%)" }
                }
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.15, ease: [0.42, 0, 0.58, 1] }}
              >
                {word}
                {(word === "no" || word === "a" && i === 4) ? <br className="hidden md:inline" /> : null}
              </motion.span>
            ))}
          </h2>

          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed font-body" style={{ color: "hsl(240 6% 55%)" }}>
            DeepTrust uses multi-layered neural analysis to distinguish between
            organic capture and synthetic generation in real-time.
          </p>

          <div className="flex items-center justify-center gap-6 mb-16">
            {/* CTA with pulse glow */}
            <motion.a
              href="https://deeptrust-sandy.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="relative bg-primary text-primary-foreground px-8 py-4 font-display text-sm tracking-wider hover:opacity-90 transition-all duration-150 uppercase rounded-lg shadow-deep inline-block"
              whileHover={{ scale: 1.03 }}
            >
              <motion.span
                className="absolute inset-0 rounded-lg pointer-events-none"
                style={{ border: "2px solid hsl(255 70% 55% / 0.4)" }}
                animate={{
                  scale: [1, 1.15, 1],
                  opacity: [0.6, 0, 0.6],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
              Start Free Trial
            </motion.a>
            <button className="border px-8 py-4 font-display text-sm tracking-wider transition-all duration-150 uppercase rounded-lg"
              style={{ borderColor: "hsl(240 10% 25%)", color: "hsl(240 6% 55%)", background: "hsl(240 15% 10% / 0.8)" }}>
              View Demo
            </button>
          </div>

          <div className="flex justify-center gap-16">
            {[
              { value: "99.8%", label: "Accuracy" },
              { value: "40ms", label: "Latency" },
              { value: "Enterprise", label: "Grade" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-display text-3xl tabular-nums" style={{ color: "hsl(0 0% 93%)" }}>{stat.value}</div>
                <div className="text-xs uppercase tracking-wider mt-1" style={{ color: "hsl(240 6% 50%)" }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroQuote;
