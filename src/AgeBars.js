import * as React from "react";
import { useState, useEffect } from "react";
import {
  motion,
  transform,
  AnimatePresence,
  useAnimation
} from "framer-motion";
import { AxisLabel } from "./AxisLabel";
import { Bar } from "./Bar";

const spacer = 8;
export const spacing = {
  space1: spacer,
  space2: spacer * 2,
  space3: spacer * 3,
  space4: spacer * 4
};

const calculateInterest = (
  initialPrincipal,
  interestRate,
  numTimePeriodsElapsed
) => {
  // ((P*(1+i)^n) - P)
  return (
    initialPrincipal * Math.pow(1 + interestRate, numTimePeriodsElapsed) -
    initialPrincipal
  );
};

const calculateCash = (
  initialPrincipal,
  yearlyContribution,
  yearMultiplier
) => {
  return initialPrincipal + yearMultiplier * yearlyContribution;
};

const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export function AgeBars(props) {
  const { currentAge, yearlyContribution, initialPrincipal } = props;
  const [selectedIndex, setSelectedIndex] = useState(null);
  const controls = useAnimation();

  const selectOnLoad = async (index) => {
    await controls.start({ x: index * (w + spacer) });
    setSelectedIndex(index);
    return controls.stop();
  };

  const numberOfYears = 80 - currentAge;
  const arr = new Array(numberOfYears)
    .fill(0)
    .map((d, i) =>
      calculateInterest(initialPrincipal + i * yearlyContribution, 0.04, i)
    );
  const w = 3;
  const totalWidth = window.innerWidth - spacing.space4 * 2;
  const spacer = totalWidth / arr.length - w;

  // Event handlers
  const handleDrag = (e, info) => {
    const index = Math.floor(info.point.x / (w + spacer));
    setSelectedIndex(index);
  };
  const handleDragEnd = (e, info) => {
    const index = Math.floor(info.point.x / (w + spacer));
    setSelectedIndex(index);
    controls.start({
      x: index * (w + spacer)
    });
  };

  useEffect(() => {
    const index = 30;
    selectOnLoad(index);
  }, []);

  return (
    <motion.div
      // this looks great on the computer, but using it on a phone reveals some issues. what are some ways that we can fix these issues?
      // onPan={(e, info) => setSelectedIndex(Math.floor(info.point.x / (w + spacer)) - 3)}
      // onTap={() => setSelectedIndex(null)}
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        background: "#fff",
        padding: 0,
        margin: 0,
        top: 0,
        left: 0
      }}
    >
      <div style={{ width: "100%", height: 250, background: "#000" }}>
        {arr.map((d, i) => {
          const h = transform(d, [initialPrincipal, 800000], [0, 200]);
          const cashContributed = calculateCash(
            initialPrincipal,
            yearlyContribution,
            i
          );
          const cashH = transform(
            cashContributed,
            [initialPrincipal, 800000],
            [0, 200]
          );
          const age = currentAge + i;
          const xPos = spacing.space4 + i * (w + spacer);
          return (
            <div key={`ineinei_` + i} style={{ width: w }}>
              <Bar
                isSelected={selectedIndex === i}
                x={xPos}
                totalH={h}
                cashH={cashH}
                width={w}
              />
              {/* age label */}
              {i % 5 === 0 &&
                i !== selectedIndex + 1 &&
                i !== selectedIndex - 1 &&
                i !== selectedIndex && (
                  <AxisLabel key={`inebnei_` + i} age={age} x={xPos} fixed />
                )}
              {i === selectedIndex && (
                <AxisLabel
                  key={`ineinuh_` + i}
                  age={age}
                  x={xPos}
                  fixed={false}
                />
              )}
            </div>
          );
        })}
        {/* drag handle */}
        <motion.div
          style={{
            position: "absolute",
            left: spacing.space4 - 13,
            top: 10,
            width: 30,
            height: 30,
            borderRadius: "50%"
          }}
          drag="x"
          dragConstraints={{ left: 0, right: totalWidth }}
          animate={controls}
          dragMomentum={false}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
        >
          {/* left crescent */}
          <motion.div
            style={{
              position: "relative",
              left: -10,
              top: -2,
              width: 30,
              height: 35,
              borderRadius: "50%",
              border: "4px solid white"
            }}
          />
          {/* right crescent */}
          <motion.div
            style={{
              position: "absolute",
              right: -9,
              top: -2,
              width: 30,
              height: 35,
              borderRadius: "50%",
              border: "4px solid white"
            }}
          />
          {/* middle blockout */}
          <motion.div
            style={{
              position: "absolute",
              top: -5,
              left: -8,
              width: 45,
              height: 49,
              borderRadius: "50%",
              background: "#000"
            }}
          />
          {/* middle whitearea */}
          <motion.div
            style={{
              position: "absolute",
              top: 3,
              left: -2,
              width: 30,
              height: 30,
              borderRadius: "50%",
              backgroundColor: "white",
              border: "2px solid white"
            }}
          />
          {/* stem */}
          <motion.div
            style={{
              position: "absolute",
              left: 13,
              top: 28,
              width: 3,
              height: 160,
              background: "white"
            }}
          />
        </motion.div>
        <AnimatePresence>
          {selectedIndex > 0 && selectedIndex < 43 && (
            <motion.div
              initial={{
                scale: 0
              }}
              animate={{
                scale: 1
              }}
              exit={{
                scale: 0
              }}
              style={{
                width: totalWidth,
                height: "30px",
                background: "hsla(0, 0, 0, 1)",
                originX: 1,
                originY: 0,
                x: spacing.space4 - 5,
                y: -25,
                textAlign: "right",
                fontWeight: 700,
                fontSize: 24,
                color: "white"
              }}
            >
              {"$" + numberWithCommas(Math.floor(arr[selectedIndex]))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

AgeBars.defaultProps = {
  currentAge: 37,
  yearlyContribution: 3650,
  initialPrincipal: 3000
};
