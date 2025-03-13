import React, { useEffect, useState } from "react";
import { IoHome } from "react-icons/io5";
import Link from "next/link";
import { BsPostcard } from "react-icons/bs";
import { useRouter } from "next/navigation";
function Aside() {
  const router = useRouter();
  const [clicked, setClicked] = useState(false);
  const [activeLink, setActiveLink] = useState("/");
  const handleClick = () => {
    setClicked(!clicked);
  };
  const handleLinkClick = (link) => {
    setActiveLink((preActive) => (preActive = link ? null : link));
  };
  useEffect(() => {
    // update active link state when the page reloads
  });
  return (
    <>
      <aside className="asideleft active">
        <ul>
          <Link href="/">
            <li className="navactive">
              <IoHome />
              <span>Dashboard</span>
            </li>
          </Link>
          <li className="navactive flex-col flex-left">
            <div className="flex gap-1">
              <BsPostcard />
              <span>Blogs</span>
            </div>
          </li>
        </ul>
      </aside>
    </>
  );
}

export default Aside;
