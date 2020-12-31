import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";

function ImageMD(props) {
  console.log(props);
  return (
    <figure id="img-container" className="flex flex-row flex-wrap justify-center">
      <img src={`https:${props.src}`} alt={props.alt} className="flex-0" />
      <figcaption className="italic font-bold w-full">{props.alt}</figcaption>
    </figure>
  );
}

export default function ToReactMarkdown({ children, additionalClassNames }) {
  /* console.log(ReactMarkdown.renderers); */

  return (
    <ReactMarkdown
      plugins={[gfm]}
      children={children}
      className={`prose${additionalClassNames ? " " + additionalClassNames : ""}`}
      renderers={{ image: ImageMD }}
    />
  );
}
