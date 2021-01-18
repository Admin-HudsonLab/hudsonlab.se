import { getHomeData } from "../lib/api-contentful";
import Link from "next/link";
import Layout from "../components/layout";

export default function Home({ homeTitle, metaData, categories }) {
  const categoriesAsElementsInHome = categories.map((category) => {
    return (
      <div key={category.slug}>
        <Link href={`/${category.slug}`}>
          <a id={`${category.slug}-home-nav`}>{category.title}</a>
        </Link>
      </div>
    );
  });

  return (
    <Layout homeTitle={homeTitle} metaData={metaData} isHome>
      <div className="min-h-screen flex flex-col justify-start text-center space-y-10">
        <div className="mt-10">
          <Link href="/">
            <a className="font-cirrus text-5xl">
              <h1>{homeTitle}</h1>
            </a>
          </Link>
        </div>
        <div className="header-light text-homeNavSmall space-y-2">{categoriesAsElementsInHome}</div>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const homeData = await getHomeData();
  return {
    props: { homeTitle: homeData.homeTitle, categories: homeData.categories, metaData: homeData.metaData },
  };
}
