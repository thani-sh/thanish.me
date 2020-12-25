import Link from 'next/link';

export const PostPreview = ({ link, meta }) => (
  <article>
    <header>
      <h1>
        <Link href={'/blog' + link}>{meta.title}</Link>
      </h1>
    </header>
    <main>{meta.intro}</main>
  </article>
);
