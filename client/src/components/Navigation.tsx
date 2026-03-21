import { useState, useEffect } from "react";
import { Link as ScrollLink } from "react-scroll";
import { Menu, X, Terminal, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Open Source", to: "open-source" },
    { name: "Projects", to: "projects" },
    { name: "Skills", to: "skills" },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "py-4" : "py-6"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div 
          className={`flex items-center justify-between px-6 py-3 rounded-md transition-all duration-300 ${
            scrolled 
              ? "bg-black/60 backdrop-blur-md border border-border shadow-none" 
              : "bg-transparent border-transparent"
          }`}
        >
          <ScrollLink 
            to="hero" 
            smooth={true} 
            duration={500}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="w-8 h-8 flex items-center justify-center bg-primary rounded-sm transition-colors group-hover:bg-accent">
              <Terminal className="w-4 h-4 text-primary-foreground group-hover:text-accent-foreground" />
            </div>
            <span className="font-mono font-bold text-lg tracking-widest text-foreground transition-all uppercase">
              Tarun_K
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
                offset={-100}
                activeClass="text-primary font-bold after:scale-x-100"
                className="relative text-sm font-mono font-bold uppercase tracking-widest text-muted-foreground hover:text-white cursor-pointer transition-colors py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary after:scale-x-0 after:transition-transform after:origin-right hover:after:origin-left hover:after:scale-x-100"
              >
                {link.name}
              </ScrollLink>
            ))}
            <Button size="sm" variant="outline" className="rounded-sm px-6 font-mono font-bold tracking-widest uppercase border-border text-white bg-transparent hover:border-accent hover:text-accent transition-all duration-300 mr-2 shadow-none" asChild>
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                Resume
              </a>
            </Button>
            <Button size="sm" className="rounded-sm px-6 font-mono font-bold tracking-widest uppercase bg-primary text-primary-foreground shadow-none transition-all duration-300" asChild>
              <ScrollLink to="contact" smooth={true} offset={-100}>
                Contact
              </ScrollLink>
            </Button>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-muted-foreground hover:text-white p-2 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, scale: 0.95 }}
            animate={{ opacity: 1, height: "auto", scale: 1 }}
            exit={{ opacity: 0, height: 0, scale: 0.95 }}
            className="md:hidden bg-black/90 backdrop-blur-md border border-border overflow-hidden mx-4 mt-2 rounded-md shadow-none"
          >
            <div className="container px-6 py-8 flex flex-col gap-6">
              {navLinks.map((link) => (
                <ScrollLink
                  key={link.name}
                  to={link.to}
                  smooth={true}
                  duration={500}
                  offset={-100}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-mono font-bold uppercase tracking-widest text-foreground hover:text-primary transition-colors cursor-pointer"
                >
                  {link.name}
                </ScrollLink>
              ))}
              <div className="flex gap-6 mt-4 pt-6 border-t border-border">
                <a href="https://github.com/sudoaptinstalltarun" target="_blank" className="text-muted-foreground hover:text-primary transition-transform hover:scale-125">
                  <Github className="w-6 h-6" />
                </a>
                <a href="https://www.linkedin.com/in/tarun-kumar-885542282/" target="_blank" className="text-muted-foreground hover:text-primary transition-transform hover:scale-125">
                  <Linkedin className="w-6 h-6" />
                </a>
                <a href="mailto:tarunkotian10@gmail.com" className="text-muted-foreground hover:text-primary transition-transform hover:scale-125">
                  <Mail className="w-6 h-6" />
                </a>
              </div>
              <div className="flex gap-4">
                <Button variant="outline" className="flex-1 h-14 rounded-sm text-sm font-mono font-bold tracking-widest uppercase border border-border text-white bg-transparent shadow-none" asChild>
                  <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                    Resume
                  </a>
                </Button>
                <Button className="flex-1 h-14 rounded-sm text-sm font-mono font-bold tracking-widest uppercase bg-primary text-primary-foreground shadow-none" asChild>
                  <ScrollLink to="contact" smooth={true} offset={-100} onClick={() => setIsOpen(false)}>
                    Contact
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
