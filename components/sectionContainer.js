export default function SectionContainer({ children, title, slug }) {

  return (
    <section id={slug} className="anchor-scroll pt-3 pb-1 mb-6 last:mb-8 md:mb-2">
      <h3 className="sectiontitle text-2xl font-ibm font-semibold rounded-lg -mx-1 px-1 py-0.5 mb-4 lg:text-2.5xl lg:px-2 lg:-mx-2 lg:py-1">{title}</h3>
      {children}
    </section>
  );
}
