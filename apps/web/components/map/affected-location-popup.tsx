import { AlertTriangle, X, ChevronDown } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import AffectedAreaCard from "./affected-location-card"

export default function AffectedLocationPopup() {
    return (
        <Card className="w-[360px] rounded-2xl shadow-xl border">

            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b">
                <div className="flex items-center gap-2 font-semibold text-base text-gray-800">
                    <AlertTriangle className="text-red-500" />
                    Affected Area
                </div>

                <Button variant="ghost" size="icon">
                    <X />
                </Button>
            </div>

            {/* Filter */}
            <div className="px-4 py-2">
                <Button
                    variant="outline"
                    className="w-full justify-between text-sm text-gray-500"
                >
                    All Levels
                    <ChevronDown size={16} />
                </Button>
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col gap-4">
                <AffectedAreaCard />
            </div>

        </Card>
    )
}
