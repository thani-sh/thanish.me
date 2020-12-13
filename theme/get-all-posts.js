const r = require.context('../pages/blog/', true, /\.mdx$/);

export const posts = r.keys().map((fileName) => ({
  link: fileName.substr(1).replace(/\/index\.mdx$/, ''),
  meta: r(fileName).meta,
}));
