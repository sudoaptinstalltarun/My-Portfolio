import { motion } from "framer-motion";
import { Link as ScrollLink } from "react-scroll";
import { 
  Download, 
  Send, 
  ChevronDown, 
  Github, 
  Linkedin, 
  Mail,
  Cpu,
  Plane,
  Code2,
  Database,
  MapPin,
  Phone,
  GraduationCap
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertContactMessageSchema, type InsertContactMessage } from "@shared/schema";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Navigation } from "@/components/Navigation";
import { SectionHeading } from "@/components/SectionHeading";
import { ProjectCard } from "@/components/ProjectCard";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { 
  useProjects, 
  useSkills, 
  useExperience, 
  useEducation, 
  useContact 
} from "@/hooks/use-portfolio";
import profileImg from "@assets/482024-01-25_15-28-17_1771426037578.jpg";

// Hero Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function Home() {
  const { data: projects = [] } = useProjects();
  const { data: skills = [] } = useSkills();
  const { data: experience = [] } = useExperience();
  const { data: education = [] } = useEducation();
  const { mutate: sendMessage, isPending } = useContact();

  const form = useForm<InsertContactMessage>({
    resolver: zodResolver(insertContactMessageSchema),
    defaultValues: { name: "", email: "", message: "" }
  });

  const onSubmit = (data: InsertContactMessage) => {
    sendMessage(data, {
      onSuccess: () => form.reset()
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/20">
      <Navigation />
      {/* Hero Section */}
      <section 
        id="hero" 
        className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-grid-pattern"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div variants={itemVariants} className="inline-block mb-4 px-4 py-1.5 rounded-full bg-primary/10 text-primary font-medium text-sm border border-primary/20">
              Robotics & Automation Engineer
            </motion.div>
            
            <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-display font-bold mb-6 tracking-tight leading-tight">
              Building the future of <br/>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                Autonomous Systems
              </span>
            </motion.h1>
            
            <motion.p variants={itemVariants} className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              Hi, I'm <span className="font-semibold text-foreground">Tarun Kumar</span>. 
              I specialize in UAV systems, autonomous robotics, and aerospace innovation, turning complex problems into elegant engineering solutions.
            </motion.p>
            
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="h-12 px-8 text-base rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all" asChild>
                <ScrollLink to="projects" smooth={true} duration={500} offset={-100} className="cursor-pointer">
                  View Projects <Cpu className="ml-2 w-4 h-4" />
                </ScrollLink>
              </Button>
              <Button variant="outline" size="lg" className="h-12 px-8 text-base rounded-xl border-2 hover:bg-secondary/10" asChild>
                <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                  Download CV <Download className="ml-2 w-4 h-4" />
                </a>
              </Button>
            </motion.div>

            <motion.div variants={itemVariants} className="mt-12 flex justify-center gap-6 text-muted-foreground">
              <a href="https://github.com/sudoaptinstalltarun" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors hover:scale-110 transform duration-200">
                <Github className="w-6 h-6" />
              </a>
              <a href="https://www.linkedin.com/in/tarun-kumar-885542282/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors hover:scale-110 transform duration-200">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href="mailto:tarunkotian10@gmail.com" className="hover:text-primary transition-colors hover:scale-110 transform duration-200">
                <Mail className="w-6 h-6" />
              </a>
            </motion.div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-muted-foreground/50"
        >
          <ChevronDown className="w-8 h-8" />
        </motion.div>
      </section>
      {/* About Section */}
      <section id="about" className="py-24 bg-secondary/5">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl relative z-10 border border-border">
                <img 
                  src={profileImg} 
                  alt="Tarun Kumar" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-full h-full border-2 border-primary rounded-2xl -z-10" />
            </motion.div>

            <div className="space-y-6">
              <SectionHeading title="About Me" alignment="left" subtitle="Who I Am" />
              <p className="text-lg text-muted-foreground leading-relaxed">
                As a Robotics and Automation Engineering student, I am driven by the challenge of creating intelligent systems that interact with the physical world. My journey began with a curiosity for how things work and has evolved into a passion for designing UAVs and autonomous rovers.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                I combine solid theoretical foundations with hands-on experience in mechanical design, circuit integration, and software development. My goal is to contribute to aerospace innovation and the future of automated industries.
              </p>
              
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary"><Plane className="w-5 h-5"/></div>
                  <span className="font-medium">UAV Systems</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-accent/10 rounded-lg text-accent"><Code2 className="w-5 h-5"/></div>
                  <span className="font-medium">Embedded Systems</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-secondary/10 rounded-lg text-secondary"><Cpu className="w-5 h-5"/></div>
                  <span className="font-medium">Robotics</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-500/10 rounded-lg text-green-600"><Database className="w-5 h-5"/></div>
                  <span className="font-medium">Automation</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Skills Section */}
      <section id="skills" className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <SectionHeading title="Technical Expertise" subtitle="My Toolkit" />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((skillGroup: any, idx: number) => (
              <motion.div
                key={skillGroup.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-card border border-border p-6 rounded-2xl hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-bold mb-4 text-primary">{skillGroup.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((skill: string) => (
                    <Badge key={skill} variant="outline" className="text-sm py-1 px-3 bg-secondary/5">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Experience Section */}
      <section id="experience" className="py-24 bg-secondary/5">
        <div className="container mx-auto px-4 md:px-6">
          <SectionHeading title="Professional Journey" subtitle="Experience" />
          
          <div className="max-w-3xl mx-auto">
            <ExperienceTimeline experiences={experience} />
          </div>
        </div>
      </section>
      {/* Projects Section */}
      <section id="projects" className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <SectionHeading title="Featured Projects" subtitle="What I've Built" />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project: any, index: number) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>
      {/* Education Section */}
      <section id="education" className="py-24 bg-secondary/5">
        <div className="container mx-auto px-4 md:px-6">
          <SectionHeading title="Education" subtitle="Academic Background" />
          
          <div className="max-w-4xl mx-auto grid gap-6">
            {education.map((edu, idx) => (
              <motion.div
                key={edu.id}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex flex-col md:flex-row items-center md:items-start gap-6 bg-background p-6 rounded-2xl border border-border shadow-sm"
              >
                <div className="p-4 bg-primary/10 rounded-xl text-primary">
                  <GraduationCap className="w-8 h-8" />
                </div>
                <div className="text-center md:text-left flex-grow">
                  <h3 className="text-xl font-bold text-foreground">{edu.institution}</h3>
                  <p className="text-lg font-medium text-primary mt-1">{edu.degree}</p>
                </div>
                <Badge variant="secondary" className="text-base px-4 py-1">
                  {edu.year}
                </Badge>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Contact Section */}
      <section id="contact" className="py-24 relative overflow-hidden">
        {/* Background Accents */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent -z-10" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -z-10" />

        <div className="container mx-auto px-4 md:px-6">
          <SectionHeading title="Get In Touch" subtitle="Contact Me" />
          
          <div className="max-w-3xl mx-auto">
            {/* Contact Info */}
            <div className="space-y-8 text-center">
              <p className="text-xl text-muted-foreground">
                Whether you have a question about my projects, want to collaborate on a robotics initiative, or just want to say hi, I'd love to hear from you.
              </p>
              
              <div className="grid sm:grid-cols-3 gap-8 pt-4">
                <div className="flex flex-col items-center gap-4">
                  <div className="p-4 bg-primary/10 rounded-2xl text-primary">
                    <Mail className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Email</h4>
                    <a href="mailto:tarunkotian10@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">
                      tarunkotian10@gmail.com
                    </a>
                  </div>
                </div>
                
                <div className="flex flex-col items-center gap-4">
                  <div className="p-4 bg-accent/10 rounded-2xl text-accent">
                    <Phone className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Phone</h4>
                    <a href="tel:+918618447140" className="text-muted-foreground hover:text-primary transition-colors">
                      +91 8618447140
                    </a>
                  </div>
                </div>

                <div className="flex flex-col items-center gap-4">
                  <div className="p-4 bg-secondary/10 rounded-2xl text-secondary">
                    <MapPin className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Location</h4>
                    <p className="text-muted-foreground">Mangalore, Karnataka, India</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="py-8 border-t border-border bg-background text-center">
        <div className="container mx-auto px-4">
          <p className="text-muted-foreground">
            © {new Date().getFullYear()} Tarun Kumar. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
