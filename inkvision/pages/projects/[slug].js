import Header from "@/components/Header";
import useFetchData from "@/hooks/useFetchData";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { Badge } from "@/components/ui/badge";
import {
  CalendarDays,
  FileText,
  User,
  Layers,
  ArrowUpRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function ProjectSlug() {
  const router = useRouter();
  const { slug } = router.query;

  const { alldata, loading, error } = useFetchData(
    `/api/projects?slug=${slug}`
  );
  const project = alldata?.[0];

  const formatDate = (dateString) => {
    if (!dateString) return "Not available";
    const date = new Date(dateString);
    if (isNaN(date)) return "Invalid date";

    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
        {loading ? (
          <div className="flex justify-center items-center h-screen">
            <div className="animate-pulse text-lg">
              Loading project details...
            </div>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <div className="text-red-500 text-lg">Error loading project</div>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => router.push("/projects")}
            >
              Back to Projects
            </Button>
          </div>
        ) : project ? (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Hero Section */}
            <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl mb-12">
              <Image
                src={project.images?.[0] || "/default-project.jpg"}
                alt={project.title || "Project Image"}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex items-end p-8 sm:p-12">
                <div className="max-w-3xl">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.projectcategory?.map((category, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="px-3 py-1 text-sm font-medium backdrop-blur-sm bg-white/30 dark:bg-gray-800/50"
                      >
                        {category}
                      </Badge>
                    ))}
                  </div>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                    {project.title}
                  </h1>
                  <p className="text-lg text-gray-200">
                    {project.excerpt || "An innovative project by Inkvision"}
                  </p>
                </div>
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Sidebar with Project Info */}
              <div className="lg:col-span-1 space-y-6">
                {/* Project Details Card */}
                <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                  <h2 className="text-xl font-semibold mb-6 flex items-center">
                    <Layers className="h-5 w-5 mr-2" />
                    Project Details
                  </h2>

                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1 flex items-center">
                        <User className="h-4 w-4 mr-2" />
                        Client
                      </h3>
                      <p className="text-lg font-medium">
                        {project.client || "Confidential"}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1 flex items-center">
                        <CalendarDays className="h-4 w-4 mr-2" />
                        Date
                      </h3>
                      <p className="text-lg font-medium">
                        {formatDate(project.createdAt)}
                      </p>
                    </div>

                    {project.tags?.length > 0 && (
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                          Technologies
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {project.tags.map((tag, index) => (
                            <Badge key={index} variant="outline">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Project File Card */}
                {project.file && (
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                    <h2 className="text-xl font-semibold mb-6 flex items-center">
                      <FileText className="h-5 w-5 mr-2" />
                      Project Documents
                    </h2>
                  </div>
                )}

                {/* Gallery Preview */}
                {project.images?.length > 1 && (
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                    <h2 className="text-xl font-semibold mb-6">Gallery</h2>
                    <div className="grid grid-cols-2 gap-3">
                      {project.images.slice(1, 5).map((image, index) => (
                        <div
                          key={index}
                          className="relative aspect-square rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                          onClick={() => window.open(image, "_blank")}
                        >
                          <Image
                            src={image}
                            alt={`Project preview ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                          {index === 3 && project.images.length > 5 && (
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white font-medium">
                              +{project.images.length - 5} more
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Main Content */}
              <div className="lg:col-span-2">
                {/* Project Description */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-200 dark:border-gray-700 mb-8">
                  <h2 className="text-2xl font-bold mb-6">Project Overview</h2>
                  <div className="prose dark:prose-invert max-w-none">
                    <Markdown remarkPlugins={[remarkGfm]}>
                      {project.description ||
                        "*No description available for this project.*"}
                    </Markdown>
                  </div>
                </div>

                {/* Project Features/Details */}
                {project.features && (
                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-200 dark:border-gray-700 mb-8">
                    <h2 className="text-2xl font-bold mb-6">Key Features</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                      {project.features.map((feature, index) => (
                        <div key={index} className="flex items-start space-x-4">
                          <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg flex-shrink-0">
                            <ArrowUpRight className="h-5 w-5 text-blue-600 dark:text-blue-300" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg mb-1">
                              {feature.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400">
                              {feature.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Call to Action */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-white">
                  <div className="max-w-2xl mx-auto text-center">
                    <h2 className="text-2xl font-bold mb-4">
                      Like what you see?
                    </h2>
                    <p className="text-blue-100 mb-6">
                      Interested in working together on your next project? Get
                      in touch with our team today.
                    </p>
                    <Button
                      variant="secondary"
                      size="lg"
                      className="bg-white text-blue-600 hover:bg-gray-100"
                      onClick={() => router.push("/contact")}
                    >
                      Contact Us
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-gray-500 text-lg">Project not found</div>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => router.push("/projects")}
            >
              Back to Projects
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
