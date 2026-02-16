import { db } from "./db";
import {
  projects, skills, experience, education, contactMessages,
  type InsertContactMessage, type ContactMessage,
  type Project, type Skill, type Experience, type Education
} from "@shared/schema";

export interface IStorage {
  getProjects(): Promise<Project[]>;
  getSkills(): Promise<Skill[]>;
  getExperience(): Promise<Experience[]>;
  getEducation(): Promise<Education[]>;
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  
  // Seed methods
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
          description: "Built differential drive robot for autonomous indoor navigation using ROS2, LiDAR, and SLAM on Raspberry Pi.",
          technologies: ["ROS2", "LiDAR", "SLAM", "Raspberry Pi"],
          category: "Robotics",
          link: "https://github.com"
        },
        {
          title: "AgriDrone Audit System",
          description: "Developed drone-based crop monitoring system using computer vision with YOLO and OpenCV.",
          technologies: ["YOLO", "OpenCV", "UAV Systems"],
          category: "UAV",
          link: "https://github.com"
        },
        {
          title: "Smart Surveillance Robot",
          description: "Designed remote-controlled robot with real-time video surveillance using Raspberry Pi, Arduino, and OpenCV.",
          technologies: ["Raspberry Pi", "Arduino", "OpenCV"],
          category: "Robotics",
          link: "https://github.com"
        },
        {
          title: "Smart Room Occupancy Detection",
          description: "Developed AI model for real-time room occupancy prediction.",
          technologies: ["AI/ML", "Python"],
          category: "AI",
          link: "https://github.com"
        },
        {
          title: "ArticulateX Robotic Arm",
          description: "Built articulated robotic arm for precise motion and object handling.",
          technologies: ["Robotics Design", "Embedded Control"],
          category: "Robotics",
          link: "https://github.com"
        },
        {
          title: "Autonomous GPS Drone",
          description: "Developed GPS-guided autonomous drone with auto-landing capability.",
          technologies: ["UAV Systems", "ArduPilot"],
          category: "UAV",
          link: "https://github.com"
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
