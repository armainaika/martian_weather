import { useState, useEffect } from "react";
import MarsClock from "../app/components/MarsClock";
import { CurrentWeather } from "../features/CurrentWeather";

type CurrentData = {
  sol: number;
  terrestrial_date: string;
  max_temp?: number;
  min_temp?: number;
  sunrise?: string;
  sunset?: string;
  pressure?: string;
  condition?: string;
  uv_irradiance?: string;
};

/**
 * renders weather and time modules
 */
export function WeatherTime(): React.ReactElement {
  const [currentData, setCurrentData] = useState<CurrentData | undefined>(
    undefined,
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      /**  call weather api
      const res = await fetch(`/api/weather`);
      const json = await res.json();
      // debugging
      // console.log("json:", json);
      setCurrentData(json[0]);

      setLoading(false);*/

      //better code
      try {
        const res = await fetch(`/api/weather`);
        if (!res.ok) throw new Error("Failed to fetch weather data"); //in the future make ui element for error
        const json = await res.json();
        setCurrentData(json[0]);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);
  //console.log("currentdata", currentData);
  return (
    <div
      id="weather_time"
      className="mt-8 flex flex-col lg:flex-row w-full text-red-600"
    >
      {/* weather*/}
      <CurrentWeather loading={loading} currentData={currentData} />
      {/* time module */}
      <MarsClock />
    </div>
  );
}
