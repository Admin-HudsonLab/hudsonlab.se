import { getLayoutData } from "../lib/api";
import Layout from "../components/layout"

export default function Home({ title, categories }) {

  return (
    <Layout title={title} categories={categories} >


    </Layout>
  );
}

export async function getStaticProps() {

  const layoutData = await getLayoutData();


  return {
    props: { title: layoutData.title, categories: layoutData.categories },
  };
}

