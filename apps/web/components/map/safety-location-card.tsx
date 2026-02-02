import { MapPin, Clock } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function SafetyLocationCard() {
    return (
        <Card className="p-4 rounded-xl border shadow-sm">

            <div className="flex justify-between items-start">
                <div className="flex items-center gap-2 text-sm font-medium">
                    <MapPin className="text-green-600" size={18} />
                    Barangay 174
                </div>

                <Badge
                    variant="outline"
                    className="border-green-500 text-green-600"
                >
                    Hospital
                </Badge>
            </div>

            <p className="mt-2 text-sm text-gray-700">
                Dr. Jose Rodriguez Memorial Hospital
            </p>

            <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
                <Clock size={14} />
                Open 24hrs
            </div>

        </Card>
    )
}
