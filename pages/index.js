import Head from "next/head";
import { PostPreview } from "theme/PostPreview";
import { PageHeader } from "theme/elements/PageHeader";
import { posts } from "theme/scripts/get-all-posts";

export default function Homepage() {
  const latest = posts[0];
  const darest = posts.slice(1);
  return (
    <>
      <Head>
        <title>Thanish.me - Some really bad code for you!</title>
        <meta name="description" content="Some really bad code for you!"></meta>
      </Head>
      <PageHeader />
      <div className="preview-latest">
        <PostPreview {...latest} latest={true} />
      </div>
      <div className="preview-darest">
        {darest.map((post, i) => (
          <PostPreview {...post} key={`${i}`} />
        ))}
      </div>
    </>
  );
}
