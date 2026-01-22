import Footer from '@/components/auth/footer';
import SignUpform from '@/components/auth/forms/sign-up-form';
import Link from 'next/link';

export default function SignUpPage() {
  return (
    <div className="flex flex-col flex-1 mx-auto w-full max-w-md justify-center gap-y-5">
      <div className="flex flex-col items-center gap-y-2">
        <h3 className="text-2xl">
          Welcome to{' '}
          <span className="text-[#0066CC] font-bold">floodwatch!</span>
        </h3>
        <span className="opacity-50 text-sm text-center">
          Please enter your details.
        </span>
      </div>

      <SignUpform />

      <div className="flex flex-col py-6 gap-y-10">
        <div className="flex justify-center text-sm text-gray-500">
          <div className="flex justify-center gap-2 text-sm text-gray-500">
            <span>Already have an account?</span>
            <Link href="/auth/login" className="text-blue-600 hover:underline">
              Login Here
            </Link>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
