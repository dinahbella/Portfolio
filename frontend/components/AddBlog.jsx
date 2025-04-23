"use client";
import * as React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/Spinner";
import MarkdownEditor from "react-markdown-editor-lite";
import ReactMarkdown from "react-markdown";
import "react-markdown-editor-lite/lib/index.css";
import { ReactSortable } from "react-sortablejs";
import { FaPlus, FaTrashAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import axios from "axios";
import { useState } from "react";

export default function AddBlog({
  _id,
  title: existingTitle = "",
  slug: existingSlug = "",
  images: existingImages = [],
  description: existingDescription = "",
  blogcategory: existingBlogcategory = "",
  tags: existingTags = "",
  status: existingStatus = "",
}) {
  const router = useRouter();
  const [title, setTitle] = useState(existingTitle);
  const [slug, setSlug] = useState(existingSlug);
  const [images, setImages] = useState(existingImages);
  const [description, setDescription] = useState(existingDescription);
  const [blogcategory, setBlogcategory] = useState(existingBlogcategory);
  const [tags, setTags] = useState(existingTags);
  const [status, setStatus] = useState(existingStatus);
  const [loading, setLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = React.useRef(null);

  const handleImageUpload = async (ev) => {
    const files = ev.target?.files;
    if (files?.length) {
      setIsUploading(true);
      const uploads = Array.from(files).map((file) => {
        const formData = new FormData();
        formData.append("file", file);
        return axios
          .post("/api/upload", formData)
          .then((res) => res.data.links);
      });

      const results = await Promise.all(uploads);
      setImages((prev) => [...prev, ...results.flat()]);
      setIsUploading(false);
      toast.success("Images uploaded successfully");
    }
  };

  const handleDeleteImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const updateImageOrder = (newList) => setImages(newList);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      title,
      slug,
      description,
      images,
      blogcategory,
      tags,
      status,
    };

    try {
      if (_id) {
        await axios.put("/api/blogs", { ...payload, _id });
        toast.success("Blog updated successfully");
      } else {
        await axios.post("/api/blogs", payload);
        toast.success("Blog created successfully");
      }

      setRedirect(true);
    } catch (err) {
      toast.error("Failed to save blog");
    } finally {
      setLoading(false);
    }
  };

  if (redirect) {
    router.push("/blogs");
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 py-10 px-4">
      <Card className="max-w-5xl mx-auto shadow-xl">
        <CardHeader className="bg-blue-600 text-white py-6">
          <CardTitle>{_id ? "Edit Blog" : "Create Blog"}</CardTitle>
          <CardDescription className="text-blue-100">
            {_id
              ? "Update blog information"
              : "Fill out the form to add a new blog"}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="slug">Slug</Label>
                <Input
                  id="slug"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <MarkdownEditor
                value={description}
                style={{ height: "300px" }}
                onChange={({ text }) => setDescription(text)}
                renderHTML={(text) => <ReactMarkdown>{text}</ReactMarkdown>}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label>Category</Label>
                <Select value={blogcategory} onValueChange={setBlogcategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Writing Tips">Writing Tips</SelectItem>
                    <SelectItem value="Book Reviews">Book Reviews</SelectItem>
                    <SelectItem value="Publishing">Publishing</SelectItem>
                    <SelectItem value="Writing Prompts">
                      Writing Prompts
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Status</Label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="publish">Publish</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label>Tags</Label>
                <Select value={tags} onValueChange={setTags}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose tags" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Writing">Writing</SelectItem>
                    <SelectItem value="ScriptWriting">ScriptWriting</SelectItem>
                    <SelectItem value="GhostWriting">GhostWriting</SelectItem>
                    <SelectItem value="StoryWriting">StoryWriting</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Upload Images</Label>
                <div className="flex gap-2 items-center">
                  <Button variant="outline">
                    <label className="cursor-pointer">
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        ref={fileInputRef}
                        className="hidden"
                      />
                      Upload
                    </label>
                  </Button>
                  {isUploading && <Spinner />}
                </div>
              </div>
            </div>

            {images.length > 0 && (
              <div className="mt-4">
                <Label>Reorder Images</Label>
                <ReactSortable
                  list={images}
                  setList={updateImageOrder}
                  className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-2"
                >
                  {images.map((link, i) => (
                    <div
                      key={i}
                      className="relative w-full aspect-square rounded-lg overflow-hidden border"
                    >
                      <img
                        src={link}
                        alt="preview"
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => handleDeleteImage(i)}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                      >
                        <FaTrashAlt size={12} />
                      </button>
                    </div>
                  ))}
                </ReactSortable>
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <Spinner size="sm" />
                  {_id ? "Updating..." : "Creating..."}
                </div>
              ) : (
                <>{_id ? "Update Blog" : "Create Blog"}</>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
