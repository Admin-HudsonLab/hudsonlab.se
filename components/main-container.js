export default function MainContainer({ children, categorySlug }) {
  return (
    <main id={categorySlug} className="min-h-full z-30 py-4 px-2 relative top-16 lg:top-20">
      {children}
    </main>
  );
}
