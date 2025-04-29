import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiUsers, FiCopy, FiCheck } from "react-icons/fi";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import SideSheet from "@/components/SideBar";

export default function ReferralsPage() {
  const [referrals, setReferrals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copiedCode, setCopiedCode] = useState(null);

  useEffect(() => {
    const fetchReferrals = async () => {
      try {
        const res = await fetch("/api/referral");
        if (!res.ok) throw new Error("Failed to fetch referral data");
        const data = await res.json();
        setReferrals(data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReferrals();
  }, []);

  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "converted":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "contacted":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "rejected":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default:
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
    }
  };

  return (
    <>
      <SideSheet />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 px-4 py-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold text-blue-800 dark:text-white mb-3">
              Referral Program Dashboard
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Track and manage all your referral activities in one place
            </p>
          </motion.div>

          {loading ? (
            <div className="flex flex-col items-center justify-center h-64">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mb-4"
              />
              <p className="text-gray-600 dark:text-gray-300">
                Loading referral data...
              </p>
            </div>
          ) : error ? (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 text-center">
              <h3 className="text-lg font-medium text-red-800 dark:text-red-200 mb-2">
                Error Loading Data
              </h3>
              <p className="text-red-600 dark:text-red-300 mb-4">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {referrals.map((ref) => (
                <motion.div
                  key={ref._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ y: -5 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                          {ref.referrerName}
                        </h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {formatDate(ref.createdAt)}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3 mb-4">
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Email
                        </p>
                        <p className="font-medium text-gray-700 dark:text-gray-200">
                          {ref.referrerEmail}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Phone
                        </p>
                        <p className="font-medium text-gray-700 dark:text-gray-200">
                          {ref.referrerPhone || "Not provided"}
                        </p>
                      </div>
                    </div>

                    <div className="mb-6">
                      <div className="flex justify-between items-center mb-1">
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Referral Code
                        </p>
                        <button
                          onClick={() => copyToClipboard(ref.referralCode)}
                          className="text-gray-400 hover:text-blue-500 transition-colors"
                          aria-label="Copy referral code"
                        >
                          {copiedCode === ref.referralCode ? (
                            <FiCheck className="text-green-500" />
                          ) : (
                            <FiCopy />
                          )}
                        </button>
                      </div>
                      <div className="font-mono bg-blue-50 dark:bg-gray-700 p-3 rounded-lg text-blue-600 dark:text-blue-300">
                        {ref.referralCode}
                      </div>
                    </div>

                    <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg mb-6">
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Total Referrals
                        </p>
                        <p className="text-2xl font-bold text-gray-800 dark:text-white">
                          {ref.totalReferrals || 0}
                        </p>
                      </div>
                      <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                        <FiUsers className="text-blue-600 dark:text-blue-400 text-xl" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-700/30 px-6 py-4 border-t border-gray-100 dark:border-gray-700">
                    <Link href={`/referrals/${ref.referralCode}`}>
                      <div className="flex items-center justify-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
                        <span className="font-medium">View all referrals</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
