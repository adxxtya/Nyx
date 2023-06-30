import Image from 'next/image'
import React from 'react'
import Link from 'next/link';

function Navbar() {
    return (
        <nav
            className="w-[100%] h-[8dvh] bg-black text-white flex justify-between lg:h-[10vh] sticky top-0"
        >
            <a
                href='/'
                id="logo-sec"
                className="w-[20%] flex items-center justify-center md:w-[25%] md:justify-evenly md:ml-4 lg:w-[10%] lg:ml-8 lg:justify-evenly"
            >

                <Image src="/nyx-white.png" width="50" height="50" alt="NYX" />
                <h1 className="text-5xl font-bold hidden md:block">NYX</h1>
            </a>
            <div
                id="navbar-items"
                className="w-[60%] flex justify-center items-center lg:w-[40%]"
            >
                <ul
                    className="flex w-[100%] justify-around text-md md:text-xl lg:text-lg"
                >
                    <li>Browse</li>
                    <li>Collection</li>
                </ul>
                <div className="hidden lg:block lg:w-[50%]"></div>
            </div>
        </nav>
    )
}

export default Navbar