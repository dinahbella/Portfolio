import { useState } from "react";

export default function UseReferral() {
  const [formData, setFormData] = useState({
    referralCode: "",
    name: "",
    email: "",
    note: "",
  });

  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponse(null);

    try {
      const res = await fetch("/api/referrals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      setResponse(data);
    } catch (error) {
      setResponse({ message: "Something went wrong." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Use Referral Code</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="referralCode"
          placeholder="Referral Code"
          value={formData.referralCode}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <textarea
          name="note"
          placeholder="Why are you signing up?"
          value={formData.note}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <button
          type="submit"
          className="bg-teal-600 text-white py-2 px-4 rounded"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Referral"}
        </button>
      </form>

      {response && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <p
            className={`font-semibold ${
              response.message?.includes("success")
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {response.message}
          </p>
        </div>
      )}
    </div>
  );
}
