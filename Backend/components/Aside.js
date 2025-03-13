import React, { useEffect, useState } from "react";
import { IoHome } from "react-icons/io5";
import Link from "next/link";
import { BsPostcard } from "react-icons/bs";
import { useRouter } from "next/navigation";

function Aside() {
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("/");

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  useEffect(() => {
    if (router.pathname) {
      setActiveLink(router.pathname);
    }
  }, [router.pathname]);

  return (
    <aside className="asideleft active">
      <ul>
        <Link href="/">
          <li className="navactive">
            <IoHome />
            <span>Dashboard</span>
          </li>
        </Link>

        <li
          className={`flex-col flex-left ${
            activeLink.startsWith("/blogs") ? "navactive" : ""
          }`}
          onClick={toggleDropdown}
        >
          <div className="flex gap-1 cursor-pointer">
            <BsPostcard />
            <span>Blogs</span>
          </div>
          {dropdownOpen && (
            <ul className="dropdown-menu">
              <li>
                <Link href="/blogs/all">All Blogs</Link>
              </li>
              <li>
                <Link href="/blogs/drafts">Draft Blogs</Link>
              </li>
              <li>
                <Link href="/blogs/add">Add Blogs</Link>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </aside>
  );
}

export default Aside;
