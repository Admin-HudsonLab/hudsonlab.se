export default function SectionContainer({ children, title, slug }) {


/*   HERE START TO FIX BACKGROUND COLORS FOR TITLE H3 */
  return (
    <section key={slug} id={slug}>
      <h3 className="font-ibm font-semibold text-2xl bg-beige rounded-lg -mx-1 px-2 py-0.5">{title}</h3>
      {children}
    </section>
  );
}
