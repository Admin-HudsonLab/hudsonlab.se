import Head from "next/head";
import { useState } from "react";
import MainContainer from "./main-container";
import Header from "./header";
import SiteMap from "./sitemap";

export default function Layout({ children, homeTitle, isHome, siteMap, categorySlug, categoryTitle }) {
  const headAsElement = (
    <Head>
      <title>{homeTitle}{categoryTitle ? `: ${categoryTitle}` : null}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
  );
  const [isSiteMapClosed, setIsSiteMapClosed] = useState(true);

  function toggleSiteMap() {
    isSiteMapClosed ? setIsSiteMapClosed(false) : setIsSiteMapClosed(true);
  }

  const siteMapAsElement = <SiteMap siteMap={siteMap} onUpdateIsSiteMapClosed={toggleSiteMap} />;

  if (isHome) {
    return (
      <>
        {headAsElement}
        <main className="container bg-beige">{children}</main>
      </>
    );
  }

  return (
    <>
      {headAsElement}
      <div className="container">
        <Header homeTitle={homeTitle} isSiteMapClosed={isSiteMapClosed} onUpdateIsSiteMapClosed={toggleSiteMap} />
        {isSiteMapClosed ? null : siteMapAsElement}
        <div id="visibility-container" className={isSiteMapClosed ? null : "invisible"}>
        <MainContainer categorySlug={categorySlug}>{children}</MainContainer>
        </div>
      </div>
    </>
  );
}
