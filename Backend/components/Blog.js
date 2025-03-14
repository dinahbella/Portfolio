import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import MarkdownEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import Spinner from "./Spinner";
import useRouter from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
export default function Blog() {
  const [redirect, setRedirect] = useState(false);
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [images, setImages] = useState([]);
  const [description, setDescription] = useState("");
  const [blogcategory, setBlogcategory] = useState("");
  const [tags, setTags] = useState("");
  const [status, setStatus] = useState("");
  //  to upload images
  const [uploading, setUploading] = useState(false);
  const uploageImageQue = [];

  async function createBlog(ev) {
    ev.preventDefault();
    const data = {
      title,
      slug,
      images,
      description,
      blogcategory,
      tags,
      status,
    };
    if (_id) {
      await axios.put("/api/blogs", { ...data, _id });
      toast.success("Data Updataed");
    } else {
      await axios.post("/api/blogs", data);
      toast.success("Blog created successfully");
    }
    setRedirect(true);
  }
  const handleSlugChange = (ev) => {
    const inputValue = ev.target.value;
    const newSlug = inputValue.replace(/\s+/g, "-");
    setSlug(newSlug);
  };
  return (
    <form className="addWebsiteform">
      {/* Blog Title */}
      <div className="w-100 flex flex-col flex-left mb-2">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
          placeholder="Enter title"
        />
      </div>

      {/* Blog Slug URL */}
      <div className="w-100 flex flex-col flex-left mb-2">
        <label htmlFor="slug">Slug (SEO-friendly URL)</label>
        <input
          type="text"
          id="slug"
          placeholder="Enter slug URL"
          value={slug}
          onChange={handleSlugChange}
        />
      </div>

      {/* Blog Category */}
      <div className="w-100 flex flex-col flex-left mb-2">
        <label htmlFor="category">Select Category</label>
        <select
          name="category"
          id="category"
          value={blogcategory}
          onChange={(e) =>
            setBlogcategory(
              Array.from(e.target.selectedOptions, (option) => option.value)
            )
          }
        >
          <option value="Writing Tips">Writing Tips</option>
          <option value="Book Reviews">Book Reviews</option>
          <option value="Publishing">Publishing</option>
          <option value="Writing Prompts">Writing Prompts</option>
        </select>
      </div>

      {/* Blog Images */}
      <div className="w-100 flex flex-col flex-left mb-2">
        <div className="w-100">
          <label htmlFor="fileInput">
            Images (first image will show as thumbnail, you can drag)
          </label>
          <input
            type="file"
            id="fileInput"
            className="mt-1"
            accept="image/*"
            multiple
            value={images}
            onChange={(ev) => setImages(ev.target.value)}
          />
        </div>
      </div>

      {/* Spinner */}
      <div className="w-100 flex flex-left mt-1">
        <Spinner />
      </div>

      {/* Blog Content */}
      <div className="description w-100 flex flex-col flex-left mb-2">
        <label htmlFor="description">Blog Content</label>
        <MarkdownEditor
          value={description}
          onChange={(ev) => setDescription(ev.text)}
          style={{ width: "100%", height: "400px" }}
          renderHTML={(text) => (
            <ReactMarkdown
              components={{
                code: ({ node, inline, className, children, ...props }) => {
                  const match = /language-(\w+)/.exec(className || "");
                  if (inline) {
                    return <code>{children}</code>;
                  } else {
                    return (
                      <div style={{ position: "relative" }}>
                        <pre
                          style={{
                            padding: "0",
                            borderRadius: "5px",
                            overflowX: "auto",
                            whiteSpace: "pre-wrap",
                          }}
                          {...props}
                        >
                          <code>{children}</code>
                        </pre>
                        <button
                          style={{
                            position: "absolute",
                            top: "0",
                            right: "0",
                            zIndex: "1",
                          }}
                          onClick={() =>
                            navigator.clipboard.writeText(String(children))
                          }
                        >
                          Copy Code
                        </button>
                      </div>
                    );
                  }
                },
              }}
            >
              {text}
            </ReactMarkdown>
          )}
        />
      </div>
      {/* tags */}
      <div className="w-100 flex flex-col flex-left mb-2">
        <label htmlFor="tags">Tags</label>
        <select
          name="tags"
          id="tags"
          value={tags}
          onChange={(ev) => setTags(ev.target.value)}
        >
          <option value="Blog Writing ">Blog Writing</option>
          <option value="Screenwriting">Screenwriting</option>
          <option value="Novel Writing"> Novel Writing</option>
          <option value="Writing Techniques">Writing Techniques</option>
          <option value="Freelance Writing">Freelance Writing</option>
          <option value="Ghostwriting">Ghostwriting </option>
          <option value="Short Story Writing">Short Story Writing</option>
        </select>
      </div>
      <div className="w-100 flex flex-col flex-left mb-2">
        <label htmlFor="status">Status</label>
        <select
          name="status"
          id="status"
          value={status}
          onChange={(ev) => setStatus(ev.target.value)}
        >
          <option value=" ">No Select</option>
          <option value="">Draft</option>
          <option value="">Publish</option>
        </select>
      </div>
      <div className="w-100 mb-2 ">
        <button className="w-100 addwebbtn flex-center" type="submit">
          SAVE BLOG{" "}
        </button>
      </div>
    </form>
  );
}
