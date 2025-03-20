import SideBar from "@/components/SideBar";
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

export default function addblog() {
  const [images, setImages] = React.useState([]);
  const [isUploading, setIsUploading] = React.useState(false);
  return (
    <div className="flex justify-center p-5">
      <Card className="w-full rounded-2xl shadow-xl p-5 bg-gray-600/10 ">
        <CardHeader>
          <CardTitle className="flex justify-center text-2xl">
            Add Blog
          </CardTitle>
          <CardDescription className="flex justify-center">
            Create New Blog
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="title  " className="font-bold text-md">
                  Title
                </Label>
                <Input
                  id="title"
                  type="text"
                  placeholder="Name of your project "
                  className="shadow-lg  "
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="description  " className="font-bold text-md">
                  Description
                </Label>
                <Textarea
                  id="description"
                  type="text"
                  placeholder="Describe of your project "
                  className="shadow-lg  "
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="image  " className="font-bold text-md">
                  Image
                </Label>
                <Input
                  id="image"
                  placeholder="Name of your project "
                  className="shadow-lg  "
                  type="file"
                  accept="image/*"
                  multiple
                />
              </div>
              {images.length > 0 && (
                <div className="flex">
                  <ReactSortable
                    list={images}
                    setList={updateImageOrder}
                    animation={200}
                    className="flex gap-1"
                  >
                    {images.map((link, index) => (
                      <div key={link} className="uploadedimg">
                        <img src={link} alt="image" className="object-cover" />
                        <div className="deleteimg">
                          <button
                            type="button"
                            onClick={() => handleDeleteImage(index)}
                          >
                            <FaTrashAlt />
                          </button>
                        </div>
                      </div>
                    ))}
                  </ReactSortable>
                </div>
              )}
              <div className="flex flex-col w-full space-y-1.5">
                <Label htmlFor="category">Category</Label>
                <Select className="w-full ">
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
              <div className="flex flex-col w-full space-y-1.5">
                <Label htmlFor="status">Status</Label>
                <Select className="w-full ">
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
      </Card>
    </div>
  );
}
