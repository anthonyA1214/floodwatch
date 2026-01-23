export default function ProfileInformationCard() {
    return (
        <div className="w-full h-full rounded-lg bg-white p-6">
            <h2 className="mb-6 text-lg font-semibold">Profile Information</h2>

            {/* Name */}
            <div className="mb-4">
                <label className="mb-1 block text-sm font-medium">Name</label>
                <div className="flex items-center gap-2">
                    <input
                        type="text"
                        value="Lawrence Dullo"
                        disabled
                        className="w-full rounded-md bg-gray-100 px-3 py-2 text-gray-700 focus:outline-none"
                    />
                    <button className="text-gray-500 hover:text-gray-700">✏️</button>
                </div>
            </div>

            {/* Email */}
            <div className="mb-4">
                <label className="mb-1 block text-sm font-medium">
                    Email Address
                </label>
                <input
                    type="email"
                    value="sample@gmail.com"
                    disabled
                    className="w-full rounded-md bg-gray-100 px-3 py-2 text-gray-700 focus:outline-none"
                />
            </div>

            {/* Phone */}
            <div className="mb-4">
                <label className="mb-1 block text-sm font-medium">
                    Phone Number
                </label>
                <input
                    type="text"
                    value="09123456891"
                    disabled
                    className="w-full rounded-md bg-gray-100 px-3 py-2 text-gray-700 focus:outline-none"
                />
            </div>

            {/* Address */}
            <div className="mb-6">
                <label className="mb-1 block text-sm font-medium">Address</label>
                <div className="flex items-center gap-2">
                    <input
                        type="text"
                        value="Home Address Blk Sample"
                        disabled
                        className="w-full rounded-md bg-gray-100 px-3 py-2 text-gray-700 focus:outline-none"
                    />
                    <button className="text-gray-500 hover:text-gray-700">✏️</button>
                </div>
            </div>

            {/* Button */}
            <button className="mt-auto w-full rounded-md bg-blue-600 py-3 font-medium text-white transition hover:bg-blue-700">
                Change Password
            </button>
        </div>
    );
}
