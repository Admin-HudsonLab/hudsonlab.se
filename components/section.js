import Post from "./post";
import Profile from "./profile";
import Publication from "./publication";
import Software from "./software";
import ToReactMarkdown from "./toReactMarkdown";

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
        return <ToReactMarkdown children={contentEntry.fields.content} key={contentEntry.sys.id} />;
    }
  });

  if (specialSectionContentTypes.includes(section.sys.contentType.sys.id)) {
    switch (section.sys.contentType.sys.id) {
      case "publication":
        return <Publication publication={section.fields} key={section.sys.id} />;
      case "software":
        return <Software software={section.fields} key={section.sys.id} />;
    }
  }

  return (
    <section key={section.fields.slug}>
      <h3>{section.fields.title}</h3>
      {sectionContentAsElements ? sectionContentAsElements : null}
    </section>
  );
}
