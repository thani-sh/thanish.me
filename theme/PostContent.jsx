export const PostContent = ({ meta, children }) => (
  <article>
    <main>{children}</main>
  </article>
);

export const createPostContent = ({ meta }) => ({ children }) => (
  <PostContent meta={meta}>{children}</PostContent>
);
