import Spinner from "@/components/Spinner";
import useFetchData from "@/hooks/useFetchData";
import { Calendar1Icon } from "lucide-react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { CiRead } from "react-icons/ci";

export default function BlogPage() {
  const router = useRouter();
  const { slug } = router.query;

  const { alldata } = useFetchData("/api/blogs");
  const [blogData, setBlogData] = useState({ blog: {}, comments: [] });
  const [newComment, setNewComment] = useState({
    name: "",
    email: "",
    title: "",
    contentpera: "",
    maincomment: true,
    parent: null,
    parentName: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [messageOk, setMessageOk] = useState("");

  useEffect(() => {
    const fetchBlogData = async () => {
      if (slug) {
        try {
          const response = await axios.get(`/api/blogs/${slug}`);
          setBlogData(response.data);
          setLoading(false);
        } catch (error) {
          setError("Failed to fetch blog data, Please try again later.");
          setLoading(false);
        }
      }
    };
    fetchBlogData();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex justify-center w-full">
        <Spinner />
      </div>
    );
  }
  if (error) {
    return <p>Error: {error}</p>;
  }

  const createdAtDate =
    blogData && blogData.blog.createdAt
      ? new Date(blogData && blogData.blog.createdAt)
      : null;
  const formatDate = (date) => {
    if (!date || isNaN(new Date(date).getTime())) {
      return "Invalid date";
    }
    const options = {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour12: true,
    };
    return new Intl.DateTimeFormat("en-US", options).format(new Date(date));
  };
  return (
    <div>
      <div className="container">
        <div>
          <img src="" alt="" />
        </div>
        <div className="flex gap-2">
          <div className="admin">
            <img src={blogData.blog.images[0] || "/pp.jpg"} alt="" />
            <span>By Inkvision</span>
          </div>
          <div className="adminslug">
            <Calendar1Icon />
            <span>pending</span>
          </div>
          <div className="adminslug">
            <CiRead />
            <span>COmments (pending)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
