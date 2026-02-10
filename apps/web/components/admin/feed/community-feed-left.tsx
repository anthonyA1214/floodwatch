'use client';

import { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import PostComposer from '@/components/admin/feed/post-composer';
import PostCard from '@/components/admin/feed/post-card';
import { IconMapPin } from '@tabler/icons-react';

export default function CommunityFeedLeft() {
  // State to track modal visibility
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  return (
    <div className="flex-2 flex flex-col gap-6 min-h-0 relative">
      <div className="flex items-center gap-2 bg-[#0066CC] text-white rounded-xl p-4 font-medium">
        <IconMapPin className="w-[1.5em]! h-[1.5em]!" />
        <span>Location: BRGY 174 blablabla</span>
      </div>

      <ScrollArea className="flex-1 min-h-0">
        <div className="flex flex-col gap-6 pr-4">
          <PostComposer />

          <PostCard
            author={{ name: 'Pedro Santos' }}
            content="Volunteers are needed to help with sandbagging efforts in flood-prone areas. Please contact the local barangay office if you can assist."
            location="BRGY 174, Kai mall caloocan city"
            timestamp="1 day ago"
            reportCount={2}
            onDelete={() => setIsDeleteDialogOpen(true)}
          />

          <PostCard
            author={{ name: 'Juan Dela Cruz' }}
            content="Heavy rainfall in Zapote area, its starting to accumulate water. Please be careful if you're heading this way! #Flood"
            imageUrl="/images/before_flood_image.jpg"
            location="BRGY 174, Kai mall caloocan city"
            timestamp="2 hrs ago"
            reportCount={3}
            onDelete={() => setIsDeleteDialogOpen(true)}
          />
        </div>
      </ScrollArea>

      {/* DELETE VALIDATION MODAL */}
      {isDeleteDialogOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
          <div className="bg-white rounded-3xl p-8 max-w-[400px] w-full shadow-2xl text-center animate-in fade-in zoom-in duration-200">
            <p className="text-gray-800 text-lg font-medium mb-8 leading-snug">
              Are you sure you want to delete this report? This action cannot be
              undone and will remove the information from the community feed.
            </p>

            <div className="flex gap-4">
              <button
                onClick={() => setIsDeleteDialogOpen(false)}
                className="flex-1 py-3 px-4 rounded-xl font-bold bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={() => setIsDeleteDialogOpen(false)}
                className="flex-1 py-3 px-4 rounded-xl font-bold bg-[#EF4444] text-white hover:bg-red-600 transition-all shadow-lg shadow-red-100"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
