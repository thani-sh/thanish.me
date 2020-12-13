import Link from 'next/link';

export const PostPreview = ({ link, meta }) => (
  <article>
    <Link href={'/blog' + link}><h2>{meta.title}</h2></Link>
    <p>{meta.info}</p>
    <p><Link href={'/blog' + link}>Read More</Link></p>
  </article>
);
