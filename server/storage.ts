import { type User, type InsertUser, projects, skills, experience, education, contactMessages, type Project, type Skill, type Experience, type Education, type ContactMessage, type InsertContactMessage } from "@shared/schema";
import { db } from "./db";

export interface IStorage {
  getProjects(): Promise<Project[]>;
  getSkills(): Promise<Skill[]>;
  getExperience(): Promise<Experience[]>;
  getEducation(): Promise<Education[]>;
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  seedData(): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async getProjects(): Promise<Project[]> {
    return await db.select().from(projects);
  }

  async getSkills(): Promise<Skill[]> {
    return await db.select().from(skills);
  }

  async getExperience(): Promise<Experience[]> {
    return await db.select().from(experience);
  }

  async getEducation(): Promise<Education[]> {
    return await db.select().from(education);
  }

  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    const [result] = await db.insert(contactMessages).values(message).returning();
    return result;
  }

  async seedData(): Promise<void> {
    const existingProjects = await this.getProjects();
    if (existingProjects.length === 0) {
      await db.insert(projects).values([
        {
          title: "Autonomous Mobile Robot",
          description: "A custom-built differential drive robot designed for autonomous navigation and mapping in indoor environments. Powered by ROS 2 Jazzy Jalisco on a Raspberry Pi 5/4, it utilizes a robust hardware-software architecture to perform Simultaneous Localization and Mapping (SLAM) and autonomous path planning.",
          technologies: ["ROS2", "Python", "Raspberry Pi", "SLAM", "Path Planning"],
          category: "Robotics",
          link: "https://github.com/sudoaptinstalltarun"
        },
        {
          title: "AgriDrone Audit",
          description: "Drone-based Intelligent ET sensing system and irrigation water use accounting system for irrigation commands. Developed as part of Team Challengers to optimize agricultural water management through precise aerial sensing.",
          technologies: ["yolo", "OpenCV", "UAV Systems", "Agriculture Tech"],
          category: "UAV",
          link: "https://github.com/sudoaptinstalltarun"
        },
        {
          title: "SmartRoomOccupancy",
          description: "An AI/ML based model developed for intelligent room occupancy detection. Focused on data modeling and artificial intelligence to create efficient space management solutions.",
          technologies: ["Artificial Intelligence (AI)", "Data Modeling", "Python"],
          category: "AI",
          link: "https://github.com/sudoaptinstalltarun"
        },
        {
          title: "Smart Surveillance Robot",
          description: "A Raspberry Pi-powered smart surveillance robot featuring a live camera feed and remote movement control. Designed for home security, remote monitoring, and as a learning platform for robotics integration.",
          technologies: ["Raspberry Pi", "Arduino IDE", "Python", "Live Streaming"],
          category: "Robotics",
          link: "https://github.com/sudoaptinstalltarun"
        },
        {
          title: "ArticulateX",
          description: "A highly versatile robotic arm that combines advanced revolute and articulated joints for precision and flexibility. Designed for complex manipulation tasks with a focus on mechanical engineering excellence.",
          technologies: ["Robotic arm", "Precision Engineering", "Articulated Joints"],
          category: "Robotics",
          link: "https://github.com/sudoaptinstalltarun"
        },
        {
          title: "Autonomous Drone",
          description: "A highly stable and efficient drone equipped with GPS technology, featuring precise location holding and autonomous emergency landing capabilities. Developed for high-reliability flight missions.",
          technologies: ["GPS Technology", "Autonomous Landing", "UAV", "Flight Stability"],
          category: "UAV",
          link: "https://github.com/sudoaptinstalltarun"
        },
        {
          title: "Portable Catapult Launcher for UAV",
          description: "Design and analysis of a portable catapult launch system for UAVs. Developed at the National Institute of Technology Karnataka with a focus on mechanical robustness and field deployability.",
          technologies: ["Solidworks", "Ansys Workbench", "Mechanical Design", "UAV Launchers"],
          category: "Engineering",
          link: "https://github.com/sudoaptinstalltarun"
        }
      ]);

      await db.insert(skills).values([
        { category: "Robotics & Autonomous Systems", items: ["ROS2", "SLAM", "LiDAR Integration", "Autonomous Navigation", "Sensor Fusion"] },
        { category: "UAV & Aerospace", items: ["ArduPilot", "UAV Systems", "Aeromodelling", "Flight Control Systems"] },
        { category: "Programming", items: ["Python", "C", "C++", "Bash"] },
        { category: "AI & Computer Vision", items: ["TensorFlow", "OpenCV", "YOLOv5"] },
        { category: "Embedded Systems", items: ["ESP32", "Arduino Nano", "Arduino Uno", "Raspberry Pi"] },
        { category: "Engineering Tools", items: ["MATLAB", "Simulink", "NI LabVIEW", "ANSYS Workbench"] },
        { category: "CAD", items: ["SOLIDWORKS (CSWA)", "Autodesk Fusion 360", "Onshape"] }
      ]);

      await db.insert(experience).values([
        {
          role: "Project Intern - Robotics Research",
          company: "NIT Karnataka",
          duration: "Feb 2025 – May 2025",
          description: "Worked on autonomous robotics system integration and sensor applications."
        },
        {
          role: "Team Member - Robotics Team",
          company: "Team Challengers",
          duration: "Oct 2023 – Feb 2025",
          description: "Contributed to UAV and robotics hardware development projects."
        },
        {
          role: "Design Assistant Intern",
          company: "Atharva Enterprise",
          duration: "Jun 2024 – Dec 2024",
          description: "Supported mechanical design and modeling using SolidWorks."
        }
      ]);

      await db.insert(education).values([
        {
          degree: "B.E. Robotics and Automation Engineering",
          institution: "Sahyadri College of Engineering and Management",
          year: "2023 – Present"
        },
        {
          degree: "Pre-University College",
          institution: "Canara Pre-University College",
          year: "2022"
        },
        {
          degree: "SSLC",
          institution: "Vishwamangala High School",
          year: "2020"
        }
      ]);
    }
  }
}

export const storage = new DatabaseStorage();
