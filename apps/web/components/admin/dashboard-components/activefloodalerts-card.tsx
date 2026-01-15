export default function ActiveFloodAlertsCard() {
  return (
    <section className="p-4">
      <div className="rounded-xl border border-red-400 bg-red-100 p-4">
        {/* Top row */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            {/* Location icon */}
            <div className="text-red-600">
                Icon
            </div>

            <span className="font-medium text-black">
              Barangay 174
            </span>
          </div>

          {/* Status badge */}
          <span className="rounded-md border border-red-500 px-3 py-1 text-sm font-medium text-red-600">
            Critical
          </span>
        </div>

        {/* Description */}
        <p className="mt-2 text-gray-700">
          Critical flood warning. Evacuation recommended.
        </p>

        {/* Time */}
        <div className="mt-3 flex items-center gap-2 text-sm text-gray-600">
          <span> Icon </span>
          <span>2h ago</span>
        </div>
      </div>
    </section>
  );
}
