import { 
  Cpu, 
  Code2, 
  Plane, 
  Database,
  GraduationCap
} from "lucide-react";

export const projects = [
  {
    id: 1,
    title: "Articubot Line Navigator",
    description: "ROS 2 mobile robot with autonomous line-following behaviour built on top of the Nav2 navigation stack. Implements a custom controller node for line detection and path correction, integrated with LiDAR-based obstacle avoidance. Contributed upstream documentation improvements to ros-navigation/docs.nav2.org.",
    technologies: ["ROS2", "Nav2", "Python", "LiDAR", "Raspberry Pi", "SLAM"],
    category: "Robotics",
    link: "https://github.com/sudoaptinstalltarun/articulat_bot"
  },
  {
    id: 2,
    title: "Autonomous Mobile Robot",
    description: "A custom-built differential drive robot designed for autonomous navigation and mapping in indoor environments. Powered by ROS 2 Jazzy Jalisco on a Raspberry Pi 5/4, it utilizes a robust hardware-software architecture to perform Simultaneous Localization and Mapping (SLAM) and autonomous path planning.",
    technologies: ["ROS2", "Python", "Raspberry Pi", "SLAM", "Path Planning", "LiDAR"],
    category: "Robotics",
    link: "https://github.com/sudoaptinstalltarun/articulat_bot"
  },
  {
    id: 3,
    title: "AgriDrone Audit System",
    description: "Drone-based intelligent crop monitoring system using AI vision analytics for ET sensing and irrigation water use accounting. Developed as part of Team Challengers to optimize agricultural water management through precise aerial sensing and YOLOv5-powered detection.",
    technologies: ["YOLOv5", "OpenCV", "UAV Systems", "Python", "Agriculture Tech"],
    category: "UAV",
    link: "https://github.com/sudoaptinstalltarun"
  },
  {
    id: 4,
    title: "Portable Catapult Launcher for UAV",
    description: "Design and structural analysis of a portable catapult launch system for fixed-wing UAVs. Developed during the NIT Karnataka research internship with a focus on mechanical robustness, stress analysis, and field deployability.",
    technologies: ["SolidWorks", "ANSYS Workbench", "Mechanical Design", "UAV Systems"],
    category: "Engineering",
    link: "https://github.com/sudoaptinstalltarun"
  },
  {
    id: 5,
    title: "Autonomous Drone",
    description: "A highly stable and efficient drone equipped with GPS technology, featuring precise location holding and autonomous emergency landing capabilities. Developed for high-reliability flight missions using ArduPilot flight controller.",
    technologies: ["ArduPilot", "GPS", "Autonomous Landing", "UAV", "Flight Stability"],
    category: "UAV",
    link: "https://github.com/sudoaptinstalltarun"
  },
  {
    id: 6,
    title: "Smart Surveillance Robot",
    description: "A Raspberry Pi-powered smart surveillance robot featuring a live camera feed and remote movement control. Designed for home security, remote monitoring, and as a learning platform for robotics integration.",
    technologies: ["Raspberry Pi", "Arduino", "Python", "OpenCV", "Live Streaming"],
    category: "Robotics",
    link: "https://github.com/sudoaptinstalltarun"
  },
  {
    id: 7,
    title: "SmartRoom Occupancy",
    description: "An AI/ML based model for intelligent room occupancy detection. Focused on data modelling and computer vision to create efficient space management solutions using real-time sensor input.",
    technologies: ["Python", "TensorFlow", "AI/ML", "Data Modelling"],
    category: "AI",
    link: "https://github.com/sudoaptinstalltarun"
  },
  {
    id: 8,
    title: "ArticulateX Robotic Arm",
    description: "A highly versatile robotic arm combining advanced revolute and articulated joints for precision and flexibility. Designed for complex manipulation tasks with a focus on mechanical engineering and joint kinematics.",
    technologies: ["Robotic Arm", "Kinematics", "SolidWorks", "Precision Engineering"],
    category: "Robotics",
    link: "https://github.com/sudoaptinstalltarun"
  }
];

export const skills = [
  {
    id: 1,
    category: "Robotics & Autonomous Systems",
    items: ["ROS2", "Nav2", "SLAM", "LiDAR Integration", "Autonomous Navigation", "Sensor Fusion", "Robot Kinematics"]
  },
  {
    id: 2,
    category: "UAV & Aerospace",
    items: ["ArduPilot", "UAV Systems", "Aeromodelling", "Flight Control Systems", "Mission Planner"]
  },
  {
    id: 3,
    category: "Programming",
    items: ["Python", "C", "C++", "Bash"]
  },
  {
    id: 4,
    category: "AI & Computer Vision",
    items: ["TensorFlow", "OpenCV", "YOLOv5", "Matplotlib", "NumPy"]
  },
  {
    id: 5,
    category: "Embedded Systems",
    items: ["Raspberry Pi", "Arduino Uno", "Arduino Nano", "ESP32"]
  },
  {
    id: 6,
    category: "Engineering Tools",
    items: ["MATLAB", "Simulink", "NI LabVIEW", "ANSYS Workbench"]
  },
  {
    id: 7,
    category: "CAD",
    items: ["SOLIDWORKS", "Autodesk Fusion 360", "Onshape"]
  },
  {
    id: 8,
    category: "Certifications",
    items: ["SOLIDWORKS CSWA", "MATLAB Onramp", "Simulink Onramp", "Python Foundation"]
  }
];

export const experience = [
  {
    id: 1,
    role: "Project Intern — Robotics Research",
    company: "NIT Karnataka",
    duration: "Feb 2025 – May 2025",
    description: "Designed and analysed a portable catapult launch system for UAVs using SolidWorks and ANSYS Workbench. Worked on autonomous robotics system integration, sensor deployment, and mechanical stress analysis for field-deployable systems."
  },
  {
    id: 2,
    role: "Design Assistant Intern",
    company: "Atharva Enterprise",
    duration: "Jun 2024 – Dec 2024",
    description: "Supported mechanical design and 3D modelling of industrial components using SolidWorks. Assisted in design reviews, technical drawings, and iterative prototyping workflows."
  },
  {
    id: 3,
    role: "Team Member — Robotics Team",
    company: "Team Challengers",
    duration: "Oct 2023 – Feb 2025",
    description: "Contributed to UAV and robotics hardware development projects including the AgriDrone Audit System. Worked on drone assembly, flight testing, and AI-based crop monitoring integration."
  }
];

export const education = [
  {
    id: 1,
    degree: "B.E. Robotics and Automation Engineering",
    institution: "Sahyadri College of Engineering and Management",
    year: "2023 – Present"
  },
  {
    id: 2,
    degree: "Pre-University (PCMC)",
    institution: "Canara Pre-University College",
    year: "2022"
  },
  {
    id: 3,
    degree: "SSLC",
    institution: "Vishwamangala High School",
    year: "2020"
  }
];
