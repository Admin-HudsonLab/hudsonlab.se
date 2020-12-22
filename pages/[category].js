import Container from "../components/container";
import Layout from "../components/layout";
import Section from "../components/section";
import { getCategoriesSlugs, getEntriesBy, getLayoutData } from "../lib/api";

export default function Category({ title, categoryTitle, categories, introduction, sectionsFields }) {

  const sectionsAsElement = sectionsFields.map((field) => {
    return <Section title={field.title} snug={field.slug} />;
  });

  return (
    <>
      <Layout title={title} categories={categories}>
        <Container>
          <h2>{categoryTitle}</h2>
          <p className="prose-xl max-w-xl">{introduction}</p>
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

  const sectionsFields = categoryFields.sections.map(section => { return section.fields });

  // THIS NOT DONE
  console.log(sectionsFields);
  const extractedSectionsContentsField = extractSectionsContentsBy(sectionsFields)
  // UNTIL HERE

  return {
    props: {
      title: layoutData.title,
      categoryTitle: categoryFields.title,
      categories: layoutData.categories,
      introduction: categoryFields.introduction ?? null,
      sectionsFields: sectionsFields ?? null,
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
