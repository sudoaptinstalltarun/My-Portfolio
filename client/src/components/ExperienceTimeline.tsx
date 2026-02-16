import { motion } from "framer-motion";
import { Briefcase, Calendar } from "lucide-react";
import type { Experience } from "@shared/schema";

interface ExperienceTimelineProps {
  experiences: Experience[];
}

export function ExperienceTimeline({ experiences }: ExperienceTimelineProps) {
  return (
    <div className="relative border-l-2 border-border ml-3 md:ml-6 space-y-12 py-4">
      {experiences.map((exp, index) => (
        <motion.div 
          key={exp.id}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="relative pl-8 md:pl-12"
        >
          {/* Timeline Dot */}
          <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-background border-2 border-primary ring-4 ring-background" />
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
            <h3 className="text-xl font-bold text-foreground">{exp.role}</h3>
            <div className="flex items-center text-sm text-muted-foreground mt-1 sm:mt-0">
              <Calendar className="w-4 h-4 mr-1.5" />
              {exp.duration}
            </div>
          </div>
          
          <div className="flex items-center text-primary font-medium mb-4">
            <Briefcase className="w-4 h-4 mr-2" />
            {exp.company}
          </div>
          
          <p className="text-muted-foreground leading-relaxed bg-secondary/5 p-4 rounded-lg border border-border/50">
            {exp.description}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
