import Head from "next/head";
import { useState } from "react";
import MainContainer from "./container";
import Header from "./header";
import SiteMap from "./sitemap";

export default function Layout({ children, homeTitle, isHome, siteMap }) {
  const headAsElement = (
    <Head>
      <title>{homeTitle}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
  );

  const [isSiteMapClosed, setIsSiteMapClosed] = useState(true);

  function toggleSiteMap() {
    isSiteMapClosed ? setIsSiteMapClosed(false) : setIsSiteMapClosed(true);
  }

  const siteMapAsElement = <SiteMap siteMap={siteMap} />;

  if (isHome) {
    return (
      <>
        {headAsElement}
        <main>{children}</main>
      </>
    );
  }

  return (
    <>
      {headAsElement}
      <Header homeTitle={homeTitle} isSiteMapClosed={isSiteMapClosed} onUpdateIsSiteMapClosed={toggleSiteMap} />
      {isSiteMapClosed ? <MainContainer>{children}</MainContainer> : siteMapAsElement}
    </>
  );
}
