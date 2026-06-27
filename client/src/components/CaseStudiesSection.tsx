import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { caseStudies, CaseStudy } from "../data/caseStudies";
import { Cpu, Plane, Table, Terminal, Sigma, ShieldAlert } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function CaseStudiesSection() {
  const [activeTab, setActiveTab] = useState(caseStudies[0].id);
  const currentStudy = caseStudies.find((study) => study.id === activeTab) || caseStudies[0];

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 font-sans text-xs">
      {/* Tabs */}
      <div className="flex flex-wrap gap-1.5 border-b border-white/[0.05] pb-1 select-none">
        {caseStudies.map((study) => {
          const Icon = study.id === "aerothon-2026" ? Plane : Cpu;
          const isActive = study.id === activeTab;
          return (
            <button
              key={study.id}
              onClick={() => setActiveTab(study.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-t font-mono text-[9px] uppercase tracking-wider transition-all duration-300 border-b-2 ${
                isActive
                  ? "text-primary border-primary bg-primary/5"
                  : "text-muted-foreground border-transparent hover:text-white"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {study.id === "aerothon-2026" ? "01_AERO_UAS_LOG" : "02_SPACE_ANOMALY_OS"}
            </button>
          );
        })}
      </div>

      {/* Content display */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
          className="grid lg:grid-cols-3 gap-8 items-start"
        >
          {/* Main info (left col, span 2) */}
          <div className="lg:col-span-2 space-y-8">
            <div className="space-y-2">
              <span className="font-mono text-[9px] text-accent font-bold uppercase tracking-widest block">
                // System Case Study Specifications
              </span>
              <h3 className="text-xl font-display font-medium text-white tracking-tight leading-tight">
                {currentStudy.title}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed font-light">
                {currentStudy.overview}
              </p>
            </div>

            {/* Governing Math Equations */}
            <div className="p-5 rounded-lg border border-white/[0.05] bg-black/30 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-3 text-white/[0.01] group-hover:text-primary/[0.03] transition-colors">
                <Sigma className="w-12 h-12" />
              </div>
              <h4 className="text-[9px] font-mono font-bold text-primary uppercase tracking-wider mb-3 flex items-center gap-1.5 select-none">
                <Terminal className="w-3 h-3" />
                Governing Control & Modeling Equations
              </h4>
              <div className="space-y-2.5 font-mono text-[9px] sm:text-[10px] text-white bg-[#060606] p-4 rounded-sm border border-white/[0.02] overflow-x-auto">
                {currentStudy.equations.map((eq, idx) => (
                  <div key={idx} className="flex items-start gap-2 py-0.5">
                    <span className="text-accent font-bold shrink-0">eq.0{idx + 1}:</span>
                    <code className="whitespace-pre">{eq}</code>
                  </div>
                ))}
              </div>
            </div>

            {/* Engineering highlights */}
            <div className="space-y-3">
              <h4 className="text-[9px] font-mono font-bold text-accent uppercase tracking-wider border-b border-white/[0.05] pb-2 inline-block select-none">
                Execution & Optimization Highlights
              </h4>
              <ul className="space-y-3 text-muted-foreground text-xs leading-relaxed">
                {currentStudy.engineeringHighlights.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded bg-[#080808] border border-white/[0.05] flex items-center justify-center font-mono text-[9px] font-bold text-primary shrink-0 select-none">
                      {idx + 1}
                    </span>
                    <span className="pt-0.5 font-light">{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Performance metrics table if available */}
            {currentStudy.performanceMetrics && (
              <div className="space-y-3">
                <h4 className="text-[9px] font-mono font-bold text-primary uppercase tracking-wider border-b border-white/[0.05] pb-2 inline-block select-none">
                  Classification Models Comparison
                </h4>
                <div className="overflow-x-auto rounded border border-white/[0.05] bg-black/20">
                  <table className="w-full text-left font-mono text-[9px] border-collapse">
                    <thead>
                      <tr className="bg-black/40 border-b border-white/[0.05] text-muted-foreground uppercase font-bold tracking-wider select-none">
                        <th className="p-3">Model Pipeline</th>
                        <th className="p-3">AUC-ROC Score</th>
                        <th className="p-3">False Alarm</th>
                        <th className="p-3">Resource Signature</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/[0.05]">
                      {currentStudy.performanceMetrics.map((row, idx) => (
                        <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                          <td className="p-3 font-bold text-white">
                            {row.modelName}
                          </td>
                          <td className="p-3 text-accent">{row.aucRoc}</td>
                          <td className="p-3 text-red-400 font-bold">{row.far}</td>
                          <td className="p-3 text-muted-foreground font-light">{row.notes}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          {/* Specs column (right col, span 1) */}
          <div className="space-y-6">
            <div className="p-5 rounded-lg border border-white/[0.05] bg-black/20 space-y-4">
              <h4 className="text-[9px] font-mono font-bold text-white uppercase tracking-wider border-b border-white/[0.05] pb-2.5 flex items-center gap-1.5 select-none">
                <Table className="w-3.5 h-3.5 text-primary" />
                System Specs & Envelopes
              </h4>

              <div className="divide-y divide-white/[0.05]">
                {currentStudy.specsTable.map((spec, idx) => (
                  <div key={idx} className="py-2.5 flex justify-between gap-3 text-xs font-mono">
                    <span className="text-muted-foreground text-[9px] uppercase tracking-tight">
                      {spec.label}
                    </span>
                    <span className="text-white font-bold text-right shrink-0 text-[10px]">
                      {spec.value}
                      {spec.unit && <span className="text-[8px] ml-0.5 text-primary font-bold">{spec.unit}</span>}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-5 rounded-lg border border-white/[0.05] bg-[#f59e0b]/5 border-l-2 border-l-accent flex items-start gap-3 select-none">
              <ShieldAlert className="w-4 h-4 text-accent shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="font-mono text-[8px] font-bold text-accent uppercase tracking-widest block">
                  Safety Protocol Active
                </span>
                <p className="text-[9px] text-muted-foreground leading-relaxed font-light">
                  Metrics verified against structural FEA limits in ANSYS and physical flight tests. Systems conform to strict safety constraints.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
