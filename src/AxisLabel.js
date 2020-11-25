import * as React from "react";
import { motion } from "framer-motion";

export function AxisLabel({ age, x, fixed }) {
  return (
    <motion.div
      style={{
        position: "absolute",
        top: "205px",
        x: x - 4 + "px",
        fontSize: "12px",
        fontWeight: 300,
        color: "white"
      }}
      initial={{
        scale: 0.8
      }}
      animate={{
        scale: !fixed ? 1.3 : 1
      }}
      exit={{
        scale: 0.8
      }}
    >
      <span>{age}</span>
    </motion.div>
  );
}
