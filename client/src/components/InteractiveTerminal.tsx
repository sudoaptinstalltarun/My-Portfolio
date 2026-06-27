import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Terminal, Circle, CornerDownLeft } from "lucide-react";
import { skills, experience, education } from "../data/portfolio";
import { engineeringProjects } from "../data/projects";

interface ConsoleLine {
  type: "input" | "output" | "error" | "system";
  text: string;
}

export function InteractiveTerminal() {
  const [history, setHistory] = useState<ConsoleLine[]>([
    { type: "system", text: "tarunkumar_os [Version 1.0.4]" },
    { type: "system", text: "(c) Tarun Kumar. All system protocols active." },
    { type: "system", text: "Type 'help' to see list of available commands." },
  ]);
  const [inputVal, setInputVal] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [history]);

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const command = inputVal.trim();
      if (!command) return;

      const newHistory = [...history, { type: "input" as const, text: `tarun_k@robotics:~$ ${command}` }];
      setHistory(newHistory);
      setInputVal("");
      setCommandHistory([...commandHistory, command]);
      setHistoryIndex(-1);

      processCommand(command, newHistory);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      
      const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(newIndex);
      setInputVal(commandHistory[newIndex]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex === -1) return;

      const newIndex = historyIndex + 1;
      if (newIndex >= commandHistory.length) {
        setHistoryIndex(-1);
        setInputVal("");
      } else {
        setHistoryIndex(newIndex);
        setInputVal(commandHistory[newIndex]);
      }
    }
  };

  const processCommand = (cmd: string, currentHistory: ConsoleLine[]) => {
    const parts = cmd.toLowerCase().split(" ");
    const mainCommand = parts[0];
    const args = parts.slice(1);

    const addOutput = (text: string, type: "output" | "error" = "output") => {
      setHistory((prev) => [...prev, { type, text }]);
    };

    switch (mainCommand) {
      case "help":
        addOutput("Available commands:\n" +
          "  about       - Brief summary about me\n" +
          "  skills      - List core engineering expertise\n" +
          "  projects    - Show summary of all projects\n" +
          "  project <id> - Show specific project architecture & execution (e.g. 'project 1')\n" +
          "  experience  - Show professional history\n" +
          "  education   - Show academic history\n" +
          "  resume      - View / open technical resume PDF\n" +
          "  contact     - Display communication endpoints\n" +
          "  clear       - Clear the terminal screen"
        );
        break;

      case "clear":
        setHistory([]);
        break;

      case "about":
        addOutput(
          "Tarun Kumar — ROS2 Developer & Autonomous Robotics Engineer\n" +
          "----------------------------------------------------------\n" +
          "Currently in 4th year pursuing Robotics & Automation Engineering at Sahyadri College.\n" +
          "I build autonomous systems with navigation capabilities, including SLAM and Nav2. " +
          "Open source contributor with merged code in ROS 2 Navigation (Nav2) documentation."
        );
        break;

      case "skills":
        let skillsOutput = "Technical Expertise Categories:\n";
        skills.forEach((group) => {
          skillsOutput += `\n[+] ${group.category}\n    --> ${group.items.join(", ")}\n`;
        });
        addOutput(skillsOutput);
        break;

      case "projects":
        let projOutput = "Engineering Projects List:\n" +
          "Use 'project <number>' to inspect details (e.g., 'project 1').\n" +
          "----------------------------------------------------------\n";
        engineeringProjects.forEach((proj, idx) => {
          projOutput += `  [${idx + 1}] ${proj.title}\n      Stack: ${proj.stack.slice(0, 4).join(", ")}...\n`;
        });
        addOutput(projOutput);
        break;

      case "project":
        const idStr = args[0];
        if (!idStr) {
          addOutput("Error: Please specify project index. Example: 'project 1'", "error");
          break;
        }

        const index = parseInt(idStr, 10) - 1;
        if (isNaN(index) || index < 0 || index >= engineeringProjects.length) {
          addOutput(`Error: Project number '${idStr}' not found. Enter a number between 1 and ${engineeringProjects.length}.`, "error");
          break;
        }

        const project = engineeringProjects[index];
        let pOutput = `\nProject: ${project.title}\n`;
        pOutput += `Stack:   ${project.stack.join(", ")}\n`;
        pOutput += `Summary: ${project.description}\n\n`;
        pOutput += `Execution Highlights:\n`;
        project.engineering.forEach((bullet, i) => {
          pOutput += `  0${i + 1}_ ${bullet}\n`;
        });
        addOutput(pOutput);
        break;

      case "experience":
        let expOutput = "Professional Timeline:\n";
        experience.forEach((job) => {
          expOutput += `\n* ${job.role} @ ${job.company} (${job.duration})\n  --> ${job.description}\n`;
        });
        addOutput(expOutput);
        break;

      case "education":
        let eduOutput = "Academic Background:\n";
        education.forEach((edu) => {
          eduOutput += `\n* ${edu.degree}\n  ${edu.institution} (${edu.year})\n`;
        });
        addOutput(eduOutput);
        break;

      case "resume":
        addOutput(
          "[SYSTEM] Fetching resume.pdf from secure storage...\n" +
          "[SYSTEM] Opening PDF resource in a new communication channel."
        );
        setTimeout(() => {
          window.open("/resume.pdf", "_blank");
        }, 800);
        break;

      case "contact":
        addOutput(
          "Communication Endpoints:\n" +
          "----------------------------------------------------------\n" +
          "  Email:      tarunkotian10@gmail.com\n" +
          "  Phone:      +91 8618447140\n" +
          "  GitHub:     github.com/sudoaptinstalltarun\n" +
          "  LinkedIn:   linkedin.com/in/tarun-kumar-885542282/\n" +
          "  Location:   Mangalore, India"
        );
        break;

      case "sudo":
        if (args.length === 0) {
          addOutput("sudo: command missing. Try 'sudo apt update' or similar.", "error");
        } else if (args[0] === "rm" && args[1] === "-rf") {
          addOutput("Nice try, hackers. Subverting /root deletion sequence. Self-destruct cancelled.", "error");
        } else if (args[0] === "apt" && args[1] === "install") {
          const pkg = args.slice(2).join(" ");
          if (pkg.includes("coffee") || pkg.includes("tea")) {
            addOutput(`Retrieving ${pkg}... Error: Coffee/Tea reservoir empty. Go to local kitchen node.`);
          } else {
            addOutput(`sudo: apt install is disabled. System packages are fully up to date.`);
          }
        } else {
          addOutput("tarun_k is not in the sudoers file. This incident will be reported.", "error");
        }
        break;

      default:
        addOutput(`Command not found: '${mainCommand}'. Type 'help' for available system commands.`, "error");
        break;
    }
  };

  return (
    <div 
      className="glass border border-white/[0.05] w-full max-w-4xl mx-auto rounded-lg overflow-hidden flex flex-col font-mono text-xs relative shadow-2xl"
      onClick={focusInput}
      style={{ minHeight: "360px", maxHeight: "420px" }}
    >
      {/* Top window decorations */}
      <div className="bg-[#080808] px-4 py-2.5 flex items-center justify-between border-b border-white/[0.04] select-none">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-white/[0.08] cursor-pointer hover:bg-red-500/60 transition-colors" />
          <div className="w-2.5 h-2.5 rounded-full bg-white/[0.08] cursor-pointer hover:bg-yellow-500/60 transition-colors" />
          <div className="w-2.5 h-2.5 rounded-full bg-white/[0.08] cursor-pointer hover:bg-green-500/60 transition-colors" />
        </div>
        <div className="text-muted-foreground/40 text-[9px] flex items-center gap-1.5 font-bold uppercase tracking-wider">
          tarun_k@robotics-node:~
        </div>
        <div className="w-12" /> {/* spacer */}
      </div>

      {/* Terminal logs content */}
      <div 
        ref={containerRef}
        className="flex-grow p-5 overflow-y-auto bg-black/40 backdrop-blur-md flex flex-col gap-1.5 select-text scrollbar-thin"
      >
        {history.map((line, i) => (
          <div 
            key={i} 
            className={`whitespace-pre-wrap leading-relaxed ${
              line.type === "input" 
                ? "text-white font-bold" 
                : line.type === "error" 
                ? "text-red-400 font-semibold" 
                : line.type === "system" 
                ? "text-primary/70" 
                : "text-muted-foreground"
            }`}
          >
            {line.text}
          </div>
        ))}

        {/* Input prompt */}
        <div className="flex items-center gap-1.5 mt-1 group">
          <span className="text-primary font-bold shrink-0">tarun_k@robotics:~$</span>
          <div className="flex-grow relative flex items-center">
            <input
              ref={inputRef}
              type="text"
              className="w-full bg-transparent border-none outline-none text-white focus:ring-0 p-0 font-mono caret-primary select-text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
              maxLength={80}
            />
            {inputVal === "" && (
              <motion.div 
                className="absolute left-0 w-1.5 h-3 bg-primary"
                animate={{ opacity: [1, 1, 0, 0] }}
                transition={{ repeat: Infinity, duration: 0.8, times: [0, 0.5, 0.5, 1], ease: "linear" }}
              />
            )}
          </div>
          <span className="text-muted-foreground/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 text-[8px] uppercase font-bold shrink-0 pointer-events-none font-mono">
            Press Enter <CornerDownLeft className="w-2.5 h-2.5" />
          </span>
        </div>
      </div>
    </div>
  );
}
