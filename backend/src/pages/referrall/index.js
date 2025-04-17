import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiUsers, FiCopy, FiCheck } from "react-icons/fi";
import { ArrowRight, Clipboard } from "lucide-react";
import Link from "next/link";

export default function ReferralsPage() {
  const [referrals, setReferrals] = useState([]);
  const [referred, setReferred] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copiedCode, setCopiedCode] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch both endpoints in parallel
        const [referralsRes, referredRes] = await Promise.all([
          fetch("/api/referral"),
          fetch("/api/refer"),
        ]);

        if (!referralsRes.ok || !referredRes.ok) {
          throw new Error("Failed to fetch data");
        }

        const [referralsData, referredData] = await Promise.all([
          referralsRes.json(),
          referredRes.json(),
        ]);

        setReferrals(referralsData || []);
        setReferred(referredData || []);
      } catch (err) {
        console.error("Failed to fetch data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
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

  const getReferredCount = (referralCode) => {
    return referred.filter((person) => person.referralCode === referralCode)
      .length;
  };

  return (
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
        ) : referrals.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8 max-w-md mx-auto text-center"
          >
            <FiUsers className="mx-auto text-5xl text-gray-400 dark:text-gray-500 mb-4" />
            <h3 className="text-xl font-medium text-gray-700 dark:text-gray-200 mb-2">
              No Referrals Found
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              You haven't created any referral codes yet.
            </p>
            <Link href="/referrals/create">
              <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all">
                Create Your First Referral
              </button>
            </Link>
          </motion.div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {referrals.map((ref) => {
              const referredCount = getReferredCount(ref.referralCode);
              const recentReferrals = referred
                .filter((person) => person.referralCode === ref.referralCode)
                .slice(0, 3);

              return (
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
                      {/* <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          ref.status
                        )}`}
                      >
                        {ref.status.charAt(0).toUpperCase() +
                          ref.status.slice(1)}
                      </span> */}
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
                          {referredCount}
                        </p>
                      </div>
                      <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                        <FiUsers className="text-blue-600 dark:text-blue-400 text-xl" />
                      </div>
                    </div>

                    {recentReferrals.length > 0 && (
                      <div className="mb-6">
                        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                          Recent Referrals
                        </h4>
                        <ul className="space-y-3">
                          {recentReferrals.map((person, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                              <div className="mt-1 flex-shrink-0">
                                <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                                  <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                                    {person.referredId?.name?.charAt(0) || "?"}
                                  </span>
                                </div>
                              </div>
                              <div className="flex-1">
                                <p className="font-medium text-gray-700 dark:text-gray-200">
                                  {person.referredId?.name || "Unknown"}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                  {person.referredId?.email || "No email"} •{" "}
                                  {formatDate(person.date)}
                                </p>
                                {person.referredId?.status && (
                                  <span
                                    className={`inline-block mt-1 px-2 py-0.5 rounded-full text-xs ${getStatusColor(
                                      person.referredId.status
                                    )}`}
                                  >
                                    {person.referredId.status}
                                  </span>
                                )}
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
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
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
