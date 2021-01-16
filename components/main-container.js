export default function MainContainer({ children, categorySlug }) {
  return (
    <main id={categorySlug} className="min-h-full z-30 py-4 px-2">
      {children}
    </main>
  );
}
