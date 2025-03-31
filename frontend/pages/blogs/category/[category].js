import Spinner from "@/components/Spinner";
import useFetchData from "@/hooks/useFetchData";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState, useMemo } from "react";
import Link from "next/link";

export default function Category() {
  const router = useRouter();
  const { category } = router.query;
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(7);
  const [searchQuery, setSearchQuery] = useState("");
  const { alldata, loading, error } = useFetchData(
    `/api/blogs?blogcategory=${category}`
  );

  // Memoized filtered and sorted blogs
  const filteredBlogs = useMemo(() => {
    if (!alldata) return [];
    
    return alldata
      .filter((item) => item.status === "publish")
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 20);
  }, [alldata]);

  // Pagination logic
  const indexOfFirstBlog = (currentPage - 1) * perPage;
  const indexOfLastBlog = currentPage * perPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(filteredBlogs.length / perPage);

  // Generate page numbers
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  if (error) {
    return <div className="error-message">Error loading blogs: {error.message}</div>;
  }

  return (
    <>
      <Head>
        <title>{category ? `${category} Articles` : "Blog Category"} | Your Site Name</title>
        <meta name="description" content={`Browse all articles in the ${category} category`} />
      </Head>
      
      <div className="blog-category">
        <section className="hero-section">
          <div className="container">
            <div className="title-container">
              <h1 className="category-title">
                Category: <span>{category || "Loading..."}</span>
              </h1>
            </div>
          </div>
        </section>

        <section className="articles-section">
          <div className="container">
            <hr className="divider" />
            <div className="articles-container">
              <div className="section-title">
                <h2>
                  {category} <span>Articles</span>
                </h2>
              </div>
              
              {loading ? (
                <div className="loading-container">
                  <Spinner />
                </div>
              ) : (
                <div className="articles-grid">
                  {currentBlogs.length > 0 ? (
                    currentBlogs.map((blog) => (
                      <article key={blog._id} className="blog-card">
                        <div className="image-container">
                          <Link href={`/blogs/${blog.slug}`} passHref>
                            <Image
                              src={blog.images?.[0] || "/default-blog.jpg"}
                              alt={blog.title}
                              width={400}
                              height={250}
                              className="blog-image"
                              priority={false}
                            />
                          </Link>
                          
                          {blog.blogcategory?.length > 0 && (
                            <div className="tags-container">
                              {blog.blogcategory.map((cat, index) => (
                                <Link
                                  key={index}
                                  href={`/blog/category/${encodeURIComponent(cat.toLowerCase())}`}
                                  className="category-tag"
                                >
                                  {cat}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>

                        <div className="blog-content">
                          <h3 className="blog-title">
                            <Link href={`/blogs/${blog.slug}`}>
                              {blog.title}
                            </Link>
                          </h3>
                          
                          <p className="blog-excerpt">
                            {blog.description || blog.content?.substring(0, 150) + "..."}
                          </p>

                          <div className="author-info">
                            <Image
                              src={blog.authorImage || "/pp.jpg"}
                              alt={blog.author || "Author"}
                              width={40}
                              height={40}
                              className="author-avatar"
                            />
                            <span>by {blog.author || "Inkvision"}</span>
                          </div>
                        </div>
                      </article>
                    ))
                  ) : (
                    <p className="no-articles">No articles found in this category</p>
                  )}
                </div>
              )}

              {totalPages > 1 && (
                <div className="pagination">
                  {pageNumbers.map((number) => (
                    <button
                      key={number}
                      onClick={() => paginate(number)}
                      className={`page-number ${currentPage === number ? "active" : ""}`}
                    >
                      {number}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}