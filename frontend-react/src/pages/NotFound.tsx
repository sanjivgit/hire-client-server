"use client"

// import bgBack from '@/assets/defaultBgg.svg'
// import bgMobileBack from '@/assets/mbile404Bg.svg'
import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
    const navigate = useNavigate();

    const handleHome = () => {
        navigate('/admin/dashboard');
    };


    return (
        <>
            <div className="h-[100vh] flex-col items-center justify-center bg-white text-gray-900 p-4 relative overflow-hidden hidden lg:flex">
                {/* Centered container for image and buttons */}
                <div className="absolute inset-0 flex flex-col items-center justify-center z-10">

                    {/* Buttons */}
                    <div className="flex space-x-3 mt-[10%]">
                        <button onClick={handleHome}
                            className="flex items-center font-semibold justify-center px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer"
                        >
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Go Home
                        </button>
                    </div>
                </div>

                {/* Background Image */}
                {/* <img
                    src={bgBack}
                    alt="Background illustration"
                    width={1000}
                    height={300}
                    className="object-cover object-top w-full h-full"
                /> */}
            </div>

            <div className="h-[100vh] flex-col items-center justify-center bg-white text-gray-900 p-0 relative overflow-hidden flex lg:hidden">
                {/* Centered container for image and buttons */}
                <div className="absolute inset-0 flex flex-col items-center justify-center z-10">

                    {/* Buttons */}
                    <div className="flex space-x-3 mt-[10%]">
                        <button onClick={handleHome}
                            className="flex items-center font-semibold justify-center px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer"
                        >
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Go Home
                        </button>
                    </div>
                </div>

                {/* Background Image */}
                {/* <img
                    src={bgMobileBack}
                    alt="Background illustration"
                    width={1000}
                    height={300}
                    className="object-cover object-top w-full h-full"
                /> */}
            </div>

        </>
    )
}