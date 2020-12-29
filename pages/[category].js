import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import Container from "../components/container";
import Layout from "../components/layout";
import Section from "../components/section";
import ToReactMarkdown from "../components/toReactMarkdown";
import { getCategoriesSlugs, getCategoryEntriesBy, getLayoutData, getEntriesBySysId } from "../lib/api-contentful";

export default function Category({ homeTitle, categories, categoryTitle, introduction, sections }) {

  const sectionsAsElements = sections.map((section) => {
      return <Section section={section} key={section.fields.slug} />;
  });

  return (
    <>
      <Layout homeTitle={homeTitle} categories={categories}>
        <Container>
          <h2>{categoryTitle}</h2>
          {introduction ? <ToReactMarkdown children={introduction}/> : null}
          {sectionsAsElements}
        </Container>
      </Layout>
    </>
  );
}

export async function getStaticProps({ params }) {
  // get Layout Data for header
  const layoutData = await getLayoutData();

  // get data for each category
  const slugFromParams = params.category;
  const categoryItem = await getCategoryEntriesBy(slugFromParams);
  const categoryFields = categoryItem.fields;

  const sectionsFields = await getEntriesBySysId(categoryFields.sections);

  return {
    props: {
      homeTitle: layoutData.homeTitle,
      categories: layoutData.categories,
      categoryTitle: categoryFields.title,
      introduction: categoryFields.introduction ?? null,
      sections: sectionsFields ?? null,
    },
  };
}

export async function getStaticPaths() {
  const paths = await getCategoriesSlugs();

  return {
    paths,
    fallback: false,
  };
}
