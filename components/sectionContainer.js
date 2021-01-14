export default function SectionContainer({ children, title, slug }) {
  return (
    <section key={slug} id={slug}>
      <h3 className="font-ibm font-semibold text-xl bg-blue-200 rounded-lg px-2 py-0.5 ">{title}</h3>
      {children}
    </section>
  );
}
