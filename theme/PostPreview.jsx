import Link from 'next/link';

export const PostPreview = ({ link, meta }) => (
  <article>
    <Link href={'/blog' + link}><h1>{meta.title}</h1></Link>
    <p>{meta.info}</p>
  </article>
);
