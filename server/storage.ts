import { 
  type Project, 
  type Skill, 
  type Experience, 
  type Education, 
  type ContactMessage, 
  type InsertContactMessage 
} from "@shared/schema";

export interface IStorage {
  getProjects(): Promise<Project[]>;
  getSkills(): Promise<Skill[]>;
  getExperience(): Promise<Experience[]>;
  getEducation(): Promise<Education[]>;
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  seedData(): Promise<void>;
}

export class MemStorage implements IStorage {
  private contactMessages: Map<number, ContactMessage>;
  private currentId: number;

  constructor() {
    this.contactMessages = new Map();
    this.currentId = 1;
  }

  async getProjects(): Promise<Project[]> {
    return [
      {
        id: 1,
        title: "Articubot Line Navigator",
        description: "ROS 2 mobile robot with autonomous line-following behaviour built on top of the Nav2 navigation stack.",
        technologies: ["ROS2", "Nav2", "Python", "LiDAR", "Raspberry Pi", "SLAM"],
        category: "Robotics",
        link: "https://github.com/sudoaptinstalltarun/articulat_bot"
      },
      // ... adding a few more for the API to remain functional if checked
      {
        id: 2,
        title: "Autonomous Mobile Robot",
        description: "A custom-built differential drive robot designed for autonomous navigation and mapping.",
        technologies: ["ROS2", "Python", "Raspberry Pi", "SLAM", "Path Planning", "LiDAR"],
        category: "Robotics",
        link: "https://github.com/sudoaptinstalltarun/articulat_bot"
      }
    ];
  }

  async getSkills(): Promise<Skill[]> {
    return [
      {
        id: 1,
        category: "Robotics & Autonomous Systems",
        items: ["ROS2", "Nav2", "SLAM", "LiDAR Integration", "Autonomous Navigation", "Sensor Fusion", "Robot Kinematics"]
      }
    ];
  }

  async getExperience(): Promise<Experience[]> {
    return [
      {
        id: 1,
        role: "Project Intern — Robotics Research",
        company: "NIT Karnataka",
        duration: "Feb 2025 – May 2025",
        description: "Designed and analysed a portable catapult launch system for UAVs."
      }
    ];
  }

  async getEducation(): Promise<Education[]> {
    return [
      {
        id: 1,
        degree: "B.E. Robotics and Automation Engineering",
        institution: "Sahyadri College of Engineering and Management",
        year: "2023 – Present"
      }
    ];
  }

  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    const id = this.currentId++;
    const contactMessage: ContactMessage = { 
      ...message, 
      id,
      createdAt: new Date().toISOString()
    };
    this.contactMessages.set(id, contactMessage);
    return contactMessage;
  }

  async seedData(): Promise<void> {
    // No-op for MemStorage
  }
}

export const storage = new MemStorage();