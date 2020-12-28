import Link from "next/link";
import ToReactMarkdown from "./toReactMarkdown";

export default function Publication({ publication }) {

  return (
    <section id={publication.slug}>
      <h3>
        {publication.title}
        <span className="font-normal"> ({publication.year})</span>
      </h3>
      <ul>
        <li>{publication.authors}</li>
        <li>{publication.source}</li>
      </ul>
      <ToReactMarkdown children={publication.about} additionalClassNames="border-black border p-2 rounded" />
      <br></br>
      <Link href={publication.link}>
        <a>{publication.link}</a>
      </Link>
    </section>
  );
}
