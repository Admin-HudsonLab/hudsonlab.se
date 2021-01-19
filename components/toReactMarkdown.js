import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";

export function RMImage(props) {
  return <img src={`https://${props.src}`} alt={props.alt} className="object-contain h-80 md:h-96 w-full mx-auto" />;
}

export default function ToReactMarkdown({ children, additionalClassNames }) {

  return (
    <ReactMarkdown
      plugins={[gfm]}
      children={children}
      className={`prose lg:prose-lg font-sans${additionalClassNames ? " " + additionalClassNames : ""}`}
      renderers={{ image: RMImage }}
      linkTarget="_blank"
    />
  );
}
