"use client";
import Head from "next/head";
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { BsPostcard } from "react-icons/bs";
import Spinner from "@/components/Spinner";
import SideSheet from "@/components/SideBar";
import AddProject from "../addproject";
export default function EditProjectPage() {
  const router = useRouter();
  const { id } = router.query;
  const [projectInfo, setprojectInfo] = useState(null);

  useEffect(() => {
    if (!id) return;

    async function fetchProject() {
      try {
        const { data } = await axios.get(`/api/projects?id=${id}`);
        setprojectInfo(data);
      } catch (error) {
        console.error("Error fetching Project:", error);
      }
    }

    fetchProject();
  }, [id]);

  if (!projectInfo) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Update Project</title>
      </Head>
      <SideSheet />
      <div className="Projectspage">
        <div className="mt-3">
          <h2 className="text-2xl text-blue-600 font-semibold flex items-center gap-2">
            Edit: <span>{projectInfo.title}</span>
          </h2>
          <AddProject {...projectInfo} />
        </div>
      </div>
    </>
  );
}
