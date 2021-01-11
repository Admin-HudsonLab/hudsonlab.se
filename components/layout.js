import Link from "next/link";
import Head from "next/head";
import Header from "./header";

export default function Layout({ children, homeTitle, categories, isHome }) {

  const headAsElement = (
    <Head>
      <title>{homeTitle}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
  );

  if (isHome) {
    return (
      <>
        {headAsElement}
        <main>
          {children}
        </main>
      </>
    );
  }

  return (
    <>
      {headAsElement}
      <Header homeTitle={homeTitle} categories={categories} />
      <main>{children}</main>
    </>
  );
}
