import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import ToReactMarkdown from "./toReactMarkdown";

export default function Software({ software }) {
  const authorAsString = software.author;
  const [authorOrAuthors, setAuthorOrAuthors] = useState("Author");

  useEffect(() => {
    if (authorAsString.includes(",")) {
      setAuthorOrAuthors("Authors");
    }
  });

  let softwareLogoElement;
  if (software.logo) {
    const alternativeText = software.logo.fields.description ? software.logo.fields.description : software.logo.fields.title; 
    softwareLogoElement = (
      <div className="flex flex-row justify-center w-auto md:justify-center md:mb-4 md:pt-2">
        <div className="w-44 md:w-64 flex justify-center">
          <Image
            src={`https:${software.logo.fields.file.url}`}
            alt={alternativeText ? alternativeText : null}
            width={software.logo.fields.file.details.image.width}
            height={software.logo.fields.file.details.image.height}
            className="w-full max-h-full"
          />
        </div>
      </div>
    );
  }

  return (
    <section id={software.slug} className="anchor-scroll small-section border-yellow-400">
      <div className="mb-3">
        <h3 className="header-medium">{software.name}</h3>
        {software.subtitle ? <h4 className="italic font-semibold font-header">{software.subtitle}</h4> : null}
      </div>
      <ToReactMarkdown children={software.description} additionalClassNames="mb-2 2xl:mb-4" />
      <div className="mt-2 2xl:text-lg">
        <p>
          {authorOrAuthors}: <strong>{software.author}</strong>
        </p>
        <p className="mb-4">
          Repository:{" "}
          <Link href={software.linkSoftware}>
            <a target="_blank">
              <strong className="break-all">{software.linkSoftware}</strong>
            </a>
          </Link>
        </p>
        {softwareLogoElement ? softwareLogoElement : null}
      </div>
    </section>
  );
}
