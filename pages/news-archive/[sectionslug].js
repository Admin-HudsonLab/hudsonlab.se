import { useEffect, useState } from "react";
import { getPostsBySection, getSectionSlugs } from "../../lib/api-contentful";

const newsArchiveSlugs = ["science", "us"];

export default function NewsSectionArchive({ posts }) {
  const allPostsTitleAsElement = posts.map((item) => {
    return <h5 key={item.date}>{item.title}</h5>;
  });

  return (
    <>
      <p>Hello.</p>
      <ul>{allPostsTitleAsElement ? allPostsTitleAsElement : null}</ul>
    </>
  );
}

export async function getStaticProps({ params }) {
  const posts = await getPostsBySection(params.sectionslug);
  return {
    props: { posts: posts },
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
