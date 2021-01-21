export default function MainContainer({ children, categorySlug }) {
  return (
    <main
      id={categorySlug}
      className="min-h-full z-30 py-4 px-2 relative top-16 lg:top-20 2xl:px-0 2xl:flex 2xl:flex-row 2xl:flex-nowrap 2xl:justify-center"
    >
      {children}
    </main>
  );
}
