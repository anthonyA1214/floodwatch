export default function About() {
    return (
        <section className="bg-white py-20">
            <div className="max-w-7xl mx-auto px-6">

                {/* Title */}
                <h2 className="text-3xl font-semibold text-center mb-16">
                    About <span className="text-[#2F327D]">FloodWatch</span>
                </h2>

                {/* Content */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                    {/* Our Story */}
                    <div className="bg-gray-50 rounded-2xl p-10 shadow-sm">
                        <h3 className="text-xl font-semibold text-[#2F327D] mb-6">
                            Our Story
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed mb-4">
                            Our story began in the Philippines, where floods
                            often disrupt lives and communities. Seeing the
                            need for better awareness, our team created a
                            simple tool to keep people informed and safe
                            during these times.
                        </p>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            What started as a small project grew into a
                            platform that promotes safety, unity, and
                            preparedness among Filipinos. Today, we continue
                            to help communities face floods with confidence
                            and hope.
                        </p>
                    </div>

                    {/* Mission & Vision */}
                    <div className="bg-gray-50 rounded-2xl p-10 shadow-sm space-y-10">
                        <div>
                            <h3 className="text-xl font-semibold text-[#2F327D] mb-4">
                                Our Mission
                            </h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                Our mission is to provide reliable and
                                up-to-date information that helps individuals
                                and communities make smart decisions during
                                floods. We aim to promote disaster awareness,
                                encourage community involvement, and support
                                quick response efforts.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold text-[#2F327D] mb-4">
                                Our Vision
                            </h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                We envision a safer and well-informed community
                                where people are always prepared to face
                                flooding and other natural disasters. We seek
                                a society that values awareness, cooperation,
                                and timely action to protect lives and
                                properties.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}
