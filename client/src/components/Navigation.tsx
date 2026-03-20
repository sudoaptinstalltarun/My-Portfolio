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
    { name: "About", to: "about" },
    { name: "Skills", to: "skills" },
    { name: "Experience", to: "experience" },
    { name: "Projects", to: "projects" },
    { name: "Contact", to: "contact" },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "py-4" : "py-6"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div 
          className={`flex items-center justify-between px-6 py-3 rounded-2xl transition-all duration-300 ${
            scrolled 
              ? "bg-background/80 backdrop-blur-md border border-border shadow-sm" 
              : "bg-transparent border-transparent"
          }`}
        >
          <ScrollLink 
            to="hero" 
            smooth={true} 
            duration={500}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="w-8 h-8 flex items-center justify-center bg-foreground rounded-lg transition-transform">
              <Terminal className="w-4 h-4 text-background" />
            </div>
            <span className="font-display font-bold text-xl tracking-tight text-foreground transition-all">
              Tarun.
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
                className="relative text-sm font-medium text-muted-foreground hover:text-white cursor-pointer transition-colors py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary after:scale-x-0 after:transition-transform after:origin-right hover:after:origin-left hover:after:scale-x-100"
              >
                {link.name}
              </ScrollLink>
            ))}
            <Button size="sm" variant="outline" className="rounded-xl px-6 border-border hover:bg-muted transition-all duration-300 mr-2" asChild>
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                Resume
              </a>
            </Button>
            <Button size="sm" className="rounded-xl px-6 transition-all duration-300" asChild>
              <ScrollLink to="contact" smooth={true} offset={-100}>
                Hire Me
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
            className="md:hidden bg-background border border-border overflow-hidden mx-4 mt-2 rounded-2xl shadow-lg"
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
                  className="text-2xl font-bold text-foreground hover:text-primary transition-colors cursor-pointer"
                >
                  {link.name}
                </ScrollLink>
              ))}
              <div className="flex gap-6 mt-4 pt-6 border-t border-white/10">
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
                <Button variant="outline" className="flex-1 h-14 rounded-xl text-lg font-bold border-white/10 glass" asChild>
                  <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                    Resume
                  </a>
                </Button>
                <Button className="flex-1 h-14 rounded-xl text-lg font-bold bg-primary glow-primary" asChild>
                  <ScrollLink to="contact" smooth={true} offset={-100} onClick={() => setIsOpen(false)}>
                    Let's Talk
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
