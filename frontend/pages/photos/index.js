import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const photos = [
  { id: 1, src: "/img1.jpg", alt: "Creative photography" },
  { id: 2, src: "/img2.jpg", alt: "Portrait photography" },
  { id: 3, src: "/img3.jpg", alt: "Landscape photography" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function PhotoGallery() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <Head>
        <title>Inkvision: Photos</title>
        <meta
          name="description"
          content="Explore our stunning photography gallery"
        />
      </Head>

      <main className="container mx-auto px-4 py-12 md:py-16 lg:py-20">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:w-1/3"
          >
            <h1 className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-2">
              GALLERY PHOTOS
            </h1>
            <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl bg-gradient-to-br from-blue-500 via-teal-600 to-indigo-800 text-transparent bg-clip-text mb-6">
              Inkvision Photos
            </h1>
            <p className="text-gray-700 dark:text-gray-300 mb-8 text-lg">
              Explore our collection of stunning photographs captured with
              passion and precision.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <Link href={`/photos#photosimages`}>
                <Button className="px-8 py-4 text-lg" variant="outline">
                  VIEW FULL GALLERY
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right gallery */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8"
          >
            {photos.map((photo, index) => (
              <motion.div
                key={photo.id}
                variants={itemVariants}
                className="relative group overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                whileHover={{ scale: 1.02 }}
              >
                <div className="aspect-square overflow-hidden">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    className="object-cover group-hover:grayscale group-hover:contrast-125 transition-all duration-500 ease-in-out"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-white font-medium text-lg"
                  >
                    {photo.alt}
                  </motion.p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </main>
    </div>
  );
}
