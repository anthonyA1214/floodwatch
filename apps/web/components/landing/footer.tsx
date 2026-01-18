import Image from "next/image"
import { Separator } from "@radix-ui/react-separator"

export default function Footer() {
    return (
        <footer className="bg-[#2F327D] mt-auto">
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

                    {/* Logo + Description */}
                    <div className="flex gap-5 items-start">
                        <Image
                            src="/logo-white.svg"
                            alt="FloodWatch Logo"
                            width={60}
                            height={60}
                        />
                        <div className="space-y-3">
                            <h3 className="text-2xl text-white font-semibold">
                                Flood Watch
                            </h3>
                            <p className="text-white/80 text-sm leading-relaxed">
                                Partner with Us. Help FloodWatch
                                <br />
                                protect communities everywhere.
                            </p>
                        </div>
                    </div>

                    {/* Contacts */}
                    <div className="flex flex-col text-white gap-4">
                        <h2 className="text-xl font-semibold">Contacts</h2>
                        <span className="text-white/80 text-sm">
                            0969-512-6532
                        </span>
                        <span className="text-white/80 text-sm">
                            floodwatch@gmail.com
                        </span>
                        <span className="text-white/80 text-sm leading-relaxed">
                            University of Caloocan City,
                            <br />
                            Congressional Road
                        </span>
                    </div>

                    {/* Quick Links */}
                    <div className="flex flex-col text-white gap-4">
                        <h2 className="text-xl font-semibold">Quick Links</h2>
                        <span className="text-white/80 text-sm hover:text-white cursor-pointer">
                            About
                        </span>
                        <span className="text-white/80 text-sm hover:text-white cursor-pointer">
                            Partners
                        </span>
                        <span className="text-white/80 text-sm hover:text-white cursor-pointer">
                            Contact
                        </span>
                    </div>

                    {/* Social Media */}
                    <div className="flex flex-col text-white gap-4">
                        <h2 className="text-xl font-semibold">Social Media</h2>
                        <span className="text-white/80 text-sm hover:text-white cursor-pointer">
                            Facebook
                        </span>
                        <span className="text-white/80 text-sm hover:text-white cursor-pointer">
                            Twitter
                        </span>
                        <span className="text-white/80 text-sm hover:text-white cursor-pointer">
                            Instagram
                        </span>
                        <span className="text-white/80 text-sm hover:text-white cursor-pointer">
                            Indeed
                        </span>
                    </div>

                </div>

                <Separator orientation="horizontal" className="my-12 h-px w-full bg-white/30"/>
                
                {/* Bottom */}
                <div className="m-auto">
                    <h2 className="text-white"> © 2026 Company Name. All rights reserve </h2>
                </div>
            </div>
        </footer>
    )
}
