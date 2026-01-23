import MaplibreGeocoder, {
  MaplibreGeocoderApi,
  MaplibreGeocoderApiConfig,
  MaplibreGeocoderFeatureResults,
} from '@maplibre/maplibre-gl-geocoder';

import maplibregl from 'maplibre-gl';
import '@maplibre/maplibre-gl-geocoder/dist/maplibre-gl-geocoder.css';

import { useEffect } from 'react';
import { useMap } from 'react-map-gl/maplibre';

export default function Geocoder() {
  const { current: map } = useMap();

  useEffect(() => {
    if (!map) return;

    const geocoderApi: MaplibreGeocoderApi = {
      forwardGeocode: async (config: MaplibreGeocoderApiConfig) => {
        const features: unknown[] = [];
        try {
          const request = `https://nominatim.openstreetmap.org/search?q=${
            config.query
          }&format=geojson&polygon_geojson=1&addressdetails=1`;

          const response = await fetch(request);
          const geojson = await response.json();

          for (const feature of geojson.features) {
            const center = [
              feature.bbox[0] + (feature.bbox[2] - feature.bbox[0]) / 2,
              feature.bbox[1] + (feature.bbox[3] - feature.bbox[1]) / 2,
            ];
            const point = {
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: center,
              },
              place_name: feature.properties.display_name,
              properties: feature.properties,
              text: feature.properties.display_name,
              place_type: ['place'],
              center,
            };
            features.push(point);
          }
        } catch (err) {
          console.error(`Failed to forwardGeocode with error: ${err}`);
        }

        return { features } as MaplibreGeocoderFeatureResults;
      },
    };

    const geocoder = new MaplibreGeocoder(geocoderApi, {
      placeholder: 'Search location',
      marker: false,
      maplibregl,
    });

    map.addControl(geocoder, 'top-left');

    return () => {
      map.removeControl(geocoder);
    };
  }, [map]);

  return null;
}
