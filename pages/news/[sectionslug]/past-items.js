import Link from "next/link";
import Layout from "../../../components/layout";
import {
  getHomeData,
  getPostsBySection,
  getSectionSlugs,
  getSectionTitleBy,
  getSiteMapData,
} from "../../../lib/api-contentful";
import Post from "../../../components/post";
import SectionContainer from "../../../components/sectionContainer";

const newsArchiveSlugs = ["science", "us"];

export default function NewsSectionArchive({ homeTitle, metaData, siteMap, sectionTitle, sectionSlug, archivedPosts }) {
  const archivedPostsAsElements = archivedPosts?.map((contentEntry) => {
    return <Post post={contentEntry} key={contentEntry.sys.id} />;
  });
  const editedTitle = `${sectionTitle} News Past Items`;
  const editedSlug = `${sectionSlug}-news-past-items`;

  return (
    <>
      <Layout
        homeTitle={homeTitle}
        metaData={metaData}
        siteMap={siteMap}
        categoryTitle={editedTitle}
        categorySlug={editedSlug}
      >
        <SectionContainer title={editedTitle} slug={editedSlug}>
          {archivedPostsAsElements ? archivedPostsAsElements : null}
          <div className="mt-4">
            <Link href="/news">
              <a className="section-end-link text-purple-700">Back to News</a>
            </Link>
          </div>
        </SectionContainer>
      </Layout>
    </>
  );
}

export async function getStaticProps({ params }) {
  const homeData = await getHomeData();
  const siteMapData = await getSiteMapData();
  const postsDataBySection = await getPostsBySection(params.sectionslug);
  const reversedPosts = postsDataBySection.reverse();
  const archivedPosts = reversedPosts.splice(5);
  const sectionTitleBySlug = await getSectionTitleBy(params.sectionslug);
  return {
    props: {
      homeTitle: homeData.homeTitle,
      metaData: homeData.metaData,
      siteMap: siteMapData,
      sectionTitle: sectionTitleBySlug,
      sectionSlug: params.sectionslug,
      archivedPosts: archivedPosts,
    },
    revalidate: 1,
  };
}

export async function getStaticPaths() {
  const allSectionsSlugs = await getSectionSlugs();
  const paths = [];
  allSectionsSlugs.forEach((element) => {
    if (newsArchiveSlugs.includes(element.params.sectionslug)) {
      paths.push(element);
    }
  });

  return {
    paths,
    fallback: false,
  };
}
