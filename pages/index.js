import { PostPreview } from 'theme/PostPreview';
import { posts } from 'theme/get-all-posts';

export default function Homepage() {
  return (
    <>
      {posts.map((post, i) => (
        <PostPreview {...post} key={`${i}`} />
      ))}
    </>
  );
}
