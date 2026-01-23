export default function ProfileInformationCard() {
    return (
        <div className="flex flex-1 flex-col rounded-xl border bg-white p-6">
            <h2 className="mb-6 text-lg font-semibold">Profile Information</h2>

            {/* Name */}
            <div className="mb-5">
                <label className="mb-1 block text-sm font-medium">Name</label>
                <div className="relative">
                    <input
                        value="Lawrence Dullo"
                        disabled
                        className="w-full rounded-md border bg-gray-50 px-4 py-3 pr-10 text-sm"
                    />
                    <span className="absolute right-3 top-3 text-gray-400">✏️</span>
                </div>
            </div>

            {/* Email */}
            <div className="mb-5">
                <label className="mb-1 block text-sm font-medium">
                    Email Address
                </label>
                <input
                    value="sample@gmail.com"
                    disabled
                    className="w-full rounded-md border bg-gray-50 px-4 py-3 text-sm"
                />
            </div>

            {/* Phone */}
            <div className="mb-5">
                <label className="mb-1 block text-sm font-medium">
                    Phone Number
                </label>
                <input
                    value="09123456891"
                    disabled
                    className="w-full rounded-md border bg-gray-50 px-4 py-3 text-sm"
                />
            </div>

            {/* Address */}
            <div className="mb-8">
                <label className="mb-1 block text-sm font-medium">Address</label>
                <div className="relative">
                    <input
                        value="Home Address Blk Sample"
                        disabled
                        className="w-full rounded-md border bg-gray-50 px-4 py-3 pr-10 text-sm"
                    />
                    <span className="absolute right-3 top-3 text-gray-400">✏️</span>
                </div>
            </div>

            {/* Button */}
            <button className="mt-auto w-full rounded-md bg-blue-600 py-3 text-sm font-semibold text-white hover:bg-blue-700">
                Change Password
            </button>
        </div>
    );
}
