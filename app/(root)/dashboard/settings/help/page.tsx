
import Image from "next/image";
import React, { useState } from "react";

const SupportSettings = () => {
    return (
        <div>
            <div className="mb-10">
                <p className="text-xl">Welcome to our Help Center! Whether you're looking for help on how to use the app or need assistance, we're here to help. Explore our guides or contact support through various channels for personalized assistance.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-14">
                <div className="bg-white px-8 py-10 rounded-lg shadow-md">
                    {/* image */}
                    <div className="relative h-16 w-16 mb-8">
                        <Image
                            src={`/Images/twitter-settings.png`}
                            fill
                            className="object-cover"
                            alt="twitter-img"
                        />
                    </div>
                    <h1 className="text-2xl font-semibold mb-5">Talk to us</h1>
                    <p>Need assistance or have questions?
                        Text us on Twitter</p>
                </div>
                <div className="bg-white px-8 py-10 rounded-lg shadow-md">
                    {/* image */}
                    <div className="relative h-16 w-16 mb-8">
                        <Image
                            src={`/Images/email-settings.png`}
                            fill
                            className="object-cover"
                            alt="email-img"
                        />
                    </div>
                    <h1 className="text-2xl font-semibold mb-5">Send us an Email</h1>
                    <p>For inquiries, drop us a message</p>
                </div>
            </div>
        </div>
    )
}

export default SupportSettings
