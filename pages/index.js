import { getHomeData } from "../lib/api-contentful";
import Link from "next/link";
import Layout from "../components/layout";

export default function Home({ homeTitle, categories }) {
  const categoriesAsElementsInHome = categories.map((category) => {
    return (
      <div key={`${category.slug}-home-nav`}>
        <Link href={`/${category.slug}`}>
          <a id={`${category.slug}-home`} className="title">{category.title}</a>
        </Link>
      </div>
    );
  });

  return (
    <Layout homeTitle={homeTitle} isHome>
      <div className="min-h-screen flex flex-col justify-start text-center space-y-10">
        <div className="mt-10">
          <Link href="/">
            <a className="font-cirrus text-5xl"><h1>{homeTitle}</h1></a>
          </Link>
        </div>
        <div className="font-light font-ibm text-homeNavSmall space-y-2">
        {categoriesAsElementsInHome}
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const homeData = await getHomeData();
  /* console.log(homeData); */
  return {
    props: { homeTitle: homeData.homeTitle, categories: homeData.categories },
  };
}
