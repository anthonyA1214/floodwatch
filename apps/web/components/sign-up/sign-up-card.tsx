import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export default function SignUpCard() {
    return (
        <div className="w-full max-w-sm">
            <Card className="border-none shadow-none">
                <CardHeader className="px-0 text-center">
                    <CardTitle className="text-2xl font-semibold">
                        Welcome to <span className="text-blue-600">floodwatch!</span>
                    </CardTitle>
                    <CardDescription>
                        Please enter your details.
                    </CardDescription>
                </CardHeader>

                <CardContent className="px-0">
                    <form className="space-y-5">

                        {/* FULL NAME */}
                        <div className="space-y-2">
                            <Label>Fullname</Label>
                            <div className="flex gap-3">
                                <Input
                                    placeholder="First name"
                                    className="rounded-full px-4 shadow-sm"
                                />
                                <Input
                                    placeholder="Last name"
                                    className="rounded-full px-4 shadow-sm"
                                />
                            </div>
                        </div>

                        {/* EMAIL */}
                        <div className="space-y-2">
                            <Label>Email Address</Label>
                            <Input
                                type="email"
                                placeholder="Enter your Email Address"
                                className="rounded-full px-4 shadow-sm"
                            />
                        </div>

                        {/* PASSWORD */}
                        <div className="space-y-2">
                            <Label>Password</Label>
                            <Input
                                type="password"
                                placeholder="Enter your Password"
                                className="rounded-full px-4 shadow-sm"
                            />
                        </div>

                        {/* CONFIRM PASSWORD */}
                        <div className="space-y-2">
                            <Label>Confirm Password</Label>
                            <Input
                                type="password"
                                placeholder="Enter your Password"
                                className="rounded-full px-4 shadow-sm"
                            />
                        </div>
                    </form>


                </CardContent>

                <CardFooter className="px-0 pt-6">
                    <Button className="w-full rounded-full bg-blue-600 hover:bg-blue-700">
                        Register
                    </Button>
                </CardFooter>

                {/* BACK TO LOGIN */}
                <div className="mt-6 flex justify-center gap-2 text-sm text-gray-500">
                    <span>Already have an account?</span>
                    <a href="/auth/login" className="text-blue-600 hover:underline">
                        Login Here
                    </a>
                </div>


            </Card>

            {/* FOOTER */}
            <div className="mt-10 text-center text-sm text-gray-400">
                Contact us <br />
                <span className="text-blue-500">floodwatch@gmail.com</span>
                <p className="mt-2">© 2026 Company Name. All rights reserved.</p>
            </div>
        </div>
    )
}
