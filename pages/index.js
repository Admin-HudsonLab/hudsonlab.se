import Head from "next/head";
import { useEffect, useState } from "react";
import getEntry from "../lib/api";

export default function Home({ layoutEntry }) {
  
  const [title, setTitle] = useState("");

  useEffect(() => {
    setTitle(layoutEntry.fields.title);
  }, []);

  return (
    <div className="prose text-center max-w-none mt-20">
      <Head>
        <title>Hudson Lab</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Hudson Lab...</h1>
      <h2>{title}</h2>
      <p>...is in construction.</p>
    </div>
  );
}

export async function getStaticProps() {
  const layoutEntry = await getEntry();

  return {
    props: { layoutEntry },
  };
}
