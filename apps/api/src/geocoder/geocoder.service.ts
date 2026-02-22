import { Injectable } from '@nestjs/common';

@Injectable()
export class GeocoderService {
  async reverseGeocode(lat: number, lon: number) {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`,
      { method: 'GET', headers: { 'User-Agent': 'FloodWatch/1.0/UCC' } },
    );

    const data = (await res.json()) as { display_name: string };
    const displayName = data.display_name || `Lat: ${lat}, Lng: ${lon}`;
    return displayName;
  }
}
