import { useState } from "react";
import { motion } from "framer-motion";

export default function WelcomeReferral() {
  const [wasReferred, setWasReferred] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", referralCode: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/referred", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setSubmitted(true);
      } else {
        alert(data.message || "Failed to submit");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-gray-900 dark:to-gray-800 px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white dark:bg-gray-900 shadow-2xl rounded-xl max-w-md w-full p-8 text-center"
      >
        <h1 className="text-3xl font-bold text-blue-800 dark:text-white mb-4">
          Welcome to Our Referral Program
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Were you referred by a friend or colleague?
        </p>

        {wasReferred === null && (
          <div className="flex justify-center gap-4">
            <button
              onClick={() => setWasReferred(true)}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Yes
            </button>
            <button
              onClick={() => setWasReferred(false)}
              className="px-6 py-2 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg hover:bg-gray-400 dark:hover:bg-gray-600 transition"
            >
              No
            </button>
          </div>
        )}

        {wasReferred === false && (
          <div className="mt-6 text-green-700 dark:text-green-400">
            No problem! You're still welcome to explore and join us 🌟
          </div>
        )}

        {wasReferred && !submitted && (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4 text-left">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Your Name
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded dark:bg-gray-800 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Your Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded dark:bg-gray-800 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Referral Code
              </label>
              <input
                name="referralCode"
                value={form.referralCode}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded dark:bg-gray-800 dark:text-white"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Submit
            </button>
          </form>
        )}

        {submitted && (
          <div className="mt-6 text-green-600 dark:text-green-400">
            ✅ Thank you! Your referral has been recorded.
          </div>
        )}
      </motion.div>
    </div>
  );
}
