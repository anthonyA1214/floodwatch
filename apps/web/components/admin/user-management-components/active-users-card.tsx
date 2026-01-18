import { Card, CardContent } from "@/components/ui/card";
import { Users } from "lucide-react";

export default function ActiveUsersCard() {
    return (
        <Card className="group bg-transparent border-none rounded-2xl hover:bg-[#B1FFD0] hover:text-[#034300]">
            <CardContent className="flex items-center justify-between p-8">

                {/* Left Content */}
                <div>
                    <p className=" text-xl font-medium">
                        Active Users
                    </p>
                    <h1 className=" text-6xl font-bold mt-4">
                        1234
                    </h1>
                </div>

                {/* Right Icon */}
                <div className="p-5 rounded-full group-hover:bg-[#034300]">
                    <Users className="w-8 h-8 group-hover:text-white" />
                </div>

            </CardContent>
        </Card>
    );
}
