interface MarsPhoto {
  earth_date: string;
  mars_date: string;
  camera: string;
  coordinates: { x: number; y: number; z: number };
  mast_azimuth: number;
  mast_elevation: number;
  title: string;
  credit: string;
  image_url: string;
}

export async function GET(req: Request) {
  const res = await fetch(
    "https://api.marsvista.dev/api/v2/photos?rovers=curiosity&include=rover%2Ccamera&field_set=extended&sort=-sol&page=1&per_page=1",
    {
      next: { revalidate: 3600 },
      headers: {
        "X-API-Key": "mv_live_002efbe099911aa5233452224af4e91760c14bed",
      },
    },
  );

  const json = await res.json();
  console.log(json);

  const photos: MarsPhoto[] = json.data.map((item: any) => ({
    earth_date: item.attributes.date_taken_utc,
    mars_date: item.attributes.date_taken_mars,
    camera: item.relationships.camera.id,
    coordinates: item.attributes.location.coordinates,
    mast_azimuth: item.attributes.telemetry.mast_azimuth,
    mast_elevation: item.attributes.telemetry.mast_elevation,
    title: item.attributes.title,
    credit: item.attributes.credit,
    image_url: item.attributes.images.full,
  }));

  return Response.json(photos);
}
