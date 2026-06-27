import React, { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

interface MermaidDiagramProps {
  chart: string;
}

export function MermaidDiagram({ chart }: MermaidDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: 'dark',
      securityLevel: 'loose',
      fontFamily: 'Fira Code, Courier, monospace',
    });

    const renderChart = async () => {
      if (containerRef.current) {
        try {
          const { svg } = await mermaid.render(`mermaid-chart-${Math.random().toString(36).substr(2, 9)}`, chart);
          if (containerRef.current) {
            containerRef.current.innerHTML = svg;
          }
        } catch (error) {
          console.error("Mermaid parsing error:", error);
        }
      }
    };

    renderChart();
  }, [chart]);

  return (
    <div 
      ref={containerRef} 
      className="mermaid flex justify-center w-full overflow-x-auto my-8 bg-black/40 p-6 rounded-xl border border-border/60" 
    />
  );
}
