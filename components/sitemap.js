import Link from "next/link";

export default function SiteMap({ siteMap, onUpdateIsSiteMapClosed }) {
  function updateIsSiteMapClosed() {
    onUpdateIsSiteMapClosed();
  }

  const siteMapAsListElements = siteMap.map((category) => {
    // Sections
    const sectionsAsListElements = category.categorySections.map((section) => {
      return (
        <li key={`${section.sectionSlug}-sitemap`}>
          <Link href={`/${category.categorySlug}#${section.sectionSlug}`} scroll={false}>
            <a className="text-base lg:hover:underline lg:font-normal" onClick={updateIsSiteMapClosed}>
              {section.sectionTitle}
            </a>
          </Link>
        </li>
      );
    });

    // Categories
    return (
      <li id={`${category.categorySlug}-sitemap`} key={`${category.categorySlug}-sitemap`} className="lg:w-1/4 lg:pb-10">
        <Link href={`/${category.categorySlug}`}>
          <a className="text-xl header lg:hover:underline lg:text-2xl" onClick={updateIsSiteMapClosed}>
            {category.categoryTitle}
          </a>
        </Link>
        <ul className="hidden lg:block lg:mt-0.5">{sectionsAsListElements}</ul>
      </li>
    );
  });

  return (
    <div className="fixed w-screen bg-beige top-16 h-screen z-40 md:left-0 md:right-0 lg:top-20">
      <nav className="py-2 px-4 font-ibm md:flex md:flex-wrap md:justify-center lg:flex-col lg:content-center">
        <ul className="space-y-4 mb-10 md:w-full md:mt-8 md:text-center lg:mb-5 lg:flex lg:flex-wrap lg:mx-auto lg:justify-center lg:space-y-0 lg:max-w-4xl">{siteMapAsListElements}</ul>
        <div className="flex flex-col space-y-5 md:w-auto md:self-center md:space-y-8 md:mt-3 lg:mt-0 lg:flex-row lg:w-full lg:justify-center lg:space-y-0 lg:pt-5">
          <Link href="https://www.kth.se/">
            <a target="_blank" className="block lg:order-2 md:w-60 lg:w-72 md:flex md:justify-center lg:-mr-3">
              <div id="kth-logo container" className="h-14 w-60 flex flex-row justify-start lg:justify-center space-x-2">
                <img src="/svg/kth-logo.svg" className="h-full w-auto" />

                <div className="text-sm lg:hover:underline">School of Engineering Sciences in Biotechnology, Chemistry and Health</div>
              </div>
            </a>
          </Link>
          <Link href="https://www.scilifelab.se/">
            <a target="_blank" className="block lg:order-1 md:w-60 lg:w-72 md:flex md:justify-center lg:pl-10">
              <div id="scilifelab-logo container" className="h-10">
                <img src="/svg/scilifelab-logo.svg" className="h-full w-auto" />
              </div>
            </a>
          </Link>
        </div>
      </nav>
    </div>
  );
}
