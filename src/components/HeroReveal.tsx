import { useRef, useState, useCallback } from "react";
import girlFace from "@/assets/girl-face.png";
import robotFace from "@/assets/robot-face.png";

const HeroReveal = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-2xl mx-auto aspect-video overflow-hidden rounded-2xl cursor-crosshair select-none"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Girl face (base layer) */}
      <img
        src={girlFace}
        alt="Human face"
        className="absolute inset-0 w-full h-full object-cover object-top"
        draggable={false}
      />

      {/* Robot face (reveal layer) - shown through circular mask at cursor */}
      <div
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: isHovering ? 1 : 0,
          clipPath: isHovering
            ? `circle(100px at ${mousePos.x}px ${mousePos.y}px)`
            : `circle(0px at ${mousePos.x}px ${mousePos.y}px)`,
          transition: "clip-path 0.15s ease-out, opacity 0.3s ease",
        }}
      >
        <img
          src={robotFace}
          alt="Robot face overlay"
          className="absolute inset-0 w-full h-full object-cover object-center"
          draggable={false}
        />
      </div>

      {/* Glow ring at cursor */}
      {isHovering && (
        <div
          className="pointer-events-none absolute rounded-full border-2 border-accent/60"
          style={{
            width: 200,
            height: 200,
            left: mousePos.x - 100,
            top: mousePos.y - 100,
            boxShadow: "0 0 30px 5px hsl(195 100% 50% / 0.35), inset 0 0 20px 2px hsl(195 100% 50% / 0.15)",
            transition: "left 0.05s, top 0.05s",
          }}
        />
      )}
    </div>
  );
};

export default HeroReveal;
