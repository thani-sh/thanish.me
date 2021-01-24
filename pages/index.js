import Head from 'next/head';
import { PostPreview } from 'theme/PostPreview';
import { posts } from 'theme/get-all-posts';

export default function Homepage() {
  return (
    <>
      <Head>
        <title>Thanish.me - Some really bad code for you!</title>
        <meta name="description" content="Some really bad code for you!"></meta>
      </Head>
      <header id="navbar">
        <a id="link-home" href="/">
          <img src="/logo-192.png" alt="Homepage" width="48px" height="48px" />
        </a>
      </header>
      {posts.map((post, i) => (
        <PostPreview {...post} key={`${i}`} />
      ))}
    </>
  );
}
