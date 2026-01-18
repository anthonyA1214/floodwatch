export default function MapLegend() {
  return (
    <div className="absolute top-6 right-6 z-50">

      <div className="bg-white rounded-xl shadow-md px-4 py-3 w-[190px]">
        <h3 className="text-sm font-semibold text-gray-800 mb-3">
          Flood Severity Level
        </h3>

        <div className="space-y-2">
          <LegendItem color="bg-red-600" label="Critical" />
          <LegendItem color="bg-orange-500" label="High" />
          <LegendItem color="bg-yellow-400" label="Moderate" />
          <LegendItem color="bg-blue-500" label="Low" />
        </div>
      </div>
    </div>
  );
}

function LegendItem({ color, label }) {
  return (
    <div className="flex items-center gap-3 text-sm text-gray-700">
      <span className={`w-3 h-3 rounded-full ${color}`} />
      <span>{label}</span>
    </div>
  );
}
