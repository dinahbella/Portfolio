import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiUsers } from "react-icons/fi";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function ReferralsPage() {
  const [referrals, setReferrals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReferrals = async () => {
      try {
        const res = await fetch("/api/referral");
        const data = await res.json();
        setReferrals(data);
      } catch (error) {
        console.error("Failed to fetch referrals:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReferrals();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 px-4 py-10">
      <div className="max-w-7xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-center text-blue-800 dark:text-white mb-10"
        >
          Referral Program Dashboard
        </motion.h1>

        {loading ? (
          <div className="text-center text-gray-600 dark:text-gray-300">
            <div className="inline-block h-6 w-6 animate-spin border-4 border-blue-500 border-t-transparent rounded-full mb-4" />
            <p>Loading referral data...</p>
          </div>
        ) : referrals.length === 0 ? (
          <div className="text-center text-gray-500 dark:text-gray-400">
            <FiUsers className="mx-auto text-5xl mb-4" />
            <p>No referrals found yet.</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {referrals.map((ref) => (
              <motion.div
                key={ref._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700"
              >
                <h2 className="text-xl font-bold mb-2 text-blue-700 dark:text-blue-400">
                  {ref.referrerName}
                </h2>
                <p className="text-sm text-gray-500 mb-1 dark:text-gray-400">
                  <strong>Email:</strong> {ref.referrerEmail}
                </p>
                <p className="text-sm mb-2 text-gray-500 dark:text-gray-400">
                  <strong>Phone:</strong> {ref.referrerPhone}
                </p>

                <div className="mb-3">
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    <strong>Referral Code:</strong>{" "}
                    <span className="font-mono bg-blue-100 text-blue-700 px-2 py-1 rounded dark:bg-blue-900 dark:text-blue-300">
                      {ref.referralCode}
                    </span>
                  </p>
                  <p className="text-sm mt-2 text-gray-600 dark:text-gray-400">
                    <strong>Created:</strong>{" "}
                    <span className="italic">
                      {new Date(ref.createdAt).toLocaleString()}
                    </span>
                  </p>
                </div>

                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <strong>Total Referrals:</strong>{" "}
                  <span className="font-semibold">{ref.totalReferrals}</span>
                </p>

                {ref.referredPeople?.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                      Referred People:
                    </h4>
                    <ul className="flex flex-wrap gap-2">
                      {ref.referredPeople.map((person, idx) => (
                        <li
                          key={idx}
                          className="bg-gray-100 dark:bg-gray-700 text-xs px-3 py-1 rounded-full text-gray-800 dark:text-gray-100"
                        >
                          {person.name} ({person.email})
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
        <div className="mt-10 text-center ">
          <Link href="/referral/referred">
            <div className="flex justify-center items-center gap-2 bg-blue-100 dark:bg-gray-700 text-blue-800 dark:text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-200 dark:hover:bg-gray-600 transition duration-300">
              <h3 className="inline-block  text-lg  font-bold text-blue-800 dark:text-blue-400 hover:underline hover:text-blue-800 transition">
                View All Referred People
              </h3>
              <span className="text-blue-800 dark:text-blue-400">
                <ArrowRight />
              </span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
