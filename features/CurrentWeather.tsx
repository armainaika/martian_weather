import { Typewriter } from "../app/components/TypeWriter";
import SunSvg from "../public/sun.svg";

/**
 * changes american date display into finnish
 */
const fixDate = (datestamp?: string): string => {
  if (!datestamp) return "00.00.0000";
  const [year, month, day] = datestamp.split("-");
  return `${day}.${month}.${year}`;
};

export type CurrentWeatherProps = {
  loading: boolean;
  currentData: any;
};

/**
 * renders weather module
 */
export function CurrentWeather({
  loading,
  currentData,
}: CurrentWeatherProps): React.ReactElement {
  return (
    <div id="weather" className="border-2 border-red-600 w-full lg:w-7/10 mr-8">
      <div
        className="font-light border-b-2 border-red-600 flex flex-row justify-between py-1 px-3"
        id="weather_header"
      >
        <div className="text-shadow-usual">
          <Typewriter
            loading={loading}
            text={`sol ${currentData?.sol}`}
            placeholder={`sol ${currentData?.sol ?? "0000"}`}
          />
        </div>
        <div className="text-shadow-usual">
          <Typewriter
            loading={loading}
            text={currentData ? fixDate(currentData.terrestrial_date) : ""}
            placeholder={`${currentData?.terrestrial_date ?? "00.00.0000"}`}
          />
        </div>
      </div>
      <div
        className="border-b-2 border-red-600 flex flex-col lg:flex-row w-full justify-center"
        id="temp_sun"
      >
        <div className="border-b-2 lg:border-r-2 lg:border-b-0 border-red-600 w-full lg:w-1/2 flex flex-row py-3">
          <div
            id="min_temp"
            className="flex flex-col w-1/2 py-1.5 px-3 items-center"
          >
            <div className="font-light text-sm text-shadow-usual">
              <Typewriter
                loading={loading}
                text={"min_temp"}
                placeholder={"min_temp"}
              />
            </div>
            <div className="font-dot text-5xl text-shadow-usual flex">
              <Typewriter
                loading={loading}
                text={`${currentData?.min_temp}°C`}
                placeholder={"°C"}
              />
            </div>
          </div>
          <div
            id="max_temp"
            className="flex flex-col w-1/2 py-1.5 px-3 items-center"
          >
            <div className="font-light text-sm text-shadow-usual">
              <Typewriter
                loading={loading}
                text={"max_temp"}
                placeholder={"max_temp"}
              />
            </div>
            <div className="font-dot text-5xl text-shadow-usual">
              <Typewriter
                loading={loading}
                text={`${currentData?.max_temp}°C`}
                placeholder={"°C"}
              />
            </div>
          </div>
        </div>
        <div className="w-full lg:w-1/2 flex flex-row py-3">
          <div
            id="sunrise"
            className="flex flex-col w-1/2 py-1.5 px-3 items-center"
          >
            <div className="font-light text-sm text-shadow-usual">
              <Typewriter
                loading={loading}
                text={"sunrise"}
                placeholder={"sunrise"}
              />
            </div>
            <div className="font-dot text-5xl text-shadow-usual">
              <Typewriter
                loading={loading}
                text={`${currentData?.sunrise}`}
                placeholder={"00:00"}
              />
            </div>
          </div>
          <div
            id="sunset"
            className="flex flex-col w-1/2 py-1.5 px-3 items-center"
          >
            <div className="font-light text-sm text-shadow-usual">
              <Typewriter
                loading={loading}
                text={"sunset"}
                placeholder={"sunset"}
              />
            </div>
            <div className="font-dot text-5xl text-shadow-usual">
              <Typewriter
                loading={loading}
                text={`${currentData?.sunset}`}
                placeholder={"00:00"}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row" id="uv_pres_cond">
        <div
          className="flex flex-row border-b-2 lg:border-b-0 border-red-600 w-full lg:w-2/3  py-3"
          id="uv_pres"
        >
          <div className="flex flex-col w-1/2 py-1.5 px-3 items-center">
            <div className="font-light text-sm text-shadow-usual">
              <Typewriter
                loading={loading}
                text={"uv_irradiance"}
                placeholder={"uv_irradiance"}
              />
            </div>
            <div className="font-dot text-4xl lg:text-5xl text-shadow-usual">
              <Typewriter
                loading={loading}
                text={`${currentData?.uv_irradiance?.toLowerCase()}`}
                placeholder={"moderate"}
              />
            </div>
          </div>
          <div className="flex flex-col w-1/2 py-1.5 px-3 items-center">
            <div className="font-light text-sm text-shadow-usual">
              <Typewriter
                loading={loading}
                text={"pressure"}
                placeholder={"pressure"}
              />
            </div>
            <div className="font-dot text-4xl lg:text-5xl text-shadow-usual">
              <Typewriter
                loading={loading}
                text={`${currentData?.pressure} Pa`}
                placeholder={"000 Pa"}
              />
            </div>
          </div>
        </div>
        <div className="w-full lg:w-1/3 flex flex-row py-4.5 px-3 items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="font-light text-sm text-shadow-usual">
              <Typewriter
                loading={loading}
                text={"condition"}
                placeholder={"condition"}
              />
            </div>
            <div className="font-dot text-5xl text-shadow-usual">
              <Typewriter
                loading={loading}
                text={`${currentData?.condition?.toLowerCase()}`}
                placeholder={"sunny"}
              />
            </div>
          </div>
          <div className="flex justify-center items-center p-1 ml-2 ">
            {loading ? (
              ""
            ) : (
              <SunSvg className="w-15 h-15" aria-label="sun icon" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
