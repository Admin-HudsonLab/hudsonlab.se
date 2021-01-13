import { getHomeData } from "../lib/api-contentful";
import Link from "next/link";
import Layout from "../components/layout";

export default function Home({ homeTitle, categories }) {
  const categoriesAsElementsInHome = categories.map((category) => {
    return (
      <div key={category.slug} className="text-center font-ibm font-semibold">
        <Link href={`/${category.slug}`}>
          <a>{category.title}</a>
        </Link>
      </div>
    );
  });

  return (
    <Layout homeTitle={homeTitle} isHome>
      <div className="flex flex-col justify-center min-h-screen space-y-4">
        <div className="text-center">
          <Link href="/">
            <a className="font-cirrus text-9xl">{homeTitle}</a>
          </Link>
        </div>
        {categoriesAsElementsInHome}
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
