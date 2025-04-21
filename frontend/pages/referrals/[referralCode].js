import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiUsers, FiAlertCircle, FiCheckCircle } from "react-icons/fi";
import { format } from "date-fns";

const statusColors = {
  pending:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-200",
  contacted: "bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-200",
  converted:
    "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-200",
  rejected: "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-200",
};

// Define the order of status progression
const statusOrder = ["pending", "contacted", "converted", "rejected"];

export default function ReferralDetailsPage() {
  const router = useRouter();
  const { referralCode } = router.query;

  const [referralData, setReferralData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!referralCode) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`/api/referrals/${referralCode}`);

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || "Failed to fetch data");
        }

        const data = await res.json();
        setReferralData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [referralCode]);

  const toggleStatus = async (referralId, currentStatus) => {
    try {
      // Find the current status index
      const currentIndex = statusOrder.indexOf(currentStatus);
      // Calculate next status (cycle back to first if at end)
      const nextIndex = (currentIndex + 1) % statusOrder.length;
      const newStatus = statusOrder[nextIndex];

      // Optimistic UI update
      setReferralData((prev) => ({
        ...prev,
        referrals: prev.referrals.map((r) =>
          r._id === referralId ? { ...r, status: newStatus } : r
        ),
      }));

      // API call to update status
      const res = await fetch(`/api/referrals/${referralCode}/update-status`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          referralId,
          newStatus,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to update status");
      }

      // Optional: refresh data to ensure consistency
      // fetchData();
    } catch (err) {
      console.error("Error updating status:", err);
      // Revert optimistic update if error occurs
      setReferralData((prev) => ({
        ...prev,
        referrals: prev.referrals.map((r) =>
          r._id === referralId ? { ...r, status: currentStatus } : r
        ),
      }));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Loading referral data...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-red-500 max-w-md p-4 rounded-lg bg-red-50 dark:bg-red-900/20">
          <FiAlertCircle className="mx-auto h-8 w-8 mb-2" />
          <h3 className="font-bold">Error loading data</h3>
          <p>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!referralData) {
    return null;
  }

  return (
    <div className="min-h-screen px-4 py-10 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-blue-800 dark:text-white mb-2">
              Referral Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Track your referral performance and rewards
            </p>
          </div>

          {/* Stats Card */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                Referral Code
              </h3>
              <p className="mt-1 text-xl font-semibold text-blue-600 dark:text-blue-400">
                {referralData.referralCode}
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                Total Referrals
              </h3>
              <p className="mt-1 text-xl font-semibold text-green-600 dark:text-green-400">
                {referralData.totalReferrals}
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                Rewards Earned
              </h3>
              <p className="mt-1 text-xl font-semibold text-purple-600 dark:text-purple-400">
                {referralData.rewardsEarned || 0} points
              </p>
            </div>
          </div>

          {/* Referrer Info */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              Referrer Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-500 dark:text-gray-400">Name</p>
                <p className="text-gray-800 dark:text-white font-medium">
                  {referralData.referrerName}
                </p>
              </div>
              <div>
                <p className="text-gray-500 dark:text-gray-400">Email</p>
                <p className="text-gray-800 dark:text-white font-medium">
                  {referralData.referrerEmail}
                </p>
              </div>
            </div>
          </div>

          {/* Referrals Table */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden border border-gray-200 dark:border-gray-700">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                Referred Users ({referralData.referrals.length})
              </h2>
            </div>

            {referralData.referrals.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {referralData.referrals.map((person, idx) => (
                      <tr
                        key={idx}
                        className="hover:bg-gray-50 dark:hover:bg-gray-700/50"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                          {person.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                          {person.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() =>
                              toggleStatus(person._id, person.status)
                            }
                            className={`px-2 py-1 text-xs font-semibold rounded-full ${
                              statusColors[person.status]
                            } hover:opacity-80 transition-opacity cursor-pointer`}
                          >
                            {person.status}
                          </button>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                          {person.date
                            ? format(new Date(person.date), "MMM dd, yyyy")
                            : "N/A"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                <FiUsers className="mx-auto h-12 w-12 mb-4 opacity-50" />
                <p>No referrals found for this code</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
