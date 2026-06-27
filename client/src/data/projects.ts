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
    id: "aerothon-2026",
    title: "AeroTHON 2026 — Autonomous UAS for Aerial Surveillance & Rapid Delivery",
    stack: ["ROS2 Humble", "PX4 Autopilot", "MAVROS", "YOLOv8", "Jetson Nano", "MATLAB/Simulink", "Gazebo SITL"],
    description: "Autonomy stack and flight dynamics system engineered for a 1.8kg X-frame quadrotor UAS competing in SAEINDIA's national AeroTHON contest.",
    engineering: [
      "Architected the ROS2 + MAVROS offboard control pipeline on a Jetson Nano interfacing with PX4 over serial, achieving stable waypoint navigation and takeoff sequences.",
      "Developed a YOLOv8 real-time target identification node with PID-based camera-to-ground offset correction to trigger precision payload release.",
      "Performed flight dynamics simulation in Simulink to model 4-axis control loop response, wind shear disturbances, and evaluate PID vs LQR stability.",
      "Validated the complete navigation and vision stack inside a custom Gazebo SITL environment before physical test flights."
    ],
    mermaid: `graph TD
    classDef jetson fill:#0f172a,stroke:#3b82f6,stroke-width:2px,color:#fff;
    classDef pixhawk fill:#1e293b,stroke:#10b981,stroke-width:2px,color:#fff;
    classDef ground fill:#1e293b,stroke:#f59e0b,stroke-width:2px,color:#fff;
    
    subgraph Jetson [Jetson Nano - ROS2 Humble]
        YOLO[YOLOv8 CV Node]:::jetson
        PID[PID Pixel-to-Metre Target Calc]:::jetson
        Nav[Autonomy Mission Coordinator]:::jetson
    end
    
    subgraph Pixhawk [Pixhawk Flight Controller - PX4]
        Mavlink[MAVROS Node]:::pixhawk
        EKF[PX4 EKF3 Estimator]:::pixhawk
        Control[Attitude/Position Loops]:::pixhawk
        Actuator[Payload Servo & Motors]:::pixhawk
    end
    
    subgraph Simulation [Gazebo SITL / MATLAB]
        Sim[Virtual Environment]:::ground
    end
    
    YOLO -->|Relative Position| PID
    PID -->|Target Vector| Nav
    Nav -->|Offboard Commands| Mavlink
    Mavlink -->|State Feedback| Nav
    EKF --> Control
    Control --> Actuator
    Sim -.->|Telemetry & Camera feed| Jetson`,
    buttons: [
      { label: "GitHub Repo", link: "https://github.com/sudoaptinstalltarun/AeroTHON-2026-Challengers-Simulations" }
    ]
  },
  {
    id: "deepspace-anomaly",
    title: "AI-Based Telemetry Anomaly Detection & Autonomous Spacecraft Decision Engine",
    stack: ["Python", "Isolation Forest", "One-Class SVM", "LSTM Autoencoder", "Jupyter", "HTML/JS Control Board"],
    description: "Onboard full-stack AI system developed for India Space Academy's program, fusing sensor telemetry to predict failure and autonomously coordinate mitigation under communication delays.",
    engineering: [
      "Built and evaluated 4 ML pipelines, achieving best-in-class anomaly detection using an Isolation Forest model (AUC-ROC: 0.976, False Alarm Rate: 2.4%).",
      "Developed a Remaining Useful Life (RUL) regression predictor based on NASA CMAPSS datasets, yielding a Mean Absolute Error of 51.8 cycles.",
      "Architected a 5-level Autonomous Decision Engine (Nominal to Critical) to trigger self-healing script protocols on simulated onboard subsystems.",
      "Created an interactive mission control dashboard in HTML/JavaScript to visualize real-time spacecraft state predictions."
    ],
    mermaid: `graph LR
    classDef data fill:#0f172a,stroke:#3b82f6,stroke-width:2px,color:#fff;
    classDef model fill:#1e293b,stroke:#a855f7,stroke-width:2px,color:#fff;
    classDef control fill:#1e293b,stroke:#10b981,stroke-width:2px,color:#fff;
    
    subgraph Inputs [Spacecraft Telemetry Streams]
        CMAPSS[NASA CMAPSS Data]:::data
        System[Subsystem Sensor Feed]:::data
        Weather[Space Weather/Solar Storms]:::data
    end
    
    subgraph Inference [Onboard ML Pipeline]
        Forest[Isolation Forest / SVM]:::model
        LSTM[LSTM Autoencoder]:::model
        RUL[RUL Prediction Node]:::model
    end
    
    subgraph Action [Decision & UI]
        Engine[Autonomous Decision Engine]:::control
        UI[Mission Control Dashboard]:::control
    end
    
    CMAPSS --> Forest
    System --> LSTM
    Weather --> Forest
    Forest -->|Anomaly Flag| Engine
    LSTM -->|Reconstruction Error| Engine
    CMAPSS --> RUL
    RUL -->|Time-to-Failure| Engine
    Engine -->|Trigger Corrective Script| Subsystems:::control
    Engine -->|Update Stream| UI`,
    buttons: [
      { label: "GitHub Profile", link: "https://github.com/sudoaptinstalltarun" }
    ]
  },
  {
    id: "warehouse-picking",
    title: "Intelligent Autonomous Warehouse Picking Robot",
    stack: ["ROS2 Humble", "OpenCV", "ArUco Markers", "A* Planner", "DWA Controller", "SLAM Toolbox", "Gazebo Classic"],
    description: "Autonomous picking robot featuring camera-based item detection, a dynamic task re-scheduler, and mapping navigation built with Team SudoSquad for a hackathon.",
    engineering: [
      "Engineered an OpenCV + ArUco marker detection pipeline with temporal filters to stabilize pick targets and suppress false detections.",
      "Designed a dynamic task cost-scheduler scoring distance, priority, and weight, enabling path re-planning in <200ms upon new orders.",
      "Configured Nav2 stack (A* global, DWA local) and SLAM Toolbox, integrating a safety layer with laser velocity clamps."
    ],
    mermaid: `graph TD
    classDef perception fill:#0f172a,stroke:#3b82f6,stroke-width:2px,color:#fff;
    classDef scheduler fill:#1e293b,stroke:#a855f7,stroke-width:2px,color:#fff;
    classDef nav fill:#1e293b,stroke:#10b981,stroke-width:2px,color:#fff;
    
    subgraph Vision [Perception Engine]
        Camera[RGB Camera Stream]:::perception
        Aruco[ArUco Target Detection]:::perception
        Filter[Multi-Frame Temp Filter]:::perception
    end
    
    subgraph Decision [Dynamic Scheduler]
        Queue[Order Task Queue]:::scheduler
        Cost[Cost Solver weight/dist]:::scheduler
    end
    
    subgraph Navigation [ROS2 Nav2 & Safety]
        SLAM[SLAM Toolbox Mapping]:::nav
        Nav2[A* Global / DWA Local]:::nav
        Clamp[Velocity Clamping / Safety]:::nav
    end
    
    Camera --> Aruco
    Aruco --> Filter
    Filter -->|Validated Pick XYZ| Cost
    Queue --> Cost
    Cost -->|Active Target Command| Nav2
    SLAM --> Nav2
    Nav2 --> Clamp
    Clamp -->|Safe Velocity Commands| Motors:::nav`,
    buttons: [
      { label: "GitHub Profile", link: "https://github.com/sudoaptinstalltarun" }
    ]
  },
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
