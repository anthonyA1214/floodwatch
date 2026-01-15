import { Button } from "@/components/ui/button"
import SignUpCard from "@/components/sign-up/sign-up-card";
import ForgotPasswordCard from "@/components/sign-up/forgot-password-card";


export default function SignUp() {
  return (
    // SignUp
    <div className="flex h-screen w-full overflow-hidden">

      {/* LEFT SIDE */}
      <div className="relative flex w-1/2 items-center justify-center bg-white">

        {/* FloodWatch (TOP) */}
        <h1 className="absolute top-6 left-8 text-lg font-semibold text-blue-600">
          <a href="/"> FloodWatch </a>
        </h1>

        {/* SIGN UP FORM */}
        <SignUpCard/>
        {/* <ForgotPasswordCard/> */}
        
      </div>

      {/* RIGHT SIDE */}
      <div className="relative w-1/2 bg-cover bg-center">
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
  );
}
