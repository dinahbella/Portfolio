import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiUsers, FiUser, FiMail, FiCalendar, FiCode } from "react-icons/fi";
import SideSheet from "@/components/SideBar";
import Spinner from "@/components/Spinner";
import { format } from "date-fns";

export default function ReferralDetailsPage() {
  const router = useRouter();
  const { referralCode } = router.query;

  const [referralData, setReferralData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  useEffect(() => {
    if (!referralCode || !isMounted) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(`/api/referrals/${referralCode}`);
        if (!res.ok) {
          throw new Error(
            res.status === 404
              ? "Referral code not found"
              : "Failed to load data"
          );
        }

        const data = await res.json();
        if (isMounted) {
          setReferralData(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [referralCode, isMounted]);

  if (!isMounted) return null;

  return (
    <>
      <SideSheet />
      <div className="min-h-screen px-4 py-10 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-5xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-center text-blue-800 dark:text-white mb-8 md:mb-10"
          >
            Referral Details
          </motion.h1>

          {loading ? (
            <div className="flex flex-col items-center justify-center space-y-4 text-gray-600 dark:text-gray-300">
              <Spinner size="lg" />
              <p>Loading referral information...</p>
            </div>
          ) : error ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center p-4 rounded-lg bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-300 font-medium max-w-md mx-auto"
            >
              {error}
            </motion.div>
          ) : (
            referralData && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-6 md:p-8 space-y-8 border border-gray-200 dark:border-gray-700"
              >
                {/* Referrer Info Card */}
                <div className="space-y-4">
                  <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                    <FiUser className="text-blue-600 dark:text-blue-400" />
                    Referrer Information
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                        Name
                      </p>
                      <p className="font-medium text-blue-700 dark:text-blue-300">
                        {referralData.referrerName || "Not specified"}
                      </p>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                        Referral Code
                      </p>
                      <div className="flex items-center gap-2">
                        <FiCode className="text-gray-500 dark:text-gray-400" />
                        <span className="font-mono text-sm bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 px-3 py-1 rounded">
                          {referralData.referralCode}
                        </span>
                      </div>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                        Total Referrals
                      </p>
                      <p className="font-semibold text-green-700 dark:text-green-400">
                        {referralData.totalReferrals}
                      </p>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                        Successful Conversions
                      </p>
                      <p className="font-semibold">
                        {
                          referralData.referrals.filter(
                            (r) => r.status === "converted"
                          ).length
                        }
                      </p>
                    </div>
                  </div>
                </div>

                {/* Referred Users Section */}
                <div className="space-y-4">
                  <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                    <FiUsers className="text-blue-600 dark:text-blue-400" />
                    Referred Users
                  </h2>

                  {referralData.referrals.length > 0 ? (
                    <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                          <thead className="bg-gray-50 dark:bg-gray-700">
                            <tr>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                              >
                                <div className="flex items-center gap-2">
                                  <FiUser size={14} />
                                  Name
                                </div>
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                              >
                                <div className="flex items-center gap-2">
                                  <FiMail size={14} />
                                  Email
                                </div>
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                              >
                                Status
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                              >
                                <div className="flex items-center gap-2">
                                  <FiCalendar size={14} />
                                  Date
                                </div>
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                            {referralData.referrals.map((person, idx) => (
                              <tr
                                key={idx}
                                className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                              >
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                                  {person.name || "N/A"}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                  {person.email || "N/A"}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span
                                    className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                                      person.status === "converted"
                                        ? "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300"
                                        : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300"
                                    }`}
                                  >
                                    {person.status}
                                  </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                  {person.date
                                    ? format(
                                        new Date(person.date),
                                        "MMM dd, yyyy"
                                      )
                                    : "N/A"}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-8 text-gray-500 dark:text-gray-400">
                      <FiUsers className="text-3xl mb-3" />
                      <p>No referred users found for this code</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )
          )}
        </div>
      </div>
    </>
  );
}
