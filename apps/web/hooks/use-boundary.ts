import useSWR from 'swr';

export function useBoundary() {
  const { data } = useSWR(
    'caloocan-boundary',
    async () => {
      const [details, outline] = await Promise.all([
        fetch('/geo/caloocan.geojson').then((res) => res.json()),
        fetch('/geo/caloocan-outline.geojson').then((res) => res.json()),
      ]);

      return { details, outline };
    },
    { revalidateOnFocus: false },
  );

  return {
    caloocanGeoJSON: data?.details ?? null,
    caloocanOutlineGeoJSON: data?.outline ?? null,
  };
}
