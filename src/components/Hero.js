import React from 'react'

function Hero() {
    return (
        <header className="h-[82dvh] w-[100%] bg-black text-white lg:h-[82vh]">
            <div
                className="h-full w-full flex flex-col justify-center items-center lg:flex-row lg:justify-between lg:h-[100%]"
            >
                <div
                    className="h-[30%] w-full text-center flex flex-col justify-center items-center lg:h-auto lg:w-[55%] lg:items-start lg:ml-16 lg:mb-16 lg:text-start"
                >
                    <h1 className="text-4xl md:text-5xl lg:text-5xl xl:text-7xl">
                        Judge a Person by their Wall.
                    </h1>
                    <p
                        className="text-sm md:text-lg w-[90%] mt-2 lg:w-[65%] lg:text-xl xl:text-2xl xl:w-[80%]"
                    >
                        Your wallpaper says a lot about you, choose wisely across
                        millions of HD Wallpapers on Nyx.
                    </p>
                </div>
                <div
                    className="h-[45%] flex justify-center lg:h-[70%] lg:w-[45%] lg:items-end"
                >
                    <img
                        src="/pc.png"
                        className="w-[90%] h-[90%] lg:w-[80%] lg:h-[80%]"
                        alt=""
                    />
                </div>
            </div>
        </header>
    )
}

export default Hero