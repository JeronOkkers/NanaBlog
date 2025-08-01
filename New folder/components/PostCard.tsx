// components/PostCard.tsx
import Link from 'next/link';
import Image from 'next/image';

// It's good practice to define the shape of your props
interface PostCardProps {
  post: {
    title: string;
    slug: string;
    excerpt: string;
    imageUrl?: string;
  };
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <article className="flex flex-col md:flex-row bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-6 flex-1">
        <h2 className="text-2xl font-serif font-bold mb-2">{post.title}</h2>
        <p className="text-gray-600 mb-4">{post.excerpt}</p>
        <Link
          href={`/posts/${post.slug.current}`}
          className="inline-block text-sm px-4 py-2 rounded bg-primary bg-opacity-10 text-primary hover:bg-opacity-20 transition"
        >
          Read More
        </Link>
      </div>
      {/* Use the new imageUrl property, which is much cleaner */}
      {post.imageUrl && (
        <div className="relative md:w-1/3 h-64 md:h-auto">
          <Image
            src={post.imageUrl}
            alt={post.title}
            fill
            className="object-cover"
          />
        </div>
      )}
    </article>
  );
}