export interface CaseStudy {
  id: string;
  title: string;
  subtitle: string;
  overview: string;
  equations: string[];
  specsTable: { label: string; value: string; unit?: string }[];
  performanceMetrics?: { modelName: string; aucRoc: number; far: string; notes: string }[];
  engineeringHighlights: string[];
}

export const caseStudies: CaseStudy[] = [
  {
    id: "aerothon-2026",
    title: "Autonomous UAS for Aerial Surveillance & Rapid Delivery",
    subtitle: "AeroTHON 2026 Autonomy & Flight Dynamics Stack",
    overview: "This case study details the mechanical and control loop design of a 1.8kg X-frame quadrotor UAS optimized for SAEINDIA's Design-Build-Fly contest. The engineering work focused on calculating physical constants from first principles and validating control responses under simulated wind shear.",
    equations: [
      "Moment of Inertia (Pitch/Roll): I_xx = I_yy = \\sum (m_i \\cdot r_i^2) \\approx 0.01126\\text{ kg}\\cdot\\text{m}^2",
      "Moment of Inertia (Yaw): I_zz \\approx 0.02104\\text{ kg}\\cdot\\text{m}^2",
      "Thrust-to-Weight Ratio: TWR = \\frac{4 \\cdot T_{max}}{m \\cdot g} = \\frac{4 \\cdot 1.32\\text{ kg}}{1.8\\text{ kg}} \\approx 2.87\\text{ (Safe hover at 35% throttle)}"
    ],
    specsTable: [
      { label: "Drone All-Up Weight", value: "1.8", unit: "kg" },
      { label: "Propeller Dimension", value: "10x4.5", unit: "inch" },
      { label: "Nominal Operating Thrust", value: "1.32", unit: "kg/motor" },
      { label: "Calculated Inertia Ixx", value: "0.01126", unit: "kg·m²" },
      { label: "Calculated Inertia Izz", value: "0.02104", unit: "kg·m²" },
      { label: "Thrust-to-Weight Ratio", value: "2.87 : 1" },
      { label: "Battery Pack configuration", value: "4S LiPo (5200 mAh)" },
      { label: "Maximum Flight Endurance", value: "18.5", unit: "minutes" }
    ],
    engineeringHighlights: [
      "Derived moments of inertia from physical component layouts to calibrate the attitude controller gains, ensuring high stability in offboard flight nodes.",
      "Conducted frequency-domain analysis of the PX4 PID rate loops, verifying Bode phase margins above 50° for roll, pitch, and altitude controls.",
      "Developed a custom ROS2 package parsing coordinate targets from real-time OpenCV QR code visual feeds, directing PX4 trajectory setpoints via MAVROS.",
      "Designed a safety throttle clamp threshold in MATLAB to prevent motor saturation during high wind disturbance rejection."
    ]
  },
  {
    id: "deepspace-anomaly",
    title: "Deep Space Telemetry Anomaly Detection Engine",
    subtitle: "Spacecraft Autonomous Self-Healing Decision Support System",
    overview: "Built as part of India Space Academy's space exploration initiative, this project models an onboard anomaly detection and automated recovery system. Due to the 2-to-24 minute round-trip light time communications delay during deep space missions, the onboard AI must independently classify and mitigate critical state anomalies.",
    equations: [
      "Anomaly Score (Isolation Forest): s(x, n) = 2^{-\\frac{E(h(x))}{c(n)}}",
      "RUL Remaining Useful Life: RUL_t = \\text{Cycles}_{max} - \\text{Cycle}_t",
      "LSTM Autoencoder Reconstruction Loss: L_{MAE} = \\frac{1}{d} \\sum_{i=1}^{d} |x_i - \\hat{x}_i|"
    ],
    specsTable: [
      { label: "NASA Turbofan Cycles Dataset", value: "C-MAPSS FD001" },
      { label: "Nominal Sensor Channels", value: "21 (Pressure, Temp, Vibration)" },
      { label: "Decision Loop Frequency", value: "5", unit: "Hz" },
      { label: "Best-performing model", value: "Isolation Forest" },
      { label: "Remaining Useful Life MAE", value: "51.8", unit: "cycles" },
      { label: "Subsystem Telemetry Fuses", value: "NASA CMAPSS, Solar Wind, Thermal" },
      { label: "Target Processor Board", value: "ARM Cortex-A72 (Jetson/Pi)" }
    ],
    performanceMetrics: [
      { modelName: "Isolation Forest", aucRoc: 0.976, far: "2.4%", notes: "Recommended. Very low resource footprint, runs in <3ms." },
      { modelName: "LSTM Autoencoder", aucRoc: 0.965, far: "3.1%", notes: "Excellent for sequential pattern errors, high memory overhead." },
      { modelName: "One-Class SVM", aucRoc: 0.941, far: "4.8%", notes: "Stable, but training latency scales poorly with data size." },
      { modelName: "Z-Score Baseline", aucRoc: 0.812, far: "12.0%", notes: "High false alarm rate due to transient sensor noise spikes." }
    ],
    engineeringHighlights: [
      "Fused turbofan sensor arrays with simulated solar wind speed fluctuations to model harsh space weather impacts on power subsystem longevity.",
      "Optimized Isolation Forest parameters to run onboard resource-constrained controllers, minimizing footprint and keeping CPU loads below 8%.",
      "Designed a 5-level Hierarchical Recovery Engine triggering hardware-restart loops when sensor anomalies violate safety envelopes.",
      "Implemented sliding-window temporal normalization to avoid false alarms during normal transient thermal transitions."
    ]
  }
];
