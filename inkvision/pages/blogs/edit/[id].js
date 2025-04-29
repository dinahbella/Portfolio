"use client";
import Head from "next/head";
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { BsPostcard } from "react-icons/bs";
import Spinner from "@/components/Spinner";
import AddBlog from "@/components/AddBlog";
import SideSheet from "@/components/SideBar";

export default function EditBlogPage() {
  const router = useRouter();
  const { id } = router.query;
  const [blogInfo, setBlogInfo] = useState(null);

  useEffect(() => {
    if (!id) return;

    async function fetchBlog() {
      try {
        const { data } = await axios.get(`/api/blogs?id=${id}`);
        setBlogInfo(data);
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    }

    fetchBlog();
  }, [id]);

  if (!blogInfo) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Update Blog</title>
      </Head>
      <SideSheet />
      <div className="blogspage">
        <div className="titledashboard flex flex-sb">
          <div>
            <h2>
              Edit <span>{blogInfo.title}</span>
            </h2>
            <h3>ADMIN PANEL</h3>
          </div>
          <div className="breadcrumb">
            <BsPostcard /> <span>/</span> <span>Edit Blog</span>
          </div>
        </div>

        <div className="mt-3">
          <AddBlog {...blogInfo} />
        </div>
      </div>
    </>
  );
}
