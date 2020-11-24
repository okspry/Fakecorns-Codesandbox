import * as React from "react";
import { motion } from "framer-motion";

// Learn more: https://framer.com/api

export function InnerBar({ h, tint }) {
  return (
    <motion.div
      style={{
        position: "absolute",
        width: "100%",
        height: h + "px",
        y: 200 - h,
        background: tint
      }}
    />
  );
}
