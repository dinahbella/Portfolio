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
import MarkdownEditor from "react-markdown-editor-lite";
import ReactMarkdown from "react-markdown";
import "react-markdown-editor-lite/lib/index.css";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Spinner from "@/components/Spinner";
import { FaTrashAlt, FaPlus } from "react-icons/fa";
import { ReactSortable } from "react-sortablejs";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useState, useEffect } from "react";
import SideSheet from "@/components/SideBar";
import { toast } from "react-toastify";
import Image from "next/image";
export default function AddProject({
  _id,
  title: existingTitle = "",
  slug: existingSlug = "",
  images: existingImages = [],
  description: existingDescription = "",
  client: existingClient = "",
  projectcategory: existingProjectcategory = "",
  tags: existingTags = "",
  status: existingStatus = "",
}) {
  const [loading, setLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = React.useRef(null);
  const [title, setTitle] = useState(existingTitle);
  const [slug, setSlug] = useState(existingSlug);
  const [images, setImages] = useState(existingImages);
  const [description, setDescription] = useState(existingDescription);
  const [client, setClient] = useState(existingClient);
  const [projectcategory, setProjectcategory] = useState(
    existingProjectcategory
  );
  const [tags, setTags] = useState(existingTags);
  const [status, setStatus] = useState(existingStatus);
  const router = useRouter();

  // Fetch project data if editing
  useEffect(() => {
    if (_id) {
      const fetchProject = async () => {
        try {
          const { data } = await axios.get(`/api/projects?id=${_id}`);
          setTitle(data.title);
          setSlug(data.slug);
          setDescription(data.description);
          setImages(data.images || []);
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
  }, [_id]);

  async function createProject(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const data = {
        title,
        slug,
        description,
        images,
        client,
        projectcategory,
        tags,
        status,
      };

      if (_id) {
        await axios.put("/api/projects", { ...data, _id });
        toast.success("Project updated successfully");
      } else {
        await axios.post("/api/projects", data);
        toast.success("Project created successfully");
      }
      console.log("Data", data);
      router.push("/admin/projects/allprojects");
    } catch (error) {
      console.error("Error saving project:", error);
      toast.error("Failed to save project");
    } finally {
      setLoading(false);
    }
  }
  const handleSlugChange = (ev) => {
    const inputValue = ev.target.value;
    const newSlug = inputValue.replace(/\s+/g, "-");
    setSlug(newSlug);
  };
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

  const updateImageOrder = (newList) => {
    setImages(newList);
  };
  return (
    <div className="min-h-screen">
      <SideSheet />
      <div className="ml-16 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-blue-700">
            {_id ? "Edit Project" : "Add New Project"}
          </h2>
          <div className="flex items-center gap-2 text-blue-600">
            <span className="text-sm">Projects</span>
            <span>/</span>
            <span className="font-medium">{_id ? "Edit" : "Add"}</span>
          </div>
        </div>

        <div className="flex justify-center">
          <Card className="w-full max-w-4xl shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-500 text-white py-6 px-8">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl font-bold">
                    {_id ? "Edit Project Post" : "Create New Project Post"}
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
                  onClick={() => router.push("/admin/projects/allprojects")}
                >
                  Back to Projects
                </Button>
              </div>
            </CardHeader>

            <CardContent className="pt-6">
              <form onSubmit={createProject} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label htmlFor="title">Title*</Label>
                    <Input
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Project name"
                      required
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="slug">Slug*</Label>
                    <Input
                      id="slug"
                      value={slug}
                      onChange={handleSlugChange}
                      placeholder="project-slug"
                      required
                    />
                  </div>
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
                      renderHTML={(text) => (
                        <ReactMarkdown>{text}</ReactMarkdown>
                      )}
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label>Client</Label>
                    <Input
                      value={client}
                      onChange={(e) => setClient(e.target.value)}
                      placeholder="Client name"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label>Category</Label>
                    <Select
                      value={projectcategory}
                      onValueChange={setProjectcategory}
                    >
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
                        <SelectItem value="BlurbWriting">
                          BlurbWriting
                        </SelectItem>
                        <SelectItem value="SynopsisWriting">
                          SynopsisWriting
                        </SelectItem>
                        <SelectItem value="RomanceBlogPosts">
                          RomanceBlogPosts
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label>Tags</Label>
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
                        <SelectItem value="SweetRomance">
                          SweetRomance
                        </SelectItem>
                        <SelectItem value="LGBTQRomance">
                          LGBTQRomance
                        </SelectItem>
                        <SelectItem value="WesternRomance">
                          WesternRomance
                        </SelectItem>
                        <SelectItem value="FantasyRomance">
                          FantasyRomance
                        </SelectItem>
                        <SelectItem value="SciFiRomance">
                          SciFiRomance
                        </SelectItem>
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

                  <div className="space-y-3">
                    <Label>Status*</Label>
                    <Select value={status} onValueChange={setStatus} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent className="bg-white dark:bg-gray-800 text-black dark:text-white">
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="publish">Publish</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                      "Update Project"
                    ) : (
                      "Create Project"
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
