// components/PostList.tsx
import PostCard from './PostCard';

type PostListProps = {
  posts: Array<{
    _id: string;
    title: string;
    excerpt: string;
    slug: { current: string };
    mainImage?: { asset: { url: string } };
  }>;
};

export default function PostList({ posts }: PostListProps) {
  return (
    <div className="space-y-10">
      {posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  );
}
