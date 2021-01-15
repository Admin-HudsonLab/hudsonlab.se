export default function SectionContainer({ children, title, slug }) {

  return (
    <section key={slug} id={slug} className="pt-3 pb-1 mb-6 last:mb-10">
      <h3 className="sectiontitle font-semibold text-2xl rounded-lg -mx-1 px-1 py-0.5 mb-4">{title}</h3>
      {children}
    </section>
  );
}
