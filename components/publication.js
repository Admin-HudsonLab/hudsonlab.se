import Link from "next/link";
import { useState } from "react";
import ToReactMarkdown from "./toReactMarkdown";

export default function Publication({ publication }) {
  let aboutButtonAsElement;
  if (publication.about) {
    aboutButtonAsElement = (
      <>
        <button
          type="button"
          onClick={toggleShowAbout}
          className="bg-indigo-600 border-indigo-900 text-gray-50 border rounded-lg shadow px-3 py-1 mb-2 font-ibm font-semibold hover:bg-indigo-800 mr-3"
        >
          About
        </button>
      </>
    );
  }

  const [showAbout, setShowAbout] = useState(false);

  function toggleShowAbout() {
    !showAbout ? setShowAbout(true) : setShowAbout(false);
  }

  return (
    <section id={publication.slug} className="anchor-scroll small-section border-indigo-700">
      <h3 className="mb-3 header-medium break-words">
        <Link href={publication.link}>
          <a target="_blank" className="no-underline hover:underline">
            {publication.title}
          </a>
        </Link>
        <span className="font-normal"> ({publication.year})</span>
      </h3>
      <div className="my-2 break-words md:mb-4">
        <p>
          Authors: <strong>{publication.authors}</strong>
        </p>
        <p>
          Source: <strong>{publication.source}</strong>
        </p>
      </div>
      <div>
        {aboutButtonAsElement ? aboutButtonAsElement : null}
        <Link href={publication.link}>
          <a target="_blank">
            Full Paper
            <img src="/svg/icons/external-link.svg" alt="external link icon" className="inline pl-1" />
          </a>
        </Link>
      </div>
      <div>
        {showAbout ? (
          <>
            <ToReactMarkdown
              children={publication.about}
              additionalClassNames="bg-indigo-100 shadow p-2 rounded-lg leading-normal md:py-3 md:px-4 md:w-10/12"
            />
          </>
        ) : null}
      </div>
    </section>
  );
}
