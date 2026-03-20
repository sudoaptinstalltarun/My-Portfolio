import { motion } from "framer-motion";
import { Briefcase, Calendar } from "lucide-react";
import type { Experience } from "@shared/schema";

interface ExperienceTimelineProps {
  experiences: Experience[];
}

export function ExperienceTimeline({ experiences }: ExperienceTimelineProps) {
  return (
    <div className="relative border-l-2 border-border ml-3 md:ml-6 space-y-16 py-8">
      {experiences.map((exp, index) => (
        <motion.div 
          key={exp.id}
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: index * 0.15 }}
          className="relative pl-10 md:pl-16 group"
        >
          {/* Timeline Dot */}
          <div className="absolute -left-[11px] top-2 h-5 w-5 rounded-full bg-background border-2 border-border group-hover:bg-foreground transition-colors duration-300" />
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
            <h3 className="text-xl font-display font-semibold text-foreground transition-colors">{exp.role}</h3>
            <div className="flex items-center text-xs font-semibold text-muted-foreground uppercase tracking-widest mt-2 sm:mt-0 bg-muted px-3 py-1 rounded-full">
              <Calendar className="w-3.5 h-3.5 mr-2" />
              {exp.duration}
            </div>
          </div>
          
          <div className="flex items-center text-muted-foreground font-medium mb-6 text-sm tracking-wide uppercase">
            <Briefcase className="w-4 h-4 mr-2" />
            {exp.company}
          </div>
          
          <p className="text-muted-foreground leading-relaxed p-6 rounded-2xl border border-border bg-card">
            {exp.description}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
