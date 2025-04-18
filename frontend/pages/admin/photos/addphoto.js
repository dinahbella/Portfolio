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

import Spinner from "@/components/Spinner";
import { FaTrashAlt } from "react-icons/fa";
import { ReactSortable } from "react-sortablejs";
import { FaPlusSquare } from "react-icons/fa";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import { useState } from "react";
import SideSheet from "@/components/SideBar";

export default function AddPhoto({ id }) {
  const [images, setImages] = React.useState([]); // For image previews
  const [uploadedFiles, setUploadedFiles] = React.useState([]); // For file input
  const [isUploading, setIsUploading] = React.useState(false);
  const fileInputRef = React.useRef(null); // Ref for the file input
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [slug, setSlug] = useState("");

  const router = useRouter();
  const [redirect, setRedirect] = React.useState(false); // Tracks if redirect is needed

  async function createPhoto(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const data = {
        title,
        slug,
        images,
      };

      // Check if it's an update or a new project
      if (id) {
        await axios.put("/api/photo", { ...data, id });
        toast.success("Photo updated successfully");
      } else {
        await axios.post("/api/photo", data);
        toast.success("Photo created successfully");
      }

      setRedirect(true);
    } catch (error) {
      console.error("Error saving photo:", error);
      toast.error("Failed to save photo");
    } finally {
      setLoading(false);
    }
  }

  if (redirect) {
    router.push("/admin/photos/allphotos");
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
      <SideSheet />
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 gap-3 sm:gap-0">
        {/* Title */}
        <h2 className="text-xl sm:text-2xl text-blue-600 font-semibold">
          Add Photos
        </h2>

        {/* Breadcrumb */}
        <div className="text-blue-600 flex items-center gap-2">
          <FaPlusSquare className="text-lg sm:text-xl text-blue-600" />
          <span>/</span>
          <span>Add Photos</span>
        </div>
      </div>
      <div className="flex justify-center p-4 sm:p-6 md:p-8">
        <Card className="w-full max-w-4xl rounded-2xl shadow-xl p-4 sm:p-6 bg-blue-600/15">
          <CardHeader>
            <CardTitle className="text-center text-2xl sm:text-3xl">
              Add Photo
            </CardTitle>
            <CardDescription className="text-center">
              Create New Photo
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={createPhoto}>
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

                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="slug" className="font-bold text-md">
                    Slug
                  </Label>
                  <Input
                    id="slug"
                    type="text"
                    placeholder="example-of-slug"
                    className="shadow-lg"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
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

                <Button
                  type="submit"
                  className="bg-blue-500 mt-2 hover:bg-blue-800 w-full font-medium text-lg p-2"
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Save Photo"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
