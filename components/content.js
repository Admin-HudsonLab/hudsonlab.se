import ToReactMarkdown from "./toReactMarkdown";

export default function Content({ content }) {
  /* console.log(content); */
  return <ToReactMarkdown children={content.fields.content} />;
}
