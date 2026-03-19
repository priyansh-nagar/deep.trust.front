import { Shield } from "lucide-react";

const FooterSection = () => (
  <footer className="border-t border-border py-16 bg-card">
    <div className="container max-w-7xl mx-auto px-6">
      <div className="flex flex-col md:flex-row justify-between items-start gap-12">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Shield className="w-5 h-5 text-primary" strokeWidth={1.5} />
            <span className="font-display text-sm tracking-tight text-foreground">DeepTrust</span>
          </div>
          <p className="text-sm text-muted-foreground max-w-xs font-quote italic text-lg">
            Trust is no longer a default. It's a calculation.
          </p>
        </div>
        <div className="flex gap-16">
          {[
            { title: "Product", links: ["Features", "Pricing", "API Docs", "Security"] },
            { title: "Company", links: ["About", "Blog", "Careers", "Contact"] },
          ].map((col) => (
            <div key={col.title}>
              <div className="font-display text-xs tracking-widest text-muted-foreground uppercase mb-4">{col.title}</div>
              <div className="flex flex-col gap-3">
                {col.links.map((l) => (
                  <a key={l} href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-150">{l}</a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-16 pt-8 border-t border-border text-xs text-muted-foreground font-display tracking-wider">
        © 2026 DeepTrust. All rights reserved.
      </div>
    </div>
  </footer>
);

export default FooterSection;
