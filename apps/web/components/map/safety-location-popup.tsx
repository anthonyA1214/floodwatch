import { ShieldCheck, X } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import SafetyLocationCard from "./safety-location-card"

export default function SafetyLocationPopup() {
    return (
        <Card className="w-[360px] rounded-2xl shadow-xl border">

            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b">
                <div className="flex items-center gap-2 font-semibold text-base">
                    <ShieldCheck className="text-blue-600" />
                    Safety Locations
                </div>

                <Button variant="ghost" size="icon">
                    <X />
                </Button>
            </div>

            {/* Content */}
            <div className="p-4">
                <SafetyLocationCard />
            </div>

        </Card>
    )
}
