import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import Container from "../components/container";
import Layout from "../components/layout";
import Section from "../components/section";
import { getCategoriesSlugs, getCategoryEntriesBy, getLayoutData, getEntriesBySysId } from "../lib/api";

export default function Category({ homeTitle, categories, categoryTitle, introduction, sectionsFields, contentType }) {

  const sectionsAsElement = sectionsFields.map((field) => {
    if (contentType !== "section") {
      return <Section title={field.title} slug={field.slug} field={field} key={field.slug} contentType={contentType} />;
    }
      return <Section title={field.title} slug={field.slug} content={field.content} key={field.slug} />;
  });

  return (
    <>
      <Layout homeTitle={homeTitle} categories={categories}>
        <Container>
          <h2>{categoryTitle}</h2>
          {introduction ? <ReactMarkdown plugins={[gfm]} children={introduction} className="prose" /> : null}
          {sectionsAsElement}
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

  const sectionsFieldsWithContent = await getEntriesBySysId(categoryFields.sections);
  const contentType = sectionsFieldsWithContent[0].sys.contentType.sys.id;

  const fieldsOnly = sectionsFieldsWithContent.map((item) => {
    return item.fields;
  });

  return {
    props: {
      homeTitle: layoutData.homeTitle,
      categories: layoutData.categories,
      categoryTitle: categoryFields.title,
      introduction: categoryFields.introduction ?? null,
      sectionsFields: fieldsOnly ?? null,
      contentType,
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
