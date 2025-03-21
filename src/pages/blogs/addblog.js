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
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";

export default function AddBlog({ id }) {
  // State for managing image previews and uploaded files
  const [images, setImages] = React.useState([]); // Stores image URLs for preview
  const [uploadedFiles, setUploadedFiles] = React.useState([]); // Stores uploaded file objects
  const [isUploading, setIsUploading] = React.useState(false); // Tracks upload status
  const fileInputRef = React.useRef(null); // Ref for the file input element
  const [loading, setLoading] = React.useState(false);

  // State for form fields
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [blogcategory, setBlogcategory] = React.useState("");
  const [tags, setTags] = React.useState("");
  const [status, setStatus] = React.useState("");
  const uploadImageQueue = [];
  // Router for navigation
  const router = useRouter();
  const [redirect, setRedirect] = React.useState(false); // Tracks if redirect is needed

  // Function to handle blog creation or update
  async function createBlog(e) {
    e.preventDefault();
    setLoading(true);

    try {
      // Prepare data for API request
      const data = {
        title,
        description,
        images,
        blogcategory,
        tags,
        status,
      };

      // Check if it's an update or a new blog
      if (_id) {
        await axios.put("/api/blogs", { ...data, id });
        toast.success("Blog updated successfully");
      } else {
        await axios.post("/api/blogs", data);
        toast.success("Blog created successfully");
      }

      // Redirect to blogs page after successful save
      setRedirect(true);
    } catch (error) {
      console.error("Error saving blog:", error);
      toast.error("Failed to save blog");
    } finally {
      setLoading(false);
    }
  }

  // Redirect to blogs page if `redirect` is true
  if (redirect) {
    router.push("/blogs");
    return null;
  }

  const handleImageUpload = async (ev) => {
    const files = ev.target?.files;
    if (files && files.length > 0) {
      setIsUploading(true);

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

  // Function to delete an image
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

  // Function to update image order for drag-and-drop
  const updateImageOrder = (newList) => {
    setImages(newList);
  };

  return (
    <div className="flex justify-center p-4 sm:p-6 md:p-8">
      <Card className="w-full max-w-4xl rounded-2xl shadow-xl p-4 sm:p-6 bg-blue-600/15">
        <CardHeader>
          <CardTitle className="text-center text-2xl sm:text-3xl">
            Add Blog
          </CardTitle>
          <CardDescription className="text-center">
            Create New Blog
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={createBlog}>
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
                  required
                />
              </div>

              {/* Description */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="description" className="font-bold text-md">
                  Description
                </Label>
                <Textarea
                  id="description"
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

              {/* Category */}
              <div className="flex flex-col w-full space-y-1.5">
                <Label htmlFor="category" className="font-bold text-md">
                  Category
                </Label>
                <Select
                  className="w-full"
                  value={blogcategory}
                  onValueChange={(value) => setBlogcategory(value)}
                >
                  <SelectTrigger id="category" className="w-full shadow-xl">
                    <SelectValue placeholder="Select Category" />
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
                    <SelectItem value="ScriptWriting">ScriptWriting</SelectItem>
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
            </div>
            <Button
              type="submit"
              className="bg-blue-500 mt-2 p-4 shadow-2xl hover:bg-blue-800 w-full font-medium text-lg"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Blog"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
