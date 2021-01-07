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
    <article id={post.sys.id}>
      <h4>{post.fields.title}</h4>
      <p className="text-md font-light text-gray-500">{postDate}</p>
      <ToReactMarkdown children={post.fields.content} />
    </article>
  );
}
