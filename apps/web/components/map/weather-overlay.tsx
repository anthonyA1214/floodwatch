import { useIsMobile } from '@/hooks/use-mobile';
import WeatherAccordion from './weather-accordion';
import WeatherDrawer from './weather-drawer';
import { useMapOverlay } from '@/contexts/map-overlay-context';
import { useEffect, useState } from 'react';
import { getUserLocation } from '@/lib/utils/get-user-location';
import { toast } from 'sonner';

export default function WeatherOverlay() {
  const isMobile = useIsMobile();
  const { activeOverlay } = useMapOverlay();
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const pos = await getUserLocation();
        setLocation(pos);
      } catch {
        toast.error(
          'Unable to retrieve your location. Please allow location access and refresh the page to see weather information.',
        );
      }
    };

    fetchLocation();
  }, []);

  if (activeOverlay) return null; // Don't show weather if any other overlay is active

  if (isMobile) {
    return (
      <div className='absolute inset-0 flex flex-col h-full w-full'>
        <WeatherDrawer
          latitude={location?.latitude ?? null}
          longitude={location?.longitude ?? null}
        />
      </div>
    );
  }

  return (
    <div className='absolute bottom-4 left-4 max-w-xs w-full z-10 flex flex-col'>
      <WeatherAccordion
        latitude={location?.latitude ?? null}
        longitude={location?.longitude ?? null}
      />
    </div>
  );
}
