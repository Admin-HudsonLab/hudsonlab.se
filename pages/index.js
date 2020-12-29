import { getLayoutData } from "../lib/api-contentful";
import Layout from "../components/layout";
import Container from "../components/container";
import { getCommitsData } from "../lib/api-github";

export default function Home({ homeTitle, categories }) {
  return (
    <Layout homeTitle={homeTitle} categories={categories}>
      <Container></Container>
    </Layout>
  );
}

export async function getStaticProps() {
  const layoutData = await getLayoutData();
  const commitsData = await getCommitsData();

  console.log(commitsData);

  return {
    props: { homeTitle: layoutData.homeTitle, categories: layoutData.categories },
  };
}
