import { Shield } from "lucide-react";

const FooterSection = () => (
  <footer className="py-16 relative overflow-hidden" style={{ background: "hsl(240 15% 5%)", borderTop: "1px solid hsl(240 10% 15%)" }}>
    <div className="container max-w-7xl mx-auto px-6 relative z-10">
      <div className="flex flex-col items-center text-center gap-8">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5" strokeWidth={1.5} style={{ color: "hsl(190 80% 55%)" }} />
          <span className="font-display text-sm tracking-tight" style={{ color: "hsl(0 0% 85%)" }}>DeepTrust</span>
        </div>
        <p className="font-quote italic text-2xl md:text-3xl max-w-lg leading-relaxed tracking-wide"
          style={{
            background: "linear-gradient(135deg, hsl(190 80% 65%), hsl(255 70% 70%), hsl(200 80% 60%))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: "none",
          }}>
          "Trust is no longer a default.<br />It's a calculation."
        </p>
      </div>
      <div className="mt-16 pt-8 text-xs font-display tracking-wider text-center"
        style={{ borderTop: "1px solid hsl(240 10% 15%)", color: "hsl(240 6% 40%)" }}>
        © 2026 DeepTrust. All rights reserved.
      </div>
    </div>
  </footer>
);

export default FooterSection;
