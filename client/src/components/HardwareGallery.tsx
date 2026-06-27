import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Settings, Cpu, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface HardwareItem {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
  specs: { label: string; value: string }[];
  components: string[];
}

const hardwareItems: HardwareItem[] = [
  {
    id: "quadrotor-drone",
    title: "AeroTHON 2026 Quadrotor UAS",
    category: "UAV Systems",
    image: "/drone_blueprint.png",
    description: "An X-frame quadcopter engineered for autonomous navigation, obstacle clearance, and payload release. Powered by a companion computer coordinating high-level vision logic with an autopilot controller.",
    specs: [
      { label: "Flight Controller", value: "Pixhawk 6C (PX4 Autopilot)" },
      { label: "Companion Computer", value: "NVIDIA Jetson Nano (4GB)" },
      { label: "Thrust-to-Weight Ratio", value: "2.87 : 1" },
      { label: "Battery Pack", value: "4S LiPo (5200 mAh)" },
      { label: "Empty Weight", value: "1.45 kg" },
      { label: "Payload Capacity", value: "0.35 kg" },
    ],
    components: ["MAVROS Telemetry", "YOLOv8 CV Target Node", "Payload Release Servo", "Lidar Altimeter"]
  },
  {
    id: "robotic-arm",
    title: "ArticulateX 5-DoF Manipulator",
    category: "Manipulator Kinematics",
    image: "/robotic_arm_blueprint.png",
    description: "A versatile robotic manipulator arm integrating revolute joints for coordinate target positioning. Programmed with Forward and Inverse Kinematics (DH parameters) to map 3D workspace nodes.",
    specs: [
      { label: "Degrees of Freedom", value: "5-DoF + Gripper" },
      { label: "Joint Actuators", value: "High-torque Metal Gear Servos" },
      { label: "Low-level Controller", value: "Arduino Mega 2560" },
      { label: "Communication Link", value: "UART Serial Interface" },
      { label: "Workspace Reach", value: "480 mm" },
      { label: "Payload Limit", value: "0.25 kg" },
    ],
    components: ["DH Inverse Kinematics Solver", "asynchronous Joint Trajectory planning", "Custom Serial protocol", "ArUco end-effector feedback"]
  },
  {
    id: "mobile-robot",
    title: "Autonomous Mobile Warehouse Robot",
    category: "Mobile Robotics",
    image: "/mobile_robot_blueprint.png",
    description: "A differential-drive AGV designed for SLAM indoor mapping and autonomous obstacle avoidance. Combines high-level ROS2 navigation layers with hardware-middleware encoders.",
    specs: [
      { label: "Core Compute Board", value: "Raspberry Pi 5 (8GB)" },
      { label: "Laser Range Sensor", value: "2D LiDAR (360° / 12m)" },
      { label: "Drive Configuration", value: "Differential Drive (2 Wheels + Caster)" },
      { label: "Localization Source", value: "Wheel Encoders + IMU Fusion" },
      { label: "Operating OS", value: "Ubuntu 24.04 (ROS2 Jazzy)" },
      { label: "Maximum Speed", value: "0.8 m/s" },
    ],
    components: ["SLAM Toolbox Mapping", "Nav2 Global/Local Costmaps", "Laser Safety Clamping", "Twist Multiplexer node"]
  }
];

export function HardwareGallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentItem = hardwareItems[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % hardwareItems.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + hardwareItems.length) % hardwareItems.length);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 font-sans text-xs">
      <div className="flex justify-between items-center select-none border-b border-white/[0.05] pb-4">
        <div className="space-y-1">
          <span className="font-mono text-[9px] text-primary font-bold uppercase tracking-widest block">// Hardware Build Log</span>
          <h3 className="text-xl font-display font-semibold text-white tracking-tight leading-none">
            Physical Systems Directory
          </h3>
        </div>
        <div className="flex gap-1.5">
          <button
            onClick={handlePrev}
            className="w-8 h-8 rounded-full border border-white/[0.06] bg-black/40 flex items-center justify-center text-muted-foreground hover:text-white hover:border-primary/50 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={handleNext}
            className="w-8 h-8 rounded-full border border-white/[0.06] bg-black/40 flex items-center justify-center text-muted-foreground hover:text-white hover:border-primary/50 transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentItem.id}
          initial={{ opacity: 0, x: 15 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -15 }}
          transition={{ duration: 0.3 }}
          className="grid md:grid-cols-2 gap-8 items-stretch"
        >
          {/* Blueprint Graphic (Left) */}
          <div className="rounded-lg border border-white/[0.05] bg-black/30 p-6 flex flex-col justify-center items-center min-h-[280px] overflow-hidden relative group">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
            
            {/* Category tag */}
            <Badge className="absolute top-4 left-4 bg-primary/5 border border-primary/10 text-primary font-mono text-[8px] uppercase tracking-wider font-semibold">
              {currentItem.category}
            </Badge>

            <img
              src={currentItem.image}
              alt={currentItem.title}
              className="w-full max-w-[340px] h-auto object-contain brightness-90 group-hover:scale-105 transition-transform duration-700 pointer-events-none"
            />
          </div>

          {/* Description & Technical Specs (Right) */}
          <div className="p-6 md:p-8 rounded-lg border border-white/[0.05] bg-black/20 flex flex-col justify-between gap-6">
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-display font-medium text-white tracking-tight leading-tight">
                  {currentItem.title}
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed mt-2.5 font-light">
                  {currentItem.description}
                </p>
              </div>

              {/* Specs Table */}
              <div className="space-y-2.5">
                <span className="font-mono text-[9px] text-accent font-bold uppercase tracking-wider flex items-center gap-1.5 select-none">
                  <Settings className="w-3 h-3" /> Technical Parameters
                </span>
                <div className="grid grid-cols-2 gap-3 text-xs font-mono border-t border-white/[0.05] pt-3">
                  {currentItem.specs.map((spec, i) => (
                    <div key={i} className="flex flex-col gap-1">
                      <span className="text-muted-foreground text-[8px] uppercase">{spec.label}</span>
                      <span className="text-white font-bold text-[10px]">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Actuators / Sensors details */}
            <div className="space-y-3 pt-4 border-t border-white/[0.05]">
              <span className="font-mono text-[9px] text-primary font-bold uppercase tracking-wider flex items-center gap-1.5 select-none">
                <Cpu className="w-3.5 h-3.5" /> Component Fuses
              </span>
              <div className="flex flex-wrap gap-1.5">
                {currentItem.components.map((comp) => (
                  <span
                    key={comp}
                    className="flex items-center gap-1 px-2.5 py-0.5 bg-white/5 border border-white/[0.02] rounded-sm font-mono text-[9px] text-muted-foreground uppercase"
                  >
                    <ShieldCheck className="w-2.5 h-2.5 text-green-500/80" />
                    {comp}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
