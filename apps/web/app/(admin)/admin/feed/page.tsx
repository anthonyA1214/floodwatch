import SearchBar from '@/components/search-bar';
import { IconClock, IconFlag, IconMapPin } from '@tabler/icons-react';

import Image from 'next/image';
import { ScrollArea } from '@/components/ui/scroll-area';
import PostComposer from '@/components/admin/feed/post-composer';
import PostCard from '@/components/admin/feed/post-card';

export default function CommunityFeedPage() {
  return (
    <div className="flex-1 flex flex-col bg-white p-8 rounded-2xl gap-8 min-h-0">
      {/* Header */}
      <h1 className="font-poppins text-3xl font-bold">User Management</h1>

      <div className="flex justify-between gap-4">
        <div className="flex-1">
          <SearchBar placeholder="Search location..." />
        </div>
        <div className="flex items-center w-fit">
          <button className="flex items-center justify-center rounded-full p-3 border text-gray-600 hover:bg-gray-100 transition">
            <IconFlag className="w-[1.5em]! h-[1.5em]!" />
          </button>
        </div>
      </div>

      <div className="flex-1 flex gap-4 min-h-0">
        {/* left side */}
        <div className="flex-2 flex flex-col gap-6 min-h-0">
          {/* location */}
          <div className="flex items-center gap-2 bg-[#0066CC] text-white rounded-xl p-4 font-medium">
            <IconMapPin className="w-[1.5em]! h-[1.5em]!" />
            <span>Location: BRGY 174 blablabla</span>
          </div>

          <ScrollArea className="flex-1 min-h-0">
            <div className="flex flex-col gap-6 pr-4">
              {/* post composer */}
              <PostComposer />

              {/* feed items */}
              <PostCard />
              <PostCard />
              <PostCard />
              <PostCard />
              <PostCard />
              <PostCard />
            </div>
          </ScrollArea>
        </div>

        {/* right side */}
        <div className="flex-1 flex flex-col gap-4 min-h-0">
          {/* affected location */}
          <div className="flex-1 flex flex-col gap-4 h-full border p-4 rounded-2xl">
            <h2 className="font-poppins text-xl font-semibold">
              Affected Locations
            </h2>

            {/* location item */}
            <div className="flex flex-col gap-4 text-sm">
              <div className="flex items-center gap-2 bg-[#0066CC] text-white rounded-xl p-3 font-medium">
                <IconMapPin className="w-[1.5em]! h-[1.5em]!" />
                <span>Brgy 174, Kai mall caloocan city</span>
              </div>

              {/* location address */}
              <div className="flex items-center gap-2 bg-[#0066CC] text-white rounded-xl p-3 font-medium">
                <IconMapPin className="w-[1.5em]! h-[1.5em]!" />
                <span>1234 Example St, Caloocan, Metro Manila</span>
              </div>
            </div>
          </div>

          {/* preview location */}
          <div className="flex-2 flex flex-col h-full border p-4 rounded-2xl gap-4">
            {/* header */}
            <h2 className="font-poppins text-xl font-semibold">
              Preview Location
            </h2>

            {/* image */}
            <div className="relative flex-1 rounded-2xl overflow-hidden">
              <Image
                src="/images/after_flood_image.jpg"
                alt="Map preview"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>

            {/* details */}
            <div className="flex flex-col gap-2 text-sm border border-[#FB2C36] p-4 rounded-2xl bg-[#FB2C36]/10">
              <span className="font-medium">
                Brgy 174, Kai mall caloocan city
              </span>
              <div className="flex items-center gap-2 text-gray-600">
                <IconClock className="w-[1.5em]! h-[1.5em]!" />
                Posted 24 hrs ago
              </div>
              <div className="flex items-center gap-2">
                Severity Level:
                <div
                  className="flex items-center rounded-full px-3 py-1"
                  style={{ color: '#FB2C36', backgroundColor: '#FB2C3625' }}
                >
                  <span className="text-xs font-medium">Critical</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
