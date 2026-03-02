"use client";

import { useState, useEffect } from "react";
import { Typewriter } from "../app/components/TypeWriter";

import {
  ResponsiveContainer,
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  AreaChart,
  Area,
  DotItemDotProps,
  ActiveDotProps,
} from "recharts";

type WeatherData = {
  /**debugging data input */
  sol: number;
  max_temp?: number;
  min_temp?: number;
  unit?: string;
  sunrise?: string;
  sunset?: string;
  pressure?: number;
};

export interface WeatherTrendsProps {
  /** trends selection */
  trends?: string;
  /** timespan selection */
  timespan?: string;
}

/** custom rectangle dot */
const CustomizedDot = (props: DotItemDotProps & { stroke?: string }) => {
  const { cx, cy, stroke } = props;

  if (cx == null || cy == null) {
    return <g />;
  }

  return (
    <svg
      x={cx - 5}
      y={cy - 5}
      width={10}
      height={10}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 10 10"
    >
      <rect width="10" height="10" fill={stroke ?? "rgba(255,0,0,1)"} />
    </svg>
  );
};

/** active dot */
const ActiveRectangleDot = (props: ActiveDotProps) => {
  const { cx, cy, fill } = props;

  if (cx == null || cy == null) {
    return <g />;
  }

  return (
    <svg
      x={cx - 6}
      y={cy - 6}
      width={12}
      height={12}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 10 10"
    >
      <rect width="10" height="10" fill={fill ?? "rgba(255,0,0,1)"} />
    </svg>
  );
};

const minutesToTime = (totalMinutes: number): string => {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`;
};

/** custom x axis tick */
const CustomizedAxisTick = ({ x, y, payload, trends }: any) => {
  const formatValue =
    trends === "sun_trends" ? minutesToTime(payload.value) : payload.value;

  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={5}
        y={0}
        dy={10}
        className="font-dot text-sm"
        textAnchor="middle"
        fill="rgba(255,0,0,1)"
      >
        {formatValue}
      </text>
    </g>
  );
};

/** custom tooltip */
function CustomTooltip({
  active,
  payload,
  label,
  trends,
}: {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    color: string;
    dataKey?: string;
    payload: Record<string, any>;
  }>;
  label?: string;
  trends?: string;
}): React.ReactElement | null {
  if (!active || !payload || !payload.length) return null;

  return (
    <div className="border-2 border-red-600 bg-mauve-900 p-2 shadow-lg/20 shadow-red-600">
      <p className="mb-0.5 font-dot text-red-600">sol {label}</p>

      {payload.map((entry, index) => {
        let displayValue = entry.value;

        if (trends === "sun_trends") {
          if (entry.name === "sunrise") {
            displayValue = entry.payload.sunrise;
          }

          if (entry.name === "sunset") {
            displayValue = entry.payload.sunset;
          }
        }
        //console.log("entry payload:", entry.payload);
        //console.log("displayvalue:", displayValue);

        return (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            <span className="text-xs font-light">{`${entry.name}:`}</span>
            <span className="font-dot ml-2">
              {displayValue}
              {entry.payload.unit ?? ""}
            </span>
          </p>
        );
      })}
    </div>
  );
}

/** trends themselves */
export function WeatherTrends({
  trends: initialTrends = "temp_trends",
  timespan: initialTimespan = "10d",
}: WeatherTrendsProps): React.ReactElement {
  const [data, setData] = useState<WeatherData[]>([]);
  const [loading, setLoading] = useState(true);

  const [trends, setTrends] = useState(initialTrends);
  const [timespan, setTimespan] = useState(initialTimespan);
  const [trendsSelectOpen, setTrendsSelectOpen] = useState(false);

  type Timespan = "10d" | "1m" | "1y" | "3y";
  const timespans: Timespan[] = ["10d", "1m", "1y", "3y"];

  useEffect(() => {
    async function loadData() {
      setLoading(true);

      try {
        const res = await fetch(
          `/api/weather?trends=${trends}&timespan=${timespan}`,
        );
        if (!res.ok) throw new Error("Failed to fetch weather data");
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [trends, timespan]);

  const [dims, setDims] = useState({ width: 0, height: 0 });

  const cellSize = 20; // size of each grid square in pixels

  const numHorizontalLines = Math.floor(dims.height / cellSize);
  const numVerticalLines = Math.floor(dims.width / cellSize);

  const horizontalPoints = Array.from(
    { length: numHorizontalLines + 1 },
    (_, i) => i * cellSize,
  );

  const verticalPoints = Array.from(
    { length: numVerticalLines + 1 },
    (_, i) => i * cellSize,
  );

  /** calculates amount of ticks to always be about 10 on xaxis */
  const xAxisInterval = Math.ceil(data.length / 10) - 1;

  const timeToMinutes = (time?: string): number | null => {
    if (!time) return null;

    const [hours, minutes] = time.split(":").map(Number);

    if (Number.isNaN(hours) || Number.isNaN(minutes)) return null;

    return hours * 60 + minutes;
  };

  const formattedData =
    trends === "sun_trends"
      ? data.map((d) => ({
          ...d,
          sunriseMinutes: timeToMinutes(d.sunrise),
          sunsetMinutes: timeToMinutes(d.sunset),
        }))
      : data;

  return (
    <div
      id="weather_trends"
      className="mt-8 flex flex-col w-full text-red-600 border-2 border-red-600"
    >
      <div
        className="font-light border-b-2 border-red-600 flex flex-row justify-between py-1 pl-3 pr-1 relative"
        id="weather_header"
      >
        <div
          className="flex flex-row text-red-600 items-center justify-center cursor-pointer "
          onClick={() => setTrendsSelectOpen((prev) => !prev)}
        >
          {trendsSelectOpen && (
            <div
              id="trends_select"
              className="z-100 absolute -translate-x-0.5 top-full border-2 left-0 border-red-600 bg-mauve-900 text-red-600 flex flex-col divide-y-2 divide-red-600"
            >
              <div
                className={`py-0.5 px-2 ${
                  trends === "temp_trends"
                    ? "bg-red-600 text-mauve-900 font-semibold"
                    : ""
                }`}
                onClick={() => setTrends("temp_trends")}
              >
                temp_trends
              </div>
              <div
                className={`py-0.5 px-2 ${
                  trends === "sun_trends"
                    ? "bg-red-600 text-mauve-900 font-semibold"
                    : ""
                }`}
                onClick={() => setTrends("sun_trends")}
              >
                sun_trends
              </div>
              <div
                className={`py-0.5 px-2 ${
                  trends === "pressure_trends"
                    ? "bg-red-600 text-mauve-900 font-semibold"
                    : ""
                }`}
                onClick={() => setTrends("pressure_trends")}
              >
                pressure_trends
              </div>
            </div>
          )}

          <div className="text-shadow-usual">
            <Typewriter text={trends} placeholder={`temp_trends`} />
          </div>
          <div>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17 9V11H15V13H13V15H11V13H9V11H7V9H17Z"
                fill="currentColor"
              />
            </svg>
          </div>
        </div>
        <div id="buttons" className="text-sm space-x-1.5">
          {timespans.map((span) => (
            <button
              key={span}
              className={`text-shadow-usual transition duartion-100 ease-in-out cursor-pointer px-1 border-2 ${
                timespan === span
                  ? "bg-red-600 text-mauve-900 border-red-600"
                  : "border-red-600"
              }`}
              onClick={() => setTimespan(span)}
            >
              <Typewriter text={span} placeholder={`span`} />
            </button>
          ))}
        </div>
      </div>
      <div id="weather_trends" className="">
        <ResponsiveContainer
          width="100%"
          height={250}
          onResize={(width, height) => setDims({ width, height })}
        >
          <RechartsLineChart
            data={formattedData}
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
          >
            <CartesianGrid
              stroke="rgba(255,0,0,0.3)"
              strokeDasharray="0"
              horizontalPoints={horizontalPoints}
              verticalPoints={verticalPoints}
              syncWithTicks
            />

            <XAxis
              dataKey="sol"
              axisLine={false}
              tickLine={false}
              tick={CustomizedAxisTick}
              mirror
              interval={xAxisInterval}
              tickMargin={10}
              padding={{ left: 60, right: 20 }}
              label={{
                className: "font-dot ",
                value: "sol",
                fill: "rgba(232,0,0,1)",
                position: "insideBottomLeft",
                textAnchor: "start",
              }}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={<CustomizedAxisTick trends={trends} />}
              interval={0}
              mirror
              tickMargin={8}
              padding={{ top: 20, bottom: 30 }}
              type={"number"}
              unit={
                trends === "temp_trends"
                  ? "°C"
                  : trends === "pressure_trends"
                    ? "Pa"
                    : ""
              }
            />

            <Tooltip
              content={<CustomTooltip trends={trends} />}
              cursor={false}
            />

            {trends === "temp_trends" && (
              <>
                <Line
                  dataKey="max_temp"
                  stroke="rgba(232,0,0,1)"
                  dot={timespan === "10d" ? CustomizedDot : false}
                  activeDot={ActiveRectangleDot}
                  unit="°C"
                />
                <Line
                  dataKey="min_temp"
                  stroke="rgba(152,0,0,1)"
                  dot={timespan === "10d" ? CustomizedDot : false}
                  activeDot={ActiveRectangleDot}
                  unit="°C"
                />
              </>
            )}

            {trends === "sun_trends" && (
              <>
                <Line
                  dataKey="sunriseMinutes"
                  name="sunrise"
                  stroke="rgba(152,0,0,1)"
                  dot={timespan === "10d" ? CustomizedDot : false}
                  activeDot={ActiveRectangleDot}
                />
                <Line
                  dataKey="sunsetMinutes"
                  name="sunset"
                  stroke="rgba(232,0,0,1)"
                  dot={timespan === "10d" ? CustomizedDot : false}
                  activeDot={ActiveRectangleDot}
                />
              </>
            )}

            {trends === "pressure_trends" && (
              <Line
                dataKey="pressure"
                stroke="rgba(232,0,0,1)"
                dot={timespan === "10d" ? CustomizedDot : false}
                activeDot={ActiveRectangleDot}
              />
            )}
          </RechartsLineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
