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
            <DialogTrigger className="w-full h-12 rounded-xl bg-[#0061C2] text-white font-bold hover:bg-[#0052a3] transition-all">
                Create Affected Location
            </DialogTrigger>

            <DialogContent className="max-w-6xl w-full p-0 overflow-hidden rounded-[32px] shadow-2xl">
                <DialogHeader className="px-8 pt-8">
                    <DialogTitle className="text-xl font-black text-gray-800 tracking-tight">
                        Create Flood Alert
                    </DialogTitle>
                </DialogHeader>

                <div className="grid grid-cols-[1.3fr_1fr] min-h-[520px]">
                    {/* MAP */}
                    <div className="relative bg-slate-200">
                        <MapHolder />
                    </div>

                    {/* FORM */}
                    <div className="p-8 bg-white flex flex-col">
                        <div className="bg-[#F0F7FF] rounded-[24px] p-6 border border-blue-100 space-y-4">

                            {/* LOCATION */}
                            <div className="space-y-1">
                                <Label className="text-[10px] font-black text-blue-300 uppercase tracking-widest pl-1">
                                    Location
                                </Label>
                                <Input
                                    placeholder="Location Name"
                                    className="h-11 rounded-xl shadow-sm border-none focus:ring-2 focus:ring-blue-400"
                                />
                            </div>

                            {/* SEVERITY */}
                            <div className="space-y-1">
                                <Label className="text-[10px] font-black text-blue-300 uppercase tracking-widest pl-1">
                                    Severity Level
                                </Label>
                                <Select>
                                    <SelectTrigger className="h-11 rounded-xl bg-white shadow-sm border-none focus:ring-2 focus:ring-blue-400">
                                        <SelectValue placeholder="Low" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="low">Low</SelectItem>
                                        <SelectItem value="moderate">Moderate</SelectItem>
                                        <SelectItem value="high">High</SelectItem>
                                        <SelectItem value="critical">Critical</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* COORDINATES */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <Label className="text-[10px] font-black text-blue-300 uppercase tracking-widest pl-1">
                                        Latitude
                                    </Label>
                                    <Input
                                        placeholder="14.5995"
                                        className="h-11 rounded-xl shadow-sm border-none"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <Label className="text-[10px] font-black text-blue-300 uppercase tracking-widest pl-1">
                                        Longitude
                                    </Label>
                                    <Input
                                        placeholder="120.9842"
                                        className="h-11 rounded-xl shadow-sm border-none"
                                    />
                                </div>
                            </div>

                            {/* DESCRIPTION */}
                            <div className="space-y-1">
                                <Label className="text-[10px] font-black text-blue-300 uppercase tracking-widest pl-1">
                                    Description
                                </Label>
                                <textarea
                                    rows={3}
                                    placeholder="Description"
                                    className="w-full rounded-xl p-3 text-sm shadow-sm border-none resize-none focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                />
                            </div>

                            {/* IMAGE UPLOAD */}
                            <div className="bg-white border-2 border-dashed border-blue-100 rounded-2xl p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-blue-50 transition-colors group">
                                <ImageIcon className="w-8 h-8 text-gray-300 group-hover:text-blue-400 mb-1 transition-colors" />
                                <span className="text-[11px] font-bold text-gray-400 group-hover:text-blue-500 uppercase tracking-tight">
                                    Upload Image
                                </span>
                            </div>
                        </div>

                        {/* SUBMIT */}
                        <Button className="mt-6 h-14 rounded-[18px] bg-[#0061C2] hover:bg-[#0052a3] font-black uppercase tracking-wide shadow-xl shadow-blue-100 active:scale-[0.98] transition-all">
                            Post Flood Alert
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
