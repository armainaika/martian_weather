"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Typewriter } from "../app/components/TypeWriter";

type imageData = {
  earth_date: string;
  mars_date: string;
  camera: string;
  coordinates: { x: number; y: number; z: number };
  mast_azimuth: number;
  mast_elevation: number;
  title: string;
  credit: string;
  image_url: string;
};

const formatEarthDate = (datestamp: string): string => {
  const date = new Date(datestamp);
  const formatter = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  const parts = formatter.formatToParts(date);

  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";

  const formatted = `${get("day")}.${get("month")}.${get("year")} ${get("hour")}:${get("minute")}:${get("second")}`;

  return formatted;
};

const formatMarsDate = (datestamp: string): string => {
  const match = datestamp.match(/^Sol-(\d+)M(\d{2}:\d{2}:\d{2})/);
  if (!match) return "";

  const sol = parseInt(match[1], 10);
  const time = match[2];

  return `sol ${sol}, ${time}`;
};

export function LatestPhoto(): React.ReactElement {
  const [imageData, setImageData] = useState<imageData | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);

      const res = await fetch(`/api/latestphoto`);

      const json = await res.json();
      setImageData(json[0]);
      console.log("imageData", json[0]);
      setLoading(false);
    }

    loadData();
  }, []);
  return (
    <div
      id="latest_photos"
      className="mt-8 flex flex-col w-full text-red-600 border-2 border-red-600 "
    >
      <div
        className="font-light border-b-2 border-red-600 py-1 px-3"
        id="curiosity_time_header text-shadow-usual"
      >
        <Typewriter text={"latest_photo"} placeholder={"latest_photo"} />
      </div>
      <div
        className={`flex flex-col lg:flex-row w-full justify-center ${imageData?.title ? "text-red-600" : "text-red-900"}`}
      >
        <div className="flex flex-row w-full lg:w-1/2 justify-between lg:justify-center border-b-2 lg:border-r-2 lg:border-b-0 border-red-600 ">
          {loading ? (
            <span className="w-full flex items-center justify-center text-red-900">
              <Typewriter
                text={"loading photo..."}
                placeholder={"loading photo..."}
              />
            </span>
          ) : imageData?.image_url ? (
            <Image
              src={imageData.image_url}
              alt="image from curiosity"
              width={500}
              height={300}
              loading="lazy"
              className=""
            />
          ) : (
            <span className="w-full flex items-center justify-center text-red-900">
              <Typewriter
                text={"sorry, no photo this time :("}
                placeholder={"sorry, no photo this time :("}
              />
            </span>
          )}
        </div>
        <div className="w-full lg:w-1/2 flex flex-col py-5 px-10 items-center justify-center">
          <div className="pb-4 w-full ">
            {loading ? (
              <Typewriter
                text={"loading title..."}
                placeholder={"loading title..."}
              />
            ) : (
              (imageData?.title ?? (
                <Typewriter
                  text={"no title data"}
                  placeholder={"no title data"}
                />
              ))
            )}
          </div>
          <div className="w-full flex flex-row text-sm lg:text-base">
            <div className="w-full flex flex-col font-extralight text-shadow-usual">
              <div>
                <Typewriter text={"mars_date"} placeholder={"mars_date"} />
              </div>
              <div>
                <Typewriter text={"earth_date"} placeholder={"earth_date"} />
              </div>
              <div>
                <Typewriter text={"camera"} placeholder={"camera"} />
              </div>
              <div>
                <Typewriter text={"coordinates"} placeholder={"coordinates"} />
              </div>
              <div>
                <Typewriter
                  text={"mast_azimuth"}
                  placeholder={"mast_azimuth"}
                />
              </div>
              <div>
                <Typewriter
                  text={"mast_elevation"}
                  placeholder={"mast_elevation"}
                />
              </div>
            </div>
            <div className="w-full flex flex-col font-dot text-shadow-usual px-2">
              <div>
                {loading ? (
                  <Typewriter
                    text={"loading mars_date..."}
                    placeholder={"loading mars_date..."}
                  />
                ) : imageData?.mars_date ? (
                  <Typewriter
                    text={formatMarsDate(imageData.mars_date)}
                    placeholder={"sol 0000, 00:00:00"}
                  />
                ) : (
                  <Typewriter text={"no data"} placeholder={"no data"} />
                )}
              </div>
              <div>
                {loading ? (
                  <Typewriter
                    text={"loading earth_date..."}
                    placeholder={"loading earth_date..."}
                  />
                ) : imageData?.earth_date ? (
                  <Typewriter
                    text={formatEarthDate(imageData.earth_date)}
                    placeholder={"00.00.0000, 00:00:00"}
                  />
                ) : (
                  <Typewriter text={"no data"} placeholder={"no data"} />
                )}
              </div>

              <div>
                {loading ? (
                  <Typewriter
                    text={"loading camera..."}
                    placeholder={"loading camera..."}
                  />
                ) : imageData?.camera ? (
                  <Typewriter text={imageData?.camera} placeholder={"000CAM"} />
                ) : (
                  <Typewriter text={"no data"} placeholder={"no data"} />
                )}
              </div>
              <div>
                {loading ? (
                  <Typewriter
                    text={"loading coordinates..."}
                    placeholder={"loading coordinates..."}
                  />
                ) : imageData?.coordinates ? (
                  <Typewriter
                    text={`${imageData?.coordinates.x.toFixed(2)}, ${imageData?.coordinates.y.toFixed(2)}, 
                ${imageData?.coordinates.z.toFixed(2)}`}
                    placeholder={"00.000, 00.000, 00.000"}
                  />
                ) : (
                  <Typewriter text={"no data"} placeholder={"no data"} />
                )}
              </div>
              <div>
                {loading ? (
                  <Typewriter
                    text={"loading mast_azimuth..."}
                    placeholder={"loading mast_azimuth..."}
                  />
                ) : imageData?.mast_azimuth ? (
                  <Typewriter
                    text={`${imageData?.mast_azimuth}°`}
                    placeholder={"000.000°"}
                  />
                ) : (
                  <Typewriter text={"no data"} placeholder={"no data"} />
                )}
              </div>
              <div>
                {loading ? (
                  <Typewriter
                    text={"loading mast_elevation..."}
                    placeholder={"loading mast_elevation..."}
                  />
                ) : imageData?.mast_elevation ? (
                  <Typewriter
                    text={`${imageData?.mast_elevation}°`}
                    placeholder={"000.000°"}
                  />
                ) : (
                  <Typewriter text={"no data"} placeholder={"no data"} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
