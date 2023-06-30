import Navbar from '@/components/Navbar';
import { useRouter } from 'next/router';
import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function DownloadPage() {

  const router = useRouter();
  const { id, image } = router.query;
  const handleBrowseMore = () => {
    router.push('/');
  };

  const notify = () => toast.error('🤖 Server Error!', {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = image;
    link.download = 'wallpaper.jpg';
    link.target = '_blank';
    link.click();
  };

  return (
    <div className='h-screen w-full'>
      <ToastContainer />
      <Navbar />
      <div className='h-[82vh] w-full flex flex-col md:flex-row bg-black'>
        <div className='w-full md:w-[50%] h-full flex justify-center md:justify-end items-center md:pr-8 mt-4 md:mt-0'>
          <img src={image} className='max-h-[70vh] max-w-[70%] border bg-[#FF4D00] p-1' alt="Download Image" style={{ borderColor: 'transparent' }} />
        </div>
        <div className='md:w-[50%] h-full flex md:justify-start justify-center mt-2 md:mt-0 w-full items-center md:pl-8'>
          <div className='flex flex-col gap-4'>
            <button className='bg-[#FF4D00] py-3 md:py-4 px-20 md:px-32 rounded-[4px] text-md md:text-xl text-white whitespace-nowrap'
              onClick={() => {
                handleDownload();
                // notify();
              }}>
              Download Wallpaper
            </button>
            <button className='py-2 md:py-4 px-20 rounded-[4px] text-md md:text-xl text-white whitespace-nowrap hover:underline' onClick={handleBrowseMore}>
              Browse More
            </button>
          </div>
        </div>
      </div>
      <div className='bg-[#2AC269] h-[10vh] md:h-[8vh] flex flex-col md:flex-row justify-center items-center whitespace-nowrap text-white text-lg'>
        <div>
          Using Multiple Monitors?&nbsp;&nbsp;&nbsp; <br />
        </div>
        <div className='hover:underline cursor-pointer' onClick={() => window.open('https://hades-dual-wallpaper-generator.netlify.app/', '_blank')}>
          Checkout My Dual Monitor Wallpaper Generator...
        </div>
      </div>
    </div>
  )
}

export default DownloadPage