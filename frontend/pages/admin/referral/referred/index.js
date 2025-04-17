import SideSheet from "@/components/SideBar";
import { useEffect, useState } from "react";

export default function ReferralDashboard() {
  const [referralCode, setReferralCode] = useState("");
  const [referrals, setReferrals] = useState([]);
  const [referrerName, setReferrerName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchReferrals = async (code) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/referrals/${code}`);
      if (!res.ok) {
        throw new Error("Referrer not found.");
      }
      const data = await res.json();
      setReferrals(data.referrals || []);
      setReferrerName(data.referrerName || "");
    } catch (err) {
      setReferrals([]);
      setReferrerName("");
      setError(err.message || "Failed to load referral data.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!referralCode.trim()) return;
    fetchReferrals(referralCode.trim());
  };

  return (
    <>
      <SideSheet />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
        <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
            👥 Referred Users Dashboard
          </h2>

          <form
            onSubmit={handleSearch}
            className="flex flex-col sm:flex-row gap-4 mb-6"
          >
            <input
              type="text"
              placeholder="Enter referrer code"
              value={referralCode}
              onChange={(e) => setReferralCode(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
            >
              View Referrals
            </button>
          </form>

          {loading && (
            <p className="text-gray-600 dark:text-gray-400">
              Loading referrals...
            </p>
          )}
          {error && <p className="text-red-500">{error}</p>}

          {referrerName && (
            <div className="mb-4">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                <strong>Referrer:</strong> {referrerName}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                <strong>Referral Code:</strong> {referralCode}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                <strong>Total Referred:</strong> {referrals.length}
              </p>
            </div>
          )}

          {referrals.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-800 dark:text-gray-100">
                <thead className="bg-gray-100 dark:bg-gray-700">
                  <tr>
                    <th className="py-2 px-4">Name</th>
                    <th className="py-2 px-4">Email</th>
                    <th className="py-2 px-4">Status</th>
                    <th className="py-2 px-4">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {referrals.map((r, idx) => (
                    <tr
                      key={idx}
                      className="border-t border-gray-200 dark:border-gray-600"
                    >
                      <td className="py-2 px-4">{r.name || "N/A"}</td>
                      <td className="py-2 px-4">{r.email || "N/A"}</td>
                      <td className="py-2 px-4 capitalize">
                        {r.status || "pending"}
                      </td>
                      <td className="py-2 px-4">
                        {r.date ? new Date(r.date).toLocaleDateString() : "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {referrals.length === 0 && !loading && !error && (
            <p className="text-sm text-gray-500">
              No referrals found for this code.
            </p>
          )}
        </div>
      </div>
    </>
  );
}
