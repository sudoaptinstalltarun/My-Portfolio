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
          title: "Articubot Line Navigator",
          description: "ROS 2 mobile robot with autonomous line-following behaviour built on top of the Nav2 navigation stack. Implements a custom controller node for line detection and path correction, integrated with LiDAR-based obstacle avoidance. Contributed upstream documentation improvements to ros-navigation/docs.nav2.org.",
          technologies: ["ROS2", "Nav2", "Python", "LiDAR", "Raspberry Pi", "SLAM"],
          category: "Robotics",
          link: "https://github.com/sudoaptinstalltarun/articulat_bot"
        },
        {
          title: "Autonomous Mobile Robot",
          description: "A custom-built differential drive robot designed for autonomous navigation and mapping in indoor environments. Powered by ROS 2 Jazzy Jalisco on a Raspberry Pi 5/4, it utilizes a robust hardware-software architecture to perform Simultaneous Localization and Mapping (SLAM) and autonomous path planning.",
          technologies: ["ROS2", "Python", "Raspberry Pi", "SLAM", "Path Planning", "LiDAR"],
          category: "Robotics",
          link: "https://github.com/sudoaptinstalltarun/articulat_bot"
        },
        {
          title: "AgriDrone Audit System",
          description: "Drone-based intelligent crop monitoring system using AI vision analytics for ET sensing and irrigation water use accounting. Developed as part of Team Challengers to optimize agricultural water management through precise aerial sensing and YOLOv5-powered detection.",
          technologies: ["YOLOv5", "OpenCV", "UAV Systems", "Python", "Agriculture Tech"],
          category: "UAV",
          link: "https://github.com/sudoaptinstalltarun"
        },
        {
          title: "Portable Catapult Launcher for UAV",
          description: "Design and structural analysis of a portable catapult launch system for fixed-wing UAVs. Developed during the NIT Karnataka research internship with a focus on mechanical robustness, stress analysis, and field deployability.",
          technologies: ["SolidWorks", "ANSYS Workbench", "Mechanical Design", "UAV Systems"],
          category: "Engineering",
          link: "https://github.com/sudoaptinstalltarun"
        },
        {
          title: "Autonomous Drone",
          description: "A highly stable and efficient drone equipped with GPS technology, featuring precise location holding and autonomous emergency landing capabilities. Developed for high-reliability flight missions using ArduPilot flight controller.",
          technologies: ["ArduPilot", "GPS", "Autonomous Landing", "UAV", "Flight Stability"],
          category: "UAV",
          link: "https://github.com/sudoaptinstalltarun"
        },
        {
          title: "Smart Surveillance Robot",
          description: "A Raspberry Pi-powered smart surveillance robot featuring a live camera feed and remote movement control. Designed for home security, remote monitoring, and as a learning platform for robotics integration.",
          technologies: ["Raspberry Pi", "Arduino", "Python", "OpenCV", "Live Streaming"],
          category: "Robotics",
          link: "https://github.com/sudoaptinstalltarun"
        },
        {
          title: "SmartRoom Occupancy",
          description: "An AI/ML based model for intelligent room occupancy detection. Focused on data modelling and computer vision to create efficient space management solutions using real-time sensor input.",
          technologies: ["Python", "TensorFlow", "AI/ML", "Data Modelling"],
          category: "AI",
          link: "https://github.com/sudoaptinstalltarun"
        },
        {
          title: "ArticulateX Robotic Arm",
          description: "A highly versatile robotic arm combining advanced revolute and articulated joints for precision and flexibility. Designed for complex manipulation tasks with a focus on mechanical engineering and joint kinematics.",
          technologies: ["Robotic Arm", "Kinematics", "SolidWorks", "Precision Engineering"],
          category: "Robotics",
          link: "https://github.com/sudoaptinstalltarun"
        }
      ]);

      await db.insert(skills).values([
        {
          category: "Robotics & Autonomous Systems",
          items: ["ROS2", "Nav2", "SLAM", "LiDAR Integration", "Autonomous Navigation", "Sensor Fusion", "Robot Kinematics"]
        },
        {
          category: "UAV & Aerospace",
          items: ["ArduPilot", "UAV Systems", "Aeromodelling", "Flight Control Systems", "Mission Planner"]
        },
        {
          category: "Programming",
          items: ["Python", "C", "C++", "Bash"]
        },
        {
          category: "AI & Computer Vision",
          items: ["TensorFlow", "OpenCV", "YOLOv5", "Matplotlib", "NumPy"]
        },
        {
          category: "Embedded Systems",
          items: ["Raspberry Pi", "Arduino Uno", "Arduino Nano", "ESP32"]
        },
        {
          category: "Engineering Tools",
          items: ["MATLAB", "Simulink", "NI LabVIEW", "ANSYS Workbench"]
        },
        {
          category: "CAD",
          items: ["SOLIDWORKS", "Autodesk Fusion 360", "Onshape"]
        },
        {
          category: "Certifications",
          items: ["SOLIDWORKS CSWA", "MATLAB Onramp", "Simulink Onramp", "Python Foundation"]
        }
      ]);

      await db.insert(experience).values([
        {
          role: "Project Intern — Robotics Research",
          company: "NIT Karnataka",
          duration: "Feb 2025 – May 2025",
          description: "Designed and analysed a portable catapult launch system for UAVs using SolidWorks and ANSYS Workbench. Worked on autonomous robotics system integration, sensor deployment, and mechanical stress analysis for field-deployable systems."
        },
        {
          role: "Design Assistant Intern",
          company: "Atharva Enterprise",
          duration: "Jun 2024 – Dec 2024",
          description: "Supported mechanical design and 3D modelling of industrial components using SolidWorks. Assisted in design reviews, technical drawings, and iterative prototyping workflows."
        },
        {
          role: "Team Member — Robotics Team",
          company: "Team Challengers",
          duration: "Oct 2023 – Feb 2025",
          description: "Contributed to UAV and robotics hardware development projects including the AgriDrone Audit System. Worked on drone assembly, flight testing, and AI-based crop monitoring integration."
        }
      ]);

      await db.insert(education).values([
        {
          degree: "B.E. Robotics and Automation Engineering",
          institution: "Sahyadri College of Engineering and Management",
          year: "2023 – Present"
        },
        {
          degree: "Pre-University (PCMC)",
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