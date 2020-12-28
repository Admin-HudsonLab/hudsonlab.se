import ToReactMarkdown from "./toReactMarkdown";

export default function Post({ post }) {
  return (
    <article id={post.sys.id}>
      <h4>{post.fields.title}</h4>
      <code>{post.fields.date}</code>
      <ToReactMarkdown children={post.fields.content} />
    </article>
  );
}
