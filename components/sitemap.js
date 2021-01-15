import Link from "next/link";

export default function SiteMap({ siteMap, onUpdateIsSiteMapClosed }) {

  function updateIsSiteMapClosed() {
    onUpdateIsSiteMapClosed();
  }

  const siteMapAsListElements = siteMap.map((category) => {
    const sectionsAsListElements = category.categorySections.map((section) => {
      return (
        <li key={section.sectionSlug}>
          <Link href={`/${category.categorySlug}#${section.sectionSlug}`} scroll={false}>
            <a className="text-base" onClick={updateIsSiteMapClosed}>{section.sectionTitle}</a>
          </Link>
        </li>
      );
    });

    return (
      <li id={`${category.categorySlug}`} className="sitemap" key={category.categorySlug}>
        <Link href={`/${category.categorySlug}`}>
          <a className="text-xl" onClick={updateIsSiteMapClosed}>{category.categoryTitle}</a>
        </Link>
        <ul className="hidden">{sectionsAsListElements}</ul>
      </li>
    );
  });

  return (
    <div className="fixed w-screen bg-beige top-16 h-screen z-40">
      <nav className="py-2 px-4 font-ibm">
        <ul className="space-y-4 mb-10">{siteMapAsListElements}</ul>
        <div className="flex flex-col space-y-5">
          <div id="kth-logo container" className="h-14 w-60 flex flex-row justify-start space-x-2">
            <img src="/svg/kth-logo.svg" className="h-full w-auto"/>
            <div className="text-sm">School of Engineering Sciences in Biotechnology, Chemistry and Health</div>
          </div>
          <div id="scilifelab-logo container" className="h-10">
          <img src="/svg/scilifelab-logo.svg" className="h-full w-auto"/>
          </div>
        </div>
      </nav>
    </div>
  );
}
