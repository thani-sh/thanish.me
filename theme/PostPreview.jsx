import Link from 'next/link';

export const PostPreview = ({ link, meta }) => (
  <article>
    <header>
      <h1>
        <Link href={'/blog' + link}>{meta.title}</Link>
      </h1>
      <p className="post-meta">
        <small>Posted on {meta.date}</small>
      </p>
    </header>
    <main>{meta.intro}</main>
  </article>
);
