import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";

export default function ToReactMarkdown({ children, additionalClassNames }) {

  return (
    <ReactMarkdown
      plugins={[gfm]}
      children={children}
      className={`prose font-sans${additionalClassNames ? " " + additionalClassNames : ""}`}
    />
  );
}
