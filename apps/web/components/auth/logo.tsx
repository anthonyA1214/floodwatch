import Image from 'next/image';
import Link from 'next/link';

export default function Logo() {
  return (
    <div className="w-full h-fit py-4 md:px-4">
      <Link href="/" className="flex items-center gap-x-2">
        <Image src="/logo.svg" alt="FloodWatch Logo" width={32} height={32} />
        <h1 className="text-[#0066CC] font-bold text-xl">FloodWatch</h1>
      </Link>
    </div>
  );
}
