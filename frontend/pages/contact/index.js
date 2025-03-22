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

import useFetchData from "@/hooks/useFetchData";
import Spinner from "@/components/Spinner";
import { BsPostcardFill } from "react-icons/bs";

export default function Index() {
  const [searchQuery, setSearchQuery] = useState("");
  const { alldata, loading } = useFetchData("/api/contact");

  // Filter contacts based on search query
  const filteredContacts =
    searchQuery.trim() === ""
      ? alldata
      : alldata.filter(
          (contact) =>
            contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            contact.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
            contact.project.toLowerCase().includes(searchQuery.toLowerCase())
        );

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 gap-3 sm:gap-0">
        {/* Title */}
        <h2 className="text-xl sm:text-2xl text-blue-600 font-semibold">
          All Contacts
        </h2>

        {/* Breadcrumb */}
        <div className="text-blue-600 flex items-center gap-2">
          <BsPostcardFill className="text-lg sm:text-xl text-blue-600" />
          <span>/</span>
          <span>All Contacts</span>
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
            A list of your recent contacts.
          </TableCaption>
          <TableHeader>
            <TableRow className="bg-blue-300 hover:bg-blue-600 dark:bg-blue-700">
              <TableHead className="w-[100px] font-bold text-xl text-gray-800 dark:text-gray-200 p-5">
                #
              </TableHead>
              <TableHead className="font-bold text-xl text-gray-800 dark:text-gray-200">
                Name
              </TableHead>
              <TableHead className="font-bold text-xl text-gray-800 dark:text-gray-200">
                Email
              </TableHead>
              <TableHead className="font-bold text-xl text-gray-800 dark:text-gray-200">
                Phone Number
              </TableHead>
              <TableHead className="font-bold text-xl text-gray-800 dark:text-gray-200">
                Company
              </TableHead>
              <TableHead className="text-right font-bold text-xl text-gray-800 dark:text-gray-200">
                Project
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center p-4">
                  <Spinner />
                </TableCell>
              </TableRow>
            ) : filteredContacts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center p-4">
                  <h2 className="font-bold">No contacts available.</h2>
                </TableCell>
              </TableRow>
            ) : (
              filteredContacts.map((contact, index) => (
                <TableRow
                  key={contact._id}
                  className="hover:bg-blue-300 dark:hover:bg-blue-600"
                >
                  <TableCell className="font-medium p-4 text-gray-800 dark:text-gray-200">
                    {index + 1}
                  </TableCell>
                  <TableCell className="text-gray-800 dark:text-gray-200">
                    {contact.name}
                  </TableCell>
                  <TableCell className="text-gray-800 dark:text-gray-200">
                    {contact.email}
                  </TableCell>
                  <TableCell className="text-gray-800 dark:text-gray-200">
                    {contact.phone}
                  </TableCell>
                  <TableCell className="text-gray-800 dark:text-gray-200">
                    {contact.company}
                  </TableCell>
                  <TableCell className="text-right text-gray-800 dark:text-gray-200">
                    {contact.project}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
          <TableFooter>
            <TableRow className="bg-blue-300 dark:bg-blue-700">
              <TableCell
                colSpan={5}
                className="font-bold p-4 text-xl text-gray-800 dark:text-gray-200"
              >
                Total
              </TableCell>
              <TableCell className="text-xl text-right font-bold text-gray-800 dark:text-gray-200">
                {filteredContacts.length} contacts
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
}
