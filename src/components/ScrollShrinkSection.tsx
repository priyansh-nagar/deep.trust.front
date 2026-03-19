import { useEffect, useRef, useState } from "react";
import girlFace from "@/assets/girl-face.png";

const ScrollShrinkSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowH = window.innerHeight;
      // progress: 0 when section enters viewport, 1 when it's centered
      const progress = Math.max(0, Math.min(1, 1 - rect.top / windowH));
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const imageScale = 1 - scrollProgress * 0.45; // shrinks to ~55%
  const textOpacity = Math.max(0, (scrollProgress - 0.3) / 0.7);
  const quoteOpacity = Math.max(0, (scrollProgress - 0.5) / 0.5);

  return (
    <div ref={sectionRef} className="relative min-h-[120vh] flex flex-col items-center justify-center py-20">
      {/* Shrinking image */}
      <div
        className="relative rounded-2xl overflow-hidden shadow-2xl"
        style={{
          transform: `scale(${imageScale})`,
          transition: "transform 0.1s ease-out",
          width: "min(600px, 80vw)",
        }}
      >
        <img
          src={girlFace}
          alt="DeepTrust AI"
          className="w-full h-auto object-cover object-top"
        />

        {/* Calligraphy overlay */}
        <div
          className="absolute inset-0 flex items-center justify-center bg-foreground/30"
          style={{ opacity: textOpacity, transition: "opacity 0.1s ease-out" }}
        >
          <h2
            className="font-calligraphy text-primary-foreground text-center leading-tight drop-shadow-2xl select-none"
            style={{ fontSize: "clamp(3rem, 8vw, 6rem)" }}
          >
            DeepTrust
          </h2>
        </div>
      </div>

      {/* Quote beneath */}
      <p
        className="font-display italic text-muted-foreground text-center max-w-lg mt-8 text-lg md:text-xl leading-relaxed"
        style={{ opacity: quoteOpacity, transition: "opacity 0.1s ease-out" }}
      >
        "Where truth meets technology — unveiling the real behind the artificial."
      </p>
    </div>
  );
};

export default ScrollShrinkSection;
