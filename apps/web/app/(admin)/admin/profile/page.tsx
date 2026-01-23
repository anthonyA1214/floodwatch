import ProfileFieldCard from "@/components/admin/profile-components/profile-field-card";
import ProfileInformationCard from "@/components/admin/profile-components/profile-information-card";

export default function Page() {
  return (
    <div className="w-full rounded-2xl bg-white p-8">
      {/* Header */}
      <h1 className="text-4xl font-bold text-black">Profile</h1>
      <p className="mt-2 text-gray-600">
        Manage your account settings and preferences
      </p>

      {/* Content */}
      <div className="mt-10 grid w-full grid-cols-1 gap-10 items-stretch lg:grid-cols-3">
        <div className="lg:col-span-1">
          <ProfileFieldCard />
        </div>

        <div className="lg:col-span-2">
          <ProfileInformationCard />
        </div>
      </div>

    </div>
  );
}
