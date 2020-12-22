export default function Section({ title, content, slug }) {

  return (
    <section key={slug}>
      <h3>{title}</h3>
      <p>{content}</p>
    </section>
  );
}
