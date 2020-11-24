import * as React from "react";
import { motion } from "framer-motion";
import { InnerBar } from "./InnerBar";

// Learn more: https://framer.com/api

export function Bar({ isSelected, x, totalH, cashH, width }) {
  return (
    <motion.div
      style={{
        position: "absolute",
        width: width,
        x: x + "px",
        borderRadius: "3px 3px 0 0"
      }}
      initial={{
        scaleX: 1,
        opacity: 0.8
      }}
      animate={{
        scaleX: isSelected ? 2.5 : 1,
        opacity: isSelected ? 1 : 0.8
      }}
    >
      {/* total earnings */}
      <InnerBar h={totalH} tint={"hsla(200, 100%, 50%, 0.5)"} />
      {/* cash contributed */}
      <InnerBar h={cashH} tint={"hsla(200, 100%, 50%, 1)"} />
    </motion.div>
  );
}

/*
--light-pink: #f8e5e5;
  --medium-pink: #a88586;
  --bright-pink: #fa255e;
*/
