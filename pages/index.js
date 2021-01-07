import { getLayoutData } from "../lib/api-contentful";
import Layout from "../components/layout";
import Container from "../components/container";

export default function Home({ homeTitle, categories }) {
  const imageFileName = [];

  for (let index = 0; index < 19; index++) {
    imageFileName.push(`square-${index}.jpg`);
  }

  const allImagesAsElements = imageFileName.map((image, index) => {
    return <img src={`/images/${image}`} key={index} className="w-2/12" />;
  });

  return (
    <Layout homeTitle={homeTitle} categories={categories}>
      <div className="flex flex-row flex-wrap">{allImagesAsElements}</div>
    </Layout>
  );
}

export async function getStaticProps() {
  const layoutData = await getLayoutData();

  return {
    props: { homeTitle: layoutData.homeTitle, categories: layoutData.categories },
  };
}
