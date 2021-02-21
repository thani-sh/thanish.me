import Head from 'next/head';
import { PageHeader } from './elements/PageHeader';

export const PostContent = ({ meta, children }) => (
  <article>
    <Head>
      <title>Thanish.me - {meta.title}</title>
      <meta name="description" content={meta.description}></meta>
    </Head>
    <PageHeader />
    <header>
      <h1 className="post-head">{meta.title}</h1>
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
