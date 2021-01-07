import Link from "next/link";
import Content from "./content";
import Post from "./post";
import Profile from "./profile";
import Publication from "./publication";
import SectionContainer from "./sectionContainer";
import Software from "./software";

const specialSectionContentTypes = ["publication", "software"];

export default function Section({ section }) {
  /*   console.log(`${section.fields.slug.toUpperCase()}:`, section); */

  const sectionContentAsElements = section.fields.content?.map((contentEntry) => {
    switch (contentEntry.sys.contentType.sys.id) {
      case "post":
        return <Post post={contentEntry} key={contentEntry.sys.id} />;
      case "profile":
        return <Profile profile={contentEntry} key={contentEntry.sys.id} />;
      default:
        return <Content content={contentEntry} key={contentEntry.sys.id} />;
    }
  });

  // Reversing Posts if Posts in actual Section
  const sectionContentAsElementType = sectionContentAsElements?.map((element) => element.type);
  let postsSection;

  if (sectionContentAsElementType?.includes(Post)) {
    postsSection = sectionContentAsElements.reverse();
  }

  if (specialSectionContentTypes.includes(section.sys.contentType.sys.id)) {
    switch (section.sys.contentType.sys.id) {
      case "publication":
        return <Publication publication={section.fields} key={section.sys.id} />;
      case "software":
        return <Software software={section.fields} key={section.sys.id} />;
    }
  }

  if (postsSection?.length > 5) {
    
    const recentPosts = postsSection.map((post, index) => {
      if (index < 5) {
        return post;
      }
    });

    return (
      <SectionContainer slug={section.fields.slug} title={section.fields.title}>
        {recentPosts}
        <br></br>
        <Link href={`/news/${section.fields.slug}/past-items`}><a className="text-2xl">See past items from {section.fields.title} News</a></Link>
      </SectionContainer>
    );
  }

  return (
    <SectionContainer slug={section.fields.slug} title={section.fields.title}>
      {sectionContentAsElements ? sectionContentAsElements : null}
    </SectionContainer>
  );
}
