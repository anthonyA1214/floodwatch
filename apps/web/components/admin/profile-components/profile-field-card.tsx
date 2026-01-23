export default function ProfileFieldCard() {
    return (
        <div className="h-full rounded-xl border bg-white p-6">
            {/* Avatar */}
            <div className="relative flex justify-center">
                <div className="flex h-36 w-36 items-center justify-center rounded-full bg-gray-200">
                    <svg
                        className="h-20 w-20 text-gray-500"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path d="M12 12a5 5 0 100-10 5 5 0 000 10zm0 2c-4.418 0-8 2.239-8 5v1h16v-1c0-2.761-3.582-5-8-5z" />
                    </svg>
                </div>

                <button className="absolute bottom-2 right-[calc(50%-72px)] flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-white shadow">
                    📷
                </button>
            </div>

            {/* Name */}
            <div className="mt-4 text-center">
                <h2 className="text-lg font-semibold">John Doe</h2>
                <p className="text-sm text-gray-500">sample@gmail.com</p>
            </div>

            <div className="my-6 border-t" />

            {/* Stats */}
            <div className="space-y-4 text-sm">
                <div className="flex justify-between">
                    <span className="text-gray-500">Member Since</span>
                    <span className="font-medium">October 5, 2025</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-500">Posts</span>
                    <span className="font-medium">3</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-500">Reports Submitted</span>
                    <span className="font-medium">14</span>
                </div>
            </div>
        </div>
    );
}
