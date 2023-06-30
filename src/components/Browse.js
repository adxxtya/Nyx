/* eslint-disable react/jsx-key */
import { useEffect, useState } from 'react'
import { MdSearch, MdDevices, MdPhoneIphone } from 'react-icons/md'
import { IoMdDesktop } from 'react-icons/io'
import Gallery from './Gallery';

export default function Browse() {

    const [inputValue, setInputValue] = useState('');
    const [selectedOption, setSelectedOption] = useState('1');
    const [isSource, setIsSource] = useState('');
    const [selectedOption2, setSelectedOption2] = useState('device1');
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [submittedQuery, setSubmittedQuery] = useState('');
    const [submittedDevice, setSubmittedDevice] = useState('');
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleOptionChange2 = (event) => {
        setSelectedOption2(event.target.value);
    };


    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setSubmittedQuery(inputValue);
        setSubmittedDevice(selectedOption2);
        setIsSource(selectedOption);
        setIsSubmitted(true);
        setIsFormSubmitted(true);
    };


    return (
        <main className="h-[92dvh] w-full bg-black sticky top-0 lg:h-[90vh]">
            <div className="h-full w-full rounded-t-[50px] bg-white">
                <div
                    className="h-[10dvh] flex justify-center items-center lg:justify-start lg:ml-16 md:h-[10vh] lg:h-[8vh] lg:mb-4"
                >
                    <h2 className="text-2xl md:text-5xl lg:text-4xl ">Browse Wallpapers on Nyx 👇️</h2>
                </div>

                <form
                    className="flex flex-col md:mt-4 lg:mt-0 h-[20dvh] md:h-[14vh] lg:h-[14vh]"
                    onSubmit={handleSubmit}
                >
                    <div>
                        <div className="search-container w-[90%] mx-auto relative">
                            <input
                                type="text"
                                id="search-bar"
                                placeholder="Search Highest Quality Wallpapers"
                                name="input"
                                value={inputValue}
                                onChange={handleInputChange}
                                className="w-full h-12 px-5 text-base border-2 border-gray-300 outline-none focus:border-[#FF4D00] hover:border-[orange] transition-colors duration-350 focus:text-black"
                            />
                            <button type="submit">
                                <div className="absolute top-[4px] right-2">
                                    <MdSearch size="40" />
                                </div>
                            </button>
                        </div>

                    </div>

                    <div className="md:w-[100%] md:flex md:justify-evenly">
                        <div className="mt-4 flex items-center">
                            <label htmlFor="source" className="mx-4 text-xl md:text-xl lg:text-2xl">
                                Source:
                            </label>
                            {
                                [1, 2, 3, 4].map((item, index) => (
                                    <div key={item} className="flex items-center">
                                        <input
                                            type="radio"
                                            id={`option${item}`}
                                            value={item.toString()}
                                            checked={selectedOption === item.toString() || (index === 0 && selectedOption === '')}
                                            onChange={handleOptionChange}
                                            className="hidden"
                                        />
                                        <label
                                            htmlFor={`option${item}`}
                                            className={`cursor-pointer flex justify-center items-center mx-1 h-9 w-9 rounded-[4px] md:h-10 md:w-10 md:text-xl lg:h-12 lg:w-12 lg:text-2xl border-2 border-[#FF4D00]
                                                    ${selectedOption === item.toString() || (index === 0 && selectedOption === '')
                                                    ? 'text-white border-2 border-[#FF4D00] bg-[#FF4D00]'
                                                    : 'text-black border-2 border-gray-400 hover:bg-[orange] hover:border-[orange] hover:text-white'
                                                }`}
                                        >
                                            {item}
                                        </label>
                                    </div>
                                ))
                            }
                        </div>

                        <div className="mt-4 flex items-center">
                            <label htmlFor="device" className="mx-4 text-xl md:text-xl lg:text-2xl">
                                Device:
                            </label>
                            <div className="flex mx-2 gap-2">

                                <label className="relative cursor-pointer">
                                    <input
                                        type="radio"
                                        name="device"
                                        value="device1"
                                        checked={selectedOption2 === 'device1'}
                                        onChange={handleOptionChange2}
                                        className="absolute opacity-0 w-0 h-0"
                                    />
                                    <MdDevices
                                        size={45}
                                        className={`cursor-pointer ${selectedOption2 === 'device1'
                                            ? 'text-[#FF4D00]'
                                            : 'text-black'
                                            } active:text-[#FF4D00] hover:text-[orange] focus:text-[#FF4D00]`}
                                    />
                                </label>

                                <label className="relative cursor-pointer">
                                    <input
                                        type="radio"
                                        name="device"
                                        value="device2"
                                        checked={selectedOption2 === 'device2'}
                                        onChange={handleOptionChange2}
                                        className="absolute opacity-0 w-0 h-0"
                                    />
                                    <IoMdDesktop
                                        size={40}
                                        className={`cursor-pointer ml-[0.37rem] ${selectedOption2 === 'device2'
                                            ? 'text-[#FF4D00]'
                                            : 'text-black'
                                            } active:text-[#FF4D00] hover:text-[orange] focus:text-[#FF4D00]`}
                                    />
                                </label>

                                <label className="relative cursor-pointer">
                                    <input
                                        type="radio"
                                        name="device"
                                        value="device3"
                                        checked={selectedOption2 === 'device3'}
                                        onChange={handleOptionChange2}
                                        className="absolute opacity-0 w-0 h-0"
                                    />
                                    <MdPhoneIphone
                                        size={40}
                                        className={`cursor-pointer ${selectedOption2 === 'device3'
                                            ? 'text-[#FF4D00]'
                                            : 'text-black'
                                            } active:text-[#FF4D00] hover:text-[orange] focus:text-[#FF4D00]`}
                                    />
                                </label>
                            </div>
                        </div>
                    </div>
                </form>
                <div className="mt-4 text-slate-500 h-[60dvh] lg:h-[65vh]">

                    <div className="h-[100%] overflow-x-hidden">
                        <Gallery
                            isSubmitted={isFormSubmitted}
                            query={submittedQuery}
                            source={isSource}
                            device={submittedDevice}
                        />
                    </div>

                </div>

            </div>
        </main>
    )
}

