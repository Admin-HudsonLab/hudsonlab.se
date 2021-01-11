import Link from "next/link";
import Head from "next/head";

export default function Layout({ children, homeTitle, categories }) {

  const categoriesAsElements = categories.map((category) => {
    return <li key={category.slug}><Link href={`/${category.slug}`}><a>{category.title}</a></Link></li>;
  })

  return (
    <>
      <Head>
        <title>{homeTitle}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

        <header className="bg-gray-100 p-4">
          <nav>
            <ul className="flex justify-between">
            <li>
            <Link href="/">
              <a>
                <h1 className="text-6xl font-semibold">{homeTitle}</h1>
              </a>
            </Link>
            </li>
            <li><ul className="text-xl inline-flex space-x-3">{categoriesAsElements}</ul></li>
            </ul>
          </nav>
        </header>
        <main>{children}</main>

    </>
  );
}
