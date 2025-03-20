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

export default function AddBlog() {
  const [images, setImages] = React.useState([]); // For image previews
  const [uploadedFiles, setUploadedFiles] = React.useState([]); // For file input
  const [isUploading, setIsUploading] = React.useState(false);
  const fileInputRef = React.useRef(null); // Ref for the file input

  // Handle image upload
  const handleImageUpload = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      setIsUploading(true);
      const uploadedImages = [];
      const newFiles = Array.from(files); // Convert FileList to array
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        reader.onload = (event) => {
          uploadedImages.push(event.target.result);
          if (uploadedImages.length === files.length) {
            setImages((prevImages) => [...prevImages, ...uploadedImages]);
            setUploadedFiles((prevFiles) => [...prevFiles, ...newFiles]);
            setIsUploading(false);
          }
        };
        reader.readAsDataURL(file);
      }
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
          <form>
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

              {/* Category */}
              <div className="flex flex-col w-full space-y-1.5">
                <Label htmlFor="category" className="font-bold text-md">
                  Category
                </Label>
                <Select className="w-full">
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
                <Select className="w-full">
                  <SelectTrigger id="tags" className="w-full shadow-xl">
                    <SelectValue placeholder="Select Tags" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="Writing Tips">ScriptWriting</SelectItem>
                    <SelectItem value="Book Reviews">GhostWriting</SelectItem>
                    <SelectItem value="Publishing">StoryWrihting</SelectItem>
                    <SelectItem value="Writing Prompts">Writing</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {/* Status */}
              <div className="flex flex-col w-full space-y-1.5">
                <Label htmlFor="status" className="font-bold text-md">
                  Status
                </Label>
                <Select className="w-full">
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
          </form>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button
            type="submit"
            className="bg-blue-500 hover:bg-blue-800 w-full font-medium text-lg p-2"
          >
            Save Blog
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
