import Link from "next/link";
import Image from "next/image";
import ToReactMarkdown from "./toReactMarkdown";

export default function Profile({ profile }) {
  console.log(profile.fields.portrait.fields.file.fileName, profile.fields.portrait.fields.file.details.image.width);
  return (
    <div key={profile.sys.id}>
      <h4 className="uppercase">{profile.fields.name}</h4>
      <ToReactMarkdown children={profile.fields.education} additionalClassNames={"mb-2"} />
      <ToReactMarkdown children={profile.fields.biography} />
      <div className="flex flex-col">
        <Link href={`mailto:${profile.fields.email}`}>{profile.fields.email}</Link>
        <Image
          src={`https:${profile.fields.portrait.fields.file.url}`}
          alt={profile.fields.portrait.fields.description}
          width={225}
          height={225}
          layout="fixed"
          quality={100}
          className="rounded-full"
        />
      </div>
    </div>
  );
}
