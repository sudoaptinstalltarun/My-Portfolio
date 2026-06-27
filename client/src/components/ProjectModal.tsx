import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Cpu, LayoutGrid } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MermaidDiagram } from "@/components/ui/MermaidDiagram";
import { EngineeringProject } from "@/data/projects";

interface ProjectModalProps {
  project: EngineeringProject | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  // Prevent body scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/85 backdrop-blur-md cursor-zoom-out"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 15 }}
            transition={{ type: "spring", damping: 30, stiffness: 350 }}
            className="relative w-full max-w-5xl max-h-[85vh] overflow-y-auto rounded-xl border border-border bg-[#0b0c10] shadow-2xl z-10 flex flex-col font-sans custom-scrollbar"
          >
            {/* Header Area */}
            <div className="sticky top-0 bg-[#0b0c10]/95 backdrop-blur-md border-b border-border px-6 py-5 flex items-center justify-between z-20">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-primary/10 rounded-sm border border-primary/20 text-primary">
                  <Cpu className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-mono text-xs text-primary font-bold uppercase tracking-wider">Project Specification</span>
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-white tracking-tight leading-none mt-1">
                    {project.title}
                  </h3>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="rounded-full w-9 h-9 border border-border/50 text-muted-foreground hover:text-white hover:bg-white/10 transition-colors shrink-0"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Content Area */}
            <div className="p-6 md:p-8 space-y-8">
              {/* Stack & Summary */}
              <div className="grid md:grid-cols-3 gap-6 items-start">
                <div className="md:col-span-2 space-y-4">
                  <h4 className="text-xs font-bold font-mono text-primary uppercase tracking-widest">
                    // Description
                  </h4>
                  <p className="text-base text-muted-foreground leading-relaxed font-light">
                    {project.description}
                  </p>
                </div>
                <div className="space-y-4 bg-secondary/20 p-5 rounded-md border border-border">
                  <h4 className="text-xs font-bold font-mono text-accent uppercase tracking-widest">
                    // Technologies
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((tag) => (
                      <Badge
                        key={tag}
                        className="font-mono bg-white/5 border border-white/10 text-white px-2.5 py-0.5 rounded-sm text-[10px] sm:text-xs uppercase tracking-widest font-bold"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <hr className="border-border" />

              {/* Execution & System Architecture */}
              <div className="grid md:grid-cols-2 gap-8">
                {/* Engineering Highlights */}
                <div className="space-y-4">
                  <h4 className="text-xs font-bold font-mono text-primary uppercase tracking-widest border-b border-primary/20 pb-2 inline-block">
                    01. Engineering Execution
                  </h4>
                  <ul className="space-y-4 text-muted-foreground text-sm leading-relaxed">
                    {project.engineering.map((bullet, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-primary font-mono mr-3 font-bold mt-0.5">
                          [0{i + 1}]
                        </span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* System Architecture */}
                <div className="space-y-4 flex flex-col">
                  <h4 className="text-xs font-bold font-mono text-accent uppercase tracking-widest border-b border-accent/20 pb-2 inline-block self-start">
                    02. System Architecture
                  </h4>
                  <div className="p-4 bg-black/40 rounded-md border border-border flex-grow flex items-center justify-center min-h-[250px] overflow-hidden relative">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
                    <div className="relative w-full overflow-auto max-h-[350px]">
                      <MermaidDiagram chart={project.mermaid} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer buttons */}
            <div className="bg-black/40 border-t border-border px-6 py-5 flex justify-end gap-3 select-none">
              <Button
                variant="outline"
                onClick={onClose}
                className="rounded-sm font-mono font-bold tracking-wide border-border text-white hover:bg-white/5 shadow-none"
              >
                Close
              </Button>
              {project.buttons.map((btn, i) => (
                <Button
                  key={i}
                  variant={i === 0 ? "default" : "outline"}
                  className={`rounded-sm font-mono font-bold tracking-wide ${
                    i === 0
                      ? "bg-primary text-primary-foreground hover:bg-primary/95 shadow-none"
                      : "border-border text-white bg-transparent hover:border-accent hover:text-accent shadow-none"
                  }`}
                  asChild
                >
                  <a
                    href={btn.link || "https://github.com/sudoaptinstalltarun"}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {btn.label} <ExternalLink className="ml-2 w-3.5 h-3.5 inline" />
                  </a>
                </Button>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
