import { AlertTriangle, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AffectedAreaCard from "./affected-location-card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function AffectedLocationPopup() {
    return (
        <Card className="w-[360px] rounded-2xl shadow-xl border">

            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b">
                <div className="flex items-center gap-2 font-semibold text-base text-gray-800">
                    <AlertTriangle className="text-red-500 w-6 h-6" />
                    Affected Area
                </div>

                <Button variant="ghost" size="icon">
                    <X className="w-5 h-5" />
                </Button>
            </div>

            {/* Filter using Select */}
            <div className="px-4 py-2">
                <Select defaultValue="all-levels">
                    <SelectTrigger className="w-full text-sm text-gray-700 py-3 justify-between">
                        <SelectValue placeholder="All Levels" />
                    </SelectTrigger>

                    <SelectContent>
                        <SelectItem value="all-levels">All Levels</SelectItem>
                        <SelectItem value="level-1">Critical</SelectItem>
                        <SelectItem value="level-2">High</SelectItem>
                        <SelectItem value="level-3">Low</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col gap-4">
                <AffectedAreaCard />
            </div>

        </Card>
    );
}
