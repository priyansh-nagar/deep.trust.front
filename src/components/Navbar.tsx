import deeptrustLogo from "@/assets/deeptrust-logo.png";

const navItems = [
  { label: "Features", id: "features" },
  { label: "How It Works", id: "how-it-works" },
  { label: "Industries", id: "diagnostic-lens" },
  { label: "Results", id: "results" },
];

const Navbar = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <nav className="fixed top-0 inset-x-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        <button onClick={scrollToTop} className="flex items-center gap-2 bg-transparent border-none cursor-pointer">
          <img src={deeptrustLogo} alt="DeepTrust" className="w-7 h-7 rounded-sm" />
          <span className="font-display text-sm tracking-tight text-foreground">DeepTrust</span>
        </button>
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button key={item.id} onClick={() => scrollTo(item.id)} className="font-display text-xs tracking-wider text-muted-foreground hover:text-foreground transition-colors duration-150 uppercase bg-transparent border-none cursor-pointer">
              {item.label}
            </button>
          ))}
        </div>
        <a href="https://deeptrust-sandy.vercel.app/" target="_blank" className="bg-primary text-primary-foreground px-5 py-2 font-display text-xs tracking-wider hover:opacity-90 transition-all duration-150 uppercase rounded-lg inline-block">
          Get Started
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
