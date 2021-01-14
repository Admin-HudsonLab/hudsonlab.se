import ToReactMarkdown from "./toReactMarkdown";

export default function Content({ content }) {
  return <ToReactMarkdown children={content.fields.content} />;
}
