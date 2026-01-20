interface ProfileFieldProps {
  label: string;
  value: string;
  isEditable?: boolean;
}

export default function ProfileField({ label, value, isEditable }: ProfileFieldProps) {
  return (
    <div className="mb-5">
      <label className="block text-[15px] font-bold text-gray-700 mb-2">{label}</label>
      <div className="relative group">
        <input
          type="text"
          value={value}
          readOnly
          className="w-full bg-[#EBEBEB] border-none rounded-lg px-4 py-3.5 text-gray-600 text-sm focus:ring-0 cursor-default"
        />
        {isEditable && (
          <button className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-500 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}