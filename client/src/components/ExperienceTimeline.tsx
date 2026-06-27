import { motion } from "framer-motion";
import { Briefcase, Calendar } from "lucide-react";
import type { Experience } from "@shared/schema";

interface ExperienceTimelineProps {
  experiences: Experience[];
}

export function ExperienceTimeline({ experiences }: ExperienceTimelineProps) {
  return (
    <div className="relative border-l border-white/[0.06] ml-2 md:ml-4 space-y-12 py-4">
      {experiences.map((exp, index) => (
        <motion.div 
          key={exp.id}
          initial={{ opacity: 0, x: -15 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.12 }}
          className="relative pl-8 md:pl-12 group"
        >
          {/* Timeline Dot */}
          <div className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-black border border-white/20 group-hover:border-primary group-hover:bg-primary transition-all duration-300" />
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
            <h3 className="text-base font-display font-medium text-white tracking-tight">{exp.role}</h3>
            <div className="flex items-center text-[9px] font-mono text-muted-foreground uppercase tracking-widest mt-1 sm:mt-0 bg-white/5 border border-white/[0.04] px-2.5 py-0.5 rounded-sm shrink-0 select-none">
              <Calendar className="w-3 h-3 mr-1.5 text-muted-foreground" />
              {exp.duration}
            </div>
          </div>
          
          <div className="flex items-center text-primary font-mono text-[10px] uppercase tracking-wider mb-4">
            <Briefcase className="w-3.5 h-3.5 mr-1.5 text-primary" />
            {exp.company}
          </div>
          
          <p className="text-muted-foreground leading-relaxed p-5 rounded border border-white/[0.04] bg-white/[0.01] hover:border-white/[0.08] transition-colors text-xs font-light">
            {exp.description}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
