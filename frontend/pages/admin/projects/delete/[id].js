import { useRouter } from "next/router";
import axios from "axios";
import { useEffect, useState } from "react";
import Head from "next/head";
import { BsPostcard } from "react-icons/bs";
import Spinner from "@/components/Spinner";
import { toast } from "react-toastify";
export default function DeleteProject() {
  const router = useRouter();
  const { id } = router.query;
  const [projectInfo, setProjectInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchProject = async () => {
      try {
        const { data } = await axios.get(`/api/projects?id=${id}`);
        setProjectInfo(data);
      } catch (error) {
        console.error("Error fetching project:", error);
        setError("Failed to fetch project details.");
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  const goBack = () => {
    router.push("/admin/projects/allprojects");
  };

  const deleteProject = async () => {
    try {
      await axios.delete(`/api/projects?id=${id}`);
      toast.success("Project deleted successfully");
      goBack();
    } catch (error) {
      console.error("Error deleting project:", error);
      toast.error("Failed to delete project.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded max-w-md mx-auto">
          {error}
        </div>
      </div>
    );
  }

  if (!projectInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded max-w-md mx-auto">
          No project found.
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Delete Project</title>
      </Head>
      <div className="min-h-screen ">
        {/* Header */}
        <header className=" shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-2xl font-bold ">
                  Delete{" "}
                  <span className="text-red-600">{projectInfo.title}</span>
                </h1>
              </div>
              <div className="flex items-center text-sm ">
                <BsPostcard className="mr-2" />
                <span>/</span>
                <span className="ml-2">Delete Project</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="rounded-xl shadow-2l border  overflow-hidden p-6 sm:p-8 max-w-2xl mx-auto">
            <div className="text-center">
              <svg
                className="mx-auto h-24 w-24 text-red-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
              <h2 className="mt-6 text-2xl font-bold ">Are you sure?</h2>
              <p className="mt-4 ">
                You're about to permanently delete "
                <span className="font-semibold">{projectInfo.title}</span>".
                This action cannot be undone.
              </p>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={goBack}
                className="px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={deleteProject}
                className="px-6 py-3 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
              >
                Delete Project
              </button>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
