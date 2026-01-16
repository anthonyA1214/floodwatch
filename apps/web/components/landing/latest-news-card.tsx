export default function LatestNewsCard() {
    return (
        <div className="mt-16 h-[250px] flex rounded-xl shadow-md bg-white p-4 gap-4">

            {/* Image */}
            <div className="w-[45%] bg-[#8B8B8B] rounded-lg flex items-center justify-center text-white text-sm font-semibold">
                Image
            </div>

            {/* Content */}
            <div className="w-[55%]">
                <span className="inline-block px-3 py-1 text-xs font-semibold text-white bg-[#4AC6C6] rounded-full">
                    NEWS
                </span>

                <h4 className="mt-2 text-sm font-semibold text-[#2E2F35] line-clamp-2">
                    titles
                </h4>

                <p className="mt-1 text-xs text-[#696984] line-clamp-2">
                    descriptions
                </p>
            </div>

        </div>
    );
}