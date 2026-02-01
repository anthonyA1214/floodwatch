import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShieldCheck, AlertTriangle, Phone, Locate } from "lucide-react";

export default function UserFunctionButton() {
    return (
        <Card className="w-fit px-5 py-4 rounded-2xl shadow-lg">
            <div className="flex flex-col gap-3">

                <Button
                    variant="ghost"
                    className="flex items-center gap-4 justify-start px-4 py-6"
                >
                    <ShieldCheck className="text-blue-600 w-10 h-10" />
                    <span className="text-xl whitespace-nowrap">Safety Locations</span>
                </Button>

                <Button
                    variant="ghost"
                    className="flex items-center gap-4 justify-start px-4 py-6"
                >
                    <AlertTriangle className="text-red-500 w-10 h-10" />
                    <span className="text-xl whitespace-nowrap">Affected Area</span>
                </Button>

                <Button
                    variant="ghost"
                    className="flex items-center gap-4 justify-start px-4 py-6"
                >
                    <Locate className="text-blue-500 w-10 h-10" />
                    <span className="text-xl whitespace-nowrap">Location</span>
                </Button>

                <Button
                    variant="ghost"
                    className="flex items-center gap-4 justify-start px-4 py-6"
                >
                    <Phone className="text-red-500 w-10 h-10" />
                    <span className="text-xl whitespace-nowrap">Hotlines</span>
                </Button>

            </div>
        </Card>
    );
}
