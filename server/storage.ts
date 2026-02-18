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
          description: "Developed a sophisticated differential drive robot capable of autonomous indoor navigation. Integrated ROS2 with LiDAR for real-time SLAM (Simultaneous Localization and Mapping), enabling the robot to create precise 2D maps of unknown environments and navigate through them avoiding obstacles. Implemented a robust control stack on Raspberry Pi with custom sensor fusion algorithms.",
          technologies: ["ROS2", "LiDAR", "SLAM", "Raspberry Pi", "Python", "C++"],
          category: "Robotics",
          link: "https://github.com/sudoaptinstalltarun"
        },
        {
          title: "AgriDrone Audit System",
          description: "An advanced UAV-based solution for precision agriculture. Built a custom drone platform integrated with a computer vision pipeline using YOLOv5 for real-time crop health monitoring and pest detection. The system automates field auditing by processing high-resolution aerial imagery to generate detailed vegetation index maps and actionable agricultural data.",
          technologies: ["YOLOv5", "OpenCV", "UAV Systems", "ArduPilot", "Python"],
          category: "UAV",
          link: "https://github.com/sudoaptinstalltarun"
        },
        {
          title: "Smart Surveillance Robot",
          description: "Designed and implemented a versatile remote-controlled surveillance platform. Features a low-latency real-time video streaming system with integrated computer vision for motion detection and face recognition. The hardware architecture utilizes a dual-processor setup (Raspberry Pi and Arduino) to balance high-level processing with precise motor control.",
          technologies: ["Raspberry Pi", "Arduino", "OpenCV", "Embedded C", "Python"],
          category: "Robotics",
          link: "https://github.com/sudoaptinstalltarun"
        },
        {
          title: "Smart Room Occupancy Detection",
          description: "Created an AI-driven system for intelligent building management. Developed and trained a custom machine learning model to predict room occupancy with high accuracy using environmental sensor data. The system optimizes energy consumption by dynamically controlling lighting and HVAC systems based on real-time presence detection.",
          technologies: ["AI/ML", "TensorFlow", "Python", "Scikit-learn", "IoT"],
          category: "AI",
          link: "https://github.com/sudoaptinstalltarun"
        },
        {
          title: "ArticulateX Robotic Arm",
          description: "Engineered a high-precision 5-DOF articulated robotic arm. Focused on inverse kinematics implementation for smooth trajectory planning and accurate end-effector positioning. Developed a custom embedded control interface for complex object handling tasks, incorporating feedback loops for enhanced stability and repeatability.",
          technologies: ["Robotics Design", "Embedded Control", "Kinematics", "SolidWorks"],
          category: "Robotics",
          link: "https://github.com/sudoaptinstalltarun"
        },
        {
          title: "Autonomous GPS Drone",
          description: "Developed a fully autonomous quadcopter utilizing GPS-guided navigation. Configured the ArduPilot flight stack for mission planning, including waypoint navigation, automated take-off, and precision landing. Integrated failsafe mechanisms and real-time telemetry for enhanced flight safety and mission reliability in various outdoor conditions.",
          technologies: ["UAV Systems", "ArduPilot", "GPS Navigation", "Flight Control"],
          category: "UAV",
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
