import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import Container from "../components/container";
import Layout from "../components/layout";
import Section from "../components/section";
import { getCategoriesSlugs, getEntriesBy, getLayoutData, getEntriesBySysId } from "../lib/api";

export default function Category({ title, categoryTitle, categories, introduction, sectionsFields, contentType }) {

  const sectionsAsElement = sectionsFields.map((field) => {
    if (contentType !== "section") {
      return <Section title={field.title} slug={field.slug} field={field} key={field.slug} contentType={contentType} />;
    }
      return <Section title={field.title} slug={field.slug} content={field.content} key={field.slug} />;
  });

  return (
    <>
      <Layout title={title} categories={categories}>
        <Container>
          <h2>{categoryTitle}</h2>
          <ReactMarkdown plugins={[gfm]} children={introduction} className="prose" />
          {sectionsAsElement}
        </Container>
      </Layout>
    </>
  );
}

export async function getStaticProps({ params }) {
  const layoutData = await getLayoutData();

  const slugFromParams = params.category;
  const categoryItem = await getEntriesBy(slugFromParams);

  const categoryFields = categoryItem.fields;

  // THIS NOT DONE
  /*   console.log(categoryFields); */

  const sectionsFieldsWithContent = await getEntriesBySysId(categoryFields.sections);
  const contentType = sectionsFieldsWithContent[0].sys.contentType.sys.id;

  const fieldsOnly = sectionsFieldsWithContent.map((item) => {
    return item.fields;
  });
  /*   console.log(items[0].fields.content[0].fields.content); */

  return {
    props: {
      title: layoutData.title,
      categoryTitle: categoryFields.title,
      categories: layoutData.categories,
      introduction: categoryFields.introduction ?? null,
      sectionsFields: fieldsOnly ?? null,
      contentType,
    },
  };

  // Fetch necessary data for the blog post using params.category
}

export async function getStaticPaths() {
  const paths = await getCategoriesSlugs();

  return {
    paths,
    fallback: false,
  };
}
