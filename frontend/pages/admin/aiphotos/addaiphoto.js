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
import { FaTrashAlt } from "react-icons/fa";
import { ReactSortable } from "react-sortablejs";
import { FaPlusSquare } from "react-icons/fa";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import SideSheet from "@/components/SideBar";

export default function AddaiPhoto({ id }) {
  const [images, setImages] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]); // For file input
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = React.useRef(null); // Ref for the file input
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [slug, setSlug] = useState("");

  const router = useRouter();
  const [redirect, setRedirect] = useState(false); // Tracks if redirect is needed

  useEffect(() => {
    if (id) {
      // Fetch existing photo data if editing
      axios
        .get(`/api/aiphoto?id=${id}`)
        .then((response) => {
          const photoData = response.data;
          setTitle(photoData.title);
          setSlug(photoData.slug);
          setImages(photoData.images || []);
        })
        .catch((error) => {
          console.error("Error fetching photo data:", error);
          toast.error("Failed to load photo data");
        });
    }
  }, [id]);

  async function createPhoto(e) {
    e.preventDefault();
    if (!title || !slug) {
      toast.error("Title and slug are required");
      return;
    }

    setLoading(true);

    try {
      const data = {
        title,
        slug,
        images,
      };

      // Check if it's an update or a new project
      if (id) {
        await axios.put("/api/aiphoto", { ...data, id });
        toast.success("Photo updated successfully");
      } else {
        await axios.post("/api/aiphoto", data);
        toast.success("Photo created successfully");
      }

      setRedirect(true);
    } catch (error) {
      console.error("Error saving photo:", error);
      toast.error(error.response?.data?.message || "Failed to save photo");
    } finally {
      setLoading(false);
    }
  }

  if (redirect) {
    router.push("/admin/aiphotos/allaiphotos");
    return null;
  }

  // Handle image upload
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

  // Handle image deletion
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

  // Update image order for drag-and-drop
  const updateImageOrder = (newList) => {
    setImages(newList);
  };

  return (
    <div>
      <SideSheet />
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 gap-3 sm:gap-0">
        <h2 className="text-xl sm:text-2xl text-blue-600 font-semibold">
          Add Ai Photos
        </h2>

        <div className="text-blue-600 flex items-center gap-2">
          <FaPlusSquare className="text-lg sm:text-xl text-blue-600" />
          <span>/</span>
          <span>Add Ai Photos</span>
        </div>
      </div>
      <div className="flex justify-center p-4 sm:p-6 md:p-8">
        <Card className="w-full max-w-4xl rounded-2xl shadow-xl p-4 sm:p-6 bg-blue-600/15">
          <CardHeader>
            <CardTitle className="text-center text-2xl sm:text-3xl">
              {id ? "Edit AI Photo" : "Add New AI Photo"}
            </CardTitle>
            <CardDescription className="text-center">
              {id ? "Edit your photo" : "Create new photo"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={createPhoto}>
              <div className="grid w-full items-center gap-4">
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
                    required
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

                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="image" className="font-bold text-md">
                    Image
                  </Label>
                  <Input
                    id="image"
                    className="shadow-lg"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    ref={fileInputRef}
                  />
                  <div className="w-100 mt-1 flex flex-left">
                    {isUploading && <Spinner />}
                  </div>
                </div>

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
                  disabled={loading || isUploading}
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
