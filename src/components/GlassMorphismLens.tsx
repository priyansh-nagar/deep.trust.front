import { useEffect, useRef, useState } from "react";

const GlassMorphismLens = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [lensPos, setLensPos] = useState({ x: 50, y: 50 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowH = window.innerHeight;
      const visible = rect.top < windowH * 0.8 && rect.bottom > windowH * 0.2;
      setIsVisible(visible);

      if (visible) {
        const progress = Math.max(0, Math.min(1, 1 - rect.top / windowH));
        // Animate lens across the content
        setLensPos({
          x: 20 + progress * 60,
          y: 30 + Math.sin(progress * Math.PI * 2) * 20,
        });
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={sectionRef} className="relative py-24 overflow-hidden">
      <div className="container mx-auto px-6 relative">
        <h2 className="text-3xl md:text-5xl font-display text-center mb-4">
          Powerful <span className="text-gradient">AI Detection</span>
        </h2>
        <p className="text-muted-foreground text-center mb-16 max-w-2xl mx-auto text-lg">
          Advanced forensic analysis powered by multimodal AI. Upload any image or audio and get instant verification.
        </p>

        {/* Content cards that the lens "examines" */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            { title: "99.7% Accuracy", desc: "Industry-leading detection rates across all media types" },
            { title: "Real-Time Analysis", desc: "Process images and videos in seconds with instant results" },
            { title: "Multi-Signal Detection", desc: "Cross-references multiple forensic indicators simultaneously" },
          ].map((item, i) => (
            <div
              key={i}
              className="glass-panel rounded-xl p-6 border border-border/50 bg-card/80 backdrop-blur-sm"
            >
              <h3 className="font-display text-xl mb-2 text-foreground">{item.title}</h3>
              <p className="text-muted-foreground text-sm">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Floating glass lens */}
        <div
          className="pointer-events-none absolute rounded-full"
          style={{
            width: 180,
            height: 180,
            left: `${lensPos.x}%`,
            top: `${lensPos.y}%`,
            transform: "translate(-50%, -50%)",
            opacity: isVisible ? 0.7 : 0,
            transition: "left 0.6s ease-out, top 0.6s ease-out, opacity 0.5s ease",
            background: "radial-gradient(circle, hsl(195 100% 50% / 0.08) 0%, hsl(195 100% 50% / 0.02) 50%, transparent 70%)",
            border: "1.5px solid hsl(195 100% 50% / 0.25)",
            backdropFilter: "blur(4px) brightness(1.08)",
            boxShadow: "0 0 60px 10px hsl(195 100% 50% / 0.12), inset 0 0 30px 5px hsl(195 100% 50% / 0.06)",
          }}
        >
          {/* Lens crosshair */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-px h-8 bg-accent/30" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-px w-8 bg-accent/30" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlassMorphismLens;
