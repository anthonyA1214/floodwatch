export default function ProfileFieldCard() {
    return (
        <div className="w-full h-full rounded-xl bg-white p-6 ">
            {/* Avatar */}
            <div className="relative flex justify-center">
                <div className="flex h-32 w-32 items-center justify-center rounded-full bg-blue-100">
                    <svg
                        className="h-20 w-20 text-blue-400"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path d="M12 12a5 5 0 100-10 5 5 0 000 10zm0 2c-4.418 0-8 2.239-8 5v1h16v-1c0-2.761-3.582-5-8-5z" />
                    </svg>
                </div>

                {/* Camera button */}
                <button className="absolute bottom-1 right-[calc(50%-64px)] flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-white shadow-md">
                    📷
                </button>
            </div>

            {/* Name & Email */}
            <div className="mt-4 text-center">
                <h2 className="text-xl font-semibold text-gray-900">John Doe</h2>
                <p className="text-sm text-gray-500">sample@gmail.com</p>
            </div>

            {/* Divider */}
            <div className="my-6 border-t" />

            {/* Stats */}
            <div className="space-y-4 text-sm">
                <div className="flex justify-between text-gray-700">
                    <span>Member Since</span>
                    <span className="font-medium">October 5, 2025</span>
                </div>

                <div className="flex justify-between text-gray-700">
                    <span>Posts</span>
                    <span className="font-medium">3</span>
                </div>

                <div className="flex justify-between text-gray-700">
                    <span>Reports Submitted</span>
                    <span className="font-medium">14</span>
                </div>
            </div>
        </div>
    );
}
