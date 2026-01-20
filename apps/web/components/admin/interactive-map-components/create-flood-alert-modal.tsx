import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { ImageIcon } from "lucide-react"
import MapHolder from "./map-component"

export default function CreateFloodAlertModal() {
    return (
        <Dialog>
            <DialogTrigger className="w-full rounded-sm h-15 text-white bg-[#0066CC] hover:bg-[#4894db]">
                Create Affected Location
            </DialogTrigger>

            {/* Give modal a real height */}
            <DialogContent className="max-w-md sm:max-w-lg md:max-w-2xl h-[90vh] p-0 overflow-hidden">

                {/* HEADER (fixed height) */}
                <DialogHeader className="px-6 py-4 border-b shrink-0">
                    <DialogTitle>Create Flood Alert</DialogTitle>
                </DialogHeader>

                {/* BODY */}
                <div className="flex flex-col h-full">

                    {/* MAP (fixed height) */}
                    <div className="h-[240px] w-full border-b shrink-0">
                        <MapHolder />
                    </div>

                    {/* FORM (scrollable) */}
                    <div className="flex-1 overflow-y-auto bg-[#F2F8FF]">
                        <form className="p-6 space-y-4">

                            <div>
                                <Label>Location</Label>
                                <Input placeholder="Location Name" />
                            </div>

                            <div>
                                <Label>Severity Level</Label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select severity" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="low">Low</SelectItem>
                                        <SelectItem value="moderate">Moderate</SelectItem>
                                        <SelectItem value="high">High</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label>Latitude</Label>
                                    <Input placeholder="14.5995" />
                                </div>
                                <div>
                                    <Label>Longitude</Label>
                                    <Input placeholder="120.9842" />
                                </div>
                            </div>

                            <div>
                                <Label>Description</Label>
                                <Input placeholder="Description" />
                            </div>

                            {/* Upload */}
                            <div className="border border-dashed rounded-lg p-6 text-center text-sm text-gray-500">
                                <ImageIcon className="mx-auto mb-2" />
                                Upload Image
                            </div>

                            <Button className="w-full bg-[#0066CC] hover:bg-[#4894db]">
                                Post Flood Alert
                            </Button>
                        </form>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
