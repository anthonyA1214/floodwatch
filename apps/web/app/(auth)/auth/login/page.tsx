import { Button } from "@/components/ui/button"
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

export default function Login() {
  return (
    <div className="flex h-screen w-full overflow-hidden">

      {/* LEFT SIDE */}
      <div className="relative flex w-1/2 items-center justify-center bg-white">

        {/* FloodWatch (TOP) */}
        <h1 className="absolute top-6 left-8 text-lg font-semibold text-blue-600">
          <a href="/"> FloodWatch </a>
        </h1>

        {/* LOGIN FORM */}
        <div className="w-full max-w-sm">
          <Card className="border-none shadow-none">
            <CardHeader className="px-0">
              <CardTitle className="text-2xl">
                Welcome to <span className="text-blue-600">floodwatch!</span>
              </CardTitle>
              <CardDescription>
                Please enter your details.
              </CardDescription>
            </CardHeader>

            <CardContent className="px-0">
              <form className="space-y-6">
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input
                    placeholder="Enter your Email"
                    className="rounded-full px-4"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Password</Label>
                  <Input
                    type="password"
                    placeholder="Enter your Password"
                    className="rounded-full px-4"
                  />
                  <div className="text-right text-sm text-gray-500 hover:underline cursor-pointer">
                    <a href="/auth/sign-up"> Forgot Password? </a>
                  </div>
                </div>
              </form>
            </CardContent>

            <CardFooter className="px-0 pt-6">
              <Button className="w-full rounded-full bg-blue-600 hover:bg-blue-700">
                Login
              </Button>
            </CardFooter>
          </Card>

          {/* SIGN UP LINK */}
          <div className="mt-6 flex justify-center gap-2 text-sm text-gray-500">
            <span>Don't have an Account yet?</span>
            <a href="/auth/sign-up" className="text-blue-600 hover:underline">
              Register Here
            </a>
          </div>

          {/* FOOTER */}
          <div className="mt-10 text-center text-sm text-gray-400">
            Contact us <br />
            <span className="text-blue-500">floodwatch@gmail.com</span>
            <p className="mt-2">© 2026 Company Name. All rights reserved.</p>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="relative w-1/2 bg-cover bg-center" >
        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-black/50" />

        {/* CONTENT */}
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-12 text-white">
          <h2 className="mb-4 text-3xl font-bold text-center">
            Our flood <span className="text-blue-400">tracking</span> website
            ensures safety
          </h2>

          <p className="mb-8 max-w-md text-center text-sm text-gray-200">
            Our website helps communities stay safe during floods with an
            interactive map showing real-time updates of affected areas. Users
            can also post reports and share updates, making it easier for everyone to stay
            informed and connected
          </p>

          <Button
            variant="secondary"
            className="rounded-full px-8"
          >
            Learn more...
          </Button>
        </div>
      </div>
    </div>
  )
}
