"use client";

import { WeatherTrends } from "../features/WeatherTrends";
import { WeatherTime } from "../features/WeatherTime";
import { LatestPhoto } from "../features/LatestPhoto";
import { Typewriter } from "../app/components/TypeWriter";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <main className="flex w-full max-w-3xl lg:max-w-5xl flex-col items-center justify-start p-4 pb-0 lg:pt-10 sm:items-start">
        <div className="bg-red-600 text-mauve-950 w-full p-2 px-3 ">
          <Typewriter text={"martian_weather 1.0"} />
        </div>
        <WeatherTime />
        <WeatherTrends />
        <LatestPhoto />
        <footer
          id="description"
          className="mt-8 flex w-full text-red-900 border-2 border-b-0 border-red-900 p-3 font-extralight text-sm"
        >
          <p>
            this is a portfolio project made by me,
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-github inline mx-0.5 ml-1"
              viewBox="0 0 16 16"
              aria-hidden={true}
            >
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
            </svg>
            <a
              href="https://github.com/armainaika"
              className="hover:before:scale-x-100 hover:before:origin-left relative before:w-full before:h-px before:origin-right before:transition-transform before:duration-200 before:scale-x-0 before:bg-red-800 before:absolute before:left-0 before:bottom-0 cursor-pointer"
            >
              armainaika
            </a>
            . i'm <b>learning</b> so if there is something you think i could
            improve i'd love to hear your thoughts!
          </p>
        </footer>
      </main>
    </div>
  );
}
