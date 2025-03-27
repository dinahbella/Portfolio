import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import useFetchData from "@/hooks/useFetchData";
import Spinner from "@/components/Spinner";

const featuredPhotos = [
  { id: 1, src: "/img1.jpg", alt: "Creative photography", category: "Fiction" },
  {
    id: 2,
    src: "/img2.jpg",
    alt: "Portrait photography",
    category: "Biography",
  },
  {
    id: 3,
    src: "/img3.jpg",
    alt: "Landscape photography",
    category: "Fantasy",
  },
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
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const fadeIn = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: "easeInOut",
    },
  },
};

export default function PhotoGallery() {
  const { alldata = [], loading, error } = useFetchData("/api/photo");

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <Head>
        <title>Inkvision: Book Cover Designs</title>
        <meta
          name="description"
          content="Explore our stunning book cover design portfolio"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="container mx-auto px-4 py-12 md:py-16 lg:py-20">
        {/* Hero Section */}
        <motion.section
          initial="hidden"
          animate="show"
          variants={containerVariants}
          className="flex flex-col lg:flex-row gap-8 mb-20"
        >
          <motion.div
            variants={itemVariants}
            className="lg:w-1/2 flex flex-col justify-center"
          >
            <motion.h1
              className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-2"
              variants={fadeIn}
            >
              GALLERY PHOTOS
            </motion.h1>
            <motion.h1
              className="font-bold text-3xl md:text-4xl lg:text-5xl bg-gradient-to-br from-blue-500 via-teal-600 to-indigo-800 text-transparent bg-clip-text mb-6"
              variants={fadeIn}
            >
              Inkvision Book Covers
            </motion.h1>
            <motion.p
              className="text-gray-700 dark:text-gray-300 mb-8 text-lg"
              variants={fadeIn}
            >
              Explore our collection of stunning book covers designed with
              passion and precision for authors worldwide.
            </motion.p>
            <motion.div
              variants={fadeIn}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <Link href="/photos#photosimages" passHref legacyBehavior>
                <Button
                  className="px-8 py-4 text-lg hover:bg-gradient-to-br from-blue-500 via-teal-600 to-indigo-800 hover:text-white transition-all duration-300"
                  variant="outline"
                >
                  VIEW FULL GALLERY
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            className="lg:w-1/2 grid grid-cols-2 gap-6 md:gap-8"
          >
            {featuredPhotos.map((photo, index) => (
              <motion.div
                key={photo.id}
                variants={itemVariants}
                className={`relative group overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ${
                  index === 0 ? "row-span-2" : ""
                }`}
                whileHover={{ scale: 1.03 }}
              >
                <div className="aspect-[3/4] overflow-hidden">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    priority={index < 2} // Prioritize loading first two images
                    className="object-cover group-hover:grayscale group-hover:brightness-75 transition-all duration-500 ease-in-out"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-white font-medium text-lg mb-1"
                  >
                    {photo.alt}
                  </motion.p>
                  <motion.span
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-blue-300 text-sm"
                  >
                    {photo.category}
                  </motion.span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* Portfolio Section */}
        <motion.section
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="py-12"
        >
          <motion.div variants={fadeIn} className="text-center mb-12">
            <h3
              className="text-sm uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-2"
              id="photosimages"
            >
              <span className="text-blue-500 dark:text-blue-400">01/</span>OUR
              PORTFOLIO
            </h3>
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Inkvision Designs Beautiful{" "}
              <span className="text-blue-500 dark:text-blue-400">
                Book Covers
              </span>
            </motion.h2>
            <motion.p
              className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Each cover tells a story before you even open the book. Explore
              our latest designs.
            </motion.p>
          </motion.div>

          {loading ? (
            <div className="flex justify-center py-12">
              <Spinner />
            </div>
          ) : error ? (
            <div className="text-center py-12 text-red-500">
              Failed to load photos. Please try again later.
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {alldata.map((photo) => (
                <motion.div
                  key={photo._id}
                  variants={itemVariants}
                  className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  whileHover={{ y: -5 }}
                >
                  <div className="aspect-[2/3] overflow-hidden">
                    <Image
                      src={photo.images[0] || "/placeholder.jpg"}
                      alt={photo.title || "Book cover"}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <motion.h3
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      className="text-white text-xl font-bold mb-1"
                    >
                      {photo.title || "Untitled"}
                    </motion.h3>
                    <motion.p
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.1 }}
                      className="text-blue-300 text-sm"
                    >
                      by Inkvision
                    </motion.p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.section>

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="py-12 text-center"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Ready to Transform Your Book Cover?
          </h3>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            <Link href="/contacts" passHref legacyBehavior>
              <Button className="px-8 py-4 text-lg bg-gradient-to-br from-blue-500 via-teal-600 to-indigo-800 text-white hover:shadow-lg transition-all">
                GET STARTED TODAY
              </Button>
            </Link>
          </motion.div>
        </motion.section>
      </main>
    </div>
  );
}
