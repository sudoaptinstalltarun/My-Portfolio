import { motion } from "framer-motion";
import { Briefcase, Calendar } from "lucide-react";
import type { Experience } from "@shared/schema";

interface ExperienceTimelineProps {
  experiences: Experience[];
}

export function ExperienceTimeline({ experiences }: ExperienceTimelineProps) {
  return (
    <div className="relative border-l-2 border-white/10 ml-3 md:ml-6 space-y-16 py-8">
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
          <div className="absolute -left-[11px] top-0 h-5 w-5 rounded-full bg-background border-2 border-primary ring-8 ring-primary/5 group-hover:scale-125 transition-transform duration-300 shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
            <h3 className="text-2xl font-display font-black text-white group-hover:text-primary transition-colors">{exp.role}</h3>
            <div className="flex items-center text-xs font-bold text-muted-foreground/60 uppercase tracking-widest mt-2 sm:mt-0 glass px-3 py-1 rounded-full border-white/5">
              <Calendar className="w-3.5 h-3.5 mr-2 text-primary" />
              {exp.duration}
            </div>
          </div>
          
          <div className="flex items-center text-primary font-bold mb-6 text-sm tracking-wide uppercase">
            <Briefcase className="w-4 h-4 mr-2" />
            {exp.company}
          </div>
          
          <p className="text-muted-foreground/80 leading-relaxed glass p-6 rounded-2xl border-white/5 shadow-xl group-hover:border-white/10 transition-colors font-light italic">
            {exp.description}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
