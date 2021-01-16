import Image from "next/image";
import CommitsChart from "../components/commits-chart";
import Layout from "../components/layout";
import Section from "../components/section";
import ToReactMarkdown from "../components/toReactMarkdown";
import {
  getCategoriesSlugs,
  getCategoryEntriesBy,
  getEntriesBySysId,
  getHomeData,
  getSiteMapData,
} from "../lib/api-contentful";
import { getCommitsActivityData, getMockCommitsActivityData } from "../lib/api-github";

export default function Category({
  homeTitle,
  categoryTitle,
  categorySlug,
  siteMap,
  introduction,
  sections,
  commitsActivity,
}) {
  const sectionsAsElements = sections.map((section) => <Section section={section} key={section.fields.slug} />);

  const illustrationAsElements = (
    <div data-name="illustrations" className="max-w-full mb-8">
      <Image
        src={`/illustrations/${categorySlug}-1.jpg`}
        alt={`Hudson Lab illustrations for ${categoryTitle}.`}
        width={1200}
        height={1500}
        quality={100}
        className="w-full shadow"
      />
    </div>
  );

  return (
    <>
      <Layout homeTitle={homeTitle} categorySlug={categorySlug} categoryTitle={categoryTitle} siteMap={siteMap}>
        <h2 id={`${categorySlug}-title`} className="text-3xl font-semibold mb-4">
          {categoryTitle}
        </h2>
        {introduction ? (
          <div id={`${categorySlug}-introduction-container`} className="mb-4">
            <ToReactMarkdown children={introduction} />
          </div>
        ) : null}

        {categorySlug === "softwares" ? (
          <div className="hidden">
            <CommitsChart commitsActivity={commitsActivity} />
          </div>
        ) : null}

        <div className="contents">{sectionsAsElements}</div>
        {illustrationAsElements}
      </Layout>
    </>
  );
}

export async function getStaticProps({ params }) {
  // get Home Data for header
  const homeData = await getHomeData();
  // get sections related to each category in homeData
  const siteMapData = await getSiteMapData();
  // get data for each category
  const slugFromParams = params.category;
  const categoryItem = await getCategoryEntriesBy(slugFromParams);
  const categoryFields = categoryItem.fields;
  // get sections fields for this category
  const sectionsFields = await getEntriesBySysId(categoryFields.sections);

  // only for '/softwares', the GitHub Commits Activity
  const commitsActivityRedmagpie =
    params.category === "softwares" ? await getCommitsActivityData("Asplund-Samuelsson", "redmagpie") : null;
  const commitsActivityGenomeScaleModels =
    params.category === "softwares" ? await getCommitsActivityData("m-jahn", "genome-scale-models") : null;
  const commitsActivityFUREE =
    params.category === "softwares" ? await getCommitsActivityData("Asplund-Samuelsson", "furee") : null;
  const commitsActivityCBBKinetics =
    params.category === "softwares" ? await getCommitsActivityData("MJanasch", "CBB_Kinetics") : null;
  const commitsActivity2019_CRISPRi_library =
    params.category === "softwares" ? await getCommitsActivityData("KiyanShabestary", "2019_CRISPRi_library") : null;

  // Reverse publications order if we are in the category "publications"
  if (params.category === "publications") {
    sectionsFields.reverse();
  }

  return {
    props: {
      homeTitle: homeData.homeTitle,
      siteMap: siteMapData,
      categoryTitle: categoryFields.title,
      categorySlug: categoryFields.slug,
      introduction: categoryFields.introduction ?? null,
      sections: sectionsFields ?? null,
      commitsActivity: {
        commitsActivityRedmagpie,
        commitsActivityGenomeScaleModels,
        commitsActivityFUREE,
        commitsActivityCBBKinetics,
        commitsActivity2019_CRISPRi_library,
      },
    },
    revalidate: 1,
  };
}

export async function getStaticPaths() {
  const paths = await getCategoriesSlugs();

  return {
    paths,
    fallback: false,
  };
}
