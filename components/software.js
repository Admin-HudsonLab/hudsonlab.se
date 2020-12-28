import Link from "next/link";
import ToReactMarkdown from "./toReactMarkdown";

export default function Software({ software }) {
  return (
    <section id={software.slug}>
      <h3>{software.name}</h3>
      <ToReactMarkdown children={software.description}/>
      <p>Author: {software.author}</p>
      <Link href={software.link}>
        <a>{software.link}</a>
      </Link>
    </section>
  );
}
