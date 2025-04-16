import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiUser, FiMail, FiPhone, FiGift, FiChevronDown } from "react-icons/fi";
import { useRouter } from "next/router";

export default function WelcomeReferral() {
  const [wasReferred, setWasReferred] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    code: "",
    referralSource: "friend",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();
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
        // Wait 1.5 seconds, then redirect
        setTimeout(() => {
          router.push("/home"); // ← Redirect to homepage
        }, 1500);
      } else {
        alert(data.message || "Failed to submit");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    }
  };
  const referralSources = [
    { value: "friend", label: "Friend" },
    { value: "social", label: "Social Media" },
    { value: "website", label: "Website" },
    { value: "other", label: "Other" },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white dark:bg-gray-900 shadow-xl rounded-2xl max-w-md w-full p-8 text-center relative overflow-hidden"
      >
        {/* Decorative elements */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-200 dark:bg-blue-900 rounded-full opacity-20"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-200 dark:bg-purple-900 rounded-full opacity-20"></div>

        <div className="relative z-10">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-purple-400 mb-4"
          >
            Welcome to Inkvision
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-gray-600 dark:text-gray-400 mb-6"
          >
            Were you referred by someone?
          </motion.p>

          <AnimatePresence mode="wait">
            {wasReferred === null && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="flex justify-center gap-4"
              >
                <button
                  onClick={() => setWasReferred(true)}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg"
                >
                  Yes, I was!
                </button>
                <button
                  onClick={() => setWasReferred(false)}
                  className="px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all shadow-md hover:shadow-lg"
                >
                  No, I wasn't
                </button>
              </motion.div>
            )}

            {wasReferred === false && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="mt-6 p-4 bg-green-50 dark:bg-green-900/30 rounded-lg border border-green-200 dark:border-green-800"
              >
                <p className="text-green-700 dark:text-green-400 font-medium">
                  No problem! You're still welcome to explore and join us ✨
                </p>
                <button
                  onClick={() => setWasReferred(null)}
                  className="mt-3 text-sm text-green-600 dark:text-green-300 hover:underline"
                >
                  Go back
                </button>
              </motion.div>
            )}

            {wasReferred && !submitted && (
              <motion.form
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                onSubmit={handleSubmit}
                className="mt-6 space-y-4 text-left"
              >
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Your Name
                  </label>
                  <div className="relative">
                    <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-2 border rounded-lg dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Your Email
                  </label>
                  <div className="relative">
                    <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-2 border rounded-lg dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Phone (optional)
                  </label>
                  <div className="relative">
                    <FiPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2 border rounded-lg dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Referral Code
                  </label>
                  <div className="relative">
                    <FiGift className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      name="code"
                      value={form.code}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-2 border rounded-lg dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Referral Source
                  </label>
                  <div className="relative">
                    <div
                      className="w-full pl-10 pr-4 py-2 border rounded-lg dark:bg-gray-800 dark:text-white flex items-center justify-between cursor-pointer"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                      <span>
                        {
                          referralSources.find(
                            (src) => src.value === form.referralSource
                          )?.label
                        }
                      </span>
                      <FiChevronDown
                        className={`transition-transform ${
                          isDropdownOpen ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                    {isDropdownOpen && (
                      <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border rounded-lg shadow-lg">
                        {referralSources.map((source) => (
                          <div
                            key={source.value}
                            className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                            onClick={() => {
                              handleChange({
                                target: {
                                  name: "referralSource",
                                  value: source.value,
                                },
                              });
                              setIsDropdownOpen(false);
                            }}
                          >
                            {source.label}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg font-medium"
                >
                  Submit Referral
                </button>
              </motion.form>
            )}

            {submitted && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="mt-6 p-6 bg-green-50 dark:bg-green-900/30 rounded-lg border border-green-200 dark:border-green-800 text-center"
              >
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-green-600 dark:text-green-400"
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
                <h3 className="text-xl font-bold text-green-700 dark:text-green-400 mb-2">
                  Thank You!
                </h3>
                <p className="text-green-600 dark:text-green-300">
                  Your referral has been successfully recorded.
                </p>
                <button
                  onClick={() => {
                    setWasReferred(null);
                    setSubmitted(false);
                    setForm({
                      name: "",
                      email: "",
                      phone: "",
                      code: "",
                      referralSource: "friend",
                    });
                  }}
                  className="mt-4 text-sm text-green-600 dark:text-green-300 hover:underline"
                >
                  Submit another referral
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
