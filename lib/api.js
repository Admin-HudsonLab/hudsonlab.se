const contentful = require("contentful");
import { TITLE_ID } from "./constants";

const client = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

export async function getLayoutData() {
  const entry = await getEntryBy(TITLE_ID);
  const title = entry.fields.title;
  const categories = entry.fields.categories.map((category) => {
    return { title: category.fields.title, slug: category.fields.slug }
  })
  return { title, categories }
}

export async function getEntryBy(EntryId) {
  const entry = await client
    .getEntry(EntryId)
    .then((entry) => {
      return entry;
    })
    .catch(console.error);

/*     console.log("ENTRY:", entry); */

  return entry;
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

export async function getEntriesBy(slug) {
  const items = await client
    .getEntries({ content_type: "category", "fields.slug": slug, limit: 1 })
    .then((categoryBySlug) => {
      return categoryBySlug.items;
    })
    .catch(console.error);

  return items[0];
}

// for the trash

export async function getLayoutEntry() {
  const layoutEntryId = "2lFH3fJ1pZRJEoqwmA0X44";
  const data = await client
    .getEntry(layoutEntryId)
    .then((entry) => {
      return entry;
    })
    .catch(console.error);
  return data;
}

/* export async function getEntriesBy(contentTypeId) {
  const data = await client
    .getEntries({ content_type: contentTypeId })
    .then((entries) => {
      return entries.items;
    })
    .catch(console.error);
  return data;
} */

export async function getAllCategoriesTitleAndSnug() {
  const items = await client
    .getEntries({ content_type: "category", select: "fields.title,fields.slug" })
    .then((data) => {
      console.log("here", data);
      return data.items;
    })
    .catch(console.error);
  console.log("there", items);

  return items.map((item) => {
    return { title: item.fields.title, slug: item.fields.snug };
  });
}
