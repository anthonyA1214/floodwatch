import { IconClock, IconMapPin } from '@tabler/icons-react';

export default function SafetyLocationsCard({
  type = 'hospital',
  name = 'Community Safe Haven',
  address = '123 Safety St, Safeville',
  availability = 'Open 24/7',
}: {
  type: 'hospital' | 'shelter';
  name: string;
  address: string;
  availability: string;
}) {
  const typeColorMap = {
    hospital: '#00D69B',
    shelter: '#0066CC',
  };

  const color = typeColorMap[type];

  return (
    <div className="grid rounded-lg p-4 gap-3 border">
      <div className="flex justify-between gap-8 items-center">
        {/* Location */}
        <div className="font-poppins flex items-center gap-2 text-sm font-semibold">
          <IconMapPin
            className="w-[1.5em]! h-[1.5em]!"
            style={{ color: color }}
          />
          {name}
        </div>

        {/* Badge */}
        <div
          className="flex items-center rounded-full px-3 py-1"
          style={{ color: color, backgroundColor: `${color}25` }}
        >
          <span className="text-xs font-medium">{type.toUpperCase()}</span>
        </div>
      </div>

      {/* address */}
      <p className="text-sm">{address}</p>

      {/* availability */}
      <div className="flex items-center text-xs gap-2 text-gray-600">
        <IconClock className="w-[1.5em]! h-[1.5em]!" />
        {availability}
      </div>
    </div>
  );
}
