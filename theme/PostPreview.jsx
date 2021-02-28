import Link from 'next/link';

export const LatestPostPreview = ({ link, meta }) => (
  <article className="post-preview-latest">
    <header>
      <h2 className="post-head">
        <Link href={'/blog' + link}>{meta.title}</Link>
      </h2>
      <p className="post-meta">
        <small>Posted on {meta.date}</small>
      </p>
    </header>
    <main>{meta.intro}</main>
  </article>
)

export const DefaultPostPreview = ({ link, meta }) => (
  <article className="post-preview-default">
    <header>
      <h2 className="post-head">
        <Link href={'/blog' + link}>{meta.title}</Link>
      </h2>
    </header>
    <main>{meta.description}</main>
  </article>
)

export const PostPreview = ({ link, meta, latest }) => (
  latest
  ? <LatestPostPreview link={link} meta={meta} />
  : <DefaultPostPreview link={link} meta={meta} />
)
