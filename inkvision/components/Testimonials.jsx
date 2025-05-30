import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Mosope",
    feedback:
      "The firm is exceptional! Their writing is captivating, tailored, and always well-researched. I landed my first exclusive contract thanks to their support and guidance. Their dedication, creativity, and professionalism are unmatched. I'm truly grateful and excited for what's ahead",
    avatar: "/test.jpg",
    rating: 5,
  },
  {
    name: "Esther Ekanem",
    feedback:
      "I can’t express enough how InkVison has been so impactful and diligent towards the delivery of their services!I wholeheartedly recommend InkVison if you may need ghostwriting service.Thank you, InkVision  ",
    avatar: "/ester.jpg",
    rating: 4,
  },
  {
    name: "Favour Isaac",
    feedback:
      "This exceptional firm delivers tailored, well-researched content with creativity and attention to detail. They've helped me secure contracts on various platforms while teaching me valuable writing skills. I'm grateful for our partnership and highly recommend their services.",
    avatar: "https://i.pravatar.cc/100?img=3",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <div id="testimonials" className="py-16 px-4transition-colors duration-500">
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
                &quot;{t.feedback}&quot;
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
