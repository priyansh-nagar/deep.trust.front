import { Shield } from "lucide-react";

const Navbar = () => (
  <nav className="fixed top-0 inset-x-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
    <div className="container max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
      <div className="flex items-center gap-2">
        <Shield className="w-5 h-5 text-primary" strokeWidth={1.5} />
        <span className="font-display text-sm tracking-tight text-foreground">DeepTrust</span>
      </div>
      <div className="hidden md:flex items-center gap-8">
        {["Features", "How It Works", "Industries", "Results"].map((item) => (
          <a key={item} href={`#${item.toLowerCase().replace(/ /g, '-')}`} className="font-display text-xs tracking-wider text-muted-foreground hover:text-foreground transition-colors duration-150 uppercase">
            {item}
          </a>
        ))}
      </div>
      <button className="bg-primary text-primary-foreground px-5 py-2 font-display text-xs tracking-wider hover:opacity-90 transition-all duration-150 uppercase rounded-lg">
        Get Started
      </button>
    </div>
  </nav>
);

export default Navbar;
