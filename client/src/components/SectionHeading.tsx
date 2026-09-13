import { motion } from "framer-motion";

interface SectionHeadingProps {
  title: string;
  number: string;
  subtitle?: string;
  alignment?: "left" | "center";
}

export function SectionHeading({ title, number, subtitle, alignment = "center" }: SectionHeadingProps) {
  return (
    <div className={`mb-16 ${alignment === "center" ? "text-center" : "text-left"}`}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {subtitle && (
          <span className="text-muted-foreground font-semibold tracking-widest text-xs uppercase mb-3 block">
            {subtitle}
          </span>
        )}
        <h2 className={`mb-6 flex flex-wrap items-baseline gap-3 text-4xl font-display font-semibold leading-none tracking-tight text-foreground md:text-5xl ${
          alignment === "center" ? "justify-center" : ""
        }`}>
          <span className="font-mono text-xs font-normal text-primary opacity-40">[ {number} ]</span>
          {title}
        </h2>
        <div 
          className={`h-0.5 w-10 bg-primary rounded-full shadow-[0_0_14px_rgba(0,212,255,0.75)] ${
            alignment === "center" ? "mx-auto" : ""
          }`}
        />
      </motion.div>
    </div>
  );
}
