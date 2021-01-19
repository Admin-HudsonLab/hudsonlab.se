import Link from "next/link";
import Image from "next/image";
import ToReactMarkdown from "./toReactMarkdown";

export default function Profile({ profile }) {
  const nameAsSlug = profile.fields.name.replace(/ /g, "-").toLowerCase();
  return (
    <div id={nameAsSlug} className="anchor-scroll flex flex-col small-section border-none last:mb-2">
      <div className="w-full flex flex-wrap justify-center">
        <div className="w-2/3 flex justify-center">
          <Image
            src={`https:${profile.fields.portrait.fields.file.url}`}
            alt={profile.fields.portrait.fields.description}
            width={225}
            height={225}
            quality={100}
            className="w-full"
          />
        </div>
        <h4 className="w-full header-medium text-center my-2">{profile.fields.name}</h4>
      </div>
      <div>
        <ToReactMarkdown
          children={profile.fields.education}
          additionalClassNames={"mb-2 text-gray-800 text-sm font-ibm font-semibold tracking-normal leading-snug lg:mt-1 lg:tracking-tight"}
        />
        <ToReactMarkdown children={profile.fields.biography} additionalClassNames={"mb-2 lg:mb-3"} />
        <Link href={`mailto:${profile.fields.email}`}>
          <a className="font-medium no-underline break-words lg:text-lg">
            {profile.fields.email}
            <img src="/svg/icons/envelope-open.svg" alt="envelope open icon" className="inline pl-2" />
          </a>
        </Link>
      </div>
    </div>
  );
}
