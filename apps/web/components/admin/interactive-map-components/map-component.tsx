import { Layers } from "lucide-react"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"

export default function MapHolder() {
    return (
        <div className="relative w-full h-full">
            {/* Map Placeholder */}
            <div className="absolute inset-0 bg-gray-200 flex items-center justify-center text-gray-500">
                Interactive Map
            </div>

            {/* Layers Button */}
            <Popover>
                <PopoverTrigger asChild>
                    <Button variant="outline" className="absolute top-4 right-4 bg-white p-2 rounded-lg shadow z-10">
                        <Layers className="h-5 w-5 text-gray-500" />
                    </Button>
                </PopoverTrigger>

                <PopoverContent align="end" className="w-35">
                    <Button variant="ghost" disabled className="w-full text-left px-2 py-1 hover:bg-gray-100">
                        Map Legend 1
                    </Button>
                    <Button variant="ghost" disabled className="w-full text-left px-2 py-1 hover:bg-gray-100">
                        Map Legend 2
                    </Button>
                    <Button variant="ghost" disabled className="w-full text-left px-2 py-1 hover:bg-gray-100">
                        Map Legend 3
                    </Button>
                </PopoverContent>
            </Popover>
        </div>
    )
}
