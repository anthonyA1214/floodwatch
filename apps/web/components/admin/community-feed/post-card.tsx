import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Image, Send } from "lucide-react";

export default function PostCard() {
    return (
        <Card className="rounded-2xl border mt-5 border-gray-200">
            <CardContent className="px-5 space-y-4">
                {/* Top Row */}
                <div className="flex items-start gap-4">
                    {/* Avatar */}
                    <div className="h-12 w-12 rounded-full bg-blue-200 flex items-center justify-center">
                        <span className="text-lg font-semibold text-blue-700">U</span>
                    </div>

                    {/* Input */}
                    <Input
                        placeholder="Share an update with the community"
                        className="h-16 rounded-xl bg-gray-100 text-base"
                    />
                </div>

                {/* Bottom Row */}
                <div className="flex items-center gap-2 pl-16">
                    {/* Add Image */}
                    <button className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium">
                        <Image className="h-5 w-5" />
                        Add Image
                    </button>

                    {/* Post Button */}
                    <button className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2 text-white font-medium hover:bg-blue-700">
                        <Send className="h-4 w-4" />
                        Post
                    </button>
                </div>
            </CardContent>
        </Card>
    );
}
