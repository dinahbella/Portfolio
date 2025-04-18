import { Geist, Geist_Mono } from "next/font/google";
import { FaHome, FaChartLine, FaCalendarAlt } from "react-icons/fa";
import { FiTrendingUp, FiDatabase, FiUsers } from "react-icons/fi";
import { Chart } from "@/components/Chart";
import { TableDe } from "@/components/Table";
import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Sparkline } from "@/components/Spark";
import { FiTrendingDown } from "react-icons/fi";
import SideSheet from "@/components/SideBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const statCards = [
  {
    title: "Total Blogs",
    icon: <FiDatabase className="text-purple-500" size={24} />,
    color: "bg-purple-100",
    textColor: "text-purple-800",
    trendColor: "text-purple-500",
  },
  {
    title: "Active Projects",
    icon: <FiTrendingUp className="text-blue-500" size={24} />,
    color: "bg-blue-100",
    textColor: "text-blue-800",
    trendColor: "text-blue-500",
  },
  {
    title: "Media Gallery",
    icon: <FaCalendarAlt className="text-pink-500" size={20} />,
    color: "bg-pink-100",
    textColor: "text-pink-800",
    trendColor: "text-pink-500",
  },
  {
    title: "User Contacts",
    icon: <FiUsers className="text-green-500" size={24} />,
    color: "bg-green-100",
    textColor: "text-green-800",
    trendColor: "text-green-500",
  },
];

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    blogs: { total: 0, monthlyData: [], recent: [] },
    projects: { total: 0, monthlyData: [], recent: [] },
    photos: { total: 0 },
    contacts: { total: 0 },
    loading: true,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [blogsRes, projectsRes, photosRes, contactsRes] =
          await Promise.all([
            axios.get("/api/blogs"),
            axios.get("/api/projects"),
            axios.get("/api/photo"),
            axios.get("/api/contact"),
          ]);

        const processData = (items) => {
          const monthlyCounts = Array(12).fill(0);
          items.forEach((item) => {
            const month = new Date(item.createdAt).getMonth();
            monthlyCounts[month]++;
          });

          return [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ].map((month, i) => ({ month, count: monthlyCounts[i] }));
        };

        setStats({
          blogs: {
            total: blogsRes.data.length,
            monthlyData: processData(blogsRes.data),
            recent: blogsRes.data.slice(0, 5),
          },
          projects: {
            total: projectsRes.data.length,
            monthlyData: processData(projectsRes.data),
            recent: projectsRes.data.slice(0, 5),
          },
          photos: { total: photosRes.data.length },
          contacts: { total: contactsRes.data.length },
          loading: false,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
        setStats((prev) => ({ ...prev, loading: false }));
      }
    };

    fetchData();
  }, []);

  return (
    <div className="max-h-screen  p-4 md:p-8">
      <SideSheet />
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold ">
              Welcome back, <span className="text-blue-600">Admin</span> 👋
            </h1>
            <p className="text-gray-500 mt-1">
              Here's what's happening with your content today
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center  px-4 py-2 rounded-full shadow-sm border border-gray-200">
              <FaHome className="text-blue-500 mr-2" />
              <span className="text-sm font-medium">Dashboard</span>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
      >
        {statCards.map((card, index) => {
          // Calculate real percentage change
          const currentValue =
            index === 0
              ? stats.blogs.total
              : index === 1
              ? stats.projects.total
              : index === 2
              ? stats.photos.total
              : stats.contacts.total;

          // For demo purposes - in real app you'd compare with previous month's data
          const prevMonthValue = Math.max(
            1,
            currentValue - Math.floor(Math.random() * 10)
          );
          const percentageChange = Math.round(
            ((currentValue - prevMonthValue) / prevMonthValue) * 100
          );

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`${card.color} p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-bold text-gray-700 uppercase tracking-wider">
                    {card.title}
                  </p>
                  <h3
                    className={`${card.textColor} text-3xl font-extrabold mt-2`}
                  >
                    {stats.loading ? (
                      <div className="h-9 w-20 bg-gray-200 rounded animate-pulse"></div>
                    ) : (
                      currentValue.toLocaleString()
                    )}
                  </h3>
                  <p
                    className={`text-sm font-semibold ${
                      percentageChange >= 0 ? "text-green-600" : "text-red-600"
                    } flex items-center mt-2`}
                  >
                    {percentageChange >= 0 ? (
                      <FiTrendingUp className="mr-1" />
                    ) : (
                      <FiTrendingDown className="mr-1" />
                    )}
                    {Math.abs(percentageChange)}%{" "}
                    {percentageChange >= 0 ? "increase" : "decrease"} from last
                    month
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-white bg-opacity-70 shadow-sm">
                  {card.icon}
                </div>
              </div>
              <div className="mt-4 h-12">
                <Sparkline
                  data={[5, 10, 5, 8, 12, 15, 10, 18, 15, 20, 15, currentValue]}
                  color={card.trendColor.replace("text-", "bg-")}
                />
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className=" p-6 rounded-2xl shadow-sm border "
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold ">Blog Analytics</h2>
              <p className="text-sm ">Monthly content performance</p>
            </div>
            <div className="flex items-center text-sm ">
              <FaChartLine className="mr-1" /> Last 12 months
            </div>
          </div>
          <Chart
            data={stats.blogs.monthlyData}
            total={stats.blogs.total}
            title="Blogs"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className=" p-6 rounded-2xl shadow-sm border "
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold ">Project Analytics</h2>
              <p className="text-sm ">Monthly project growth</p>
            </div>
            <div className="flex items-center text-sm ">
              <FaChartLine className="mr-1" /> Last 12 months
            </div>
          </div>
          <Chart
            data={stats.projects.monthlyData}
            total={stats.projects.total}
            title="Projects"
          />
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        <div className=" p-6 rounded-2xl shadow-sm border ">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold ">Recent Blog Posts</h2>
            <button className="text-sm text-blue-600 hover:text-blue-800 transition-colors">
              View All →
            </button>
          </div>
          <TableDe items={stats.blogs.recent} type="Blog" />
        </div>

        <div className=" p-6 rounded-2xl shadow-sm border ">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold ">Active Projects</h2>
            <button className="text-sm text-blue-600 hover:text-blue-800 transition-colors">
              View All →
            </button>
          </div>
          <TableDe items={stats.projects.recent} type="Project" />
        </div>
      </motion.div>
    </div>
  );
}
