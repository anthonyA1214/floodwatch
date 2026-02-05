import AffectedLocationsCard from '@/components/admin/feed/affected-locations-card';
import PreviewLocationCard from '@/components/admin/feed/preview-location-card';

export default function CommunityFeedRight() {
  return (
    <div className="flex-1 flex flex-col gap-4 min-h-0">
      <AffectedLocationsCard />
      <PreviewLocationCard />
    </div>
  );
}
