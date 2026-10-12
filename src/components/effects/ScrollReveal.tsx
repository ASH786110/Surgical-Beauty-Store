import React from "react"
import { motion, type HTMLMotionProps } from "framer-motion"

interface ScrollRevealProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode
  delay?: number
  duration?: number
  yOffset?: number
  className?: string
  staggerChildren?: number
}

export default function ScrollReveal({
  children,
  delay = 0,
  duration = 0.65,
  yOffset = 24,
  className = "",
  staggerChildren,
  ...props
}: ScrollRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1], // Apple / High-end cubic bezier ease-out
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}
