import { Input } from "@/components/ui/input";
import { Search, Flag } from "lucide-react";
import PostCard from "@/components/admin/community-feed/post-card";

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
          <div className="bg-blue-600 text-white p-4 rounded-xl">
            Hello World – Location Banner
          </div>

          {/* Create Post Box */}
          <div>
            <p className="text-gray-600">
              <PostCard/>
            </p>
          </div>

          {/* Feed Posts */}
          <div className="space-y-4">
            <div className="border rounded-xl p-4">
              Hello World – Post 1
            </div>
            <div className="border rounded-xl p-4">
              Hello World – Post 2
            </div>
            <div className="border rounded-xl p-4">
              Hello World – Post 3
            </div>
          </div>

          {/* (Optional) Your real component */}
          {/* <PostCard /> */}

        </div>

        {/* ================= RIGHT COLUMN ================= */}
        <div className="col-span-4 space-y-6">

          {/* Affected Location */}
          <div className="border rounded-xl p-4">
            <h3 className="font-semibold mb-2">
              Hello World – Affected Location
            </h3>
            <p>Hello World – Address 1</p>
            <p>Hello World – Address 2</p>
            <p>Hello World – Address 3</p>
          </div>

          {/* Preview Location */}
          <div className="border rounded-xl p-4">
            <div className="h-40 bg-gray-200 rounded-lg flex items-center justify-center mb-3">
              Hello World – Image Preview
            </div>
            <p className="font-semibold">
              Hello World – Brgy 174
            </p>
            <p className="text-sm text-gray-500">
              Hello World – Severity: Critical
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
