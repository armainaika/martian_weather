export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const trends = searchParams.get("trends") ?? "all"; //if there are trends params (used for WeatherTrends.tsx) take them, if no params (used for WeatherTime.tsx)
  const timespan = searchParams.get("timespan") ?? "10d";

  const spanMap: Record<string, number> = {
    "10d": 10,
    "1m": 30,
    "1y": 365,
    "3y": 1095,
  };

  const count = spanMap[timespan] ?? 10;

  const res = await fetch(
    "https://mars.nasa.gov/rss/api/?feed=weather&category=msl&feedtype=json",
    { next: { revalidate: 3600 } }, // cache 1 hour
  );

  const json = await res.json();

  const sols = Object.values(json.soles || {})

    .slice(0, count)
    .map((sol: any) => {
      const base = { sol: sol.sol };

      if (trends === "temp_trends") {
        return {
          ...base,
          max_temp: sol.max_temp,
          min_temp: sol.min_temp,
          unit: "°C",
        };
      } else if (trends === "sun_trends") {
        return {
          ...base,
          sunrise: sol.sunrise,
          sunset: sol.sunset,
        };
      } else if (trends === "pressure_trends") {
        return {
          ...base,
          pressure: sol.pressure,
          unit: "Pa",
        };
      } else if (trends === "all") {
        return {
          ...base,
          terrestrial_date: sol.terrestrial_date,
          max_temp: sol.max_temp,
          min_temp: sol.min_temp,
          sunrise: sol.sunrise,
          sunset: sol.sunset,
          pressure: sol.pressure,
          condition: sol.atmo_opacity,
          uv_irradiance: sol.local_uv_irradiance_index,
        };
      }

      return base;
    });

  return Response.json(sols);
}
