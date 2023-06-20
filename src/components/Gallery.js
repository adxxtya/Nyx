import { useEffect, useState } from "react";
import * as React from "react";
import { MasonryInfiniteGrid } from "@egjs/react-infinitegrid";


function getItems(nextGroupKey, count) {
    const nextItems = [];
    const nextKey = nextGroupKey * count;

    for (let i = 0; i < count; ++i) {
        nextItems.push({ groupKey: nextGroupKey, key: nextKey + i });
    }
    return nextItems;
}



const Item = ({ imageLink }) => (
    <div className="item bg-green-500 m-0 max-w-[100px] md:max-w-[200px] lg:max-w-[250px] hover:scale-[1.015] cursor-pointer transition-all ease-in-out duration-300">
        <div className="thumbnail bg-lime-300">
            <img src={`${imageLink.slice(0, -4)}-thumbnail.jpg`} alt="wallpaper" />
            {/* <img src={`${imageLink}`} alt="wallpaper" /> */}
        </div>
    </div>
);

const SkeletonImage = () => (
    <div className="item bg-green-500 m-0 max-w-[100px] md:max-w-[200px] lg:max-w-[300px]">
        <div className="thumbnail bg-gray-200 animate-pulse hover:scale-150" style={{ height: '200px' }}></div>
    </div>
);


export default function Gallery({ isSubmitted, query, source, device }) {
    const [imageArray, setImageArray] = useState();
    const [loading, setLoading] = useState(false);

    const imageLinks = imageArray || [];


    const items = React.useMemo(() => {
        const initialItems = getItems(0, imageLinks.length);
        return initialItems.map((item, index) => ({
            ...item,
            imageLink: imageLinks[index % imageLinks.length],
        }));
    }, [imageLinks]);

    useEffect(() => {
        async function fetchHTML() {
            setLoading(true)
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_LINK}api/s1?query=${query}&device=${device}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                });

                console.log(`${process.env.SERVER_LINK}api/s1?query=${query}&device=${device}`);

                if (!res.ok) {
                    throw new Error("Failed to fetch");
                }

                const imageData = await res.json();

                if (!Array.isArray(imageData)) {
                    throw new Error("Invalid response data format. Expected an array.");
                }

                console.log(imageData);
                return imageData;

            } catch (error) {
                console.error("Failed to fetch HTML:", error);
                throw error;
            }
        }

        if (isSubmitted) {
            fetchHTML()
                .then((response) => {
                    setImageArray(response);
                    setLoading(false)
                })
                .catch((error) => {
                    // todo
                    console.log(error);
                });
        }
    }, [isSubmitted, query, device]);


    return (
        <div className="w-full h-full flex justify-center">
            <div className="overflow-y-auto w-[100%] overflow-x-hidden flex flex-col justify-center items-center">
                {loading && <div className="text-sm/[16px] md:text-lg my-2 w-[90%]">Searching for the best wallpapers <br /> of {`"${query}"`} for {
                    device === "device1" ? ("all devices") : (device === "device2" ? "desktop devices" : "mobile devices")
                } </div>}
                {!loading && <MasonryInfiniteGrid
                    className="container"
                    gap={5} align="center"

                >
                    {items.map((item) => (
                        <Item
                            data-grid-groupkey={item.groupKey}
                            key={item.key}
                            num={item.key}
                            imageLink={item.imageLink}
                        />
                    ))}
                </MasonryInfiniteGrid>}
            </div>
        </div>
    );
}