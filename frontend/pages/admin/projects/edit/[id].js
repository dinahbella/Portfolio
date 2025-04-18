"use client";
import * as React from "react";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ReactSortable } from "react-sortablejs";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import Spinner from "@/components/Spinner";
import { FaTrashAlt, FaPlus } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function EditProject({
  _id,
  title: existingTitle,
  slug: existingSlug,
  images: existingImages,
  file: existingFile,
  description: existingDescription,
  client: existingClient,
  projectcategory: existingProjectcategory,
  tags: existingTags,
  status: existingStatus,
}) {
  const [uploadedFiles, setUploadedFiles] = React.useState([]); // For file input
  const [isUploading, setIsUploading] = React.useState(false);
  const fileInputRef = React.useRef(null); // Ref for the file input
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState(existingTitle || "");
  const [file, setFile] = useState(existingFile || null);
  const [slug, setSlug] = useState(existingSlug || "");
  const [images, setImages] = useState(existingImages || []);
  const [description, setDescription] = useState(existingDescription || "");
  const [client, setClient] = useState(existingClient || "");
  const [projectcategory, setProjectcategory] = useState(
    existingProjectcategory || ""
  );
  const [tags, setTags] = useState(existingTags || "");
  const [status, setStatus] = useState(existingStatus || "");
  const router = useRouter();
  const [redirect, setRedirect] = React.useState(false); // Tracks if redirect is needed

  useEffect(() => {
    if (id) {
      const fetchProject = async () => {
        try {
          const { data } = await axios.get(`/api/projects?id=${id}`);
          setTitle(data.title);
          setSlug(data.slug);
          setDescription(data.description);
          setImages(data.images || []);
          setFile(data.file || "");
          setClient(data.client || "");
          setProjectcategory(data.projectcategory || "");
          setTags(data.tags || "");
          setStatus(data.status || "");
        } catch (error) {
          console.error("Error fetching project:", error);
          toast.error("Failed to load project data");
        }
      };
      fetchProject();
    }
  }, [id]);

  const handleImageUpload = async (ev) => {
    const files = ev.target?.files;
    if (files?.length > 0) {
      setIsUploading(true);
      const uploadImageQueue = [];

      for (const file of files) {
        const formData = new FormData();
        formData.append("file", file);
        uploadImageQueue.push(
          axios.post("/api/upload", formData).then((res) => {
            setImages((oldImages) => [...oldImages, ...res.data.links]);
          })
        );
      }

      await Promise.all(uploadImageQueue);
      setIsUploading(false);
      toast.success("Images uploaded successfully");
    }
  };

  const handleFileUpload = async (ev) => {
    const files = ev.target?.files;
    if (files?.length > 0) {
      setIsUploading(true);
      const formData = new FormData();
      formData.append("file", files[0]);

      try {
        const { data } = await axios.post("/api/upload2", formData);
        setFile(data.links[0].url);
        toast.success("File uploaded successfully");
      } catch (error) {
        console.error("Error uploading file:", error);
        toast.error("Failed to upload file");
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleDeleteImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    setUploadedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));

    if (fileInputRef.current) {
      const dataTransfer = new DataTransfer();
      uploadedFiles.forEach((file, i) => {
        if (i !== index) dataTransfer.items.add(file);
      });
      fileInputRef.current.files = dataTransfer.files;
    }
  };

  const updateImageOrder = (newList) => setImages(newList);
  const fileUrl = typeof file === "string" ? file : file?.url;
  const fileName = fileUrl?.split("/").pop();

  return (
    <>
      <SideSheet />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800"
      >
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <motion.div
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4"
          >
            <div>
              <motion.h2
                className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                {id ? "Edit Project" : "Add New Project"}
              </motion.h2>
              <div className="flex items-center gap-2 text-blue-600 dark:text-blue-300 mt-1">
                <span className="text-sm">Projects</span>
                <span>/</span>
                <span className="text-sm font-medium">
                  {id ? "Edit" : "Create"}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Main Form Card */}
          <motion.div
            initial={{ scale: 0.98 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            <Card className="w-full max-w-4xl mx-auto rounded-xl shadow-lg border-0 overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
                <CardTitle className="text-2xl sm:text-3xl font-bold">
                  {id ? "Edit Project Details" : "Create New Project"}
                </CardTitle>
                <CardDescription className="text-blue-100">
                  {id
                    ? "Update your project information"
                    : "Fill in the details below to add a new project"}
                </CardDescription>
              </CardHeader>

              <CardContent className="p-6">
                <form onSubmit={createProject} className="space-y-6">
                  {/* Title & Slug Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label
                        htmlFor="title"
                        className="font-medium text-gray-700 dark:text-gray-300"
                      >
                        Project Title *
                      </Label>
                      <Input
                        id="title"
                        placeholder="Project name"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="slug"
                        className="font-medium text-gray-700 dark:text-gray-300"
                      >
                        URL Slug *
                      </Label>
                      <Input
                        id="slug"
                        placeholder="project-slug"
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                        className="focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="description"
                      className="font-medium text-gray-700 dark:text-gray-300"
                    >
                      Description *
                    </Label>
                    <Textarea
                      id="description"
                      placeholder="Describe your project..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="min-h-[120px] focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  {/* Image Upload */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label className="font-medium text-gray-700 dark:text-gray-300">
                          Project Images
                        </Label>
                        <div className="flex items-center gap-4">
                          <label className="cursor-pointer">
                            <div className="flex items-center justify-center px-4 py-2 border-2 border-dashed border-blue-400 rounded-lg bg-blue-50 dark:bg-gray-800 hover:bg-blue-100 dark:hover:bg-gray-700 transition-colors">
                              <FaPlus className="mr-2 text-blue-600" />
                              <span className="text-blue-600 font-medium">
                                Upload Images
                              </span>
                              <input
                                type="file"
                                className="hidden"
                                accept="image/*"
                                multiple
                                onChange={handleImageUpload}
                                ref={fileInputRef}
                              />
                            </div>
                          </label>
                          {isUploading && (
                            <div className="flex items-center">
                              <Spinner size="sm" />
                              <span className="ml-2 text-sm text-gray-500">
                                Uploading...
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Image Gallery */}
                      <AnimatePresence>
                        {images.length > 0 && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-4"
                          >
                            <Label className="font-medium text-gray-700 dark:text-gray-300">
                              Image Preview (Drag to reorder)
                            </Label>
                            <ReactSortable
                              list={images}
                              setList={updateImageOrder}
                              animation={200}
                              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mt-2"
                            >
                              {images.map((link, index) => (
                                <motion.div
                                  key={index}
                                  initial={{ opacity: 0, scale: 0.9 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  exit={{ opacity: 0, scale: 0.9 }}
                                  className="relative aspect-square rounded-lg overflow-hidden shadow-md border border-gray-200 dark:border-gray-700"
                                >
                                  <img
                                    src={link}
                                    alt={`Preview ${index + 1}`}
                                    className="w-full h-full object-cover"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => handleDeleteImage(index)}
                                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 transition-colors"
                                  >
                                    <FaTrashAlt className="w-3 h-3" />
                                  </button>
                                </motion.div>
                              ))}
                            </ReactSortable>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label className="font-medium text-gray-700 dark:text-gray-300">
                          Project File
                        </Label>
                        <div className="flex items-center gap-4">
                          <label className="cursor-pointer">
                            <div className="flex items-center justify-center px-4 py-2 border-2 border-dashed border-blue-400 rounded-lg bg-blue-50 dark:bg-gray-800 hover:bg-blue-100 dark:hover:bg-gray-700 transition-colors">
                              <FaPlus className="mr-2 text-blue-600" />
                              <span className="text-blue-600 font-medium">
                                Upload File
                              </span>
                              <input
                                type="file"
                                className="hidden"
                                onChange={handleFileUpload}
                              />
                            </div>
                          </label>
                          {isUploading && (
                            <div className="flex items-center">
                              <Spinner size="sm" />
                              <span className="ml-2 text-sm text-gray-500">
                                Uploading...
                              </span>
                            </div>
                          )}
                        </div>
                        {file && (
                          <div className="mt-2 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                            <p className="text-sm text-gray-700 dark:text-gray-300">
                              Current file:{" "}
                              <a
                                href={
                                  typeof file === "string" ? file : file?.url
                                }
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"
                                download
                              >
                                {(typeof file === "string" ? file : file?.url)
                                  ?.split("/")
                                  .pop()}
                              </a>
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Client & Category Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label
                        htmlFor="client"
                        className="font-medium text-gray-700 dark:text-gray-300"
                      >
                        Client Name
                      </Label>
                      <Input
                        id="client"
                        placeholder="Client or organization"
                        value={client}
                        onChange={(e) => setClient(e.target.value)}
                        className="focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="category"
                        className="font-medium text-gray-700 dark:text-gray-300"
                      >
                        Project Category
                      </Label>
                      <Select
                        value={projectcategory}
                        onValueChange={setProjectcategory}
                      >
                        <SelectTrigger className="focus:ring-2 focus:ring-blue-500">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Writing Tips">
                            Writing Tips
                          </SelectItem>
                          <SelectItem value="Book Reviews">
                            Book Reviews
                          </SelectItem>
                          <SelectItem value="Publishing">Publishing</SelectItem>
                          <SelectItem value="Writing Prompts">
                            Writing Prompts
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Tags & Status Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label
                        htmlFor="tags"
                        className="font-medium text-gray-700 dark:text-gray-300"
                      >
                        Tags
                      </Label>
                      <Select value={tags} onValueChange={setTags}>
                        <SelectTrigger className="focus:ring-2 focus:ring-blue-500">
                          <SelectValue placeholder="Select tags" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ScriptWriting">
                            ScriptWriting
                          </SelectItem>
                          <SelectItem value="GhostWriting">
                            GhostWriting
                          </SelectItem>
                          <SelectItem value="StoryWriting">
                            StoryWriting
                          </SelectItem>
                          <SelectItem value="Writing">Writing</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="status"
                        className="font-medium text-gray-700 dark:text-gray-300"
                      >
                        Status *
                      </Label>
                      <Select value={status} onValueChange={setStatus} required>
                        <SelectTrigger className="focus:ring-2 focus:ring-blue-500">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="draft">Draft</SelectItem>
                          <SelectItem value="publish">Publish</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all"
                      disabled={loading}
                    >
                      {loading ? (
                        <div className="flex items-center">
                          <Spinner size="sm" className="mr-2" />
                          {id ? "Updating..." : "Creating..."}
                        </div>
                      ) : (
                        <>{id ? "Update Project" : "Create Project"}</>
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}
