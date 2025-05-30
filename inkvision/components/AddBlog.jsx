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
import axios from "axios";
import { useState } from "react";
import SideSheet from "./SideBar";
import Image from "next/image";
import { toast } from "react-toastify";

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
  const uploadImageQueue = [];

  const handleImageUpload = async (ev) => {
    const files = ev.target?.files;
    if (!files?.length) {
      toast.error("No files selected");
      return;
    }

    setIsUploading(true);

    try {
      const uploadPromises = Array.from(files).map(async (file) => {
        const data = new FormData();
        data.append("file", file);
        const res = await axios.post("/api/upload", data);
        return res.data.links;
      });

      const results = await Promise.all(uploadPromises);
      const allLinks = results.flat();

      setImages((prev) => [...prev, ...allLinks]);
      toast.success("Images uploaded successfully");
    } catch (error) {
      console.error("Image upload failed:", error);
      toast.error("An error occurred during upload");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const updateImageOrder = (newList) => setImages(newList);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = {
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
        await axios.put("/api/blogs", { ...data, _id });
        toast.success("Blog updated successfully");
      } else {
        await axios.post("/api/blogs", data);
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
    router.push("/admin/blogs");
    return null;
  }
  const handleSlugChange = (ev) => {
    const inputValue = ev.target.value;
    const newSlug = inputValue.replace(/\s+/g, "-");
    setSlug(newSlug);
  };
  return (
    <>
      <SideSheet />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 py-10 px-4">
        <Card className="max-w-5xl mx-auto shadow-xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-500 text-white py-6 px-8">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl font-bold">
                  {_id ? "Edit Blog Post" : "Create New Blog Post"}
                </CardTitle>
                <CardDescription className="text-blue-100 mt-2">
                  {_id
                    ? "Update your blog content and details"
                    : "Fill in the details to publish a new blog post"}
                </CardDescription>
              </div>
              <Button
                variant="ghost"
                className="text-white hover:bg-blue-700/20"
                onClick={() => router.push("/admin/blogs")}
              >
                Back to Blogs
              </Button>
            </div>
          </CardHeader>

          <CardContent className="p-8 space-y-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-2">
                <Label
                  htmlFor="title"
                  className="text-gray-700 dark:text-gray-300 font-medium"
                >
                  Blog Title
                </Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  placeholder="Enter blog title"
                  className="py-3 px-4 shadow-xl border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="slug"
                  className="text-gray-700 dark:text-gray-300 font-medium"
                >
                  URL Slug
                </Label>
                <Input
                  id="slug"
                  value={slug}
                  onChange={handleSlugChange}
                  required
                  placeholder="e.g., my-awesome-blog"
                  className="py-3 px-4 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-gray-700 font-medium dark:text-gray-300">
                  Description
                </Label>
                <div className="rounded-lg overflow-hidden border border-gray-300">
                  <MarkdownEditor
                    value={description}
                    style={{ height: "400px" }}
                    onChange={({ text }) => setDescription(text)}
                    renderHTML={(text) => <ReactMarkdown>{text}</ReactMarkdown>}
                    config={{
                      view: {
                        menu: true,
                        md: true,
                        html: true,
                      },
                      canView: {
                        menu: true,
                        md: true,
                        html: true,
                        fullScreen: true,
                        hideMenu: false,
                      },
                    }}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <Label className="text-gray-700 font-medium dark:text-gray-300">
                    Category
                  </Label>
                  <Select value={blogcategory} onValueChange={setBlogcategory}>
                    <SelectTrigger className="py-3 px-4 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-gray-800 text-black dark:text-white">
                      <SelectItem value="RomanceSeries">
                        RomanceSeries
                      </SelectItem>
                      <SelectItem value="RomanceShortStories">
                        RomanceShortStories
                      </SelectItem>
                      <SelectItem value="RomanceNovellas">
                        RomanceNovellas
                      </SelectItem>
                      <SelectItem value="CharacterDevelopment">
                        CharacterDevelopment
                      </SelectItem>
                      <SelectItem value="PlotDevelopment">
                        PlotDevelopment
                      </SelectItem>
                      <SelectItem value="RomanceEditing">
                        RomanceEditing
                      </SelectItem>
                      <SelectItem value="Revisions">Revisions</SelectItem>
                      <SelectItem value="BlurbWriting">BlurbWriting</SelectItem>
                      <SelectItem value="SynopsisWriting">
                        SynopsisWriting
                      </SelectItem>
                      <SelectItem value="RomanceBlogPosts">
                        RomanceBlogPosts
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-700 font-medium dark:text-gray-300">
                    Status
                  </Label>
                  <Select value={status} onValueChange={setStatus}>
                    <SelectTrigger className="py-3 px-4 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-gray-800 text-black dark:text-white">
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="publish">Publish</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <Label className="text-gray-700 font-medium dark:text-gray-300">
                    Tags
                  </Label>
                  <Select value={tags} onValueChange={setTags}>
                    <SelectTrigger className="py-3 px-4 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                      <SelectValue placeholder="Select tags" />
                    </SelectTrigger>

                    <SelectContent className="bg-white dark:bg-gray-800 text-black dark:text-white max-h-60 overflow-y-auto">
                      <SelectItem value="ContemporaryRomance">
                        ContemporaryRomance
                      </SelectItem>
                      <SelectItem value="HistoricalRomance">
                        HistoricalRomance
                      </SelectItem>
                      <SelectItem value="ParanormalRomance">
                        ParanormalRomance
                      </SelectItem>
                      <SelectItem value="RegencyRomance">
                        RegencyRomance
                      </SelectItem>
                      <SelectItem value="EroticRomance">
                        EroticRomance
                      </SelectItem>
                      <SelectItem value="SweetRomance">SweetRomance</SelectItem>
                      <SelectItem value="LGBTQRomance">LGBTQRomance</SelectItem>
                      <SelectItem value="WesternRomance">
                        WesternRomance
                      </SelectItem>
                      <SelectItem value="FantasyRomance">
                        FantasyRomance
                      </SelectItem>
                      <SelectItem value="SciFiRomance">SciFiRomance</SelectItem>
                      <SelectItem value="HolidayRomance">
                        HolidayRomance
                      </SelectItem>
                      <SelectItem value="SecondChanceRomance">
                        SecondChanceRomance
                      </SelectItem>
                      <SelectItem value="YoungAdultRomance">
                        YoungAdultRomance
                      </SelectItem>
                      <SelectItem value="SweetClean">SweetClean</SelectItem>
                      <SelectItem value="Mild">Mild</SelectItem>
                      <SelectItem value="Steamy">Steamy</SelectItem>
                      <SelectItem value="Explicit">Explicit</SelectItem>
                      <SelectItem value="ClosedDoor">ClosedDoor</SelectItem>
                      <SelectItem value="OpenDoor">OpenDoor</SelectItem>
                      <SelectItem value="HEA">HEA</SelectItem>
                      <SelectItem value="SeriesPlanning">
                        SeriesPlanning
                      </SelectItem>
                      <SelectItem value="CharacterProfiles">
                        CharacterProfiles
                      </SelectItem>
                      <SelectItem value="MarketTrendAnalysis">
                        MarketTrendAnalysis
                      </SelectItem>
                      <SelectItem value="TropeExpertise">
                        TropeExpertise
                      </SelectItem>
                      <SelectItem value="PenNameDevelopment">
                        PenNameDevelopment
                      </SelectItem>
                      <SelectItem value="FastTurnaround">
                        FastTurnaround
                      </SelectItem>
                      <SelectItem value="ConfidentialityGuaranteed">
                        ConfidentialityGuaranteed
                      </SelectItem>
                      <SelectItem value="Keywords">Keywords</SelectItem>
                      <SelectItem value="MultipleRevisions">
                        MultipleRevisions
                      </SelectItem>
                      <SelectItem value="CoverConsultation">
                        CoverConsultation
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-700 font-medium dark:text-gray-300">
                    Featured Images
                  </Label>
                  <div className="flex gap-3 items-center">
                    <Button
                      type="button"
                      variant="outline"
                      className="border-blue-500 text-blue-600 hover:bg-blue-50 hover:text-blue-700"
                    >
                      <label className="cursor-pointer flex items-center gap-2">
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={handleImageUpload}
                          ref={fileInputRef}
                          className="hidden"
                        />
                        <FaPlus className="text-sm" />
                        Upload Images
                      </label>
                    </Button>
                    {isUploading && (
                      <div className="flex items-center gap-2 text-gray-500">
                        <Spinner size="sm" />
                        <span>Uploading...</span>
                      </div>
                    )}
                  </div>
                  {images.length > 0 && (
                    <p className="text-sm text-gray-500 mt-1">
                      {images.length} image{images.length !== 1 ? "s" : ""}{" "}
                      uploaded
                    </p>
                  )}
                </div>
              </div>

              {images.length > 0 && (
                <div className="space-y-2">
                  <Label className="text-gray-700 font-medium">
                    Image Gallery
                  </Label>
                  <p className="text-sm text-gray-500 mb-3">
                    Drag to reorder images (first image will be featured)
                  </p>
                  <ReactSortable
                    list={Array.isArray(images) ? images : []}
                    setList={updateImageOrder}
                    animation={200}
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
                  >
                    {images.map((link, index) => (
                      <div
                        key={link}
                        className="relative group rounded-lg overflow-hidden border border-gray-200 hover:shadow-md transition-shadow"
                      >
                        <div className="relative w-full aspect-video rounded-lg overflow-hidden">
                          <Image
                            src={link}
                            alt="preview"
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 33vw"
                          />
                        </div>
                        <div className="absolute inset-0  group-hover:bg-opacity-20 transition-all duration-200" />
                        <button
                          type="button"
                          onClick={() => handleDeleteImage(index)}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600"
                          title="Remove image"
                        >
                          <FaTrashAlt size={14} />
                        </button>
                      </div>
                    ))}
                  </ReactSortable>
                </div>
              )}

              <div className="pt-4 border-t border-gray-200 flex justify-end">
                <Button
                  type="submit"
                  className="p-5 bg-gradient-to-r w-full from-blue-600 via-teal-800 to-indigo-800 hover:from-indigo-900 hover:to-blue-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <Spinner size="sm" />
                      {_id ? "Saving Changes..." : "Creating Blog..."}
                    </div>
                  ) : (
                    <>{_id ? "Update Blog Post" : "Publish Blog Post"}</>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
