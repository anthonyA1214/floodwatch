export default function FloodedArea() {
  return (
    <div className="max-w-md rounded-xl bg-white p-4 shadow-md">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-red-500 text-lg">📍</span>
          <h2 className="text-lg font-semibold text-gray-900">
            Barangay 174
          </h2>
        </div>

        <span className="text-sm font-semibold text-red-500">
          Critical
        </span>
      </div>

      {/* Message */}
      <p className="mt-3 text-gray-600">
        Critical flood warning. Evacuation recommended.
      </p>

      {/* Time */}
      <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
        <span>🕒</span>
        <span>2h ago</span>
      </div>
    </div>
  );
}
