export default function SectionContainer({ children, title, slug }) {
  return (
    <section key={slug} id={slug}>
      <h3>{title}</h3>
      {children}
    </section>
  );
}
