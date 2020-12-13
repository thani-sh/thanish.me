import Head from 'next/head';

export const PostContent = ({ meta, children }) => (
  <>
    <Head>
      <meta name="description" content={meta.info}></meta>
      <title>{meta.title}</title>
    </Head>
    <article>
      <main>{children}</main>
    </article>
  </>
);

export const createPostContent = ({ meta }) => ({ children }) => (
  <PostContent meta={meta}>{children}</PostContent>
);
