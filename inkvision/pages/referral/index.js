import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiCopy, FiCheck, FiUser, FiMail, FiPhone } from "react-icons/fi";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function CreateReferrer() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [referralId, setReferralId] = useState("");
  const [referralLink, setReferralLink] = useState("");
  const [copied, setCopied] = useState(false);
  const [referrer, setReferrer] = useState(null);
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const domain = typeof window !== "undefined" ? window.location.origin : "";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponse(null);

    try {
      const res = await fetch("/api/referral", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          referrerName: formData.name,
          referrerEmail: formData.email,
          referrerPhone: formData.phone,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setResponse(data);
        // Update referral link with the server-generated code if available
        if (data.referralCode) {
          setReferralLink(`${domain}/?ref=${data.referralCode}`);
        }
      } else {
        setResponse({
          message: data.message || "Failed to create referral code",
        });
      }
    } catch (error) {
      setResponse({
        message: "Network error. Please check your connection and try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Generate or retrieve referral ID
      let storedId = localStorage.getItem("referralId");
      if (!storedId) {
        storedId = Math.random().toString(36).substring(2, 10);
        localStorage.setItem("referralId", storedId);
      }
      setReferralId(storedId);
      setReferralLink(`${domain}/?ref=${storedId}`);

      // Check for referrer in URL
      const params = new URLSearchParams(window.location.search);
      const ref = params.get("ref");
      if (ref && !localStorage.getItem("referrer")) {
        localStorage.setItem("referrer", ref);
        setReferrer(ref);
      } else if (localStorage.getItem("referrer")) {
        setReferrer(localStorage.getItem("referrer"));
      }
    }
  }, [domain]);

  const copyToClipboard = () => {
    if (!referralLink) return;
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Header />
      <main className="flex-grow flex items-center justify-center p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700"
          >
            {/* Decorative header */}
            <div className="bg-gradient-to-r from-indigo-800 via-teal-700 to-blue-900 p-4 text-center">
              <motion.h1
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-2xl font-bold text-white"
              >
                Create Your Referral
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-blue-100"
              >
                Earn rewards by sharing with friends
              </motion.p>
            </div>

            <div className="p-6 sm:p-8">
              <form onSubmit={handleCreate} className="space-y-5">
                {/* Name Field */}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Your Name
                  </label>
                  <div className="relative">
                    <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
                    />
                  </div>
                </motion.div>

                {/* Email Field */}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
                    />
                  </div>
                </motion.div>

                {/* Phone Field */}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Phone Number
                  </label>
                  <div className="relative">
                    <FiPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      placeholder="+1 (123) 456-7890"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
                    />
                  </div>
                </motion.div>

                {/* Submit Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-all duration-200 shadow-md ${
                    loading
                      ? "bg-blue-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-indigo-800 via-teal-700 to-blue-900 hover:from-blue-700 hover:to-purple-700"
                  }`}
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
                      Generating...
                    </span>
                  ) : (
                    "Generate Referral Code"
                  )}
                </motion.button>
              </form>

              {/* Response Section */}
              <AnimatePresence>
                {response && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`mt-6 rounded-lg overflow-hidden ${
                      response.referralCode
                        ? "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800"
                        : "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
                    }`}
                  >
                    <div className="p-4">
                      {response.referralCode ? (
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-green-700 dark:text-green-300">
                              Your Referral Code
                            </h3>
                          </div>

                          <div className="bg-white dark:bg-gray-700 p-3 rounded-md flex items-center justify-between">
                            <span className="font-mono text-lg font-bold text-gray-800 dark:text-white">
                              {response.referralCode}
                            </span>
                            <button
                              onClick={copyToClipboard}
                              className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                              aria-label="Copy to clipboard"
                            >
                              {copied ? (
                                <FiCheck className="text-green-600 dark:text-green-400" />
                              ) : (
                                <FiCopy className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200" />
                              )}
                            </button>
                          </div>

                          <div className="mt-2">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              Your Referral Link
                            </label>
                            <div className="flex">
                              <input
                                type="text"
                                readOnly
                                value={referralLink}
                                className="flex-grow px-3 py-2 rounded-l-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white text-sm"
                              />
                              <button
                                onClick={copyToClipboard}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-r-md text-sm transition-colors"
                              >
                                {copied ? "Copied!" : "Copy"}
                              </button>
                            </div>
                          </div>

                          <p className="text-sm text-green-600 dark:text-green-400 mt-2">
                            Share this code with friends to earn rewards!
                          </p>
                        </div>
                      ) : (
                        <div className="text-red-700 dark:text-red-400 flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 mr-2"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                          {response.message}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            <div className="bg-gray-50 dark:bg-gray-700/50 px-6 py-4 border-t border-gray-200 dark:border-gray-700">
              <p className="text-center text-xs text-gray-500 dark:text-gray-400">
                By creating a referral code, you agree to our{" "}
                <a
                  href="#"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Terms of Service
                </a>{" "}
                and{" "}
                <a
                  href="#"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Privacy Policy
                </a>
                .
              </p>
            </div>
          </motion.div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
