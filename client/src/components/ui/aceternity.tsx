import { motion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";

interface AuroraBackgroundProps {
  children?: ReactNode;
  className?: string;
}

export function AuroraBackground({ children, className = "" }: AuroraBackgroundProps) {
  return (
    <div className={`pointer-events-none overflow-hidden ${className}`}>
      <div className="aceternity-aurora aceternity-aurora-one" />
      <div className="aceternity-aurora aceternity-aurora-two" />
      <div className="aceternity-dots absolute inset-0 opacity-40" />
      {children}
    </div>
  );
}

interface TextGenerateEffectProps {
  words: string;
  className?: string;
  delay?: number;
}

export function TextGenerateEffect({ words, className = "", delay = 0 }: TextGenerateEffectProps) {
  return (
    <motion.span
      aria-label={words}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.055,
            delayChildren: delay,
          },
        },
      }}
      className={`inline-flex flex-wrap ${className}`}
    >
      {words.split(" ").map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          variants={{
            hidden: { opacity: 0, y: 12, filter: "blur(8px)" },
            visible: {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              transition: { duration: 0.45, ease: "easeOut" },
            },
          }}
          className={index > 0 ? "ml-[0.28em]" : ""}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}

interface MovingBorderProps {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
}

export function MovingBorder({
  children,
  className = "",
  contentClassName = "",
}: MovingBorderProps) {
  return (
    <span className={`moving-border relative isolate inline-flex overflow-hidden rounded-md p-px ${className}`}>
      <span className="moving-border-spin absolute inset-[-200%]" />
      <span className={`relative z-10 block rounded-[inherit] bg-[#050505] ${contentClassName}`}>
        {children}
      </span>
    </span>
  );
}

type CardHoverEffectProps = Omit<HTMLMotionProps<"div">, "children"> & {
  children?: ReactNode;
};

export function CardHoverEffect({ children, className = "", ...props }: CardHoverEffectProps) {
  return (
    <motion.div
      {...props}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className={`group/card relative h-full ${className}`}
    >
      <div className="pointer-events-none absolute -inset-px rounded-[inherit] bg-gradient-to-r from-primary/0 via-primary/60 to-purple-500/0 opacity-0 blur-sm transition-opacity duration-500 group-hover/card:opacity-100" />
      <div className="relative h-full rounded-[inherit] border border-white/[0.07] bg-[#080808]/90 transition-[border-color,box-shadow] duration-500 group-hover/card:border-primary/60 group-hover/card:shadow-[0_0_24px_rgba(0,212,255,0.3)]">
        {children}
      </div>
    </motion.div>
  );
}