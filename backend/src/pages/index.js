import { Geist, Geist_Mono } from "next/font/google";
import { FaHome } from "react-icons/fa";
import { Chart } from "@/components/Chart";
import { TableDe } from "@/components/Table";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 gap-3 sm:gap-0">
        {/* Title */}
        <h2 className="text-xl sm:text-2xl text-blue-600 font-semibold">
          Admin Dashboard
        </h2>

        {/* Breadcrumb */}
        <div className="text-blue-600 flex items-center gap-2">
          <FaHome className="text-lg sm:text-xl text-blue-600" />
          <span>/</span>
          <span>Dashboard</span>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        <div className="w-full relative h-40 sm:h-48 md:h-56 lg:h-60 bg-purple-700 shadow-md rounded-3xl flex items-center justify-center">
          <h2 className="text-2xl text-white">Total Blogs</h2>
          <span className="absolute rounded-md bottom-0 left-1/2 -translate-x-1/2 flex items-center justify-center bg-blue-800 h-5 w-10 sm:h-6 sm:w-12 md:h-8 md:w-16 lg:h-10 lg:w-20">
            0
          </span>
        </div>
        <div className="w-full relative h-40 sm:h-48 md:h-56 lg:h-60 bg-pink-500 shadow-md rounded-3xl flex items-center justify-center">
          <h2 className="text-2xl text-white">Total Projects</h2>
          <span className="absolute rounded-md bottom-0 left-1/2 -translate-x-1/2 flex items-center justify-center bg-blue-800 h-5 w-10 sm:h-6 sm:w-12 md:h-8 md:w-16 lg:h-10 lg:w-20">
            0
          </span>
        </div>
        <div className="w-full relative h-40 sm:h-48 md:h-56 lg:h-60 bg-yellow-400 shadow-md rounded-3xl flex items-center justify-center">
          <h2 className="text-2xl text-white">Total Photos</h2>
          <span className="absolute rounded-md bottom-0 left-1/2 -translate-x-1/2 flex items-center justify-center bg-blue-800 h-5 w-10 sm:h-6 sm:w-12 md:h-8 md:w-16 lg:h-10 lg:w-20">
            0
          </span>
        </div>
        <div className="w-full relative h-40 sm:h-48 md:h-56 lg:h-60 bg-blue-500 shadow-md rounded-3xl flex items-center justify-center">
          <h2 className="text-2xl text-white">Total Contacts</h2>
          <span className="absolute rounded-md bottom-0 left-1/2 -translate-x-1/2 flex items-center justify-center bg-blue-800 h-5 w-10 sm:h-6 sm:w-12 md:h-8 md:w-16 lg:h-10 lg:w-20">
            0
          </span>
        </div>
      </div>
      <div className="gap-5 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 mt-5">
        <Chart className="shadow-xl" />
        <TableDe className="shadow-xl" />
      </div>
    </div>
  );
}
