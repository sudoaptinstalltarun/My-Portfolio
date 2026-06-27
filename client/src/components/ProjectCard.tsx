import { motion } from "framer-motion";
import { ExternalLink, Github, Cpu, ChevronDown, ChevronUp, CircuitBoard } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Project } from "@shared/schema";
import { useState } from "react";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const [isExpanded, setIsOpen] = useState(false);
  const description = project.description || "";
  const isLongDescription = description.length > 150;
  const displayDescription = isExpanded ? description : (isLongDescription ? `${description.substring(0, 150)}...` : description);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="h-full"
    >
      <Card className="h-full flex flex-col bg-card border-border hover:border-muted-foreground/30 transition-all duration-300 group overflow-hidden shadow-none rounded-2xl">
        <div className="h-44 bg-muted relative overflow-hidden flex items-center justify-center">
          <CircuitBoard className="w-16 h-16 text-muted-foreground/30 group-hover:text-foreground transition-colors duration-500" />
          <Badge className="absolute top-4 right-4 bg-background/50 border-none text-foreground font-medium px-3 py-1 text-[10px] uppercase tracking-wider">
            {project.category}
          </Badge>
        </div>
        
        <CardHeader className="px-6 pt-6 pb-2">
          <div className="flex justify-between items-start gap-4">
            <CardTitle className="text-xl font-display font-semibold text-foreground group-hover:text-muted-foreground transition-colors leading-tight">
              {project.title}
            </CardTitle>
            {project.link && (
              <Button size="icon" variant="ghost" className="rounded-full h-8 w-8 hover:bg-white/10 transition-all" asChild>
                <a href={project.link} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4" />
                </a>
              </Button>
            )}
          </div>
        </CardHeader>
        
        <CardContent className="flex-grow px-6 pb-6 mt-auto">
          <div className="space-y-4">
            <p className="text-muted-foreground leading-relaxed text-sm">
              {displayDescription}
            </p>
            {isLongDescription && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setIsOpen(!isExpanded)}
                className="mt-1 h-8 px-0 text-foreground hover:bg-transparent font-medium flex items-center gap-1"
              >
                {isExpanded ? (
                  <>Show Less <ChevronUp className="w-4 h-4" /></>
                ) : (
                  <>Read More <ChevronDown className="w-4 h-4" /></>
                )}
              </Button>
            )}
            
            <div className="flex flex-wrap gap-2 pt-4 border-t border-border">
              {project.technologies?.map((tech) => (
                <Badge 
                  key={tech} 
                  variant="outline" 
                  className="bg-muted border-none text-muted-foreground text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
