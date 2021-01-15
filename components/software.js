import Image from "next/image";
import Link from "next/link";
import ToReactMarkdown from "./toReactMarkdown";

export default function Software({ software }) {
  let softwareLogoElement;
  if (software.logo) {
    softwareLogoElement = (
      <div className="flex flex-row justify-center w-full">
        <div className="w-44 flex justify-center">
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
    <section id={software.slug} className="mt-8 last:mb-8 pb-4 border-b-2 border-yellow-400">
      <div className="mb-3">
        <h3 className="header-medium">{software.name}</h3>
        {software.subtitle ? <h4 className="italic font-semibold">{software.subtitle}</h4> : null}
      </div>
      <ToReactMarkdown children={software.description} />
      <div className="mt-2">
        <p>
          Author: <strong>{software.author}</strong>
        </p>
        <p className="mb-4">
          Repository: <Link href={software.linkSoftware}>
          <strong className="break-all"><a target="_blank">{software.linkSoftware}</a></strong>
          </Link>
        </p>
        {softwareLogoElement ? softwareLogoElement : null}
      </div>
    </section>
  );
}
