import { motion, useMotionTemplate, useMotionValue, useScroll, useSpring } from "framer-motion";
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
  GraduationCap,
  Terminal
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
import { MermaidDiagram } from "@/components/ui/MermaidDiagram";
import { engineeringProjects } from "@/data/projects";
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

// Minimalist setup
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

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-foreground/20 z-[60] origin-left"
        style={{ scaleX }}
      />
      <Navigation />
      
      {/* Hero Section */}
      <section 
        id="hero" 
        className="relative min-h-screen flex items-center pt-20"
      >
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div 
              variants={itemVariants} 
              className="inline-block mb-6 px-4 py-1.5 rounded-sm border border-border text-primary font-mono text-sm tracking-widest uppercase font-bold bg-primary/5"
            >
              ROS2 Developer | Autonomous Robotics Engineer
            </motion.div>
            
            <motion.h1 
              variants={itemVariants} 
              className="text-6xl md:text-8xl font-display font-semibold mb-8 tracking-tighter leading-[1.0] text-foreground"
            >
              Tarun <span className="text-white">Kumar</span>
            </motion.h1>
            
            <motion.p 
              variants={itemVariants} 
              className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed font-light"
            >
              I build autonomous robotic systems using <span className="text-white font-mono text-[1.1rem]">ROS2, Nav2, and SLAM</span> — from simulation to real-world deployment. Currently actively contributing to <span className="text-accent font-medium">ROS2 Navigation2 (Nav2)</span>, with merged pull requests improving system configuration and usability for the robotics community.
            </motion.p>
            
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Button 
                  size="lg" 
                  className="h-14 px-10 text-lg rounded-sm bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 shadow-none font-mono font-bold tracking-widest uppercase" 
                  asChild
                >
                  <ScrollLink to="projects" smooth={true} duration={500} offset={-100} className="cursor-pointer">
                    View Featured Work
                  </ScrollLink>
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="h-14 px-10 text-lg rounded-sm border border-border bg-transparent hover:border-accent hover:text-accent transition-all duration-300 shadow-none font-mono font-bold tracking-widest uppercase text-white" 
                  asChild
                >
                  <a href="https://github.com/sudoaptinstalltarun" target="_blank" rel="noopener noreferrer">
                    <Github className="mr-3 w-5 h-5" /> GitHub Profile
                  </a>
                </Button>
            </motion.div>

            <motion.div variants={itemVariants} className="mt-16 flex justify-center gap-8 text-muted-foreground/60">
              <a href="https://github.com/sudoaptinstalltarun" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-all hover:scale-125">
                <Github className="w-7 h-7" />
              </a>
              <a href="https://www.linkedin.com/in/tarun-kumar-885542282/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-all hover:scale-125">
                <Linkedin className="w-7 h-7" />
              </a>
              <a href="mailto:tarunkotian10@gmail.com" className="hover:text-primary transition-all hover:scale-125">
                <Mail className="w-7 h-7" />
              </a>
            </motion.div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-muted-foreground/30"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Scroll</span>
            <ChevronDown className="w-6 h-6 animate-bounce" />
          </div>
        </motion.div>
      </section>
      {/* About Section */}
      <section id="about" className="py-32 relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="aspect-square rounded-md overflow-hidden border border-border relative z-10 grayscale hover:grayscale-0 transition-all duration-700 bg-secondary/10">
                <img 
                  src={profileImg} 
                  alt="Tarun Kumar" 
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            <div className="space-y-8">
              <SectionHeading title="About Me" alignment="left" subtitle="Who I Am" />
              <p className="text-xl text-muted-foreground leading-relaxed font-light">
                I'm a <span className="text-primary font-bold italic">3rd year Robotics & Automation Engineering</span> student at Sahyadri College, Mangaluru. I build autonomous systems that actually move — <span className="text-white font-medium">ROS2 navigation stacks, UAV control systems, and embedded robotics</span>.
              </p>
              <p className="text-xl text-muted-foreground leading-relaxed font-light">
                I spent time as a research intern at <span className="text-white font-medium">NIT Karnataka</span> working on UAV launcher systems, and recently made my first open source contribution to <span className="text-accent font-medium italic">ros-navigation</span>. Currently looking for internship opportunities in robotics and autonomous systems.
              </p>
              
              <div className="flex flex-wrap gap-4 pt-4">
                <Button variant="outline" className="rounded-sm border border-border text-white bg-transparent hover:border-accent hover:text-accent shadow-none font-mono tracking-widest uppercase font-bold px-6 h-12" asChild>
                  <a href="https://github.com/sudoaptinstalltarun" target="_blank" rel="noopener noreferrer">
                    <Github className="mr-3 w-5 h-5" /> GitHub
                  </a>
                </Button>
                <Button variant="outline" className="rounded-sm border border-border text-white bg-transparent hover:border-primary hover:text-primary shadow-none font-mono tracking-widest uppercase font-bold px-6 h-12" asChild>
                  <a href="https://linkedin.com/in/tarun-kumar-885542282" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="mr-3 w-5 h-5" /> LinkedIn
                  </a>
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-6 pt-6">
                {[
                  { icon: Plane, label: "UAV Systems", color: "text-blue-400" },
                  { icon: Code2, label: "Embedded Systems", color: "text-accent" },
                  { icon: Cpu, label: "Robotics", color: "text-primary" },
                  { icon: Database, label: "Automation", color: "text-green-400" }
                ].map((item, i) => (
                  <motion.div 
                    key={item.label}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-4 bg-secondary/10 p-4 rounded-md border border-border hover:border-primary/50 transition-colors"
                  >
                    <div className={`p-3 bg-black/40 rounded-sm border border-border ${item.color}`}><item.icon className="w-5 h-5"/></div>
                    <span className="font-bold text-sm tracking-tight font-mono uppercase text-muted-foreground">{item.label}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Open Source Contributions */}
      <section id="open-source" className="py-32 relative overflow-hidden bg-white/[0.01] border-y border-border">
        <div className="container mx-auto px-4 md:px-6">
          <SectionHeading title="Open Source Contributions" subtitle="Verification and Trust" alignment="left" />
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 border border-border bg-black/40 p-10 md:p-14 rounded-md flex flex-col md:flex-row justify-between gap-10 items-start md:items-center relative overflow-hidden group hover:border-accent/40 transition-colors"
          >
            <div className="absolute top-0 left-0 w-1.5 h-full bg-accent group-hover:w-2 transition-all"></div>
            
            <div className="space-y-6 max-w-3xl">
              <div className="flex items-center gap-4">
                <Github className="w-8 h-8 text-foreground" />
                <h3 className="text-3xl font-display font-semibold text-foreground tracking-tight">ROS2 Navigation2 (Nav2)</h3>
              </div>
              
              <ul className="space-y-4 text-lg text-muted-foreground list-none ml-1">
                <li className="flex items-start">
                  <span className="text-accent font-bold mr-4 mt-0.5">&gt;</span>
                  <span>Improved <span className="font-mono text-white text-[1rem] bg-white/5 px-1.5 py-0.5 rounded mx-1">Costmap2D</span> parameter documentation within the core Nav2 stack.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent font-bold mr-4 mt-0.5">&gt;</span>
                  <span>Added engineering clarity on configuration trade-offs for autonomous navigation tuning.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent font-bold mr-4 mt-0.5">&gt;</span>
                  <span className="text-white">Pull request reviewed and merged by the core Nav2 maintainer.</span>
                </li>
              </ul>
            </div>
            
            <Button variant="outline" className="rounded-sm border-border bg-transparent shrink-0 text-white font-mono font-bold tracking-wide hover:border-accent hover:text-accent transition-all h-14 px-8" asChild>
              <a href="https://github.com/ros-navigation/docs.nav2.org" target="_blank" rel="noopener noreferrer">
                [View Merged PR ↗]
              </a>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-32">
        <div className="container mx-auto px-4 md:px-6">
          <SectionHeading title="Technical Expertise" subtitle="My Toolkit" />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {skills.map((skillGroup: any, idx: number) => (
              <motion.div
                key={skillGroup.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-8 rounded-md border border-border bg-secondary/10 hover:border-primary/50 transition-colors"
              >
                <h3 className="text-xl font-display font-semibold mb-6 text-foreground tracking-tight">{skillGroup.category}</h3>
                <div className="flex flex-wrap gap-3">
                  {skillGroup.items.map((skill: string) => (
                    <Badge key={skill} variant="outline" className="text-xs py-2 px-4 border border-border hover:border-primary hover:text-primary transition-colors uppercase font-mono tracking-widest text-muted-foreground bg-black/40">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="py-32 relative">
        <div className="container mx-auto px-4 md:px-6">
          <SectionHeading title="Certifications" subtitle="Professional Recognition" />
                   <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
            {[
              { title: "SOLIDWORKS CSWA", issuer: "CAD Design Associate", icon: Cpu },
              { title: "MATLAB Onramp", issuer: "MathWorks", icon: Code2 },
              { title: "Simulink Onramp", issuer: "MathWorks", icon: Plane },
              { title: "Python Foundation", issuer: "Certification", icon: Database }
            ].map((cert, i) => (
              <motion.div
                key={cert.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-md border border-border bg-secondary/10 hover:border-primary/50 transition-colors flex flex-col items-center text-center gap-6"
              >
                <div className="w-16 h-16 bg-black/50 border border-border rounded-sm flex items-center justify-center text-primary group-hover:text-accent transition-colors">
                  <cert.icon className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-xl font-display font-bold text-foreground mb-3 leading-tight tracking-tight">{cert.title}</h4>
                  <p className="text-xs font-mono font-bold text-muted-foreground uppercase tracking-widest">{cert.issuer}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-32">
        <div className="container mx-auto px-4 md:px-6">
          <SectionHeading title="Professional Journey" subtitle="Experience" />
          
          <div className="max-w-4xl mx-auto">
            <ExperienceTimeline experiences={experience} />
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-32">
        <div className="container mx-auto px-4 md:px-6">
          <SectionHeading title="Technical Project Portfolio" subtitle="The Core" alignment="left" />
          
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 mt-16">
            {engineeringProjects.map((project, idx) => (
              <div key={project.id} className="flex flex-col border border-border rounded-md bg-secondary/10 overflow-hidden shadow-none transition-all hover:border-border/80">
                <div className="p-6 md:p-10 border-b border-border bg-black/20 flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-4 tracking-tight">{project.title}</h3>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.stack.map(tag => (
                        <Badge key={tag} className="font-mono bg-white/5 border border-white/10 text-primary-foreground px-3 py-1 rounded-sm text-[10px] sm:text-xs transition-colors uppercase tracking-widest font-bold">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="border-l-4 border-primary pl-4 py-1 mb-6">
                    <p className="text-lg text-muted-foreground font-light italic leading-relaxed">
                      "{project.description}"
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-bold font-mono text-primary mb-4 uppercase tracking-widest border-b border-primary/20 pb-2 inline-block">Engineering Execution</h4>
                    <ul className="space-y-4 text-muted-foreground text-base">
                      {project.engineering.map((bullet, i) => (
                        <li key={i} className="flex items-start">
                          <span className="text-primary font-mono mr-3 font-bold mt-0.5">0{i+1}_</span>
                          <span className="leading-snug">{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="p-6 md:p-10 bg-black/40 flex-grow flex flex-col items-start border-b border-border">
                  <h4 className="text-sm font-bold font-mono text-accent mb-6 uppercase tracking-widest border-b border-accent/20 pb-2 inline-block">System Architecture</h4>
                  <div className="w-full h-full flex items-center justify-center">
                    <MermaidDiagram chart={project.mermaid} />
                  </div>
                </div>
                
                <div className="p-5 md:p-8 bg-black/60 flex flex-wrap gap-4 mt-auto">
                    {project.buttons.map((btn, i) => (
                      <Button key={i} variant={i === 0 ? "default" : "outline"} className={`rounded-sm font-mono font-bold tracking-wide h-12 px-6 ${i === 0 ? "bg-primary text-primary-foreground shadow-none" : "border-border text-white bg-transparent hover:border-accent hover:text-accent shadow-none"}`}>
                        {btn.label}
                      </Button>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-32">
        <div className="container mx-auto px-4 md:px-6">
          <SectionHeading title="Education" subtitle="Academic Background" />
          
          <div className="max-w-4xl mx-auto grid gap-8">
            {education.map((edu, idx) => (
              <motion.div
                key={edu.id}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="flex flex-col md:flex-row items-center md:items-start gap-8 p-8 rounded-md border border-border bg-secondary/10 hover:border-primary/50 transition-colors"
              >
                <div className="p-5 bg-black/40 border border-border rounded-sm">
                  <GraduationCap className="w-8 h-8 text-primary" />
                </div>
                <div className="text-center md:text-left flex-grow">
                  <h3 className="text-2xl font-display font-bold text-foreground mb-3 tracking-tight">{edu.institution}</h3>
                  <p className="text-muted-foreground uppercase tracking-widest text-sm font-mono font-bold">{edu.degree}</p>
                </div>
                <Badge variant="outline" className="text-xs font-mono font-bold px-5 py-2 border border-border bg-black/40 text-muted-foreground rounded-sm tracking-widest">
                  {edu.year}
                </Badge>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32">
        <div className="container mx-auto px-4 md:px-6">
          <SectionHeading title="System Initialization" subtitle="Contact Node" />
          
          <div className="max-w-5xl mx-auto border border-border p-12 md:p-16 rounded-md bg-secondary/10 text-center hover:border-primary/50 transition-colors group">
            <div className="space-y-12">
              <p className="text-xl text-muted-foreground font-light max-w-3xl mx-auto leading-relaxed">
                Whether you have a question about my <span className="text-white font-medium">autonomous navigation projects</span>, want to collaborate on a <span className="text-accent font-medium">ROS2</span> initiative, or are offering an <span className="text-primary font-medium">engineering internship</span>, initialize a connection sequence.
              </p>
              
              <div className="grid sm:grid-cols-3 gap-8 pt-6">
                {[
                  { icon: Mail, label: "COMM_TX", info: "tarunkotian10@gmail.com", href: "mailto:tarunkotian10@gmail.com", color: "text-primary" },
                  { icon: Phone, label: "VOICE_LINK", info: "+91 8618447140", href: "tel:+918618447140", color: "text-accent" },
                  { icon: MapPin, label: "COORD_XY", info: "Mangalore, IND", href: "#", color: "text-muted-foreground" }
                ].map((item, i) => (
                  <motion.div 
                    key={item.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex flex-col items-center gap-6 p-8 border border-border rounded-sm bg-black/40 hover:border-accent/50 transition-colors"
                  >
                    <div className="p-4 bg-black/60 border border-border rounded-sm">
                      <item.icon className="w-6 h-6 text-foreground" />
                    </div>
                    <div>
                      <h4 className="font-mono text-xs uppercase tracking-widest mb-3 text-muted-foreground font-bold">{item.label}</h4>
                      <a href={item.href} className="text-sm sm:text-base font-bold text-foreground hover:text-primary transition-colors whitespace-nowrap">
                        {item.info}
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border bg-[#050505]">
        <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 flex items-center justify-center bg-primary rounded-sm">
              <Terminal className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-mono font-bold text-lg tracking-widest text-foreground uppercase">
              Tarun_K
            </span>
          </div>
          
          <div className="flex items-center gap-6">
            <a href="https://github.com/sudoaptinstalltarun" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-white transition-colors">
              <Github className="w-5 h-5" />
            </a>
            <a href="https://www.linkedin.com/in/tarun-kumar-885542282/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-white transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
            <Button variant="outline" size="sm" className="rounded-sm border border-border text-white bg-transparent hover:border-accent hover:text-accent font-mono font-bold tracking-widest uppercase ml-4" asChild>
              <a href="mailto:tarunkotian10@gmail.com">
                Email
              </a>
            </Button>
          </div>
          
          <p className="text-muted-foreground text-xs font-mono tracking-widest uppercase">
            © {new Date().getFullYear()} // System Offline
          </p>
        </div>
      </footer>
    </div>
  );
}
