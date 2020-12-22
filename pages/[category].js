import Container from "../components/container";
import Layout from "../components/layout";
import Section from "../components/section";
import { getCategoriesSlugs, getEntriesBy, getLayoutData, getEntriesBySysId } from "../lib/api";

export default function Category({ title, categoryTitle, categories, introduction, sectionsFields }) {

  const sectionsAsElement = sectionsFields.map((field) => {
    return <Section title={field.title} slug={field.slug} content={field.content} key={field.slug} />;
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
/*   console.log(categoryFields); */

  const sectionsFieldsWithContent = await getEntriesBySysId(categoryFields.sections);
  const fieldsOnly = sectionsFieldsWithContent.map(item => { return item.fields }); 
    /*   console.log(items[0].fields.content[0].fields.content); */



  return {
    props: {
      title: layoutData.title,
      categoryTitle: categoryFields.title,
      categories: layoutData.categories,
      introduction: categoryFields.introduction ?? null,
      sectionsFields: fieldsOnly ?? null,
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
