import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";

export function RMImage(props) {
  return <img src={`https://${props.src}`} alt={props.alt} className="object-contain h-80 md:h-96 w-full mx-auto" />;
}

export function handleLinkTargets(url) {
  if (
    url.startsWith("./") ||
    url.startsWith("/research") ||
    url.startsWith("/softwares") ||
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
