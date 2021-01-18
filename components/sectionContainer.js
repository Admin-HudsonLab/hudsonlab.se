export default function SectionContainer({ children, title, slug }) {

  return (
    <section id={slug} className="pt-3 pb-1 mb-6 last:mb-8">
      <h3 className="sectiontitle text-2xl font-ibm font-semibold rounded-lg -mx-1 px-1 py-0.5 mb-4">{title}</h3>
      {children}
    </section>
  );
}
