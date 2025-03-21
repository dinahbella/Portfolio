"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import Spinner from "@/components/Spinner";
import { FaTrashAlt } from "react-icons/fa";
import { ReactSortable } from "react-sortablejs";
import { FaPlusSquare } from "react-icons/fa";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import { useState } from "react";

export default function AddProject({ id }) {
  const [images, setImages] = React.useState([]); // For image previews
  const [uploadedFiles, setUploadedFiles] = React.useState([]); // For file input
  const [isUploading, setIsUploading] = React.useState(false);
  const fileInputRef = React.useRef(null); // Ref for the file input
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [client, setClient] = useState("");
  const [projectcategory, setProjectcategory] = useState("");
  const [tags, setTags] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const [redirect, setRedirect] = React.useState(false); // Tracks if redirect is needed

  async function createProject(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const data = {
        title,
        description,
        images,
        client,
        projectcategory,
        tags,
        status,
      };

      // Check if it's an update or a new project
      if (id) {
        await axios.put("/api/project", { ...data, id });
        toast.success("Project updated successfully");
      } else {
        await axios.post("/api/project", data);
        toast.success("Project created successfully");
      }

      setRedirect(true);
    } catch (error) {
      console.error("Error saving project:", error);
      toast.error("Failed to save project");
    } finally {
      setLoading(false);
    }
  }

  if (redirect) {
    router.push("/projects/allprojects");
    return null;
  }

  // Handle image upload
  const handleImageUpload = async (ev) => {
    const files = ev.target?.files;
    if (files && files.length > 0) {
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
    } else {
      toast.error("No files selected");
    }
  };

  // Handle image deletion
  const handleDeleteImage = (index) => {
    // Remove the image from the preview
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    // Remove the file from the uploadedFiles state
    setUploadedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    // Update the file input's value
    if (fileInputRef.current) {
      const dataTransfer = new DataTransfer();
      uploadedFiles.forEach((file, i) => {
        if (i !== index) {
          dataTransfer.items.add(file);
        }
      });
      fileInputRef.current.files = dataTransfer.files;
    }
  };

  // Update image order for drag-and-drop
  const updateImageOrder = (newList) => {
    setImages(newList);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 gap-3 sm:gap-0">
        {/* Title */}
        <h2 className="text-xl sm:text-2xl text-blue-600 font-semibold">
          Add Projects
        </h2>

        {/* Breadcrumb */}
        <div className="text-blue-600 flex items-center gap-2">
          <FaPlusSquare className="text-lg sm:text-xl text-blue-600" />
          <span>/</span>
          <span>Add Projects</span>
        </div>
      </div>
      <div className="flex justify-center p-4 sm:p-6 md:p-8">
        <Card className="w-full max-w-4xl rounded-2xl shadow-xl p-4 sm:p-6 bg-blue-600/15">
          <CardHeader>
            <CardTitle className="text-center text-2xl sm:text-3xl">
              Add Project
            </CardTitle>
            <CardDescription className="text-center">
              Create New Project
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={createProject}>
              <div className="grid w-full items-center gap-4">
                {/* Title */}
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="title" className="font-bold text-md">
                    Title
                  </Label>
                  <Input
                    id="title"
                    type="text"
                    placeholder="Name of your project"
                    className="shadow-lg"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                {/* Description */}
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="description" className="font-bold text-md">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    type="text"
                    placeholder="Describe your project"
                    className="shadow-lg"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </div>

                {/* Image Upload */}
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="image" className="font-bold text-md">
                    Image
                  </Label>
                  <Input
                    id="image"
                    placeholder="Upload images"
                    className="shadow-lg"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    ref={fileInputRef} // Add ref to the file input
                  />
                  <div className="w-100 mt-1 flex flex-left">
                    {isUploading && <Spinner />}
                  </div>
                </div>

                {/* Image Previews */}
                {images.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    <ReactSortable
                      list={images}
                      setList={updateImageOrder}
                      animation={200}
                      className="flex flex-wrap gap-2"
                    >
                      {images.map((link, index) => (
                        <div
                          key={index}
                          className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden shadow-md"
                        >
                          <img
                            src={link}
                            alt={`uploaded-${index}`}
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => handleDeleteImage(index)}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                          >
                            <FaTrashAlt className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </ReactSortable>
                  </div>
                )}

                {/* Client */}
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="client" className="font-bold text-md">
                    Client
                  </Label>
                  <Input
                    id="client"
                    type="text"
                    placeholder="Enter client Name"
                    className="shadow-lg"
                    value={client}
                    onChange={(e) => setClient(e.target.value)}
                  />
                </div>

                {/* Category */}
                <div className="flex flex-col w-full space-y-1.5">
                  <Label htmlFor="category" className="font-bold text-md">
                    Category
                  </Label>
                  <Select
                    className="w-full"
                    value={projectcategory}
                    onValueChange={(value) => setProjectcategory(value)}
                  >
                    <SelectTrigger id="category" className="w-full shadow-xl">
                      <SelectValue placeholder="Select project Category" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value="Writing Tips">Writing Tips</SelectItem>
                      <SelectItem value="Book Reviews">Book Reviews</SelectItem>
                      <SelectItem value="Publishing">Publishing</SelectItem>
                      <SelectItem value="Writing Prompts">
                        Writing Prompts
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Tags */}
                <div className="flex flex-col w-full space-y-1.5">
                  <Label htmlFor="tags" className="font-bold text-md">
                    Tags
                  </Label>
                  <Select
                    className="w-full"
                    value={tags}
                    onValueChange={(value) => setTags(value)}
                  >
                    <SelectTrigger id="tags" className="w-full shadow-xl">
                      <SelectValue placeholder="Select Tags" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value="ScriptWriting">
                        ScriptWriting
                      </SelectItem>
                      <SelectItem value="GhostWriting">GhostWriting</SelectItem>
                      <SelectItem value="StoryWriting">StoryWriting</SelectItem>
                      <SelectItem value="Writing">Writing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Status */}
                <div className="flex flex-col w-full space-y-1.5">
                  <Label htmlFor="status" className="font-bold text-md">
                    Status
                  </Label>
                  <Select
                    className="w-full"
                    value={status}
                    onValueChange={(value) => setStatus(value)}
                  >
                    <SelectTrigger id="status" className="w-full shadow-xl">
                      <SelectValue placeholder="Select Status" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="publish">Publish</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  type="submit"
                  className="bg-blue-500 mt-2 hover:bg-blue-800 w-full font-medium text-lg p-2"
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Save Project"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
