import src from "@tailwindcss/typography";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";

export function RMImage(props) {
  // Handle SVG to resize them properly (See page /research).
  const srcString = props.src.toLowerCase();
  if (srcString.endsWith(".svg")) {
    return <img src={`https://${props.src}`} alt={props.alt} className="object-contain h-80 sm:h-96 mx-auto" />;
  }
  return (
    <img
      src={`https://${props.src}`}
      alt={props.alt}
      className="object-scale-down min-h-min w-full max-h-96 sm:w-11/12 mx-auto"
    />
  );
}

export function handleLinkTargets(url) {
  // Handle internal vs external links
  if (
    url.startsWith("./") ||
    url.startsWith("/research") ||
    url.startsWith("/software") ||
    url.startsWith("/resources") ||
    url.startsWith("/publications") ||
    url.startsWith("/people") ||
    url.startsWith("/news") ||
    url.startsWith("/funding")
  ) {
    return "_self";
  } else {
    return "_blank";
  }
}

export default function ToReactMarkdown({ children, additionalClassNames }) {
  return (
    <ReactMarkdown
      plugins={[gfm]}
      children={children}
      className={`prose lg:prose-lg 2xl:prose-xl font-sans${additionalClassNames ? " " + additionalClassNames : ""}`}
      renderers={{ image: RMImage }}
      linkTarget={handleLinkTargets}
    />
  );
}
