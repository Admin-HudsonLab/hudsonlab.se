import { getHomeData } from "../lib/api-contentful";
import Link from "next/link";
import Layout from "../components/layout";

export default function Home({ homeTitle, metaData, categories }) {
  const categoriesAsElementsInHome = categories.map((category) => {
    return (
      <div key={category.slug} className="lg:w-1/4 lg:mb-10">
        <Link href={`/${category.slug}`}>
          <a id={`${category.slug}-home-nav`} className="lg:hover:underline">
            {category.title}
          </a>
        </Link>
      </div>
    );
  });

  return (
    <Layout homeTitle={homeTitle} metaData={metaData} isHome>
      <div className="min-h-screen flex flex-col justify-start sm:justify-center text-center space-y-10">
        <div className="mt-10 sm:mt-0">
          <h1 className="font-cirrus text-5xl lg:text-8xl">{homeTitle}</h1>
        </div>
        <div className="header-light text-2.5xl space-y-2 lg:space-y-0 lg:flex lg:flex-wrap lg:justify-center lg:w-screen-lg lg:mx-auto">
          {categoriesAsElementsInHome}
        </div>
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
