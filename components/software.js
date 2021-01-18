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
    softwareLogoElement = (
      <div className="flex flex-row justify-center w-full md:justify-end">
        <div className="w-44 md:w-52 flex justify-center md:justify-end">
          <Image
            src={`https:${software.logo.fields.file.url}`}
            width={software.logo.fields.file.details.image.width}
            height={software.logo.fields.file.details.image.height}
            className="w-full max-h-full"
          />
        </div>
      </div>
    );
  }

  return (
    <section id={software.slug} className="small-section border-yellow-400">
      <div className="mb-3 md:flex">
        <div className="md:w-2/3">
        <h3 className="header-medium">{software.name}</h3>
        {software.subtitle ? <h4 className="italic font-semibold font-header md:float-left">{software.subtitle}</h4> : null}
        </div>
        <div className="hidden md:block md:w-1/3">{softwareLogoElement ? softwareLogoElement : null}</div>
      </div>
      {/* HERE ?? */}
      <ToReactMarkdown children={software.description} additionalClassNames="float-left" />
      <div className="mt-2">
        <p>
          {authorOrAuthors}: <strong>{software.author}</strong>
        </p>
        <p className="mb-4">
          Repository:{" "}
          <Link href={software.linkSoftware}>
            <strong className="break-all">
              <a target="_blank">{software.linkSoftware}</a>
            </strong>
          </Link>
        </p>
        <div className="md:hidden">{softwareLogoElement ? softwareLogoElement : null}</div>
      </div>
    </section>
  );
}
