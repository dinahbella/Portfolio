import React from "react";
import ReactMarkdown from "react-markdown";
import MarkdownEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import Spinner from "./Spinner";

export default function Blog() {
  return (
    <form className="addWebsiteform">
      {/* Blog Title */}
      <div className="w-100 flex flex-col flex-left mb-2">
        <label htmlFor="title">Title</label>
        <input type="text" id="title" placeholder="Enter title" />
      </div>

      {/* Blog Slug URL */}
      <div className="w-100 flex flex-col flex-left mb-2">
        <label htmlFor="slug">Slug (SEO-friendly URL)</label>
        <input type="text" id="slug" placeholder="Enter slug URL" />
      </div>

      {/* Blog Category */}
      <div className="w-100 flex flex-col flex-left mb-2">
        <label htmlFor="category">Select Category</label>
        <select name="category" id="category">
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
        <select name="tags" id="tags">
          <option value="Writing Tips">Writing Tips</option>
          <option value="Book Reviews">Book Reviews</option>
          <option value="Publishing">Publishing</option>
          <option value="Writing Prompts">Writing Prompts</option>
        </select>
      </div>
    </form>
  );
}
