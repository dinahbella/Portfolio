import Spinner from "@/components/Spinner";
import useFetchData from "@/hooks/useFetchData";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Link from "next/link";
export default function Category() {
  const router = useRouter();
  const { category } = router.query;
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(7);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const { alldata, setAlldata } = useFetchData(
    `/api/blogs?blogcategory=${category}`
  );

  const filterdblogs = alldata
    .filter((item) => item.category === item.category)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 20);
  const blogcategoryData = [...filterdblogs].reverse();
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const allblog = alldata.length;

  const indexOfFirstblog = (currentPage - 1) * perPage;
  const indexOfLastblog = currentPage * perPage;

  const currentBlogs = filterdblogs.slice(indexOfFirstblog, indexOfLastblog);

  const pubishedData = currentBlogs.filter((ab) => ab.status === "publish");
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allblog / perPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <Head>
        <title>Blog Category Page</title>
      </Head>
      <div className="blogCategory">
        <section className="tophero">
          <div className="container">
            <div className="toptitle">
              <div className="toptitlecont flex">
                <h1>
                  Category <span>{category}</span>
                </h1>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="container">
            <hr />{" "}
            <div>
              <div className="fetitle">
                <h3>
                  {category} <span>Articles:</span>
                </h3>
              </div>
              <div className="latestposts">
                {loading ? (
                  <Spinner />
                ) : (
                  <>
                    {pubishedData.map((blog) => {
                      return (
                        <div key={blog._id}>
                          <div>
                            <Link href={`/blogs/${blog.slug}`}>
                              <Image
                                src={blog.images[0]}
                                alt={blog.title}
                                width={200}
                                height={200}
                              />
                            </Link>
                            <div className="tags">
                              {blog.blogcategory.map((cat) => {
                                return (
                                  <Link
                                    href={`/blog/category${cat}`}
                                    className="ai"
                                  >
                                    <span>{cat}</span>
                                  </Link>
                                );
                              })}
                            </div>
                          </div>
                          <div className="postInfo">
                            <h3>
                              <Link href={`/blogs/${blog.slug}`}>
                                {blog.title}
                              </Link>
                            </h3>
                            <p>
                              Lorem ipsum dolor sit amet consectetur adipisicing
                              elit. Inventore sed nihil est nemo nostrum
                              voluptatibus quia asperiores. Eius aliquid minima
                              deserunt aspernatur, facere eveniet, at, debitis
                              dolorem magni consequatur atque!
                            </p>
                            <h4 className="flex">
                              <Image
                                src={"/pp.jpg"}
                                alt="photo"
                                width={50}
                                height={50}
                                className="rounded-full"
                              />{" "}
                              <span>by Inkvision</span>
                            </h4>
                          </div>
                        </div>
                      );
                    })}
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
