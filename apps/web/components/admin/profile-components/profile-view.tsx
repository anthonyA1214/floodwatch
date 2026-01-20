import ProfileHeader from "./profile-header";
import ProfileField from "./profile-field";

export default function ProfileView() {
  const stats = [
    { label: "Member Since", value: "October 5, 2025" },
    { label: "Posts", value: "3" },
    { label: "Reports Submitted", value: "14" },
  ];

  return (
    <div className="flex-1 bg-white rounded-32px p-12 border border-gray-100 shadow-sm ml-6">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900">Profile</h1>
        <p className="text-gray-500 mt-1 font-medium">Manage your account settings and preferences</p>
      </div>

      <ProfileHeader name="John Doe" email="sample@gmail.com" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mt-8 border-t border-gray-50 pt-12">
        {/* Left Column: Stats */}
        <div className="space-y-6 pr-4">
          {stats.map((stat) => (
            <div key={stat.label} className="flex justify-between items-center text-[15px]">
              <span className="text-gray-600 font-semibold">{stat.label}</span>
              <span className="text-gray-900 font-bold">{stat.value}</span>
            </div>
          ))}
        </div>

        {/* Right Column: Fields */}
        <div>
          <h3 className="text-lg font-bold text-gray-700 mb-6">Profile Information</h3>
          <ProfileField label="Label" value="Lorem ipsum" isEditable />
          <ProfileField label="Email Address" value="sample@gmail.com" />
          <ProfileField label="Phone Number" value="09123456891" />
          <ProfileField label="Address" value="Home Address Blk Sample" isEditable />

          <button className="w-full mt-4 bg-[#005AB5] hover:bg-[#004A95] text-white py-3.5 rounded-lg font-bold transition-all shadow-md">
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
}