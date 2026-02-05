import Link from 'next/link';

export default function AuthButtons() {
  return (
    <div className="hidden md:flex items-center gap-4">
      <Link href="/auth/login">
        <button
          className="flex items-center justify-center gap-2 bg-[#FFFFFF] hover:bg-[#F5F5F5] active:bg-[#EAEAEA] 
              text-[#5B5B5B] px-6 py-1 rounded-2xl text-sm md:text-lg
                hover:shadow-xl transition duration-200 font-medium"
        >
          Login
        </button>
      </Link>
      <Link href="/auth/sign-up">
        <button
          className="flex items-center justify-center gap-2 bg-[#81B2E2] hover:bg-[#6CA2DA] active:bg-[#578FCF] 
              text-white px-6 py-1 rounded-2xl text-sm md:text-lg
                hover:shadow-xl hover:scale-105 transition duration-200 font-medium"
        >
          Sign Up
        </button>
      </Link>
    </div>
  );
}
