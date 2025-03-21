"use client";
import React, { useState } from "react";
import { FaImages } from "react-icons/fa6";
import { Search } from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import Link from "next/link";
import useFetchData from "@/hooks/useFetchData";
import Image from "next/image";
import Spinner from "@/components/Spinner";
import { BsPostcardFill } from "react-icons/bs";

export default function Index() {
  const [searchQuery, setSearchQuery] = useState("");
  const { alldata, loading } = useFetchData("/api/photos");

  // Filter photos based on search query and published status
  const filteredphotos =
    searchQuery.trim() === ""
      ? alldata
      : alldata.filter((photo) =>
          photo.title.toLowerCase().includes(searchQuery.toLowerCase())
        );

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 gap-3 sm:gap-0">
        {/* Title */}
        <h2 className="text-xl sm:text-2xl text-blue-600 font-semibold">
          All Published photos
        </h2>

        {/* Breadcrumb */}
        <div className="text-blue-600 flex items-center gap-2">
          <BsPostcardFill className="text-lg sm:text-xl text-blue-600" />
          <span>/</span>
          <span>All photos</span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex items-center p-1 m-3 gap-3 w-full sm:w-auto border border-gray-300 rounded-xl shadow-lg">
        <Search className="w-5 h-5 ml-2 text-blue-500" />
        <input
          type="search"
          placeholder="Search..."
          className="w-full sm:w-64 px-2 py-2 outline-none bg-transparent"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="rounded-xl border shadow-2xl p-3 bg-white dark:bg-gray-800 overflow-x-auto">
        <Table className="min-w-[600px] w-full">
          <TableCaption className="text-lg font-medium mb-4 dark:text-gray-200">
            A list of your recent photos.
          </TableCaption>
          <TableHeader>
            <TableRow className="bg-blue-300 hover:bg-blue-600 dark:bg-blue-700">
              <TableHead className="w-[100px] font-bold text-xl text-gray-800 dark:text-gray-200 p-5">
                #
              </TableHead>
              <TableHead className="font-bold text-xl text-gray-800 dark:text-gray-200">
                Image
              </TableHead>
              <TableHead className="font-bold text-xl text-gray-800 dark:text-gray-200">
                Title
              </TableHead>
              <TableHead className="font-bold text-xl text-gray-800 dark:text-gray-200">
                Edit
              </TableHead>
              <TableHead className="text-right font-bold text-xl text-gray-800 dark:text-gray-200">
                Delete
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center p-4">
                  <Spinner />
                </TableCell>
              </TableRow>
            ) : filteredphotos.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center p-4">
                  <h2 className="font-bold"> No photo available.</h2>
                </TableCell>
              </TableRow>
            ) : (
              filteredphotos.map((photo, index) => (
                <TableRow
                  key={photo._id}
                  className="hover:bg-blue-300 dark:hover:bg-blue-600"
                >
                  <TableCell className="font-medium p-4 text-gray-800 dark:text-gray-200">
                    {index + 1}
                  </TableCell>
                  <TableCell className="text-gray-800 dark:text-gray-200">
                    <Image
                      src={photo.images[0]}
                      width={100}
                      height={100}
                      alt="photo"
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                  </TableCell>
                  <TableCell className="text-gray-800 dark:text-gray-200">
                    {photo.title}
                  </TableCell>
                  <TableCell className="text-gray-800 dark:text-gray-200">
                    <Link href={`/photos/edit/${photo._id}`}>
                      <Button className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600">
                        <MdEdit className="mr-2" />
                        Edit
                      </Button>
                    </Link>
                  </TableCell>
                  <TableCell className="text-right text-gray-800 dark:text-gray-200">
                    <Link href={`/photos/delete/${photo._id}`}>
                      <Button className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600">
                        <MdDelete className="mr-2" />
                        Delete
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
          <TableFooter>
            <TableRow className="bg-blue-300 dark:bg-blue-700">
              <TableCell
                colSpan={4}
                className="font-bold p-4 text-xl text-gray-800 dark:text-gray-200"
              >
                Total
              </TableCell>
              <TableCell className="text-xl text-right font-bold text-gray-800 dark:text-gray-200">
                {filteredphotos.length} photos
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
}
