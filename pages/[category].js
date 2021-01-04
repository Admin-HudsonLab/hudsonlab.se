import CommitsChart from "../components/commits-chart";
import Container from "../components/container";
import Layout from "../components/layout";
import Section from "../components/section";
import ToReactMarkdown from "../components/toReactMarkdown";
import { getCategoriesSlugs, getCategoryEntriesBy, getLayoutData, getEntriesBySysId } from "../lib/api-contentful";
import { getCommitsActivityData, getMockCommitsActivityData } from "../lib/api-github";

export default function Category({ homeTitle, categories, categoryTitle, introduction, sections, commitsActivity }) {

  const sectionsAsElements = sections.map((section) => {
    return <Section section={section} key={section.fields.slug} />;
  });

  return (
    <>
      <Layout homeTitle={homeTitle} categories={categories}>
        <Container>
          <h2>{categoryTitle}</h2>
          {introduction ? <ToReactMarkdown children={introduction} /> : null}
          {categoryTitle === "Softwares" ? <CommitsChart commitsActivity={commitsActivity} /> : null}
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

  // only for '/softwares', the GitHub Commits Activity 
  const commitsActivityRedmagpie = params.category === "softwares" ? await getMockCommitsActivityData("Asplund-Samuelsson", "redmagpie") : null;
  const commitsActivityGenomeScaleModels = params.category === "softwares" ? await getMockCommitsActivityData("m-jahn", "genome-scale-models") : null;

  return {
    props: {
      homeTitle: layoutData.homeTitle,
      categories: layoutData.categories,
      categoryTitle: categoryFields.title,
      introduction: categoryFields.introduction ?? null,
      sections: sectionsFields ?? null,
      commitsActivity: { commitsActivityRedmagpie, commitsActivityGenomeScaleModels },
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
