import Head from "next/head";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaPhone,
  FaPaperPlane,
  FaCheckCircle,
  FaSpinner,
} from "react-icons/fa";
import {
  MdEmail,
  MdOutlineBusiness,
  MdOutlineDescription,
} from "react-icons/md";
import { GrLinkedin } from "react-icons/gr";
import { GiWorld } from "react-icons/gi";
import { FaFacebookSquare } from "react-icons/fa";

// import { GrLinkedin, GiWorld } from "react-icons/gr";
import {
  FaXTwitter,
  FaUser,
  FaUserTie,
  FaMoneyBillWave,
} from "react-icons/fa6";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    lname: "",
    email: "",
    company: "",
    phone: "",
    country: "",
    project: "",
    price: "",
    description: "",
  });

  const [status, setStatus] = useState({
    sending: false,
    success: false,
    error: false,
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  useEffect(() => {
    if (status.success || status.error) {
      const timer = setTimeout(() => {
        setStatus({
          sending: false,
          success: false,
          error: false,
          message: "",
        });
      }, 3000); // Reset after 3 seconds

      return () => clearTimeout(timer); // Cleanup
    }
  }, [status.success, status.error]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({
      sending: true,
      success: false,
      error: false,
      message: "Sending your message...",
    });

    try {
      await axios.post("/api/contact", formData);
      setStatus({
        sending: false,
        success: true,
        error: false,
        message: "Message sent successfully!",
      });
      // Reset form after successful submission
      setFormData({
        name: "",
        lname: "",
        email: "",
        company: "",
        phone: "",
        country: "",
        project: "",
        price: "",
        description: "",
      });
    } catch (error) {
      setStatus({
        sending: false,
        success: false,
        error: true,
        message: "Failed to send message. Please try again.",
      });
    }
  };

  const socialLinks = [
    {
      icon: <FaPhone className="text-blue-500" />,
      Label: "Phone",
      value: "+27746751812",
      href: "tel:+27746751812",
    },
    {
      icon: <MdEmail className="text-red-500" />,
      Label: "Email",
      value: "inkvisionagency@gmail.com",
      href: "mailto:inkvisionagency@gmail.com",
    },
    {
      icon: <GrLinkedin className="text-blue-600" />,
      Label: "LinkedIn",
      value: "inkvision",
      href: "https://www.linkedin.com/in/inkvision-agency-875114356?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    },
    {
      icon: <FaFacebookSquare className="text-black dark:text-white" />,
      Label: "Facebook",
      value: "@inkvision",
      href: "https://www.facebook.com/share/1BQW1gQyQW/",
    },
  ];

  return (
    <>
      <Header />
      <Head>
        <title>Contact Us | Inkvision</title>
        <meta
          name="description"
          content="Get in touch with our team for your next project"
        />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="py-16 px-4 sm:px-6 lg:px-8 text-center"
        >
          <div className="max-w-4xl mx-auto">
            <motion.h1
              className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Let&apos;s{" "}
              <span className="text-blue-600 dark:text-blue-400">Create</span>{" "}
              Something Amazing
            </motion.h1>
            <motion.p
              className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Have a project in mind or want to discuss how we can help? Reach
              out to our team.
            </motion.p>
          </div>
        </motion.section>

        {/* Contact Content */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="container mx-auto px-4 sm:px-6 lg:px-8 py-8"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div
              className="space-y-8"
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Get in Touch
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Thinking about a new project, a problem to solve, or just want
                  to connect? We love questions and feedback - and we&apos;re
                  always happy to help.
                </p>

                <div className="space-y-4">
                  {socialLinks.map((item, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ x: 5 }}
                      className="flex items-center gap-4"
                    >
                      <div className="text-2xl">{item.icon}</div>
                      <div>
                        <p className="font-medium text-gray-700 dark:text-gray-300">
                          {item.Label}
                        </p>
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 dark:text-blue-400 hover:underline"
                        >
                          {item.value}
                        </a>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Our Office
                </h3>
                <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.215256018603!2d-73.98784492452563!3d40.74844097138962!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1711234567890!5m2!1sen!2sus"
                    width="100%"
                    height="300"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    className="rounded-xl"
                  ></iframe>
                </div>
                <p className="mt-4 text-gray-600 dark:text-gray-300">
                  123 Business Ave, Suite 500
                  <br />
                  New York, NY 10001
                </p>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8"
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Send Us a Message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="">
                  <div>
                    <Label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Full Name
                    </Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaUser className="text-gray-400" />
                      </div>
                      <Input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="pl-10 w-full rounded-lg border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <Label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Email
                  </Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MdEmail className="text-gray-400" />
                    </div>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="pl-10 w-full rounded-lg border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <Label
                    htmlFor="company"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Company
                  </Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MdOutlineBusiness className="text-gray-400" />
                    </div>
                    <Input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="pl-10 w-full rounded-lg border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Your Company (Optional)"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Phone
                    </Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaPhone className="text-gray-400" />
                      </div>
                      <Input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="pl-10 w-full rounded-lg border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
                        placeholder="+1 (___) ___-____"
                      />
                    </div>
                  </div>
                  <div>
                    <Label
                      htmlFor="country"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Country
                    </Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <GiWorld className="text-gray-400" />
                      </div>
                      <Input
                        type="text"
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className="pl-10 w-full rounded-lg border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Your Country"
                      />
                    </div>
                  </div>
                </div>

                {/* Project Type */}
                <div className="space-y-2">
                  <Label htmlFor="project">Project Type</Label>
                  <Select
                    value={formData.project}
                    onValueChange={(value) =>
                      handleChange({ target: { name: "project", value } })
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a project type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Content Writing">
                        Content Writing
                      </SelectItem>
                      <SelectItem value="Copywriting">Copywriting</SelectItem>
                      <SelectItem value="Editing">Editing</SelectItem>
                      <SelectItem value="Ghostwriting">Ghostwriting</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Budget Range */}
                <div className="space-y-2 mt-4">
                  <Label htmlFor="price">Budget Range</Label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none">
                      <FaMoneyBillWave />
                    </div>
                    <Select
                      value={formData.price}
                      onValueChange={(value) =>
                        handleChange({ target: { name: "price", value } })
                      }
                    >
                      <SelectTrigger className="w-full pl-10">
                        <SelectValue placeholder="Select budget range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="$500 - $1,000">
                          $500 - $1,000
                        </SelectItem>
                        <SelectItem value="$1,000 - $5,000">
                          $1,000 - $5,000
                        </SelectItem>
                        <SelectItem value="$5,000 - $10,000">
                          $5,000 - $10,000
                        </SelectItem>
                        <SelectItem value="$10,000+">$10,000+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Project Details
                  </Label>
                  <div className="relative">
                    <div className="absolute top-3 left-3">
                      <MdOutlineDescription className="text-gray-400" />
                    </div>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows={5}
                      className="pl-10 w-full rounded-lg border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Tell us about your project..."
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={status.sending}
                    className="w-full flex justify-center items-center py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
                  >
                    {status.sending ? (
                      <>
                        <FaSpinner className="animate-spin mr-2" />
                        Sending...
                      </>
                    ) : status.success ? (
                      <>
                        <FaCheckCircle className="mr-2" />
                        Message Sent!
                      </>
                    ) : (
                      <>
                        <FaPaperPlane className="mr-2" />
                        Send Message
                      </>
                    )}
                  </motion.button>
                </div>

                {status.message && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`text-center py-2 px-4 rounded-lg ${
                      status.success
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                        : status.error
                        ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                        : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                    }`}
                  >
                    {status.message}
                  </motion.div>
                )}
              </form>
            </motion.div>
          </div>
        </motion.div>
        <Footer />
      </div>
    </>
  );
};

export default Contact;
