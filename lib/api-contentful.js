const contentful = require("contentful");
import { LAYOUT_ENTRY_ID } from "./constants";

const client = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

export async function getHomeData() {
  const layoutEntry = await getEntryBy(LAYOUT_ENTRY_ID);
  
  const categories = layoutEntry.fields.categories.map((category) => {
    return {
      id: category.sys.id,
      title: category.fields.title,
      slug: category.fields.slug,
    };
  });
  const metaData = { metaTitle: layoutEntry.fields.metadataTitle, metaDesc: layoutEntry.fields.metadataDescription, metaImg: { metaImgWidth: layoutEntry.fields.metadataImage?.fields.file.details.image.width, metaImgHeight: layoutEntry.fields.metadataImage?.fields.file.details.image.height, metaImgContentType: layoutEntry.fields.metadataImage?.fields.file.contentType, metaImgUrl: layoutEntry.fields.metadataImage?.fields.file.url }};

  return { homeTitle: layoutEntry.fields.title, categories, metaData };
}

export async function getSiteMapData() {
  const categoriesItems = await client
    .getEntries({ content_type: "layout", select: 'fields.categories', include: 2 })
    .then((categoriesFieldInLayoutData) => {
      const categoriesItems = categoriesFieldInLayoutData.items[0].fields.categories;
      return categoriesItems;
    })
    .catch(console.error);
  const siteMapData = categoriesItems.map((categoryItem) => {
    let categorySectionsTitleAndSlug = [];
    if (categoryItem.fields.slug !== "publications") {
      categorySectionsTitleAndSlug = categoryItem.fields.sections.map((section) => {
        /* console.log(section); */
        const sectionTitle = section.fields.name ? section.fields.name : section.fields.title;
        return { sectionTitle: sectionTitle, sectionSlug: section.fields.slug };
      });
    }
    return {
      categoryTitle: categoryItem.fields.title,
      categorySlug: categoryItem.fields.slug,
      categorySections: categorySectionsTitleAndSlug,
    };
  });

  return siteMapData;
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

  return items;
}

export async function getSectionTitleBy(slug) {
  const items = await client
    .getEntries({ content_type: "section", "fields.slug": slug, select: "fields.title" })
    .then((data) => {
      return data.items[0].fields.title;
    })
    .catch(console.error);

  return items;
}
