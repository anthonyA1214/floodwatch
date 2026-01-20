import { Button } from "@/components/ui/button"
import SignUpCard from "@/components/sign-up/sign-up-card";
import ForgotPasswordCard from "@/components/sign-up/forgot-password-card";


export default function SignUp() {
  return (
    // SignUp
    <>

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
     
    </>
  );
}
