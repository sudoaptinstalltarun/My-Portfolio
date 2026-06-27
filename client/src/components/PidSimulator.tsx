import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Play, RotateCcw, Wind } from "lucide-react";

export function PidSimulator() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<HTMLCanvasElement>(null);

  // Controller parameters
  const [kp, setKp] = useState(1.5);
  const [ki, setKi] = useState(0.2);
  const [kd, setKd] = useState(0.8);

  // Setpoint
  const [targetY, setTargetY] = useState(150); // px from bottom of simulator canvas (0-300)

  // Simulation physics state (refs used inside loop to prevent dependency lag)
  const physicsRef = useRef({
    y: 50.0, // drone current height (px from bottom)
    vy: 0.0, // velocity
    errorIntegral: 0.0,
    lastError: 0.0,
    motorThrust: 0.0,
    history: [] as { target: number; actual: number }[],
    bladeAngle: 0.0,
  });

  const targetYRef = useRef(150);
  useEffect(() => {
    targetYRef.current = targetY;
  }, [targetY]);

  // Handle resets
  const handleReset = () => {
    physicsRef.current = {
      y: 50.0,
      vy: 0.0,
      errorIntegral: 0.0,
      lastError: 0.0,
      motorThrust: 0.0,
      history: [],
      bladeAngle: 0.0,
    };
  };

  // Add random disturbance
  const applyWind = () => {
    physicsRef.current.vy -= 15.0; // strong downward thrust displacement
  };

  // Pre-configured PID configurations
  const loadPreset = (preset: "unstable" | "damped" | "slow") => {
    if (preset === "unstable") {
      setKp(4.5);
      setKi(1.2);
      setKd(0.1);
    } else if (preset === "damped") {
      setKp(2.2);
      setKi(0.4);
      setKd(1.5);
    } else if (preset === "slow") {
      setKp(0.6);
      setKi(0.1);
      setKd(0.3);
    }
  };

  // Main game loop
  useEffect(() => {
    let animationId = 0;
    const dt = 0.03; // seconds per frame approx

    const loop = () => {
      const p = physicsRef.current;
      const target = targetYRef.current;

      // 1. PID calculations
      const error = target - p.y;
      
      // Windup protection / clamp integral
      p.errorIntegral = Math.max(-50, Math.min(50, p.errorIntegral + error * dt));
      
      const derivative = (error - p.lastError) / dt;
      p.lastError = error;

      // Output thrust (control signal)
      // Base hover force is ~gravity (assume drone mass = 1kg, base gravity offset is ~10 N)
      const gravityOffset = 9.8;
      const controlSignal = (kp * error) + (ki * p.errorIntegral) + (kd * derivative);
      p.motorThrust = Math.max(0, Math.min(25, gravityOffset + controlSignal));

      // 2. Physics updates (Euler integration)
      const mass = 1.0;
      const dragCoeff = 0.08;
      const gravity = -9.8;
      
      // Forces: gravity (down), motor thrust (up), air resistance drag (opposite velocity)
      const dragForce = -dragCoeff * p.vy * Math.abs(p.vy);
      const netAcceleration = gravity + (p.motorThrust / mass) + dragForce;

      p.vy += netAcceleration * dt * 10; // scaled velocity multiplier for responsiveness
      p.y += p.vy * dt * 10;

      // Collisions with ceiling/ground
      if (p.y < 10) {
        p.y = 10;
        p.vy = 0;
      }
      if (p.y > 290) {
        p.y = 290;
        p.vy = 0;
      }

      // Record telemetry history
      p.history.push({ target, actual: p.y });
      if (p.history.length > 200) {
        p.history.shift();
      }

      // Blade spinning animation
      p.bladeAngle += (p.motorThrust * 1.5) % (Math.PI * 2);

      // Draw Drone Visualizer
      drawSimulator();

      // Draw Response Chart
      drawChart();

      animationId = requestAnimationFrame(loop);
    };

    const drawSimulator = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const p = physicsRef.current;

      // Clear canvas
      ctx.fillStyle = "#020306";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Gridlines background
      ctx.strokeStyle = "rgba(255, 255, 255, 0.03)";
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += 30) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Convert physics y (bottom up) to canvas coordinate (top down)
      const canvasY = canvas.height - p.y;
      const targetCanvasY = canvas.height - targetYRef.current;

      // Draw target setpoint line
      ctx.setLineDash([5, 5]);
      ctx.strokeStyle = "rgba(34, 197, 94, 0.6)"; // green
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, targetCanvasY);
      ctx.lineTo(canvas.width, targetCanvasY);
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw Target Setpoint Label
      ctx.fillStyle = "rgba(34, 197, 94, 0.8)";
      ctx.font = "bold 9px monospace";
      ctx.fillText(`TARGET SETPOINT: ${targetYRef.current}m`, 10, targetCanvasY - 6);

      // Draw Motor Thrust flame/exhaust below rotors
      const thrustIntensity = Math.min(10, p.motorThrust);
      ctx.fillStyle = `rgba(245, 158, 11, ${thrustIntensity / 10})`; // orange glow
      ctx.beginPath();
      // left exhaust
      ctx.arc(canvas.width / 2 - 35, canvasY + 12, thrustIntensity * 1.5, 0, Math.PI * 2);
      // right exhaust
      ctx.arc(canvas.width / 2 + 35, canvasY + 12, thrustIntensity * 1.5, 0, Math.PI * 2);
      ctx.fill();

      // Draw Drone Chassis (X-Frame quadcopter design)
      ctx.strokeStyle = "#3b82f6"; // blue
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(canvas.width / 2 - 35, canvasY);
      ctx.lineTo(canvas.width / 2 + 35, canvasY);
      ctx.stroke();

      // Drone Body core node
      ctx.fillStyle = "#ffffff";
      ctx.strokeStyle = "#1d4ed8";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(canvas.width / 2, canvasY, 12, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Draw rotors and spinning blades
      const drawBlade = (x: number, y: number, angle: number) => {
        // Rotor shaft
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x, y - 6);
        ctx.stroke();

        // Spin bar
        ctx.strokeStyle = "#ef4444"; // red blades
        ctx.lineWidth = 2;
        ctx.beginPath();
        const length = 20;
        ctx.moveTo(x - Math.cos(angle) * length, y - 6 - Math.sin(angle) * 3);
        ctx.lineTo(x + Math.cos(angle) * length, y - 6 + Math.sin(angle) * 3);
        ctx.stroke();
      };

      drawBlade(canvas.width / 2 - 35, canvasY, p.bladeAngle);
      drawBlade(canvas.width / 2 + 35, canvasY, -p.bladeAngle);

      // Draw Telemetry Status info
      ctx.fillStyle = "#ffffff";
      ctx.font = "10px monospace";
      ctx.fillText(`THRUST: ${p.motorThrust.toFixed(2)} N`, 10, 20);
      ctx.fillText(`ALTITUDE: ${p.y.toFixed(1)} m`, 10, 35);
      ctx.fillText(`ERROR: ${(targetYRef.current - p.y).toFixed(1)} m`, 10, 50);
    };

    const drawChart = () => {
      const canvas = chartRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const p = physicsRef.current;

      ctx.fillStyle = "#010204";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (p.history.length < 2) return;

      // Draw Grid
      ctx.strokeStyle = "rgba(255, 255, 255, 0.02)";
      ctx.lineWidth = 1;
      for (let y = 0; y < canvas.height; y += 20) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      const mapHeight = (val: number) => {
        // maps value 0-300 to height 100-0
        return canvas.height - (val / 300) * canvas.height;
      };

      // Plot target height wave
      ctx.strokeStyle = "rgba(34, 197, 94, 0.5)"; // green
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      p.history.forEach((point, idx) => {
        const x = (idx / 200) * canvas.width;
        const y = mapHeight(point.target);
        if (idx === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();

      // Plot actual drone height wave
      ctx.strokeStyle = "#3b82f6"; // blue
      ctx.lineWidth = 2;
      ctx.beginPath();
      p.history.forEach((point, idx) => {
        const x = (idx / 200) * canvas.width;
        const y = mapHeight(point.actual);
        if (idx === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();
    };

    animationId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animationId);
  }, [kp, ki, kd]);

  return (
    <div className="glass border border-white/[0.05] w-full max-w-4xl mx-auto rounded-lg overflow-hidden flex flex-col md:flex-row font-mono text-xs shadow-2xl">
      {/* Simulation Screen */}
      <div className="flex-grow p-5 bg-black/40 flex flex-col gap-4">
        <div className="flex justify-between items-center select-none">
          <span className="text-[9px] font-bold text-primary uppercase tracking-widest">// Drone Control Loop Canvas</span>
        </div>
        <canvas
          ref={canvasRef}
          width={450}
          height={280}
          className="border border-white/[0.05] rounded bg-[#060606] w-full cursor-pointer hover:border-white/[0.1] transition-all"
          onClick={(e) => {
            const canvas = canvasRef.current;
            if (canvas) {
              const rect = canvas.getBoundingClientRect();
              const clickY = e.clientY - rect.top;
              // map canvas pixel from bottom
              const newTarget = canvas.height - clickY;
              setTargetY(Math.max(10, Math.min(290, newTarget)));
            }
          }}
        />
        
        {/* Real-time convergence wave graph */}
        <span className="text-[9px] font-bold text-accent uppercase tracking-widest">// Response convergence (y_tgt vs y_act)</span>
        <canvas
          ref={chartRef}
          width={450}
          height={80}
          className="border border-white/[0.05] rounded bg-[#060606] w-full"
        />
      </div>

      {/* Controller inputs and dashboard info */}
      <div className="w-full md:w-80 p-6 border-t md:border-t-0 md:border-l border-white/[0.05] bg-black/20 flex flex-col justify-between gap-6">
        <div className="space-y-6">
          <div>
            <h4 className="text-xs font-bold text-white mb-1 uppercase tracking-wider">// PID Tuner Terminal</h4>
            <p className="text-[9px] text-muted-foreground leading-relaxed">
              Adjust control parameters to stabilize the autonomous flight controller. Click or drag the Canvas to change setpoint.
            </p>
          </div>

          {/* Preset Buttons */}
          <div className="space-y-2 select-none">
            <span className="text-[9px] uppercase text-muted-foreground tracking-wider font-bold">PID Presets</span>
            <div className="grid grid-cols-3 gap-1.5">
              <Button
                variant="outline"
                size="sm"
                className="text-[9px] h-8 border-white/[0.05] bg-white/[0.02] text-red-400 hover:text-red-300 hover:bg-white/5 rounded shadow-none"
                onClick={() => loadPreset("unstable")}
              >
                Unstable
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-[9px] h-8 border-white/[0.05] bg-white/[0.02] text-blue-400 hover:text-blue-300 hover:bg-white/5 rounded shadow-none"
                onClick={() => loadPreset("slow")}
              >
                Slow
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-[9px] h-8 border-white/[0.05] bg-white/[0.02] text-green-400 hover:text-green-300 hover:bg-white/5 rounded shadow-none"
                onClick={() => loadPreset("damped")}
              >
                Damped
              </Button>
            </div>
          </div>

          {/* Sliders */}
          <div className="space-y-4">
            <div className="space-y-1.5">
              <div className="flex justify-between font-mono text-[10px]">
                <span className="text-primary uppercase tracking-wider font-bold">P_GAIN (Kp):</span>
                <span className="text-white font-bold">{kp.toFixed(1)}</span>
              </div>
              <Slider
                value={[kp]}
                onValueChange={(val) => setKp(val[0])}
                min={0}
                max={5}
                step={0.1}
                className="text-primary"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between font-mono text-[10px]">
                <span className="text-accent uppercase tracking-wider font-bold">I_GAIN (Ki):</span>
                <span className="text-white font-bold">{ki.toFixed(2)}</span>
              </div>
              <Slider
                value={[ki]}
                onValueChange={(val) => setKi(val[0])}
                min={0}
                max={2}
                step={0.05}
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between font-mono text-[10px]">
                <span className="text-green-400 uppercase tracking-wider font-bold">D_GAIN (Kd):</span>
                <span className="text-white font-bold">{kd.toFixed(1)}</span>
              </div>
              <Slider
                value={[kd]}
                onValueChange={(val) => setKd(val[0])}
                min={0}
                max={3}
                step={0.1}
              />
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-col gap-2 pt-4 border-t border-white/[0.05] select-none">
          <Button
            variant="outline"
            className="w-full border-white/[0.05] bg-white/[0.02] text-white hover:bg-white/5 font-mono text-[10px] tracking-wider uppercase h-9 rounded shadow-none"
            onClick={applyWind}
          >
            Inject Wind Gust
          </Button>
          <Button
            variant="ghost"
            className="w-full text-muted-foreground hover:text-white font-mono text-[10px] tracking-wider uppercase h-9 rounded shadow-none"
            onClick={handleReset}
          >
            Reset State
          </Button>
        </div>
      </div>
    </div>
  );
}
