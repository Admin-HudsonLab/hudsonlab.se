import Link from "next/link";
import SiteMapIcons from "./svg/sitemap-icons";

export default function Header({ homeTitle, isSiteMapClosed, onUpdateIsSiteMapClosed }) {
  function updateIsSiteMapClosed() {
    onUpdateIsSiteMapClosed();
  }

  return (
    <>
    <div className="h-16 w-screen z-30 bg-transparent"></div>
    <header className="fixed top-0 left-0 h-16 w-screen z-50 bg-beige">
      <div className="flex justify-between px-2 pt-1 sm:justify-center">
        <Link href="/">
          <a>
            <h1 className="font-cirrus text-logoSmall">{homeTitle}</h1>
          </a>
        </Link>

        <div onClick={updateIsSiteMapClosed} className="w-12 cursor-pointer sm:fixed sm:right-3">
          <SiteMapIcons closed={isSiteMapClosed} />
        </div>
      </div>
    </header>
    </>
  );
}
