import Head from "next/head";
import { useState } from "react";
import MainContainer from "./main-container";
import Header from "./header";
import SiteMap from "./sitemap";

export default function Layout({ children, homeTitle, metaData, isHome, siteMap, categorySlug, categoryTitle }) {
  const headAsElement = (
    <Head>
      <title>
        {homeTitle}
        {categoryTitle ? `: ${categoryTitle}` : null}
      </title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      <meta name="title" content={metaData.metaTitle} />
      <meta name="description" content={metaData.metaDesc} />

      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://www.hudsonlab.se" />
      <meta property="og:title" content={metaData.metaTitle} />
      <meta property="og:description" content={metaData.metaDesc} />
      <meta property="og:image" content={"https:" + metaData.metaImg.metaImgUrl} />
      <meta property="og:image:type" content={metaData.metaImg.metaImgContentType} />
      <meta property="og:image:width" content={metaData.metaImg.metaImgWidth} />
      <meta property="og:image:height" content={metaData.metaImg.metaImgHeight} />
      <meta property="og:image:alt" content={metaData.metaTitle} />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://www.hudsonlab.se" />
      <meta property="twitter:title" content={metaData.metaTitle} />
      <meta property="twitter:description" content={metaData.metaDesc} />
      <meta property="twitter:image" content={"https:" + metaData.metaImg.metaImgUrl} />
      <meta property="twitter:image:alt" content={metaData.metaTitle} />
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
        <main className="container mx-auto">{children}</main>
      </>
    );
  }

  return (
    <>
      {headAsElement}
      <div className="container mx-auto md:max-w-screen-sm">
        <Header homeTitle={homeTitle} isSiteMapClosed={isSiteMapClosed} onUpdateIsSiteMapClosed={toggleSiteMap} />
        {isSiteMapClosed ? null : siteMapAsElement}
        <div id="visibility-container" className={isSiteMapClosed ? null : "invisible"}>
          <MainContainer categorySlug={categorySlug}>{children}</MainContainer>
        </div>
      </div>
    </>
  );
}
