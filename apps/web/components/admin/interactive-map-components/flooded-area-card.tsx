import { MapPin, Clock } from "lucide-react";

export default function FloodedAreaCard({
  barangay = "Barangay 174",
  status = "Critical",
  message = "Critical flood warning. Evacuation recommended.",
  time = "2h ago",
}) {
  return (
    <div className="w-full rounded-2xl bg-white p-4 border">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-red-500" />
          <h2 className="text-lg font-semibold text-gray-900">
            {barangay}
          </h2>
        </div>

        <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-600">
          {status}
        </span>
      </div>

      <p className="mt-3 text-sm text-gray-600">
        {message}
      </p>

      <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
        <Clock className="h-4 w-4" />
        <span>{time}</span>
      </div>
    </div>
  );
}
