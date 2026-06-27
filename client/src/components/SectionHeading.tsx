import { motion } from "framer-motion";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  alignment?: "left" | "center";
}

export function SectionHeading({ title, subtitle, alignment = "center" }: SectionHeadingProps) {
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
        <h2 className="text-4xl md:text-5xl font-display font-semibold text-foreground tracking-tight leading-none mb-6">
          {title}
        </h2>
        <div 
          className={`h-1 w-16 bg-muted rounded-full ${
            alignment === "center" ? "mx-auto" : ""
          }`}
        />
      </motion.div>
    </div>
  );
}
