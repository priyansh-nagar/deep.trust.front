import { Shield } from "lucide-react";

const FooterSection = () => (
  <footer className="border-t border-border py-16 bg-card">
    <div className="container max-w-7xl mx-auto px-6">
      <div className="flex flex-col items-center text-center gap-8">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-primary" strokeWidth={1.5} />
          <span className="font-display text-sm tracking-tight text-foreground">DeepTrust</span>
        </div>
        <p className="font-quote italic text-2xl md:text-3xl text-muted-foreground max-w-lg leading-relaxed tracking-wide">
          "Trust is no longer a default.<br />It's a calculation."
        </p>
      </div>
      <div className="mt-16 pt-8 border-t border-border text-xs text-muted-foreground font-display tracking-wider text-center">
        © 2026 DeepTrust. All rights reserved.
      </div>
    </div>
  </footer>
);

export default FooterSection;
