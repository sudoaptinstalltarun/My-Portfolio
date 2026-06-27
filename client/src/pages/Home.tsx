import { motion, useScroll, useSpring } from "framer-motion";
import { Link as ScrollLink } from "react-scroll";
import { 
  Download, 
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
  Terminal,
  ExternalLink
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
import { engineeringProjects, EngineeringProject } from "@/data/projects";
import { InteractiveTerminal } from "@/components/InteractiveTerminal";
import { ProjectModal } from "@/components/ProjectModal";
import { useState } from "react";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { PidSimulator } from "@/components/PidSimulator";
import { PathVisualizer } from "@/components/PathVisualizer";
import { CaseStudiesSection } from "@/components/CaseStudiesSection";
import { HardwareGallery } from "@/components/HardwareGallery";
import { 
  useSkills, 
  useExperience, 
  useEducation, 
  useCertifications,
  useContact 
} from "@/hooks/use-portfolio";
import profileImg from "@assets/482024-01-25_15-28-17_1771426037578.jpg";

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

export default function Home() {
  const { data: skills = [] } = useSkills();
  const { data: experience = [] } = useExperience();
  const { data: education = [] } = useEducation();
  const { data: certifications = [] } = useCertifications();
  const { mutate: sendMessage, isPending } = useContact();

  const [selectedProject, setSelectedProject] = useState<EngineeringProject | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sandboxTab, setSandboxTab] = useState<"pid" | "astar" | "hardware" | "research">("pid");
  const [contactSuccess, setContactSuccess] = useState(false);
  const [contactLog, setContactLog] = useState<string[]>([]);

  const openProjectDetails = (project: EngineeringProject) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const form = useForm<InsertContactMessage>({
    resolver: zodResolver(insertContactMessageSchema),
    defaultValues: { name: "", email: "", message: "" }
  });

  const onSubmit = (data: InsertContactMessage) => {
    setContactSuccess(true);
    setContactLog(["[SYSTEM] Initializing secure transmit sequence...", "[TX_NODE] Locating recipient: tarunkotian10@gmail.com..."]);

    setTimeout(() => {
      setContactLog((prev) => [...prev, "[TX_NODE] Connecting via SSL to remote host...", "[PAYLOAD] Preparing envelope data packet..."]);
    }, 800);

    sendMessage(data, {
      onSuccess: () => {
        setTimeout(() => {
          setContactLog((prev) => [...prev, "[OK] Secure envelope sent successfully!", "[SYSTEM] Dispatch complete. Connection terminated.", "// System Offline"]);
          setTimeout(() => {
            setContactSuccess(false);
            setContactLog([]);
            form.reset();
          }, 3000);
        }, 1600);
      },
      onError: () => {
        setContactLog((prev) => [...prev, "[ERROR] Transmission failure. System packet dropped.", "Please email directly: tarunkotian10@gmail.com"]);
        setTimeout(() => {
          setContactSuccess(false);
          setContactLog([]);
        }, 5000);
      }
    });
  };

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-white/10 selection:text-white">
      <motion.div
        className="fixed top-0 left-0 right-0 h-0.5 bg-primary/40 z-[60] origin-left"
        style={{ scaleX }}
      />
      
      <Navigation />
      
      {/* 01 / ABOUT SECTION */}
      <div id="about">
        {/* Landing Hero Section */}
        <section 
          id="hero" 
          className="relative min-h-screen flex items-center pt-24 pb-16"
        >
          <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-5xl">
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid lg:grid-cols-12 gap-12 items-center"
            >
              {/* Hero text credentials (col-span-7) */}
              <div className="lg:col-span-7 space-y-8 text-left">
                <motion.div 
                  variants={itemVariants} 
                  className="inline-block px-3 py-1 border border-white/[0.06] text-primary font-mono text-[10px] tracking-widest uppercase font-semibold bg-white/[0.02] rounded-sm"
                >
                  [ 00 // SYSTEM_INIT ]
                </motion.div>
                
                <motion.h1 
                  variants={itemVariants} 
                  className="text-5xl md:text-7xl font-display font-light tracking-tighter leading-none text-white"
                >
                  Tarun <span className="font-bold text-primary">Kumar</span>
                </motion.h1>
                
                <motion.p 
                  variants={itemVariants} 
                  className="text-lg md:text-xl text-muted-foreground font-light leading-relaxed max-w-2xl"
                >
                  I build autonomous robotic systems using <span className="text-white font-mono">ROS2, Nav2, and SLAM</span> — from physics simulation to physical hardware deployment. Active contributor to the official <span className="text-primary font-medium">ROS2 Navigation2</span> stack.
                </motion.p>
                
                <motion.div variants={itemVariants} className="flex flex-wrap gap-4 select-none">
                  <Button 
                    size="sm" 
                    className="h-10 rounded-full px-6 text-xs font-mono tracking-wider uppercase bg-white text-black hover:bg-white/90 transition-all shadow-none" 
                    asChild
                  >
                    <ScrollLink to="projects" smooth={true} duration={500} offset={-80} className="cursor-pointer">
                      View Projects
                    </ScrollLink>
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="h-10 rounded-full px-6 text-xs font-mono tracking-wider uppercase border-white/[0.08] text-white bg-transparent hover:bg-white/5 transition-all shadow-none" 
                    asChild
                  >
                    <ScrollLink to="simulators" smooth={true} duration={500} offset={-80} className="cursor-pointer">
                      Try Simulators
                    </ScrollLink>
                  </Button>
                </motion.div>
              </div>

              {/* Terminal Column (col-span-5) */}
              <motion.div 
                variants={itemVariants} 
                className="lg:col-span-5 w-full"
              >
                <InteractiveTerminal />
              </motion.div>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 text-muted-foreground select-none"
          >
            <div className="flex flex-col items-center gap-1">
              <span className="text-[9px] uppercase tracking-[0.2em] font-mono">Scroll</span>
              <ChevronDown className="w-4 h-4 animate-bounce" />
            </div>
          </motion.div>
        </section>

        {/* Dossier Dossier Details (Bio, Skills, Education) */}
        <section className="py-24 border-t border-b border-white/[0.04]">
          <div className="container mx-auto px-4 md:px-6 max-w-5xl">
            
            {/* Top Grid: Profile Bio & Focus Buttons */}
            <div className="grid lg:grid-cols-12 gap-12 items-center pb-12 border-b border-white/[0.04]">
              {/* Profile Bio (col-span-7) */}
              <div className="lg:col-span-7 flex flex-col sm:flex-row gap-8 items-start">
                <div className="w-28 h-28 rounded-full overflow-hidden border border-white/[0.08] grayscale hover:grayscale-0 transition-all duration-700 shrink-0 bg-secondary mx-auto sm:mx-0">
                  <img 
                    src={profileImg} 
                    alt="Tarun Kumar" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-4 text-center sm:text-left">
                  <h3 className="text-xl font-display font-medium text-white">Tarun Kumar</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed font-light">
                    I'm a 4th year Robotics & Automation Engineering student at Sahyadri College, Mangaluru. I focus on autonomous vehicles, SLAM, flight kinematics, and embedded computing. My research includes UAV design optimization and FEA simulation during my NIT Karnataka internship.
                  </p>
                  <div className="flex justify-center sm:justify-start gap-4 pt-1 text-muted-foreground select-none">
                    <a href="https://github.com/sudoaptinstalltarun" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                      <Github className="w-4 h-4" />
                    </a>
                    <a href="https://www.linkedin.com/in/tarun-kumar-885542282/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                      <Linkedin className="w-4 h-4" />
                    </a>
                    <a href="mailto:tarunkotian10@gmail.com" className="hover:text-white transition-colors">
                      <Mail className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Focus Buttons (col-span-5) */}
              <div className="lg:col-span-5 grid grid-cols-2 gap-4 select-none">
                {[
                  { icon: Plane, label: "UAV Systems" },
                  { icon: Code2, label: "Embedded Systems" },
                  { icon: Cpu, label: "Robotics" },
                  { icon: Database, label: "Automation" }
                ].map((item) => (
                  <div 
                    key={item.label}
                    className="flex items-center gap-3 bg-white/[0.02] p-3 rounded border border-white/[0.03] hover:border-white/[0.08] transition-colors"
                  >
                    <item.icon className="w-4 h-4 text-primary shrink-0" />
                    <span className="font-mono text-[10px] uppercase text-muted-foreground tracking-wider">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Technical Skills Stack */}
            <div className="pt-12 space-y-4">
              <span className="font-mono text-[10px] tracking-wider text-muted-foreground uppercase block">// Technical Skills</span>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {skills.map((skillGroup: any) => (
                  <div 
                    key={skillGroup.id} 
                    className="border border-white/[0.05] rounded-lg p-5 bg-black/40 space-y-3 hover:border-white/[0.1] transition-colors flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <h5 className="font-mono text-[9px] uppercase text-primary font-bold tracking-wider">{skillGroup.category}</h5>
                      <div className="flex flex-wrap gap-1.5">
                        {skillGroup.items.map((skill: string) => (
                          <span key={skill} className="text-[9px] font-mono text-muted-foreground bg-white/5 border border-white/[0.02] px-2 py-0.5 rounded-sm">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Education Stack */}
            <div className="pt-12 space-y-4">
              <span className="font-mono text-[10px] tracking-wider text-muted-foreground uppercase block">// Education</span>
              <div className="border border-white/[0.05] rounded-lg bg-black/40 divide-y divide-white/[0.05]">
                {education.map((edu: any) => (
                  <div key={edu.id} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h5 className="text-sm font-semibold text-white tracking-tight leading-tight">{edu.institution}</h5>
                      <p className="text-[10px] font-mono text-muted-foreground uppercase mt-1 tracking-tight">{edu.degree}</p>
                    </div>
                    <span className="text-[10px] font-mono text-primary font-bold shrink-0">{edu.year}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications Stack */}
            <div className="pt-12 space-y-4">
              <span className="font-mono text-[10px] tracking-wider text-muted-foreground uppercase block">// Certifications</span>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {certifications.map((cert: any) => (
                  <div 
                    key={cert.id} 
                    className="border border-white/[0.05] rounded-lg p-5 bg-black/40 hover:border-white/[0.1] transition-colors flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <span className="text-xs font-medium text-white block leading-snug">{cert.title}</span>
                      <span className="text-[9px] font-mono text-muted-foreground uppercase block tracking-tight">{cert.issuer}</span>
                    </div>
                    <div className="pt-4 border-t border-white/[0.02] mt-4 flex items-center justify-between">
                      {cert.credentialId && (
                        <span className="text-[8px] font-mono text-muted-foreground/60">{cert.credentialId}</span>
                      )}
                      <span className="text-[9px] font-mono text-primary font-bold ml-auto">{cert.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* 02 / EXPERIENCE SECTION */}
      <section id="experience" className="py-24 border-b border-white/[0.04]">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <SectionHeading title="Work Experience" subtitle="Professional Timeline" alignment="left" />
          
          <div className="grid lg:grid-cols-12 gap-12 items-start mt-8">
            <div className="lg:col-span-8">
              <ExperienceTimeline experiences={experience} />
            </div>
            
            {/* Sidebar Highlighting ROS2 contribution */}
            <div className="lg:col-span-4 space-y-6">
              <div className="p-6 rounded-lg border border-white/[0.06] bg-black/40 relative overflow-hidden group hover:border-primary/30 transition-all duration-300">
                <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
                <span className="font-mono text-[9px] tracking-widest text-primary uppercase font-bold block mb-3">
                  // Featured Contribution
                </span>
                <h4 className="text-base font-display text-white font-semibold tracking-tight mb-2 flex items-center gap-2">
                  ros-navigation / nav2
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed font-light mb-4">
                  Contributed downstream parameter settings and Costmap2D obstacle boundary guides for the core ROS2 Nav2 stack, merged into the official release documentation.
                </p>
                <a 
                  href="https://github.com/ros-navigation/docs.nav2.org" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="font-mono text-[10px] text-white hover:text-primary transition-colors flex items-center gap-1 select-none"
                >
                  [ View Merged PR ↗ ]
                </a>
              </div>

              {/* Print resume */}
              <div className="p-6 rounded-lg border border-white/[0.06] bg-[#0c0c0c] flex items-center justify-between">
                <div className="space-y-1">
                  <h5 className="text-[10px] font-mono font-bold text-white uppercase tracking-wider">resume_print.pdf</h5>
                  <p className="text-[9px] text-muted-foreground font-light">Complete technical details</p>
                </div>
                <Button size="sm" variant="outline" className="h-8 rounded-full px-4 border-white/[0.08] text-white hover:bg-white/5 font-mono text-[9px] tracking-wider uppercase select-none shadow-none" asChild>
                  <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                    <Download className="w-3.5 h-3.5 mr-2" /> Download
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 03 / PROJECTS SECTION */}
      <section id="projects" className="py-24 border-b border-white/[0.04]">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <SectionHeading title="Featured Projects" subtitle="Robotics & UAV Systems" alignment="left" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
            {engineeringProjects.map((project) => (
              <div 
                key={project.id} 
                className="flex flex-col border border-white/[0.05] rounded-lg bg-black/20 overflow-hidden hover:border-primary/[0.15] transition-all duration-300 cursor-pointer group"
                onClick={() => openProjectDetails(project)}
              >
                <div className="p-6 flex flex-col justify-between flex-grow">
                  <div className="space-y-4">
                    <div className="flex justify-between items-start gap-4">
                      <h3 className="text-lg font-display font-semibold text-white group-hover:text-primary transition-colors leading-tight">
                        {project.title}
                      </h3>
                      <Badge className="font-mono bg-white/5 border border-white/10 text-muted-foreground px-2 py-0.5 rounded-sm text-[8px] uppercase tracking-wider shrink-0 select-none">
                        Active Node
                      </Badge>
                    </div>
                    
                    <div className="flex flex-wrap gap-1">
                      {project.stack.slice(0, 4).map(tag => (
                        <span key={tag} className="font-mono text-[9px] bg-white/5 border border-white/[0.03] text-muted-foreground px-2 py-0.5 rounded-sm">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground font-light leading-relaxed text-xs my-5">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-white/[0.04] mt-auto select-none">
                    <Button 
                      variant="ghost"
                      size="sm"
                      className="rounded-full font-mono text-[9px] tracking-wider uppercase h-8 px-4 text-white hover:bg-white/5"
                      onClick={(e) => {
                        e.stopPropagation();
                        openProjectDetails(project);
                      }}
                    >
                      Inspect Specs ↗
                    </Button>
                    {project.buttons[0]?.label && (
                      <Button 
                        variant="outline"
                        size="sm"
                        className="rounded-full font-mono text-[9px] tracking-wider uppercase h-8 px-4 border-white/[0.08] text-white hover:bg-white/5"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(project.buttons[0].link || "https://github.com/sudoaptinstalltarun", "_blank", "noopener,noreferrer");
                        }}
                      >
                        {project.buttons[0].label}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 04 / SIMULATORS SECTION */}
      <section id="simulators" className="py-24 border-b border-white/[0.04] bg-white/[0.005]">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <SectionHeading title="Robotics Simulators" subtitle="Interactive PID & Pathfinding" alignment="center" />
          
          {/* Dashboard Tab Bar */}
          <div className="flex flex-wrap justify-center gap-2 mb-10 select-none border-b border-white/[0.05] pb-2 max-w-3xl mx-auto">
            {[
              { id: "pid", label: "01_DRONE_PID" },
              { id: "astar", label: "02_NAV2_ASTAR" },
              { id: "hardware", label: "03_PHYSICAL_GAL" },
              { id: "research", label: "04_RESEARCH_LOG" },
            ].map(tab => (
              <button 
                key={tab.id}
                onClick={() => setSandboxTab(tab.id as any)}
                className={`font-mono text-[10px] tracking-widest uppercase rounded-full h-8 px-5 border transition-all duration-300 ${
                  sandboxTab === tab.id 
                    ? "bg-white text-black border-white shadow-lg" 
                    : "border-white/[0.06] text-muted-foreground bg-transparent hover:text-white hover:border-white/[0.15]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Sandbox content area */}
          <div className="w-full">
            {sandboxTab === "pid" && <PidSimulator />}
            {sandboxTab === "astar" && <PathVisualizer />}
            {sandboxTab === "hardware" && <HardwareGallery />}
            {sandboxTab === "research" && <CaseStudiesSection />}
          </div>
        </div>
      </section>

      {/* 05 / CONTACT SECTION */}
      <section id="contact" className="py-24">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <SectionHeading title="Contact Me" subtitle="Get In Touch" alignment="center" />
          
          <div className="grid lg:grid-cols-12 gap-12 items-stretch mt-8">
            {/* Info Column (col-span-5) */}
            <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
              <div className="space-y-4 text-left">
                <p className="text-sm text-muted-foreground font-light leading-relaxed">
                  Initialize a secure communication connection for internships, open-source coordination, or technical review of autonomous mobile systems.
                </p>
                <div className="divide-y divide-white/[0.05]">
                  {[
                    { icon: Mail, label: "COMM_TX", info: "tarunkotian10@gmail.com", href: "mailto:tarunkotian10@gmail.com" },
                    { icon: Phone, label: "VOICE_LINK", info: "+91 8618447140", href: "tel:+918618447140" },
                    { icon: MapPin, label: "LOCATION", info: "Mangalore, IND", href: "#" }
                  ].map((item) => (
                    <div key={item.label} className="py-3 flex items-center gap-4">
                      <div className="p-2 bg-white/5 border border-white/[0.03] rounded-sm text-muted-foreground shrink-0">
                        <item.icon className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground block">{item.label}</span>
                        <a href={item.href} className="text-xs font-mono font-medium text-white hover:text-primary transition-colors">
                          {item.info}
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="text-[10px] font-mono text-muted-foreground/40 border-t border-white/[0.04] pt-4 select-none">
                [SYSTEM] Node Status: ONLINE<br />
                [SYSTEM] Secure shell validation ready.
              </div>
            </div>

            {/* Form Column (col-span-7) */}
            <div className="lg:col-span-7 border border-white/[0.05] p-6 rounded-lg bg-black/30 relative flex flex-col justify-center min-h-[360px] overflow-hidden">
              {contactSuccess ? (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 bg-[#030303]/95 z-20 p-6 flex flex-col items-start justify-start text-left font-mono text-[11px] text-green-400 gap-1.5"
                >
                  <div className="flex gap-1.5 mb-4 w-full border-b border-white/[0.05] pb-2.5 select-none">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                    <span className="text-muted-foreground text-[8px] uppercase ml-auto">Transmission Terminal</span>
                  </div>
                  {contactLog.map((log, idx) => (
                    <motion.div 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      key={idx}
                      className={log.startsWith("[ERROR]") ? "text-red-400 font-bold" : log.startsWith("[OK]") ? "text-white font-bold" : ""}
                    >
                      {log}
                    </motion.div>
                  ))}
                  <motion.div 
                    className="w-1.5 h-3.5 bg-green-400 mt-1"
                    animate={{ opacity: [1, 0] }}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                  />
                </motion.div>
              ) : (
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 text-left font-mono">
                  <h4 className="text-[10px] text-white uppercase tracking-wider mb-2 border-b border-white/[0.04] pb-2 inline-block select-none">
                    // Send a Message
                  </h4>
                  
                  <div className="space-y-1">
                    <label className="text-[9px] text-muted-foreground uppercase select-none">Node Name</label>
                    <Input 
                      placeholder="e.g. Atharva Enterprise"
                      className="bg-white/5 border-white/[0.05] text-white text-xs h-9 rounded-sm focus:ring-1 focus:ring-primary focus:border-primary shadow-none font-mono"
                      required
                      {...form.register("name")}
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] text-muted-foreground uppercase select-none">Return Address (Email)</label>
                    <Input 
                      type="email"
                      placeholder="e.g. contact@domain.com"
                      className="bg-white/5 border-white/[0.05] text-white text-xs h-9 rounded-sm focus:ring-1 focus:ring-primary focus:border-primary shadow-none font-mono"
                      required
                      {...form.register("email")}
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] text-muted-foreground uppercase select-none">Payload Message</label>
                    <Textarea 
                      placeholder="Enter payload message content..."
                      className="bg-white/5 border-white/[0.05] text-white text-xs rounded-sm focus:ring-1 focus:ring-primary focus:border-primary shadow-none font-mono min-h-[90px]"
                      required
                      {...form.register("message")}
                    />
                  </div>

                  <Button 
                    type="submit" 
                    disabled={isPending}
                    className="w-full bg-white hover:bg-white/95 text-black font-bold tracking-wider uppercase text-[10px] h-10 rounded-sm mt-4 select-none shadow-none"
                  >
                    {isPending ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/[0.04] bg-[#020202]">
        <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-6 max-w-5xl">
          <div className="flex items-center gap-2 select-none">
            <span className="font-mono font-bold text-sm tracking-wider text-white">
              tk<span className="text-primary font-bold">.</span>
            </span>
          </div>
          
          <div className="flex items-center gap-6 select-none">
            <a href="https://github.com/sudoaptinstalltarun" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-white transition-colors">
              <Github className="w-4 h-4" />
            </a>
            <a href="https://www.linkedin.com/in/tarun-kumar-885542282/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-white transition-colors">
              <Linkedin className="w-4 h-4" />
            </a>
            <Button variant="ghost" size="sm" className="rounded-full border border-white/[0.08] text-white hover:bg-white/5 font-mono text-[9px] tracking-wider uppercase ml-4 h-8 px-4" asChild>
              <a href="mailto:tarunkotian10@gmail.com">
                Email
              </a>
            </Button>
          </div>
          
          <p className="text-muted-foreground text-[10px] font-mono tracking-wider uppercase select-none">
            © {new Date().getFullYear()} // System Offline
          </p>
        </div>
      </footer>

      <ProjectModal 
        project={selectedProject} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}
