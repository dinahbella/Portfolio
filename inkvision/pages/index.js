import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import { FiUser, FiMail, FiArrowRight } from "react-icons/fi";
import { FaGift } from "react-icons/fa";
import { toast } from "react-toastify";

export default function ReferredForm() {
  const router = useRouter();
  const [referrerCode, setReferrerCode] = useState("");
  const [form, setForm] = useState({ name: "", email: "" });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("ref");
    if (code) {
      setReferrerCode(code);
    }
  }, []);

  useEffect(() => {
    if (submitted) {
      const timer = setTimeout(() => {
        router.push("/home"); // Navigate to home after 3 seconds
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [submitted, router]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/refer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, referredBy: referrerCode }),
      });
      if (!res.ok) throw new Error("Submission failed");
      toast.error("Email has already been referrred");
      setSubmitted(true);
    } catch (err) {
      setError(err.message || "Submission failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl overflow-hidden w-full max-w-md"
      >
        {/* Decorative header */}
        <div className="bg-gradient-to-r from-indigo-800 via-teal-700 to-blue-900 p-4 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="inline-block mb-2"
          >
            <FaGift className="text-white text-3xl" />
          </motion.div>
          <h1 className="text-xl font-bold text-white">Referral Program</h1>
        </div>

        <div className="p-6 sm:p-8">
          <AnimatePresence mode="wait">
            {!referrerCode ? (
              <motion.div
                key="no-code"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center space-y-4"
              >
                <div className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 p-4 rounded-lg">
                  <p className="font-medium">No referral code detected</p>
                  <p className="text-sm mt-1">
                    Please use a valid referral link to access this page.
                  </p>
                </div>
                <button
                  onClick={() => router.push("/home")}
                  className="text-blue-600 dark:text-blue-400 hover:underline flex items-center justify-center gap-1"
                >
                  Go to homepage <FiArrowRight />
                </button>
              </motion.div>
            ) : submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="text-center space-y-6"
              >
                <div className="mx-auto w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg
                    className="w-10 h-10 text-green-600 dark:text-green-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-green-600 dark:text-green-400">
                  Thank you!
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  You&apos;ve been successfully referred by{" "}
                  <span className="font-semibold text-blue-600 dark:text-blue-400">
                    {referrerCode}
                  </span>
                  . You&apos;ll be redirected shortly.
                </p>

                <div className="pt-4">
                  <div className="h-1 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 3, ease: "linear" }}
                      className="h-full bg-blue-600"
                    />
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                <h2 className="text-xl font-bold text-center text-gray-800 dark:text-white">
                  Complete Your Referral
                </h2>
                <p className="text-center text-gray-600 dark:text-gray-400 mb-5">
                  You&apos;re being referred by a friend! Please fill in your
                  details.
                </p>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="John Doe"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <input type="hidden" name="referredBy" value={referrerCode} />

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-all ${
                    loading
                      ? "bg-blue-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  } shadow-md`}
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{
                          repeat: Infinity,
                          duration: 1,
                          ease: "linear",
                        }}
                        className="inline-block h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2"
                      />
                      Processing...
                    </span>
                  ) : (
                    "Submit Referral"
                  )}
                </motion.button>

                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 p-3 rounded-lg border border-red-200 dark:border-red-800 text-sm"
                    >
                      {error}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.form>
            )}
          </AnimatePresence>
        </div>

        <div className="bg-gray-50 dark:bg-gray-700/30 px-6 py-4 border-t border-gray-200 dark:border-gray-700">
          <p className="text-center text-xs text-gray-500 dark:text-gray-400">
            By submitting, you agree to our{" "}
            <a
              href="#"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Terms
            </a>{" "}
            and{" "}
            <a
              href="#"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Privacy Policy
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
