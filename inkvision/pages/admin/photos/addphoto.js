"use client";
import * as React from "react";
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
import Spinner from "@/components/Spinner";
import { FaTrashAlt, FaPlus } from "react-icons/fa";
import { ReactSortable } from "react-sortablejs";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";
import SideSheet from "@/components/SideBar";
import Image from "next/image";
export default function AddPhoto({
  _id,
  title: existingTitle,
  slug: existingSlug,
  images: existingImages,
}) {
  const [uploadedFiles, setUploadedFiles] = useState([]); // For file input
  const [title, setTitle] = useState(existingTitle || "");
  const [slug, setSlug] = useState(existingSlug || "");
  const [images, setImages] = useState(existingImages || []);
  const [loading, setLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = React.useRef(null);
  const router = useRouter();

  async function createPhoto(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const data = {
        title,
        slug,
        images,
      };

      if (_id) {
        await axios.put("/api/photo", { ...data, _id });
        toast.success("Photo updated successfully");
      } else {
        await axios.post("/api/photo", data);
        toast.success("Photo created successfully");
      }
      router.push("/admin/photos/allphotos");
    } catch (error) {
      console.error("Error saving photo:", error);
      toast.error("Failed to save photo");
    } finally {
      setLoading(false);
    }
  }

  const handleSlugChange = (ev) => {
    const inputValue = ev.target.value;
    const newSlug = inputValue.replace(/\s+/g, "-").toLowerCase();
    setSlug(newSlug);
  };

  const handleImageUpload = async (ev) => {
    const files = ev.target?.files;
    if (files?.length > 0) {
      setIsUploading(true);
      setUploadedFiles(Array.from(files)); // Store the files

      try {
        const uploadImageQueue = [];
        const newImages = [];

        for (const file of files) {
          const formData = new FormData();
          formData.append("file", file);

          const uploadPromise = axios
            .post("/api/upload", formData)
            .then((res) => {
              newImages.push(...res.data.links);
            })
            .catch((err) => {
              console.error("Upload failed for file:", file.name, err);
              toast.error(`Failed to upload ${file.name}`);
            });

          uploadImageQueue.push(uploadPromise);
        }

        await Promise.all(uploadImageQueue);
        setImages((prev) => [...prev, ...newImages]);
        toast.success("Images uploaded successfully");
      } catch (error) {
        console.error("Error uploading images:", error);
        toast.error("Some images failed to upload");
      } finally {
        setIsUploading(false);
      }
    } else {
      toast.error("No files selected");
    }
  };

  const handleDeleteImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setUploadedFiles((prev) => {
      const newFiles = [...prev];
      newFiles.splice(index, 1);
      return newFiles;
    });

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

  const updateImageOrder = (newList) => {
    setImages(newList);
  };

  return (
    <div className="min-h-screen">
      <SideSheet />
      <div className="ml-16 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-blue-600">Add Photos</h2>
          <div className="flex items-center gap-2 text-blue-600">
            <span className="text-sm">Photos</span>
            <span>/</span>
            <span className="font-medium">Add New</span>
          </div>
        </div>

        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 py-10 px-4">
          <Card className="w-full max-w-4xl shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-500 text-white py-6 px-8">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl font-bold">
                    {_id ? "Edit Photo Post" : "Add New Photo "}
                  </CardTitle>
                  <CardDescription className="text-blue-100 mt-2">
                    {_id
                      ? "Update your book covers "
                      : "Fill in the details to publish a new bookcover "}
                  </CardDescription>
                </div>
                <Button
                  variant="ghost"
                  className="text-white hover:bg-blue-700/20"
                  onClick={() => router.push("/admin/photos/allphotos")}
                >
                  Back to Photos
                </Button>
              </div>
            </CardHeader>

            <CardContent className="pt-6">
              <form onSubmit={createPhoto} className="space-y-6">
                <div className="space-y-3">
                  <Label htmlFor="title">Title*</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter photo title"
                    required
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="slug">Slug*</Label>
                  <Input
                    id="slug"
                    value={slug}
                    onChange={handleSlugChange}
                    placeholder="auto-generated-slug"
                    required
                  />
                </div>

                <div className="space-y-3">
                  <Label>Images</Label>
                  <div className="flex items-center gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      className="gap-2"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <FaPlus />
                      Upload Images
                    </Button>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      ref={fileInputRef}
                      className="hidden"
                    />
                    {isUploading && (
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Spinner size="sm" />
                        Uploading...
                      </div>
                    )}
                  </div>
                  {images.length > 0 && (
                    <p className="text-sm text-gray-500">
                      {images.length} image{images.length !== 1 ? "s" : ""}{" "}
                      selected
                    </p>
                  )}
                </div>

                {images.length > 0 && (
                  <div className="space-y-3">
                    <Label>Preview</Label>
                    <ReactSortable
                      list={images}
                      setList={updateImageOrder}
                      className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3"
                    >
                      {images.map((link, index) =>
                        link ? (
                          <div
                            key={index}
                            className="relative aspect-square rounded-lg overflow-hidden border group"
                          >
                            <Image
                              src={link}
                              alt={`Preview ${index + 1}`}
                              fill
                              className="w-full h-full object-cover"
                            />
                            <button
                              type="button"
                              onClick={() => handleDeleteImage(index)}
                              className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <FaTrashAlt className="w-3 h-3" />
                            </button>
                          </div>
                        ) : null
                      )}
                    </ReactSortable>
                  </div>
                )}

                <div className="pt-4">
                  <Button
                    type="submit"
                    className="p-5 bg-gradient-to-r w-full from-blue-600 via-teal-800 to-indigo-800 hover:from-indigo-900 hover:to-blue-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all"
                    disabled={loading || isUploading}
                  >
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <Spinner size="sm" />
                        {_id ? "Updating..." : "Creating..."}
                      </div>
                    ) : _id ? (
                      "Update Photo"
                    ) : (
                      "Create Photo"
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
