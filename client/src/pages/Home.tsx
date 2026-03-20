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

// Animated Background Component
const FloatingBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
    <div className="absolute inset-0 bg-background" />
    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
  </div>
);



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
    <div className="min-h-screen bg-mesh text-foreground font-sans selection:bg-primary/30">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-[60] origin-left"
        style={{ scaleX }}
      />
      <Navigation />
      
      {/* Hero Section */}
      <section 
        id="hero" 
        className="relative min-h-screen flex items-center pt-20 overflow-hidden"
      >
        <FloatingBackground />
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div 
              variants={itemVariants} 
              className="inline-block mb-6 px-4 py-1.5 rounded-full glass border border-white/20 text-primary font-semibold text-sm tracking-wide"
            >
              <span className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                Robotics & Automation Engineer
              </span>
            </motion.div>
            
            <motion.h1 
              variants={itemVariants} 
              className="text-6xl md:text-8xl font-display font-bold mb-8 tracking-tight leading-[1.1] text-white"
            >
              Building the future of <br/>
              <span className="text-white/40 drop-shadow-none">
                Autonomous Systems
              </span>
            </motion.h1>
            
            <motion.p 
              variants={itemVariants} 
              className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed font-light"
            >
              Hi, I'm <span className="font-medium text-white">Tarun Kumar</span>. 
              I engineer <span className="text-primary font-medium">intelligent machines</span> that bridge the gap between imagination and physical reality.
            </motion.p>
            
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Button 
                  size="lg" 
                  className="h-14 px-10 text-lg rounded-2xl bg-primary hover:bg-primary/90 transition-all duration-300 shadow-lg" 
                  asChild
                >
                  <ScrollLink to="projects" smooth={true} duration={500} offset={-100} className="cursor-pointer">
                    View My Work <Cpu className="ml-2 w-5 h-5" />
                  </ScrollLink>
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="h-14 px-10 text-lg rounded-2xl border-white/10 glass hover:bg-white/10 transition-all duration-300" 
                  asChild
                >
                  <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                    Download Resume <Download className="ml-2 w-5 h-5" />
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
              <div className="aspect-square rounded-3xl overflow-hidden glass border-white/20 relative z-10 shadow-2xl">
                <img 
                  src={profileImg} 
                  alt="Tarun Kumar" 
                  className="w-full h-full object-cover scale-110 hover:scale-125 transition-transform duration-700"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 w-full h-full border-4 border-primary/20 rounded-3xl -z-10 animate-float" />
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
                <Button variant="outline" className="rounded-xl border-white/10 glass hover:bg-white/10" asChild>
                  <a href="https://github.com/sudoaptinstalltarun" target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 w-5 h-5" /> GitHub
                  </a>
                </Button>
                <Button variant="outline" className="rounded-xl border-white/10 glass hover:bg-white/10" asChild>
                  <a href="https://linkedin.com/in/tarun-kumar-885542282" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="mr-2 w-5 h-5" /> LinkedIn
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
                    className="flex items-center gap-4 glass p-4 rounded-2xl border-white/5 hover:border-white/20 transition-colors"
                  >
                    <div className={`p-3 bg-white/5 rounded-xl ${item.color}`}><item.icon className="w-6 h-6"/></div>
                    <span className="font-bold text-sm tracking-tight">{item.label}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Open Source Callout */}
      <section className="py-12 relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass border-green-500/20 bg-green-500/5 p-8 rounded-[2rem] flex flex-col md:flex-row items-center justify-between gap-8 border-l-8 border-l-green-500 shadow-2xl shadow-green-500/5"
          >
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-green-500/10 rounded-2xl flex items-center justify-center border border-green-500/20">
                <Github className="w-8 h-8 text-green-500" />
              </div>
              <div className="space-y-1">
                <h3 className="text-2xl font-display font-black text-white italic">Open Source Contributor</h3>
                <p className="text-muted-foreground/80 font-light italic">
                  Improved Costmap2D parameter documentation in <span className="text-green-400 font-bold">ros-navigation/docs.nav2.org</span> · March 2025
                </p>
              </div>
            </div>
            <Button className="rounded-xl bg-green-500 hover:bg-green-600 text-white font-bold px-8 h-12 shadow-lg shadow-green-500/20 transition-all hover:scale-105" asChild>
              <a href="https://github.com/ros-navigation/docs.nav2.org" target="_blank" rel="noopener noreferrer">
                View Contribution
              </a>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-32 bg-white/3">
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
                whileHover={{ y: -5 }}
                className="glass p-8 rounded-3xl border-white/10 hover:border-primary/40 transition-all duration-500 shadow-xl"
              >
                <h3 className="text-2xl font-display font-black mb-6 text-primary tracking-tight italic">{skillGroup.category}</h3>
                <div className="flex flex-wrap gap-3">
                  {skillGroup.items.map((skill: string) => (
                    <Badge key={skill} variant="outline" className="text-xs py-2 px-4 glass border-white/5 hover:bg-primary hover:text-white transition-colors uppercase font-bold tracking-widest text-muted-foreground/80">
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
                whileHover={{ y: -5 }}
                className="group relative bg-white/[0.02] border border-white/5 p-8 rounded-3xl hover:bg-white/[0.04] transition-all duration-300 text-center flex flex-col items-center gap-6"
              >
                <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary/10 transition-colors">
                  <cert.icon className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-xl font-display font-bold text-white mb-2 leading-tight">{cert.title}</h4>
                  <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest">{cert.issuer}</p>
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
      <section id="projects" className="py-32 bg-white/3">
        <div className="container mx-auto px-4 md:px-6">
          <SectionHeading title="Featured Projects" subtitle="What I've Built" />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            {projects.map((project: any, index: number) => (
              <ProjectCard key={project.id} project={project} index={index} />
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
                whileHover={{ scale: 1.02 }}
                className="flex flex-col md:flex-row items-center md:items-start gap-8 glass p-8 rounded-3xl border-white/10 shadow-2xl hover:border-primary/50 transition-all"
              >
                <div className="p-5 bg-primary/10 rounded-2xl text-primary shadow-inner">
                  <GraduationCap className="w-10 h-10" />
                </div>
                <div className="text-center md:text-left flex-grow">
                  <h3 className="text-2xl font-display font-black text-white mb-2">{edu.institution}</h3>
                  <p className="text-xl font-medium text-primary/80 uppercase tracking-wider text-sm font-bold">{edu.degree}</p>
                </div>
                <Badge variant="secondary" className="text-sm font-black px-6 py-2 glass border-white/20 text-white rounded-full">
                  {edu.year}
                </Badge>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 relative overflow-hidden">
        {/* Decorative Background for Contact */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 blur-[120px] -z-10" />
        <div className="absolute bottom-0 left-0 w-1/2 h-full bg-accent/5 blur-[120px] -z-10" />

        <div className="container mx-auto px-4 md:px-6">
          <SectionHeading title="Get In Touch" subtitle="Contact Me" />
          
          <div className="max-w-5xl mx-auto glass p-12 md:p-16 rounded-[3rem] border-white/10 shadow-3xl text-center">
            <div className="space-y-12">
              <p className="text-2xl text-muted-foreground font-light max-w-2xl mx-auto leading-relaxed">
                Whether you have a question about my projects, want to collaborate on a robotics initiative, or just want to say hi, I'd love to hear from you.
              </p>
              
              <div className="grid sm:grid-cols-3 gap-12 pt-8">
                {[
                  { icon: Mail, label: "Email", info: "tarunkotian10@gmail.com", href: "mailto:tarunkotian10@gmail.com", color: "text-primary" },
                  { icon: Phone, label: "Phone", info: "+91 8618447140", href: "tel:+918618447140", color: "text-accent" },
                  { icon: MapPin, label: "Location", info: "Mangalore, KA, India", href: "#", color: "text-blue-400" }
                ].map((item, i) => (
                  <motion.div 
                    key={item.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex flex-col items-center gap-6 group"
                  >
                    <div className={`p-6 bg-white/5 rounded-3xl ${item.color} group-hover:scale-110 transition-transform duration-300 shadow-xl border border-white/5 group-hover:border-white/20`}>
                      <item.icon className="w-10 h-10" />
                    </div>
                    <div>
                      <h4 className="font-black text-xs uppercase tracking-[0.2em] mb-2 opacity-50">{item.label}</h4>
                      <a href={item.href} className="text-lg font-bold text-white hover:text-primary transition-colors whitespace-nowrap">
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
