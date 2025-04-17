import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiUsers } from "react-icons/fi";
import { Tooltip } from "react-tooltip";

export default function ReferralDetailsPage() {
  const router = useRouter();
  const { referralCode } = router.query;

  const [referralData, setReferralData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!referralCode) return;

    const fetchData = async () => {
      try {
        const res = await fetch(`/api/referrals/${referralCode}`);
        const data = await res.json();

        if (!res.ok) throw new Error(data.message || "Failed to load data.");
        setReferralData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [referralCode]);

  return (
    <div className="min-h-screen px-4 py-10 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-5xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center text-blue-800 dark:text-white mb-10"
        >
          Referral Details
        </motion.h1>

        {loading ? (
          <div className="text-center text-gray-600 dark:text-gray-300">
            <div className="inline-block h-6 w-6 animate-spin border-4 border-blue-500 border-t-transparent rounded-full mb-4" />
            <p>Loading referral info...</p>
          </div>
        ) : error ? (
          <div className="text-center text-red-500 font-medium">{error}</div>
        ) : (
          referralData && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8 space-y-6 border border-gray-200 dark:border-gray-700"
            >
              {/* Referrer Info */}
              <div className="text-gray-800 dark:text-white space-y-1">
                <p className="text-lg font-semibold">
                  👤 Referrer:{" "}
                  <span className="text-blue-700 dark:text-blue-300">
                    {referralData.referrerName}
                  </span>
                </p>
                <p>
                  <strong>Referral Code:</strong>{" "}
                  <span className="font-mono text-sm bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-2 py-1 rounded">
                    {referralData.referralCode}
                  </span>
                </p>
                <p>
                  <strong>Total Referred:</strong>{" "}
                  <span className="font-semibold text-green-700 dark:text-green-400">
                    {referralData.totalReferrals}
                  </span>
                </p>
              </div>

              {/* Referred Table */}
              <div>
                <h2 className="text-xl font-bold text-gray-700 dark:text-white mb-3">
                  👥 Referred Users
                </h2>

                {referralData.referrals.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm border border-gray-300 dark:border-gray-600 shadow-sm rounded overflow-hidden">
                      <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 uppercase text-xs tracking-wider">
                        <tr>
                          <th className="px-4 py-3">Name</th>
                          <th className="px-4 py-3">Email</th>
                          <th className="px-4 py-3">Status</th>
                          <th className="px-4 py-3">Date</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100">
                        {referralData.referrals.map((person, idx) => (
                          <tr
                            key={idx}
                            className="border-t border-gray-200 dark:border-gray-700"
                          >
                            <td className="px-4 py-3">
                              {person.name || "N/A"}
                            </td>
                            <td className="px-4 py-3">
                              {person.email || "N/A"}
                            </td>
                            <td className="px-4 py-3">
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                  person.status === "converted"
                                    ? "bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-300"
                                    : "bg-yellow-100 text-yellow-800 dark:bg-yellow-700 dark:text-yellow-300"
                                }`}
                              >
                                {person.status}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-xs text-gray-500 dark:text-gray-400">
                              {person.date
                                ? new Date(person.date).toLocaleDateString(
                                    "en-US",
                                    {
                                      year: "numeric",
                                      month: "short",
                                      day: "numeric",
                                    }
                                  )
                                : "N/A"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm">
                    <FiUsers className="text-xl" />
                    No referred users found for this code.
                  </div>
                )}
              </div>
            </motion.div>
          )
        )}
      </div>
    </div>
  );
}
