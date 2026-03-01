import { Injectable } from '@nestjs/common';

interface NominatimAddress {
  neighbourhood?: string;
  city?: string;
  region?: string;
}

interface NominatimResponse {
  display_name: string;
  address: NominatimAddress;
}

@Injectable()
export class GeocoderService {
  async reverseGeocode(lat: number, lon: number) {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`,
      { method: 'GET', headers: { 'User-Agent': 'FloodWatch/1.0/UCC' } },
    );

    const data = (await res.json()) as NominatimResponse;
    const address = data.address;

    const displayName = data.display_name || `Lat: ${lat}, Lng: ${lon}`;
    const locationName =
      [address.neighbourhood, address.city, address.region]
        .filter(Boolean)
        .join(', ') || `Lat: ${lat}, Lng: ${lon}`;

    return { displayName, locationName };
  }
}
