const contentful = require("contentful");
import { TITLE_ID } from "./constants";

const client = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

export async function getLayoutData() {
  const entry = await getEntryBy(TITLE_ID);
  const homeTitle = entry.fields.title;
  const categories = entry.fields.categories.map((category) => {
    return { title: category.fields.title, slug: category.fields.slug };
  });
  return { homeTitle, categories };
}

export async function getEntryBy(EntryId) {
  const entry = await client
    .getEntry(EntryId)
    .then((entry) => {
      return entry;
    })
    .catch(console.error);

  return entry;
}

export async function getCategoryEntriesBy(slug) {
  const items = await client
    .getEntries({ content_type: "category", "fields.slug": slug, limit: 1 })
    .then((categoryBySlug) => {
      return categoryBySlug.items;
    })
    .catch(console.error);

  return items[0];
}

export async function getCategoriesSlugs() {
  const items = await client
    .getEntries({ content_type: "category", select: "fields.slug" })
    .then((categoriesSlugs) => {
      return categoriesSlugs.items;
    })
    .catch(console.error);

  return items.map((item) => {
    return {
      params: {
        category: item.fields.slug,
      },
    };
  });
}

export async function getSectionSlugs() {
  const items = await client
    .getEntries({ content_type: "section", select: "fields.slug" })
    .then((sectionSlugs) => {
      return sectionSlugs.items;
    })
    .catch(console.error);

  return items.map((item) => {
    return {
      params: {
        sectionslug: item.fields.slug,
      },
    };
  });
}

export async function getEntriesBySysId(categoryFieldsSections) {
  const allSysId = categoryFieldsSections.map((section) => {
    return section.sys.id;
  });

  const items = [];

  for (let index = 0; index < allSysId.length; index++) {
    const element = await getEntryBy(allSysId[index]);
    items.push(element);
  }

  /*   console.log(items[0].fields.content[0].fields.content); */

  const sectionsFieldsWithContent = items;
  return sectionsFieldsWithContent;
}

export async function getPostsBySection(slug) {
  const items = await client
    .getEntries({ content_type: "section", "fields.slug": slug })
    .then((data) => {
      const postsContentEntries = data.items[0].fields.content;
      return postsContentEntries;
    })
    .catch(console.error);

  return items
}

export async function getSectionTitleBy(slug) {
  const items = await client
    .getEntries({ content_type: "section", "fields.slug": slug, select: "fields.title" })
    .then((data) => {
      return data.items[0].fields.title;
    })
    .catch(console.error);

  return items
}