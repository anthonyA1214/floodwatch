export default function SafetyGuidesSection() {
    return (
        <section className="mt-16 font-['Roboto']">
            <div className="max-w-5xl mx-auto bg-white rounded-2xl px-8 py-12">

                {/* Title */}
                <h2 className="text-3xl font-bold text-center">
                    <span className="text-[#2E2F35]">Safety </span>
                    <span className="text-[#2F327D]">Guides</span>
                </h2>

                {/* Description */}
                <p className="text-center text-[#696984] mt-4 max-w-3xl mx-auto leading-relaxed line-clamp-2">
                    Educational resources are essential in helping people prepare for and respond
                    to floods effectively. They provide important knowledge about safety measures.
                </p>

                {/* Cards (smaller & centered) */}
                <div className="flex justify-center gap-6 mt-10 max-w-3xl mx-auto">

                    {/* Card 1 */}
                    <div className="relative w-[360px] h-[200px] rounded-xl overflow-hidden">
                        <img
                            src="/images/prepare-flood.jpg"
                            alt=""
                            className="w-full h-full object-cover"
                        />

                        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white px-6 text-center">
                            <h3 className="text-xl font-semibold leading-snug">
                                Important things to <br />
                                ready before flood
                            </h3>

                            <button className="mt-4 px-6 py-2 border border-white rounded-full text-sm bg-transparent text-white cursor-pointer
                                                 hover:bg-white hover:text-black transition duration-200">
                                Click here
                            </button>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="relative w-[360px] h-[200px] rounded-xl overflow-hidden">
                        <img
                            src="/images/during-flood.jpg"
                            alt=""
                            className="w-full h-full object-cover"
                        />

                        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white px-6 text-center">
                            <h3 className="text-xl font-semibold leading-snug">
                                What to do during <br />
                                flood
                            </h3>

                            <button className="mt-4 px-6 py-2 border border-white rounded-full text-sm bg-transparent text-white cursor-pointer
                                                 hover:bg-white hover:text-black transition duration-200">
                                Click here
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}