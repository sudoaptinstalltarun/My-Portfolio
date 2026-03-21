export interface EngineeringProject {
  id: string;
  title: string;
  stack: string[];
  description: string;
  engineering: string[];
  mermaid: string;
  buttons: { label: string; link?: string }[];
}

export const engineeringProjects: EngineeringProject[] = [
  {
    id: "project-1",
    title: "Autonomous Mobile Robot (Physical Hardware)",
    stack: ["ROS 2 Jazzy", "Nav2", "SLAM Toolbox", "Raspberry Pi 5", "Python/C++"],
    description: "Custom differential drive robot engineered on the latest ROS 2 Jazzy Jalisco release for real-time spatial awareness, indoor mapping, and dynamic path planning.",
    engineering: [
      "Tuned global and local costmaps for robust navigation through complex environments.",
      "Developed custom hardware-middleware interface nodes on Raspberry Pi 5."
    ],
    mermaid: `graph TD
    classDef hw fill:#0f172a,stroke:#3b82f6,stroke-width:2px,color:#fff;
    classDef sw fill:#1e293b,stroke:#10b981,stroke-width:2px,color:#fff;
    classDef nav2 fill:#1e293b,stroke:#f59e0b,stroke-width:2px,color:#fff;
    
    subgraph Compute [Raspberry Pi 5 / ROS 2 Jazzy]
        SLAM[SLAM Toolbox]:::sw
        AMCL[Localization AMCL]:::sw
        Nav2[Nav2 Stack / BT]:::nav2
    end
    
    subgraph Physical [Hardware Layer]
        Lidar[2D LiDAR]:::hw
        Enco[Wheel Encoders]:::hw
        Driver[Motor Driver]:::hw
    end
    
    Lidar -->|/scan| SLAM
    Enco -->|/odom| AMCL
    SLAM -->|/map| Nav2
    AMCL --> Nav2
    Nav2 -->|/cmd_vel| Driver`,
    buttons: [
      { label: "GitHub Repo" },
      { label: "Watch Demo" }
    ]
  },
  {
    id: "project-2",
    title: "Hybrid Autonomous Navigation System (Simulated AGV)",
    stack: ["ROS 2", "Nav2", "OpenCV", "Gazebo", "Twist Mux", "PID Control"],
    description: "Industrial-grade hybrid navigation architecture combining global Nav2 path planning with custom local OpenCV-based vision guidance.",
    engineering: [
      "Simulated a custom URDF mobile robot in Gazebo, utilizing SLAM Toolbox and AMCL for real-time mapping and localization.",
      "Developed a custom vision pipeline utilizing OpenCV (HSV filtering) and PID control for high-precision local line-tracking.",
      "Architected custom ROS 2 Action Servers and implemented a Twist Multiplexer to autonomously resolve command velocity conflicts between the global Nav2 controller and the local vision node."
    ],
    mermaid: `graph TD
    classDef sim fill:#0f172a,stroke:#3b82f6,stroke-width:2px,color:#fff;
    classDef vision fill:#1e293b,stroke:#a855f7,stroke-width:2px,color:#fff;
    classDef nav fill:#1e293b,stroke:#f59e0b,stroke-width:2px,color:#fff;
    classDef mux fill:#1e293b,stroke:#ef4444,stroke-width:2px,color:#fff;

    subgraph Simulation [Gazebo Physics]
        Robot[URDF Model]:::sim
        Sensors[Camera / LiDAR / Odom]:::sim
    end

    subgraph Global [ROS 2 Nav2 Stack]
        SLAM[SLAM Toolbox / AMCL]:::nav
        Nav2[Nav2 Controller]:::nav
    end

    subgraph Local [Vision Action Server]
        CV[OpenCV HSV Filter]:::vision
        PID[PID Line Tracker]:::vision
    end

    Mux[Twist Multiplexer]:::mux

    Sensors -->|/scan & /odom| SLAM
    SLAM --> Nav2
    Sensors -->|/camera/image_raw| CV
    CV --> PID
    
    Nav2 -->|nav_cmd_vel| Mux
    PID -->|vision_cmd_vel| Mux
    Mux -->|Arbitrated /cmd_vel| Robot`,
    buttons: [
      { label: "GitHub Repo" },
      { label: "System Architecture" }
    ]
  },
  {
    id: "project-3",
    title: "Agridrone Audit (Computer Vision Payload)",
    stack: ["YOLOv5", "OpenCV", "Edge AI", "MAVLink", "Team Challengers"],
    description: "Intelligent perception system for agricultural UAVs, utilizing real-time Computer Vision for Evapotranspiration (ET) sensing and water-use optimization.",
    engineering: [
      "Implemented and optimized a YOLO model for crop health detection and mapping.",
      "Developed the telemetry parsing system to link aerial vision data with precise GPS coordinates."
    ],
    mermaid: `graph LR
    classDef hw fill:#0f172a,stroke:#3b82f6,stroke-width:2px,color:#fff;
    classDef ai fill:#1e293b,stroke:#a855f7,stroke-width:2px,color:#fff;
    classDef logic fill:#1e293b,stroke:#10b981,stroke-width:2px,color:#fff;
    
    subgraph UAV [Airborne Platform]
        Cam[Downward Camera]:::hw
        Inference[YOLOv5 Model]:::ai
        Parse[Data Parser]:::logic
        Flight[Flight Controller / Pixhawk]:::hw
    end
    
    subgraph Ground [GCS]
        Log[Telemetry Logs / Mapping]:::logic
    end
    
    Cam --> Inference
    Inference -->|Detection| Parse
    Flight -->|MAVLink Telemetry| Parse
    Parse -->|Combined Data Stream| Log`,
    buttons: [
      { label: "Vision Repo" },
      { label: "Project Details" }
    ]
  },
  {
    id: "project-4",
    title: "Autonomous UAV System (Flight Control)",
    stack: ["GPS Navigation", "Flight Controllers", "MAVLink", "Failsafes", "Team Challengers"],
    description: "Highly stable UAV platform developed with Team Challengers, focusing on precision autonomous mission execution, position-hold, and redundant safety protocols.",
    engineering: [
      "Calibrated flight control parameters (PIDs) for extended, stable hover and waypoint mission accuracy.",
      "Configured complex failsafes including autonomous emergency landing and Return-to-Launch (RTL) scenarios."
    ],
    mermaid: `graph TD
    classDef pilot fill:#0f172a,stroke:#3b82f6,stroke-width:2px,color:#fff;
    classDef sw fill:#1e293b,stroke:#10b981,stroke-width:2px,color:#fff;
    classDef act fill:#1e293b,stroke:#f59e0b,stroke-width:2px,color:#fff;
    
    subgraph GCS [Ground Station]
        Missions[Mission Planner]:::sw
    end
    
    subgraph Autopilot [Flight Controller]
        EKF[Extended Kalman Filter]:::sw
        Logic[Nav Logic / RTL Failsafe]:::sw
        PID[PID Controllers]:::sw
    end
    
    subgraph Physical [Hardware Layer]
        Sensors[GPS / IMU / Baro]:::pilot
        Motors[ESCs / Motors]:::act
    end
    
    Missions -->|Waypoint Mission| Logic
    Sensors -->|Raw Data| EKF
    EKF -->|State Estimate| Logic
    Logic -->|Control Signal| PID
    PID -->|PWM| Motors`,
    buttons: [
      { label: "View Specs" },
      { label: "Watch Flight Test" }
    ]
  },
  {
    id: "project-5",
    title: "ArticulateX (Robotic Arm Manipulation)",
    stack: ["Kinematics (FK/IK)", "Trajectory Planning", "Multi-DoF", "Microcontrollers", "Sahyadri College"],
    description: "High-versatility articulated robotic arm combining complex revolute joints for precision manipulation, end-effector control, and path execution.",
    engineering: [
      "Modeled the manipulator kinematics (Forward & Inverse Kinematics) for cartesian target positioning.",
      "Programmed the low-level motion control firmware for multi-axis joint synchronization."
    ],
    mermaid: `graph LR
    classDef compute fill:#0f172a,stroke:#3b82f6,stroke-width:2px,color:#fff;
    classDef sw fill:#1e293b,stroke:#10b981,stroke-width:2px,color:#fff;
    classDef motor fill:#1e293b,stroke:#f59e0b,stroke-width:2px,color:#fff;
    
    subgraph Input [Goal State]
        Pose[Target Pose XYZ]:::compute
    end
    
    subgraph Planning [Compute Layer]
        IK[Inverse Kinematics Solver]:::sw
        Path[Trajectory Planner]:::sw
    end
    
    subgraph Control [Embedded Layer]
        Micro[Joint Controller Node]:::compute
        Motors[Servo Drivers / Motors]:::motor
    end
    
    Pose --> IK
    IK -->|Joint Angles| Path
    Path -->|Trajectory Data| Micro
    Micro -->|PWM Commands| Motors`,
    buttons: [
      { label: "View Design" },
      { label: "GitHub Repo" }
    ]
  },
  {
    id: "project-6",
    title: "Mechanical Design Portfolio (UAV Catapult & Arm CAD)",
    stack: ["SolidWorks", "Ansys Workbench", "FEA Simulation", "Aerodynamics", "NITK"],
    description: "Engineering portfolio detailing mechanical system architecture, featuring a portable catapult launcher for UAVs (developed with NITK) and the mechanical assembly for ArticulateX.",
    engineering: [
      "Performed structural analysis (FEA) using Ansys to validate the launch catapult's operational limits.",
      "Managed the complete CAD-to-Simulation workflow for mechanical stress, tolerance stack-up, and aerodynamic load validation."
    ],
    mermaid: `graph TD
    classDef process fill:#0f172a,stroke:#3b82f6,stroke-width:2px,color:#fff;
    classDef validation fill:#1e293b,stroke:#10b981,stroke-width:2px,color:#fff;
    classDef result fill:#1e293b,stroke:#10b981,stroke-width:2px,color:#fff;
    
    subgraph Design [Mechanical Workflow]
        CAD[SolidWorks 3D Modeling]:::process
        Assembly[Tolerance Assembly]:::process
    end
    
    subgraph Sim [Simulation Layer]
        FEA[Ansys Structural Analysis]:::validation
        Stress[Stress/Load Testing]:::validation
    end
    
    subgraph Fabrication [Validation]
        Limit[Operational Limit Validated]:::result
    end
    
    CAD --> Assembly
    Assembly --> FEA
    FEA --> Stress
    Stress --> Limit`,
    buttons: [
      { label: "View CAD Models" },
      { label: "FEA Results" }
    ]
  },
  {
    id: "project-7",
    title: "Smart Surveillance Robot (Distributed Control)",
    stack: ["Raspberry Pi", "Arduino IDE", "Distributed Intelligence", "Serial Comms"],
    description: "Modular surveillance platform utilizing distributed control architecture, separating the high-level perception (Pi Camera) from the low-level mechanical control (Arduino).",
    engineering: [
      "Implemented the asynchronous serial communication protocol (UART) between the two controllers.",
      "Deployed a lightweight live video streaming server from the Raspberry Pi."
    ],
    mermaid: `graph LR
    classDef pi fill:#0f172a,stroke:#3b82f6,stroke-width:2px,color:#fff;
    classDef ard fill:#1e293b,stroke:#10b981,stroke-width:2px,color:#fff;
    classDef output fill:#1e293b,stroke:#f59e0b,stroke-width:2px,color:#fff;
    
    subgraph HighLevel ["Raspberry Pi (Perception)"]
        Server[Web Video Server]:::pi
        Logic[High Level Control Logic]:::pi
    end
    
    subgraph LowLevel ["Arduino (Actuation)"]
        Comms[UART Serial Interface]:::ard
        Motion[Movement Controller]:::ard
    end
    
    Server -.->|Live Feed| Logic
    Logic -->|Serial Command| Comms
    Comms --> Motion
    Motion -->|Actuation| Motors:::output`,
    buttons: [
      { label: "GitHub Repo" },
      { label: "Architecture" }
    ]
  },
  {
    id: "project-8",
    title: "SmartRoomOccupancy (Edge ML Modeling)",
    stack: ["AI/ML", "Data Modeling", "Sensor Fusion", "Edge Deployment"],
    description: "Intelligent Edge system developed at Sahyadri College, focusing on building and deploying data models on resource-constrained hardware for occupancy detection and facility optimization.",
    engineering: [
      "Managed the complete ML lifecycle, from data acquisition and preprocessing to model training and data modeling.",
      "Optimized model parameters for inference stability on embedded edge hardware."
    ],
    mermaid: `graph TD
    classDef preprocess fill:#0f172a,stroke:#3b82f6,stroke-width:2px,color:#fff;
    classDef ml fill:#1e293b,stroke:#a855f7,stroke-width:2px,color:#fff;
    classDef deploy fill:#1e293b,stroke:#10b981,stroke-width:2px,color:#fff;
    
    subgraph Raw [Data Acquisition]
        Sensors[PIR / Temperature / Image]:::preprocess
    end
    
    subgraph Pipeline [Training Workflow]
        Pre[Pre-processing / Feature Eng]:::ml
        Train[Model Training / Data Modeling]:::ml
    end
    
    subgraph Edge [Inference Layer]
        Opt[Model Optimization]:::deploy
        Infer[Edge Inference]:::deploy
    end
    
    Sensors --> Pre
    Pre --> Train
    Train --> Opt
    Opt --> Infer
    Infer -->|Occupancy State| Action:::deploy`,
    buttons: [
      { label: "View ML Repo" },
      { label: "Project Data" }
    ]
  }
];
