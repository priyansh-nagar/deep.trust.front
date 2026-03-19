import HeroReveal from "@/components/HeroReveal";
import ScrollShrinkSection from "@/components/ScrollShrinkSection";
import GlassMorphismLens from "@/components/GlassMorphismLens";
import { Shield, Zap, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-border/30">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <span className="font-display text-xl font-bold text-foreground tracking-tight">
            Deep<span className="text-gradient">Trust</span>
          </span>
          <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-foreground transition-colors">How It Works</a>
            <a href="#detection" className="hover:text-foreground transition-colors">Detection</a>
          </div>
          <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
            Get Started
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6">
        <div className="container mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border/60 bg-card/60 text-sm text-muted-foreground mb-6">
            <Shield className="w-4 h-4 text-accent" />
            Advanced AI Detection Technology
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold leading-tight mb-6">
            Detect Deepfakes<br />
            <span className="text-gradient">with Precision</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-10">
            Protect your content and brand integrity with cutting-edge AI technology that identifies manipulated media in real-time.
          </p>
        </div>

        {/* Interactive hero image */}
        <div className="container mx-auto">
          <p className="text-center text-sm text-muted-foreground mb-4 animate-pulse">
            ↕ Hover over the image to reveal the AI beneath
          </p>
          <HeroReveal />
        </div>
      </section>

      {/* Scroll shrink + calligraphy section */}
      <ScrollShrinkSection />

      {/* Glass morphism lens section */}
      <section id="detection">
        <GlassMorphismLens />
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-5xl font-display text-center mb-16">
            How It <span className="text-gradient">Works</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { icon: Eye, title: "Upload Media", desc: "Upload your video or image files securely through our platform or API." },
              { icon: Zap, title: "AI Analysis", desc: "Our advanced AI models analyze facial features, artifacts, and inconsistencies." },
              { icon: Shield, title: "Get Results", desc: "Receive detailed reports with confidence scores and manipulation indicators." },
            ].map((item, i) => (
              <div key={i} className="text-center group">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:glow-accent transition-shadow duration-500">
                  <item.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-display text-xl mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 py-8 px-6">
        <div className="container mx-auto flex items-center justify-between text-sm text-muted-foreground">
          <span className="font-display">Deep<span className="text-gradient">Trust</span></span>
          <span>© 2026 DeepTrust. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
};

export default Index;
