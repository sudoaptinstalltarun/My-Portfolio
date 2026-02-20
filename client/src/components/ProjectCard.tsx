import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, CircuitBoard, ChevronDown, ChevronUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="h-full flex flex-col hover:shadow-xl hover:border-primary/50 transition-all duration-300 group overflow-hidden border-border/50 bg-card">
        <div className="h-48 bg-secondary/5 relative overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />
          
          {/* Decorative tech pattern */}
          <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]" />
          
          <CircuitBoard className="w-16 h-16 text-primary/20 group-hover:text-primary/40 transition-colors duration-500 transform group-hover:scale-110" />
        </div>
        
        <CardHeader>
          <div className="flex justify-between items-start gap-4">
            <div>
              <span className="text-xs font-semibold text-primary mb-2 block uppercase tracking-wider">
                {project.category}
              </span>
              <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors">
                {project.title}
              </CardTitle>
            </div>
            {project.link && (
              <a 
                href={project.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <ExternalLink className="w-5 h-5" />
              </a>
            )}
          </div>
        </CardHeader>
        
        <CardContent className="flex-grow">
          <div className="space-y-4">
            <div className="relative">
              <p className="text-muted-foreground leading-relaxed text-sm">
                {displayDescription}
              </p>
              {isLongDescription && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setIsOpen(!isExpanded)}
                  className="mt-2 h-8 px-2 text-primary hover:bg-primary/5"
                >
                  {isExpanded ? (
                    <span className="flex items-center gap-1">Show Less <ChevronUp className="w-4 h-4" /></span>
                  ) : (
                    <span className="flex items-center gap-1">Read More <ChevronDown className="w-4 h-4" /></span>
                  )}
                </Button>
              )}
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="flex flex-wrap gap-2 pt-4 border-t border-border/50 bg-secondary/5 mt-auto overflow-visible">
          {project.technologies?.map((tech) => (
            <Badge 
              key={tech} 
              variant="secondary" 
              className="bg-background text-xs font-medium border border-border/50 hover-elevate active-elevate-2"
            >
              {tech}
            </Badge>
          ))}
        </CardFooter>
      </Card>
    </motion.div>
  );
}
