export default function SectionContainer({ children, title, slug }) {


/*   HERE FIX FOR SOFTWARES AND MORE */
  return (
    <section key={slug} id={slug} className="pt-3 pb-1">
      <h3 className="sectiontitle font-ibm font-semibold text-2xl rounded-lg -mx-1 px-2 py-0.5 mb-4">{title}</h3>
      {children}
    </section>
  );
}
