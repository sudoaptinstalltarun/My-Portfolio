import { useState, useEffect } from "react";
import { Link as ScrollLink } from "react-scroll";
import { Menu, X, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "01 // About Me", to: "about" },
    { name: "02 // Experience", to: "experience" },
    { name: "03 // Projects", to: "projects" },
    { name: "04 // Simulators", to: "simulators" },
  ];

  return (
    <nav 
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-5xl transition-all duration-500`}
    >
      <div 
        className={`flex items-center justify-between px-6 py-2.5 rounded-full transition-all duration-500 border ${
          scrolled 
            ? "bg-[#060606]/80 backdrop-blur-lg border-white/[0.06] shadow-xl shadow-black/50" 
            : "bg-[#060606]/30 backdrop-blur-md border-white/[0.02]"
        }`}
      >
        <ScrollLink 
          to="hero" 
          smooth={true} 
          duration={500}
          className="flex items-center gap-1 cursor-pointer group select-none"
        >
          <span className="font-mono font-bold text-sm tracking-wider text-white transition-colors group-hover:text-primary">
            tk<span className="text-primary font-bold transition-colors group-hover:text-white">.</span>
          </span>
        </ScrollLink>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <ScrollLink
              key={link.name}
              to={link.to}
              smooth={true}
              spy={true}
              duration={500}
              offset={-80}
              activeClass="text-primary font-medium"
              className="relative text-[11px] font-mono tracking-wider text-muted-foreground hover:text-white cursor-pointer transition-colors py-1"
            >
              {link.name}
            </ScrollLink>
          ))}
          <div className="h-4 w-[1px] bg-white/10" />
          <Button size="sm" variant="ghost" className="h-8 rounded-full px-4 font-mono text-[10px] tracking-wider uppercase text-muted-foreground hover:text-white hover:bg-white/5 transition-all shadow-none" asChild>
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
              Resume
            </a>
          </Button>
          <Button size="sm" className="h-8 rounded-full px-5 font-mono text-[10px] tracking-wider uppercase bg-white text-black hover:bg-white/90 hover:scale-105 active:scale-95 transition-all shadow-none" asChild>
            <ScrollLink to="contact" smooth={true} offset={-80}>
              Connect
            </ScrollLink>
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-muted-foreground hover:text-white p-2 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="md:hidden bg-[#060606]/95 backdrop-blur-xl border border-white/[0.06] overflow-hidden mt-3 rounded-2xl shadow-2xl"
          >
            <div className="px-6 py-8 flex flex-col gap-5">
              {navLinks.map((link) => (
                <ScrollLink
                  key={link.name}
                  to={link.to}
                  smooth={true}
                  duration={500}
                  offset={-80}
                  onClick={() => setIsOpen(false)}
                  className="text-sm font-mono tracking-widest text-muted-foreground hover:text-white transition-colors cursor-pointer"
                >
                  {link.name}
                </ScrollLink>
              ))}
              <div className="flex gap-5 mt-4 pt-6 border-t border-white/[0.06]">
                <a href="https://github.com/sudoaptinstalltarun" target="_blank" className="text-muted-foreground hover:text-white transition-transform hover:scale-110">
                  <Github className="w-5 h-5" />
                </a>
                <a href="https://www.linkedin.com/in/tarun-kumar-885542282/" target="_blank" className="text-muted-foreground hover:text-white transition-transform hover:scale-110">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="mailto:tarunkotian10@gmail.com" className="text-muted-foreground hover:text-white transition-transform hover:scale-110">
                  <Mail className="w-5 h-5" />
                </a>
              </div>
              <div className="flex gap-4 mt-2">
                <Button variant="outline" className="flex-1 h-11 rounded-full text-xs font-mono tracking-wider border-white/[0.08] text-white bg-transparent hover:bg-white/5 shadow-none" asChild>
                  <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                    Resume
                  </a>
                </Button>
                <Button className="flex-1 h-11 rounded-full text-xs font-mono tracking-wider bg-white text-black hover:bg-white/90 shadow-none" asChild>
                  <ScrollLink to="contact" smooth={true} offset={-80} onClick={() => setIsOpen(false)}>
                    Connect
                  </ScrollLink>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
