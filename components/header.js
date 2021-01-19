import Link from "next/link";
import SiteMapIcons from "./svg/sitemap-icons";

export default function Header({ homeTitle, isSiteMapClosed, onUpdateIsSiteMapClosed }) {
  function updateIsSiteMapClosed() {
    onUpdateIsSiteMapClosed();
  }

  return (
    <>
    <header className="fixed top-0 left-0 h-16 w-screen z-50 bg-beige lg:h-20">
      <div className="flex justify-between px-2 pt-1 sm:justify-center lg:h-full lg:items-center">
        <Link href="/">
          <a>
            <h1 className="font-cirrus text-logoSmall lg:text-5xl">{homeTitle}</h1>
          </a>
        </Link>

        <div onClick={updateIsSiteMapClosed} className="w-12 cursor-pointer sm:fixed sm:right-3 lg:right-6 lg:top-3">
          <SiteMapIcons closed={isSiteMapClosed} />
        </div>
      </div>
    </header>
    </>
  );
}
