import Head from 'next/head';

export const PostContent = ({ meta, children }) => (
  <>
    <Head>
      <title>Thanish.me - {meta.title}</title>
      <meta name="description" content={meta.info}></meta>
    </Head>
    <article>
      <main>{children}</main>
    </article>
  </>
);

export const createPostContent = ({ meta }) => ({ children }) => (
  <PostContent meta={meta}>{children}</PostContent>
);
