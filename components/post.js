import ToReactMarkdown from "./toReactMarkdown";
import { parse, format, isThisYear } from "date-fns";
import { useEffect, useState } from "react";

export default function Post({ post }) {
  const [postDate, setPostDate] = useState("");

  useEffect(() => {
    const parsedDate = parse(post.fields.date, "yyyy-MM-dd", new Date());
    if (isThisYear(parsedDate)) {
      let formattedDateWithNoYear = format(parsedDate, "MMMM d");
      setPostDate(formattedDateWithNoYear);
    } else {
      let formattedDateWithYear = format(parsedDate, "MMMM d, yyyy");
      setPostDate(formattedDateWithYear);
    }
  }, []);

  return (
    <article id={post.sys.id} className="small-section border-purple-700">
      <h4 className="header-medium">{post.fields.title}</h4>
      <p className="text-sm font-ibm text-gray-800 font-normal mb-2">{postDate}</p>
      <ToReactMarkdown children={post.fields.content} />
    </article>
  );
}
