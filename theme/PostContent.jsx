import Head from 'next/head';

export const PostContent = ({ meta, children }) => (
  <article>
    <Head>
      <title>Thanish.me - {meta.title}</title>
      <meta name="description" content={meta.description}></meta>
    </Head>
    <header>
      <h1>{meta.title}</h1>
      <p className="post-meta">
        <small>Posted on {meta.date}</small>
      </p>
      <main>{meta.intro}</main>
    </header>
    <main>{children}</main>
  </article>
);

export const createPostContent = ({ meta }) => ({ children }) => (
  <PostContent meta={meta}>{children}</PostContent>
);
