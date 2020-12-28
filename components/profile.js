import Link from "next/link";
import ToReactMarkdown from "./toReactMarkdown";

export default function Profile({ profile }) {
  return (
    <div key={profile.sys.id}>
      <h4 className="uppercase">{profile.fields.name}</h4>
      <ToReactMarkdown children={profile.fields.education} additionalClassNames={"mb-2"}/>
      <ToReactMarkdown children={profile.fields.biography} />
      <Link href={`mailto:${profile.fields.email}`}>{profile.fields.email}</Link>
      {/* <div className="max-w-sm rounded-lg"><Image src={profile.fields.portrait.fields.fileurl} alt={profile.fields.portrait.fields.fileName} /></div> */}
    </div>
  );
}
