import React, { useEffect, useState } from "react";

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
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">All Referrers</h1>

      {loading ? (
        <p>Loading...</p>
      ) : referrals.length === 0 ? (
        <p>No referrals found.</p>
      ) : (
        <ul className="space-y-4">
          {referrals.map((ref) => (
            <li
              key={ref._id}
              className="p-4 bg-gray-100 rounded shadow-sm border"
            >
              <p className="font-semibold text-lg">{ref.referrerName}</p>
              <p className="text-sm text-gray-600">
                Code: <span className="font-mono">{ref.referralCode}</span>
              </p>
              <p className="text-sm">
                Total Referrals:{" "}
                <span className="font-semibold">{ref.totalReferrals}</span>
              </p>
              <p className="text-sm text-gray-500">
                Created: {new Date(ref.createdAt).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
