import React from "react";
import Link from "next/link";

export default function Writer() {
  return (
    <section className="flex items-center justify-center ">
      <div className=" bg-white/70 dark:bg-black/30 backdrop-blur-md p-10 rounded-3xl shadow-lg">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 dark:text-white leading-tight">
          Passionate About Writing?
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Join our growing community of creative writers and contribute to our
          platform. Share your voice, grow your audience, and get the exposure
          you deserve.
        </p>
        <Link href="https://surveyheart.com/form/6808a8249626186679d72dbc">
          <div className="inline-block text-center px-6 py-3 text-lg font-semibold text-white bg-blue-600 rounded-full shadow-md hover:bg-blue-700 transition-colors duration-300">
            Apply to be a Writer
          </div>
        </Link>
      </div>
    </section>
  );
}
