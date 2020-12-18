const contentful = require("contentful");

const client = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

const layoutEntryId = "5MqxEsl7umzD7ruD35DP8X";

export default async function getEntry() {
  const data = await client
    .getEntry(layoutEntryId)
    .then((entry) => {
      return entry;
    })
    .catch(console.error);
  return data;
}
