"use client"

import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LoginCard() {
    const [showPassword, setShowPassword] = useState(false)

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <Card className="w-full max-w-md rounded-3xl shadow-xl p-6">
                <CardHeader className="text-center space-y-4">
                    <CardTitle className="text-xl font-semibold">
                        Welcome to floodwatch!
                    </CardTitle>

                    {/* Login / Register Toggle */}
                    <div className="flex bg-blue-300 rounded-full p-1">
                        <button className="flex-1 bg-blue-600 text-white rounded-full py-2 text-sm font-medium">
                            Login
                        </button>
                        <button className="flex-1 text-white/80 py-2 text-sm font-medium">
                            Register
                        </button>
                    </div>
                </CardHeader>

                <CardContent className="space-y-6">
                    {/* Username */}
                    <div className="space-y-2">
                        <Label>User name</Label>
                        <Input
                            placeholder="Enter your User name"
                            className="rounded-full h-12  shadow-sm"
                        />
                    </div>

                    {/* Password */}
                    <div className="space-y-2">
                        <Label>Password</Label>
                        <div className="relative">
                            <Input
                                placeholder="Enter your Password"
                                className="rounded-full h-12  pr-12 shadow-sm"
                            />
                        </div>

                        <div className="text-right text-sm text-gray-500 cursor-pointer hover:underline">
                            Forgot Password?
                        </div>
                    </div>
                </CardContent>

                <CardFooter>
                    <Button className="w-full rounded-full h-12 bg-blue-600 hover:bg-blue-700 text-white">
                        Login
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}
