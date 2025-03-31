import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "John Doe",
    feedback:
      "This platform has completely changed how I learn. The instructors are amazing and the content is top-notch!",
    avatar: "https://i.pravatar.cc/100?img=1",
    rating: 5,
  },
  {
    name: "Jane Smith",
    feedback:
      "A fantastic experience! I’ve gained so many new skills and the support team is always there to help.",
    avatar: "https://i.pravatar.cc/100?img=2",
    rating: 4,
  },
  {
    name: "Alex Johnson",
    feedback:
      "The courses are well structured and very easy to follow. Highly recommend to anyone looking to level up.",
    avatar: "https://i.pravatar.cc/100?img=3",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <div
      id="testimonials"
      className="py-16 px-4 bg-gray-50 dark:bg-gray-900 transition-colors duration-500"
    >
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-12 text-gray-900 dark:text-white">
          What Our Users Say
        </h2>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md hover:shadow-lg transition"
            >
              <img
                src={t.avatar}
                alt={t.name}
                className="w-16 h-16 rounded-full mx-auto mb-4"
              />
              <div className="flex justify-center mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < t.rating
                        ? "text-yellow-400"
                        : "text-gray-300 dark:text-gray-600"
                    }`}
                    fill={i < t.rating ? "currentColor" : "none"}
                  />
                ))}
              </div>
              <p className="text-gray-700 dark:text-gray-300 italic mb-4">
                "{t.feedback}"
              </p>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                {t.name}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
