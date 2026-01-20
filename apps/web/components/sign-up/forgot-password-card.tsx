import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export default function ForgotPasswordCard() {
    return (
        <div className="w-full max-w-sm">
            <Card className="border-none shadow-none">
                <CardHeader className="px-0 text-center">
                    <CardTitle className="text-2xl font-semibold">
                        Forgot <span className="text-blue-600">password!</span>
                    </CardTitle>
                    <CardDescription className="mt-2 text-sm">
                        Enter your phone number or email, and we’ll send you a link to recover your account.
                    </CardDescription>
                </CardHeader>

                <CardContent className="px-0 mt-6">
                    <form className="space-y-6">
                        <div className="space-y-2 text-left">
                            <Label>Email Address</Label>
                            <Input
                                type="email"
                                placeholder="Enter your Email Address"
                                className="rounded-full px-4 shadow-sm"
                            />
                        </div>

                        <Button className="w-full rounded-full bg-blue-600 hover:bg-blue-700">
                            Done
                        </Button>
                    </form>
                </CardContent>
            </Card>

            {/* BACK TO LOGIN */}
            <div className="mt-6 flex justify-center gap-2 text-sm text-gray-500">
                <span>Back to login</span>
                <a href="/auth/login" className="text-blue-600 hover:underline">
                    login
                </a>
            </div>
        </div>
    )
}
