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
import { getCommitsActivityData } from "../lib/api-github";

export default function Category({
  homeTitle,
  metaData,
  categoryTitle,
  categorySlug,
  siteMap,
  introduction,
  sections,
  commitsActivity,
}) {
  const sectionsAsElements = sections.map((section) => <Section section={section} key={section.fields.slug} />);

  const secondIllustration = (
    <Image
      src={`/illustrations/${categorySlug}-2.jpg`}
      alt="Hudson Lab"
      width={1200}
      height={1500}
      quality={100}
      className="w-full shadow"
    />
  );
  function isThereASecondIllustrationFor(categorySlug) {
    if (["people", "publications", "research"].includes(categorySlug)) {
      return true;
    } else {
      return false;
    }
  }

  const illustrationAsElements = (
    <div
      data-name="illustrations"
      className="max-w-full mb-8 md:max-w-lg md:mx-auto 2xl:w-4/12 2xl:flex-shrink 2xl:p-6 2xl:mb-0 2xl:flex 2xl:flex-col 2xl:justify-between"
    >
      <Image
        src={`/illustrations/${categorySlug}-1.jpg`}
        alt="Hudson Lab"
        width={1200}
        height={1500}
        quality={100}
        className="w-full shadow"
      />
      {isThereASecondIllustrationFor(categorySlug) ? <div className="hidden 2xl:block">{secondIllustration}</div> : null}
    </div>
  );

  return (
    <>
      <Layout
        homeTitle={homeTitle}
        metaData={metaData}
        categorySlug={categorySlug}
        categoryTitle={categoryTitle}
        siteMap={siteMap}
      >
        <div className="2xl:w-4/12 2xl:flex-shrink 2xl:p-6">
          <h2
            id={`${categorySlug}-title`}
            className="text-3xl mb-4 header-light lg:text-4xl lg:mt-6 lg:mb-5 2xl:mt-0 2xl:text-5xl 2xl:-ml-0.5"
          >
            {categoryTitle}
          </h2>
          {introduction ? (
            <div id={`${categorySlug}-introduction-container`} className="mb-4 md:mb-6 lg:mb-8">
              <ToReactMarkdown
                children={introduction}
                additionalClassNames="2xl:leading-normal 2xl:text-lg 2xl:text-gray-800"
              />
            </div>
          ) : null}
          {!introduction ? <div className="md:mb-8 lg:mb-10 invisible"></div> : null}
        </div>
        <div className="contents 2xl:block 2xl:w-3/6 2xl:flex-grow-0 2xl:pt-6">
          <div className="2xl:flex 2xl:justify-center 2xl:flex-wrap">
            {categorySlug === "software" ? (
              <div className="hidden lg:block 2xl:w-full">
                <CommitsChart commitsActivity={commitsActivity} />
              </div>
            ) : null}
            {sectionsAsElements}
          </div>
        </div>
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

  // only for '/', the GitHub Commits Activity
  const commitsActivityRedmagpie =
    params.category === "software" ? await getCommitsActivityData("Asplund-Samuelsson", "redmagpie") : null;
  const commitsActivityGenomeScaleModels =
    params.category === "software" ? await getCommitsActivityData("m-jahn", "genome-scale-models") : null;
  const commitsActivityFUREE =
    params.category === "software" ? await getCommitsActivityData("Asplund-Samuelsson", "furee") : null;
  const commitsActivityCBBKinetics =
    params.category === "software" ? await getCommitsActivityData("MJanasch", "CBB_Kinetics") : null;
  const commitsActivity2019_CRISPRi_library =
    params.category === "software" ? await getCommitsActivityData("KiyanShabestary", "2019_CRISPRi_library") : null;

  // Reverse publications order if we are in the category "publications"
  if (params.category === "publications") {
    sectionsFields.reverse();
  }

  return {
    props: {
      homeTitle: homeData.homeTitle,
      metaData: homeData.metaData,
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
