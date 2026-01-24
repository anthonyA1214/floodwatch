import Image from 'next/image';

export default function PreviewLocation() {
  return (
    <div className="border rounded-2xl overflow-hidden bg-white">
      {/* Image */}
      <div className="relative h-48 w-full">
        <Image
          src="/logo.svg"
          alt="Flooded Area"
          fill
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="bg-red-100 p-4 space-y-3">
        <h3 className="font-semibold text-gray-800">
          Brgy 174, Kai mall caloocan city
        </h3>

        <div className="flex items-center text-sm text-gray-600 gap-2">
          <span>🕒</span>
          <span>Posted 24hrs ago</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-700">Severity Level :</span>
          <span className="px-3 py-1 text-xs font-semibold text-red-700 bg-red-200 border border-red-400 rounded-full">
            Critical
          </span>
        </div>
      </div>
    </div>
  );
}
