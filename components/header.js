import Link from "next/link";
import { useState } from "react";
import SiteMapIcons from "./svgs/sitemap-icons";

export default function Header({ homeTitle, isSiteMapClosed, onUpdateIsSiteMapClosed }) {

  function updateIsSiteMapClosed() {
    onUpdateIsSiteMapClosed();
  }

  return (
    <header className="fixed flex flex-nowrap h-16 w-full max-w-full z-50 bg-beige px-2 pt-1">
        <Link href="/">
          <a>
            <h1 className="font-cirrus text-logoSmall">{homeTitle}</h1>
          </a>
        </Link>
        <div onClick={updateIsSiteMapClosed} className="border border-black w-12 ml-auto cursor-pointer">
          <SiteMapIcons closed={isSiteMapClosed} />
        </div>
    </header>
  );
}
