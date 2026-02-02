import { MapPin, Clock } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function AffectedLocationCard() {
    return (
        <Card className="p-4 rounded-xl border shadow-sm">

            {/* Top row */}
            <div className="flex justify-between items-start">
                <div className="flex items-center gap-2 text-sm font-medium">
                    <MapPin className="text-red-500" size={18} />
                    Barangay 174
                </div>

                <Badge
                    variant="outline"
                    className="border-red-500 text-red-500"
                >
                    Critical
                </Badge>
            </div>

            {/* Description */}
            <p className="mt-2 text-sm text-gray-700">
                Critical flood warning. Evacuation recommended.
            </p>

            {/* Time */}
            <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
                <Clock size={14} />
                2h ago
            </div>

        </Card>
    )
}
