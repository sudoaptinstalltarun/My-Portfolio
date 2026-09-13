import { motion } from "framer-motion";
import { Briefcase, Calendar } from "lucide-react";
import type { Experience } from "@shared/schema";

interface ExperienceTimelineProps {
  experiences: Experience[];
}

export function ExperienceTimeline({ experiences }: ExperienceTimelineProps) {
  return (
    <div className="relative ml-2 space-y-10 py-4 before:absolute before:bottom-0 before:left-0 before:top-0 before:w-px before:bg-gradient-to-b before:from-primary before:via-purple-500/60 before:to-transparent md:ml-4">
      {experiences.map((exp, index) => (
        <motion.div 
          key={exp.id}
          initial={{ opacity: 0, x: -15 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.12 }}
          className="group relative pl-8 md:pl-12"
        >
          {/* Timeline Dot */}
          <div className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full border border-primary/70 bg-[#050505] shadow-[0_0_0_4px_rgba(0,212,255,0.08)] transition-all duration-300 group-hover:bg-primary group-hover:shadow-[0_0_0_6px_rgba(0,212,255,0.12)]" />
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
            <h3 className="text-base font-display font-medium tracking-tight text-white group-hover:text-primary transition-colors">{exp.role}</h3>
            <div className="flex items-center text-[9px] font-mono text-muted-foreground uppercase tracking-widest mt-1 sm:mt-0 bg-white/5 border border-white/[0.04] px-2.5 py-0.5 rounded-sm shrink-0 select-none">
              <Calendar className="w-3 h-3 mr-1.5 text-muted-foreground" />
              {exp.duration}
            </div>
          </div>
          
          <div className="flex items-center text-primary font-mono text-[10px] uppercase tracking-wider mb-4">
            <Briefcase className="w-3.5 h-3.5 mr-1.5 text-primary" />
            {exp.company}
          </div>
          
          <p className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-5 text-xs font-light leading-relaxed text-muted-foreground transition-all group-hover:border-primary/20 group-hover:bg-primary/[0.03]">
            {exp.description}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
