"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { InfinitySpin } from "react-loader-spinner";

type LinkWithLoaderProps = {
  href: string;
  children: React.ReactNode;
};

const LinkWithLoader: React.FC<LinkWithLoaderProps> = ({ href, children }) => {
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();

  // handle click
  const handleClick = () => {
    if (!pathname.includes(href)) {
      setVisible(true);
    }
  };
  return (
    <>
      {visible && (
        <div className="bg-zinc-300 z-40 absolute top-0 left-0 right-0 bottom-0">
          <div className="absolute top-[40%] left-[40%] z-50">
            <InfinitySpin width="200" color="#9559d8" />
          </div>
        </div>
      )}
      <Link onClick={handleClick} href={href}>
        {children}
      </Link>
    </>
  );
};

export default LinkWithLoader;
