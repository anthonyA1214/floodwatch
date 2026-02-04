import { Phone } from "lucide-react";

export default function EmergencyHotlines() {
    return (
        <div className="absolute top-24 right-6 z-40">
            <div className="w-fit rounded-2xl bg-white p-6 shadow-lg space-y-4">
                <div className="flex items-center gap-3 text-gray-800">
                    <Phone className="text-red-500" size={20} />
                    <span className="font-medium">Emergency call:</span>
                    <span>911</span>
                </div>

                <div className="flex items-center gap-3 text-gray-800">
                    <Phone className="text-red-500" size={20} />
                    <span className="font-medium">CDRRMO:</span>
                    <span>288825664</span>
                </div>

                <div className="flex items-center gap-3 text-gray-800">
                    <Phone className="text-red-500" size={20} />
                    <span className="font-medium">BGRY 174:</span>
                    <span>09499952723</span>
                </div>

                <div className="flex items-center gap-3 text-gray-800">
                    <Phone className="text-red-500" size={20} />
                    <span className="font-medium">BGRY 174:</span>
                    <span>09993682208</span>
                </div>
            </div>
        </div>
    );
}
