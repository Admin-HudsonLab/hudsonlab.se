import Link from "next/link";
import { useState } from "react";
import SiteMapIcons from "./svgs/sitemap-icons";

export default function Header({ homeTitle, isSiteMapClosed, onUpdateIsSiteMapClosed }) {
  /* const categoriesAsElementsInHeader = categories.map((category) => {
    return (
      <li key={category.slug} className="px-1">
        <Link href={`/${category.slug}`}>
          <a>{category.title}</a>
        </Link>
      </li>
    );
  }); */

  function updateIsSiteMapClosed() {
    onUpdateIsSiteMapClosed();
  }

  return (
    <header className="flex flex-nowrap px-2 py-2">
        <Link href="/">
          <a>
            <h1 className="font-cirrus text-logoSmall">{homeTitle}</h1>
          </a>
        </Link>
        <div onClick={updateIsSiteMapClosed} className="w-12 ml-auto cursor-pointer">
          <SiteMapIcons closed={isSiteMapClosed} />
        </div>
    </header>
  );
}
