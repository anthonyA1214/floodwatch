import { Layers } from "lucide-react"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

export default function MapHolder() {
    return (
        <div className="relative w-full h-full rounded-xl overflow-hidden bg-gray-100">
            {/* Map Content */}
            <div className="w-full h-full flex items-center justify-center text-gray-400">
                Interactive Map Placeholder
            </div>

            {/* Layers Control */}
            <Popover>
                <PopoverTrigger asChild>
                    <button className="absolute top-4 right-4 bg-white p-2.5 rounded-xl shadow-sm border border-gray-200 hover:bg-gray-50 transition-colors">
                        <Layers className="h-5 w-5 text-gray-600" />
                    </button>
                </PopoverTrigger>

                <PopoverContent align="end" className="w-40 p-2">
                    <div className="space-y-1 text-sm">
                        <button className="w-full text-left px-2 py-1 rounded hover:bg-gray-100">
                            Map Legend 1
                        </button>
                        <button className="w-full text-left px-2 py-1 rounded hover:bg-gray-100">
                            Map Legend 2
                        </button>
                        <button className="w-full text-left px-2 py-1 rounded hover:bg-gray-100">
                            Map Legend 3
                        </button>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    )
}
