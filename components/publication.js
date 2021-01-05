import Link from "next/link";
import { useState } from "react";
import ToReactMarkdown from "./toReactMarkdown";

export default function Publication({ publication }) {

  let aboutButtonAsElement;

  if (publication.about) {
    aboutButtonAsElement = <><button type="button" onClick={toggleShowAbout} className="bg-blue-100 ring rounded px-1 mb-2">About</button>
    <br></br></>
  }

  const [showAbout, setShowAbout] = useState(false);

  function toggleShowAbout() {
    !showAbout ? setShowAbout(true) : setShowAbout(false);
  }

  return (
    <section id={publication.slug} className="border-b-4 pb-6 border-gray-300">
      <h3>
        <Link href={publication.link}><a target="_blank">{publication.title}</a></Link>
        <span className="font-normal"> ({publication.year})</span>
      </h3>
      <ul>
        <li>Authors: {publication.authors}</li>
        <li>Sources: {publication.source}</li>
      </ul>
      {aboutButtonAsElement ? aboutButtonAsElement : null}
      {showAbout ? (
        <>
          <ToReactMarkdown children={publication.about} additionalClassNames="bg-gray-100 border-black border p-2 rounded" />
          <br></br>
        </>
      ) : null}
      <Link href={publication.link}>
        <a target="_blank">Full Paper</a>
      </Link>
    </section>
  );
}
