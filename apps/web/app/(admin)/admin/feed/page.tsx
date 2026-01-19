import { Input } from "@/components/ui/input";
import { Search, Flag } from "lucide-react";
import PostCard from "@/components/admin/community-feed/post-card";
import PreviewLocation from "@/components/admin/community-feed/preview-location-card";
import CommunityPostCard from "@/components/admin/community-feed/community-post-card";
import AffectedLocationTab from "@/components/admin/community-feed/affected-location-tab";
import AddressLocationBanner from "@/components/admin/community-feed/address-location-banner";

export default function CommunityFeed() {
  return (
    <div className="flex-1 bg-white p-8 rounded-2xl">

      {/* ===================== TITLE ===================== */}
      <h1 className="text-4xl font-bold text-black">
        Community Feed
      </h1>

      {/* ===================== SEARCH BAR ROW ===================== */}
      <div className="mt-6 flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />
          <Input
            type="search"
            placeholder="Search Location"
            className="h-14 rounded-full pl-14 pr-6 text-lg"
          />
        </div>

        <button className="h-14 w-14 flex items-center justify-center rounded-full border border-gray-300">
          <Flag className="text-gray-600" />
        </button>
      </div>

      {/* ===================== MAIN CONTENT ===================== */}
      <div className="mt-8 grid grid-cols-12 gap-6">

        {/* ================= LEFT COLUMN ================= */}
        <div className="col-span-8 space-y-6">

          {/* Location Banner */}
          <div>
            <AddressLocationBanner/>
          </div>

          {/* Create Post Box */}
          <div>
            
              <PostCard />
            
          </div>

          {/* Feed Posts */}
          <div className="space-y-4">
            <CommunityPostCard />
          </div>

          {/* (Optional) Your real component */}
          {/* <PostCard /> */}

        </div>

        {/* ================= RIGHT COLUMN ================= */}
        <div className="col-span-4 space-y-6">

          {/* Affected Location */}
          <div className="border rounded-xl p-4">
            <h1 className="text-lg pb-4"> Affected Locations </h1>
            <AffectedLocationTab />

          </div>

          {/* Preview Location */}
          <div className="border rounded-xl p-4">
            <h1 className="text-lg pb-4"> Preview Location </h1>

            <PreviewLocation />
          </div>

        </div>
      </div>
    </div>
  );
}
