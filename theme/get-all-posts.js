const r = require.context('../pages/blog/', true, /\.mdx$/);

export const posts = r
  .keys()
  .map((fileName) => {
    const link = fileName.substr(1).replace(/\/index\.mdx$/, '');
    const meta = { ...r(fileName).meta, link };
    return { link, meta };
  })
  .sort((a, b) => (a.meta.date > b.meta.date ? -1 : 1));
