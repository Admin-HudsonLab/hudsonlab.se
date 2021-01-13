import Link from "next/link";

export default function SiteMap({ siteMap }) {
  const siteMapAsListElements = siteMap.map((category) => {
    const sectionsAsListElements = category.categorySections.map((section) => {
      return (
        <li key={section.sectionSlug}>
          <Link href={`/${category.categorySlug}#${section.sectionSlug}`}>
            <a className="text-base">{section.sectionTitle}</a>
          </Link>
        </li>
      );
    });

    return (
      <li key={category.categorySlug}>
        <Link href={`/${category.categorySlug}`}>
          <a className="text-xl">{category.categoryTitle}</a>
        </Link>
        <ul>{sectionsAsListElements}</ul>
      </li>
    );
  });

  return (
    <div className="px-2 font-ibm">
      <ul className="space-y-4">{siteMapAsListElements}</ul>
      <div className="h-20 flex flex-row">
        <figure>
          <img src="/svgs/kth-logo.svg" />
          <figcaption>School of Engineering Sciences in Biotechnology, Chemistry and Health</figcaption>
        </figure>
        <img src="/svgs/scilifelab-logo.svg" />
      </div>
    </div>
  );
}
