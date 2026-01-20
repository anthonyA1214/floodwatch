interface ProfileHeaderProps {
  name: string;
  email: string;
}

export default function ProfileHeader({ name, email }: ProfileHeaderProps) {
  return (
    <div className="flex flex-col items-center mb-10">
      <div className="relative">
        {/* Profile Circle */}
        <div className="w-36 h-36 rounded-full bg-[#E3F2FD] overflow-hidden flex items-center justify-center border-4 border-white shadow-sm">
          <img 
            src="/avatar-placeholder.png" 
            alt="Profile" 
            className="w-full h-full object-cover" 
          />
        </div>
        {/* Camera Action Button */}
        <button className="absolute bottom-2 right-2 bg-[#007BFF] p-2.5 rounded-full text-white border-2 border-white shadow-md hover:bg-blue-600 transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>
      </div>
      <h2 className="text-[32px] font-bold text-gray-800 mt-4 tracking-tight">{name}</h2>
      <p className="text-gray-400 font-medium">{email}</p>
    </div>
  );
}