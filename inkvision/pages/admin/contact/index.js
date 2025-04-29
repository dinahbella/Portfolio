"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Mail,
  Phone,
  Globe,
  Briefcase,
  DollarSign,
  FileText,
} from "lucide-react";
import useFetchData from "@/hooks/useFetchData";
import Spinner from "@/components/Spinner";
import { BsPostcardFill } from "react-icons/bs";
import SideSheet from "@/components/SideBar";

export default function Index() {
  const [searchQuery, setSearchQuery] = useState("");
  const { alldata, loading } = useFetchData("/api/contact");

  // Filter contacts based on search query
  const filteredContacts =
    searchQuery.trim() === ""
      ? alldata
      : alldata.filter(
          (contact) =>
            contact.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            contact.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            contact.phone?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            contact.project?.toLowerCase().includes(searchQuery.toLowerCase())
        );

  return (
    <>
      <SideSheet />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 p-4 sm:p-6">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4"
        >
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-blue-600 dark:text-blue-400">
              All Contacts
            </h2>
            <div className="text-blue-600 dark:text-blue-400 flex items-center gap-2 mt-1">
              <BsPostcardFill className="text-lg" />
              <span>/</span>
              <span>All Contacts</span>
            </div>
          </div>

          {/* Search Bar */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="relative w-full sm:w-64"
          >
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-blue-500" />
            </div>
            <input
              type="search"
              placeholder="Search contacts..."
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </motion.div>
        </motion.div>

        {/* Contacts Grid */}
        <div className="mb-8">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Spinner />
            </div>
          ) : filteredContacts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl shadow-lg"
            >
              <h3 className="text-xl font-medium text-gray-600 dark:text-gray-400">
                {searchQuery
                  ? "No contacts found matching your search"
                  : "No contacts available"}
              </h3>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                >
                  Clear search
                </button>
              )}
            </motion.div>
          ) : (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                <AnimatePresence>
                  {filteredContacts.map((contact, index) => (
                    <motion.div
                      key={contact._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      whileHover={{ y: -5 }}
                      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                    >
                      <div className="p-6">
                        {/* Contact Header */}
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                              {contact.name}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400">
                              {contact.company || "No company specified"}
                            </p>
                          </div>
                          <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-medium px-2.5 py-0.5 rounded-full">
                            #{index + 1}
                          </span>
                        </div>

                        {/* Contact Details */}
                        <div className="space-y-3">
                          <div className="flex items-center gap-3">
                            <Mail className="w-5 h-5 text-blue-500" />
                            <a
                              href={`mailto:${contact.email}`}
                              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:underline"
                            >
                              {contact.email}
                            </a>
                          </div>

                          {contact.phone && (
                            <div className="flex items-center gap-3">
                              <Phone className="w-5 h-5 text-blue-500" />
                              <a
                                href={`tel:${contact.phone}`}
                                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:underline"
                              >
                                {contact.phone}
                              </a>
                            </div>
                          )}

                          {contact.country && (
                            <div className="flex items-center gap-3">
                              <Globe className="w-5 h-5 text-blue-500" />
                              <span className="text-gray-700 dark:text-gray-300">
                                {contact.country}
                              </span>
                            </div>
                          )}

                          {contact.project && (
                            <div className="flex items-center gap-3">
                              <FileText className="w-5 h-5 text-blue-500" />
                              <span className="text-gray-700 dark:text-gray-300">
                                {contact.project}
                              </span>
                            </div>
                          )}

                          {contact.price && (
                            <div className="flex items-center gap-3">
                              <DollarSign className="w-5 h-5 text-blue-500" />
                              <span className="text-gray-700 dark:text-gray-300">
                                {contact.price}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="bg-gray-50 dark:bg-gray-700 px-6 py-3">
                        <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400">
                          <span>
                            {new Date(contact.createdAt).toLocaleDateString()}
                          </span>
                          <button className="text-blue-600 dark:text-blue-400 hover:underline">
                            View Details
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>

              {/* Summary Footer */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mt-6 bg-blue-100 dark:bg-blue-900 rounded-xl p-4 shadow-inner"
              >
                <p className="text-center text-blue-800 dark:text-blue-200 font-medium">
                  Showing {filteredContacts.length} of {alldata.length} contacts
                </p>
              </motion.div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
