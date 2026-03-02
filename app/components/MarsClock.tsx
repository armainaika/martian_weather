"use client";

import { useEffect, useState } from "react";
import {
  getMarsCoordinatedTime,
  getCuriosityLocalTime,
} from "../utils/marsTime";
import { Typewriter } from "./TypeWriter";

export default function MarsClock() {
  const [mtc, setMtc] = useState<string>("");
  const [lmst, setLmst] = useState<string>("");

  useEffect(() => {
    const updateClock = () => {
      setMtc(getMarsCoordinatedTime());
      setLmst(getCuriosityLocalTime());
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div id="time" className="w-full lg:w-3/10 flex flex-col mt-8 lg:mt-0">
      <div className="border-2 border-red-600 lg:h-1/2 flex flex-col">
        <div
          className="font-light border-b-2 border-red-600 py-1 px-3 text-shadow-usual"
          id="curiosity_time_header"
        >
          <Typewriter text={"curiosity_time"} placeholder={"curiosity_time"} />
        </div>
        <div className="font-dot text-6xl lg:text-5xl w-full flex items-center justify-center lg:h-full py-4 lg:py-0 text-shadow-usual">
          {lmst}
        </div>
      </div>
      <div className="border-2 border-red-600 lg:h-1/2 flex flex-col mt-8">
        <div
          className="font-light border-b-2 border-red-600 py-1 px-3"
          id="curiosity_time_header text-shadow-usual"
        >
          <Typewriter
            text={"coordinated_mars_time"}
            placeholder={"coordinated_mars_time"}
          />
        </div>
        <div className="font-dot text-6xl lg:text-5xl w-full flex items-center justify-center lg:h-full py-4 lg:py-0 text-shadow-usual">
          {mtc}
        </div>
      </div>
    </div>
  );
}
