import Link from "next/link";
import Image from 'next/image';
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";

export default function Section({ title, slug, content, field, contentType }) {
  if (!content) {
    if (contentType === "publication") {
      return (
        <section id={field.slug}>
          <h3>
            {field.title}
            <span className="font-normal"> ({field.year})</span>
          </h3>
          <ul>
            <li>{field.authors}</li>
            <li>{field.source}</li>
          </ul>
          <ReactMarkdown plugins={[gfm]} children={field.about} className="prose border-black border p-2 rounded" />
          <br></br>
          <Link href={field.link}>
            <a>{field.link}</a>
          </Link>
        </section>
      );
    }
    if (contentType === "software") {
      return (
        <section id={field.slug}>
          <h3>{field.name}</h3>
          <p>{field.author}</p>
          <ReactMarkdown plugins={[gfm]} children={field.description} className="prose" />
          <br></br>
          <Link href={field.link}>
            <a>{field.link}</a>
          </Link>
        </section>
      );
    }
  }

  if (content[0].sys.contentType.sys.id === "content") {
    const onlyTheFirstContent = content[0].fields.content;

    return (
      <section id={slug}>
        <h3>{title}</h3>
        <ReactMarkdown plugins={[gfm]} children={onlyTheFirstContent} className="prose" />
      </section>
    );
  }

  if (content[0].sys.contentType.sys.id === "profile") {
    console.log(content[0].fields.portrait);
    const profilesAsElements = content.map((profile) => {
      return (
        <div key={profile.sys.id}>
          <h4>{profile.fields.name}</h4>
          <ReactMarkdown plugins={[gfm]} children={profile.fields.education} className="prose"/>
          <br></br>
          <ReactMarkdown plugins={[gfm]} children={profile.fields.biography} className="prose" />
          <Link href={`mailto:${profile.fields.email}`}>{profile.fields.email}</Link>
          {/* <div className="max-w-sm rounded-lg"><Image src={profile.fields.portrait.fields.fileurl} alt={profile.fields.portrait.fields.fileName} /></div> */}
        </div>
      );
    });
    return (
      <section>
        <h3>{title}</h3>
        {profilesAsElements}
      </section>
    );
  }

  if (content[0].sys.contentType.sys.id === "post") {
    const postsAsElements = content.map((post) => {
      return (
        <article key={post.fields.date}>
          <h4>{post.fields.title}</h4>
          <code>{post.fields.date}</code>
          <ReactMarkdown plugins={[gfm]} children={post.fields.content} className="prose" />
        </article>
      );
    });
    return (
      <section>
        <h3>{title}</h3>
        {postsAsElements}
      </section>
    );
  }

  return (
    <section id={slug}>
      <h3>{title}</h3>
      <code>Something went wrong?</code>
    </section>
  );
}
