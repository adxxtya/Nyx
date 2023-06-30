import { useEffect, useState } from "react";
import * as React from "react";
import { MasonryInfiniteGrid } from "@egjs/react-infinitegrid";
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'
import { useRouter } from 'next/router';


function getItems(nextGroupKey, count) {
    const nextItems = [];
    const nextKey = nextGroupKey * count;

    for (let i = 0; i < count; ++i) {
        nextItems.push({ groupKey: nextGroupKey, key: nextKey + i });
    }
    return nextItems;
}

const Loader = () => (
    <div className="container">
        <div className="loader"></div>
        <div className="loader"></div>
        <div className="loader"></div>
    </div>

);


const generateRandomString = () => {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const length = 5;
    let randomString = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomString += characters.charAt(randomIndex);
    }
    return randomString;
};


const Item = ({ imageLink }) => {
    const randomString = generateRandomString(); // Generate a random string for each image
    const imageURL = `/browse/${randomString}?image=${imageLink}`;

    const handleClick = () => {
        window.open(imageURL, '_blank');
    };

    return (
        <div
            className="item m-0 max-w-full md:max-w-[200px] lg:max-w-[300px] hover:scale-[1.015] cursor-pointer transition-all ease-in-out duration-300"
            onClick={handleClick}
        >
            <div className="thumbnail">
                <img src={`${imageLink.slice(0, -4)}-thumbnail.jpg`} alt="nyx-wallpaper" />
            </div>
        </div>
    );
};



export default function Gallery({ isSubmitted, query, source, device }) {
    const [imageArray, setImageArray] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);

    const router = useRouter();

    // console.log(source);

    const imageLinks = imageArray || [];

    const items = React.useMemo(() => {
        const initialItems = getItems(0, imageLinks.length);
        return initialItems.map((item, index) => ({
            ...item,
            imageLink: imageLinks[index % imageLinks.length],
        }));
    }, [imageLinks]);


    const fetchHTML = async () => {
        setLoading(true);
        try {
            const res = await fetch(
                // `http://localhost:5050/api/s1?query=${query}&device=${device}&page=${page}`,
                `${process.env.NEXT_PUBLIC_SERVER_LINK}api/s1?query=${query}&device=${device}&page=${page}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                }
            );

            if (!res.ok) {
                throw new Error("Failed to fetch");
            }

            const imageData = await res.json();

            if (!Array.isArray(imageData)) {
                throw new Error("Invalid response data format. Expected an array.");
            }

            setImageArray(imageData);
            setLoading(false);

            if (imageData.length > 0) {
                const selectedImage = imageData[0]; // Change this to get the desired image to pass to the new page
                const randomString = generateRandomString(); // Generate a random string for the image ID
                const url = `/browse/${randomString}`;
            }
        } catch (error) {
            console.error("Failed to fetch HTML:", error);
            throw error;
        }
    };


    useEffect(() => {
        if (isSubmitted) {
            fetchHTML()
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [page, isSubmitted, query, device]);

    useEffect(() => {
        if (isSubmitted) {
            setPage(1);
        }
    }, [isSubmitted, query]);







    return (
        <>
            <div className="w-full h-full flex justify-center">
                <div className="overflow-y-auto w-[100%] overflow-x-hidden relative flex flex-col justify-center items-center">
                    {!isSubmitted &&
                        <>
                            <div className="flex flex-col justify-center items-center ">
                                <img src="/browse.webp" className="max-w-[50%] absolute bottom-0 opacity-75" alt="" />
                            </div>
                        </>
                    }
                    {loading && <Loader />}
                    {loading && <div className="md:text-lg mt-48">Searching for {`"${query}"`}</div>}
                    {!loading &&
                        <>
                            {!loading && isSubmitted &&
                                <>
                                    <div className="container flex justify-between items-center w-[90%]">
                                        <div className="md:text-lg mb-2 w-[90%]">Search results of {`"${query}"`} for {
                                            device === "device1" ? ("all devices") : (device === "device2" ? "desktop devices" : "mobile devices")
                                        }
                                        </div>
                                        <div className=" mb-2 flex items-center justify-center">
                                            {page > 1 && (
                                                <button
                                                    className="bg-[#FF4D00] p-2 rounded-full"
                                                    onClick={() => {
                                                        setPage((prevPage) => prevPage - 1);
                                                    }}
                                                >
                                                    <FaAngleLeft color="white" size={18} />
                                                </button>
                                            )}
                                            <div className="mx-6 text-xl flex whitespace-nowrap">Page {page}</div>
                                            <button
                                                className="bg-[#FF4D00] p-2 rounded-full"
                                                onClick={() => {
                                                    setPage((prevPage) => prevPage + 1);
                                                }}
                                            >
                                                <FaAngleRight color="white" size={18} />
                                            </button>
                                        </div>
                                    </div>
                                </>
                            }
                            <MasonryInfiniteGrid
                                className="container"
                                gap={5}
                                align="center"
                                preserveUIOnDestroy={true}
                                useResizeObserver={true}
                            >
                                {items.map((item) => (
                                    <Item
                                        data-grid-groupkey={item.groupKey}
                                        key={item.key}
                                        num={item.key}
                                        imageLink={item.imageLink}
                                    />
                                ))}
                            </MasonryInfiniteGrid>
                        </>
                    }
                </div>
            </div>
        </>
    );
}
