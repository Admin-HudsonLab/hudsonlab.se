import Image from "next/image";
import Link from "next/link";
import ToReactMarkdown from "./toReactMarkdown";

export default function Software({ software }) {
  let subtitleElement;
  if (software.subtitle) {
    subtitleElement = <h4>{software.subtitle}</h4>;
  }

  let linkPublicationElement;
  if (software.linkPublication) {
    linkPublicationElement = (
      <li>
        <Link href={software.linkPublication}>
          <a target="_blank">{software.linkPublication}</a>
        </Link>
      </li>
    );
  }
  /* console.log(software.logo); */
  let softwareLogoElement;
  if (software.logo) {
    softwareLogoElement = (
      <div className="w-1/2">
        <Image
          src={`https:${software.logo.fields.file.url}`}
          width={software.logo.fields.file.details.image.width}
          height={software.logo.fields.file.details.image.height}
        />
      </div>
    );
  }

  return (
    <section id={software.slug}>
      <h3>{software.name}</h3>
      {subtitleElement}
      <ToReactMarkdown children={software.description} />
      <p>Author: {software.author}</p>
      <ul>
        <li>
          <Link href={software.linkSoftware}>
            <a target="_blank">{software.linkSoftware}</a>
          </Link>
        </li>
        {linkPublicationElement}
      </ul>
      {softwareLogoElement}
    </section>
  );
}
