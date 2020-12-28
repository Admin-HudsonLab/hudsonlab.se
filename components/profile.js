import Link from "next/link";
import Image from "next/image";
import ToReactMarkdown from "./toReactMarkdown";

export default function Profile({ profile }) {
  console.log(profile.fields.portrait.fields.file.details);
  return (
    <div key={profile.sys.id}>
      <h4 className="uppercase">{profile.fields.name}</h4>
      <ToReactMarkdown children={profile.fields.education} additionalClassNames={"mb-2"}/>
      <ToReactMarkdown children={profile.fields.biography} />
      <Link href={`mailto:${profile.fields.email}`}>{profile.fields.email}</Link>
      <Image src={`https:${profile.fields.portrait.fields.file.url}`} alt={profile.fields.portrait.fields.description} width={profile.fields.portrait.fields.file.details.image.width} height={profile.fields.portrait.fields.file.details.image.height} />
    </div>
  );
}
