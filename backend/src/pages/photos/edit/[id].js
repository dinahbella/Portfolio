import Head from "next/head";
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { SiBloglovin } from "react-icons/si";
import { BsPostcard } from "react-icons/bs";
import AddBlog from "../addblog";

export default function EditProduct() {
  const router = useRouter();
  const { id } = router.query;
  const [photoInfo, setphotoInfo] = useState(null);

  useEffect(() => {
    if (!id) return;

    async function fetchBlog() {
      try {
        const { data } = await axios.get(`/api/photos?id=${id}`);
        setphotoInfo(data);
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    }

    fetchBlog();
  }, [id]);

  if (!photoInfo) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>Update Blog</title>
      </Head>
      <div className="blogspage">
        <div className="titledashboard flex flex-sb">
          <div>
            <h2>
              Edit <span>{photoInfo.title}</span>
            </h2>
            <h3>ADMIN PANEL</h3>
          </div>
          <div className="breadcrumb">
            <BsPostcard /> <span>/</span> <span>Edit Blog</span>
          </div>
        </div>
        <div className="mt-3">{photoInfo && <AddPhoto {...photoInfo} />}</div>
      </div>
    </>
  );
}
