import { Clock, ShieldCheck } from "lucide-react";

export default function SafeAreaCard({
    address = "Dr. St. Luis Hospital ",
    description = "The Dr. Jose N. Rodriguez Memorial Hospital, formerly known as Central Luzon Sanitarium, and also called as the Tala Leprosarium, was established in 1940, to accommodate patients with Hansen's Disease in the entire Luzon region in the Philippines.",
    time = "2h ago",
}) {
    return (
        <div className="w-full rounded-2xl bg-white p-4 border">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <ShieldCheck className="h-5 w-5 text-blue-500" />
                    <h2 className="text-lg font-semibold text-gray-900">
                        {address}
                    </h2>
                </div>

            </div>

            <p className="mt-3 text-sm text-gray-600">
                {description}
            </p>

            <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
                <Clock className="h-4 w-4" />
                <span>{time}</span>
            </div>
        </div>
    );
}
