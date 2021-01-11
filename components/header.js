import Link from "next/link";

export default function Header({ homeTitle, categories }) {

  const categoriesAsElementsInHeader = categories.map((category) => {
    return (
      <li key={category.slug} className="px-1">
        <Link href={`/${category.slug}`}>
          <a>{category.title}</a>
        </Link>
      </li>
    );
  });

  return (
    <header className="bg-gray-100 p-4">
      <nav>
        <ul className="flex flex-wrap">
          <li>
            <Link href="/">
              <a>
                <h1 className="font-bold">{homeTitle}</h1>
              </a>
            </Link>
          </li>
          <li>
            <ul className="flex flex-wrap justify-center">{categoriesAsElementsInHeader}</ul>
          </li>
        </ul>
      </nav>
    </header>
  );
}
