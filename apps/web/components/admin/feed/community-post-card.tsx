import { Flag, Trash2, Clock, MapPin } from 'lucide-react';

export default function CommunityPostCard() {
  return (
    <div className="border rounded-2xl p-4 bg-white space-y-3">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex gap-3">
          {/* Avatar */}
          <div className="h-12 w-12 rounded-full bg-red-200 flex items-center justify-center">
            <span className="text-lg font-semibold text-red-700">M</span>
          </div>

          {/* Name & Meta */}
          <div>
            <p className="font-semibold text-gray-900">Miguel Santos</p>
            <div className="flex items-center gap-3 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>2h ago</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>Brgy 175</span>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4 text-gray-500">
          <div className="flex items-center gap-1 text-sm">
            <Flag className="h-4 w-4" />
            <span>1</span>
          </div>
          <Trash2 className="h-5 w-5 cursor-pointer hover:text-red-600" />
        </div>
      </div>

      {/* Content */}
      <p className="text-gray-700 text-sm leading-relaxed">
        Heavy rainfall in Zapote area, its starting to accumulate water. Please
        be careful if you're heading this way!{' '}
        <span className="text-blue-600 font-medium">#Flood</span>
      </p>
    </div>
  );
}
