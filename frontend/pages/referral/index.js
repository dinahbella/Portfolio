import useFetchData from "@/hooks/useFetchData";
import React, { useState, useEffect } from "react";

const Referral = () => {
  const [referralCode, setReferralCode] = useState("");
  const [copied, setCopied] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [email, setEmail] = useState("");

  // Using our custom hook to fetch referral data
  const { data: referrals, loading, error } = useFetchData("/api/referrals");

  // Generate a referral code (in a real app, this would come from your backend)
  const userReferralCode =
    "REF-" + Math.random().toString(36).substring(2, 8).toUpperCase();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(userReferralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the referral to your backend
    console.log("Referring:", email);
    setShowForm(false);
    setEmail("");
  };

  if (loading)
    return <div className="text-center py-8">Loading referrals...</div>;
  if (error)
    return <div className="text-center py-8 text-red-500">Error: {error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
        Referral Program
      </h1>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
          Your Referral Code
        </h2>
        <div className="flex items-center gap-4 mb-4">
          <div className="flex-1 bg-gray-100 dark:bg-gray-700 p-3 rounded-md text-gray-800 dark:text-gray-200 font-mono">
            {userReferralCode}
          </div>
          <button
            onClick={copyToClipboard}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Share this code with friends and earn rewards when they sign up!
        </p>
        <button
          onClick={() => setShowForm(!showForm)}
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          {showForm ? "Cancel" : "Refer someone directly"}
        </button>

        {showForm && (
          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Friend's Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="friend@example.com"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Send Referral
            </button>
          </form>
        )}
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
          Your Referrals
        </h2>

        {referrals && referrals.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Referee
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Reward
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {referrals.map((referral) => (
                  <tr key={referral.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                      {referral.referee}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                      {new Date(referral.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          referral.status === "completed"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                            : referral.status === "pending"
                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                            : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                        }`}
                      >
                        {referral.status.charAt(0).toUpperCase() +
                          referral.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                      {referral.reward ? `$${referral.reward.toFixed(2)}` : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            You haven't referred anyone yet. Share your code to get started!
          </div>
        )}
      </div>

      <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
        <h3 className="font-medium text-blue-800 dark:text-blue-200 mb-2">
          How it works
        </h3>
        <ul className="list-disc pl-5 space-y-1 text-blue-700 dark:text-blue-300">
          <li>Share your unique referral code with friends</li>
          <li>They sign up using your code</li>
          <li>
            When they complete their first transaction, you both earn a reward!
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Referral;
