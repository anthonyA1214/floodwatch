import PostComposer from '@/components/map/post-composer';
import PostCard from '../admin/feed/post-card';

export default function CommunityTab() {
  return (
    <div className="flex flex-col gap-6">
      <PostComposer />

      <PostCard
        author={{ name: 'Pedro Santos' }}
        content="Volunteers are needed to help with sandbagging efforts in flood-prone areas. Please contact the local barangay office if you can assist."
        location="BRGY 174, Kai mall caloocan city"
        timestamp="1 day ago"
        reportCount={2}
      />

      <PostCard
        author={{ name: 'Juan Dela Cruz' }}
        content="Heavy rainfall in Zapote area, its starting to accumulate water. Please be careful if you're heading this way! #Flood"
        imageUrl="/images/before_flood_image.jpg"
        location="BRGY 174, Kai mall caloocan city"
        timestamp="2 hrs ago"
        reportCount={3}
      />
    </div>
  );
}
