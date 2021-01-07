import Link from "next/link";
import Layout from "../../../components/layout";
import Container from "../../../components/container";
import { getLayoutData, getPostsBySection, getSectionSlugs, getSectionTitleBy } from "../../../lib/api-contentful";
import Post from "../../../components/post";

const newsArchiveSlugs = ["science", "us"];

export default function NewsSectionArchive({ homeTitle, categories, sectionTitle, archivedPosts }) {
  const archivedPostsAsElements = archivedPosts?.map((contentEntry) => {
    return <Post post={contentEntry} key={contentEntry.sys.id} />;
  });

  return (
    <>
      <Layout homeTitle={homeTitle} categories={categories}>
        <Container>
          <h2>{sectionTitle} News Past Items</h2>
          {archivedPostsAsElements ? archivedPostsAsElements : null}
          <br></br>
          <Link href="/news"><a className="uppercase">Back to News</a></Link>
        </Container>
      </Layout>
    </>
  );
}

export async function getStaticProps({ params }) {
  const layoutData = await getLayoutData();
  const postsDataBySection = await getPostsBySection(params.sectionslug);
  const reversedPosts = postsDataBySection.reverse();
  const archivedPosts = reversedPosts.splice(5);
  const sectionTitleBySlug = await getSectionTitleBy(params.sectionslug);
  return {
    props: {
      homeTitle: layoutData.homeTitle,
      categories: layoutData.categories,
      sectionTitle: sectionTitleBySlug,
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
