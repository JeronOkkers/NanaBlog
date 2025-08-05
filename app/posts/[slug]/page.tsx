// app/posts/[slug]/page.tsx
import { client } from '../../../lib/sanity';
import {
  allCategoriesQuery,
  allPostSlugsQuery,
  popularPostsQuery,
  postBySlugQuery,
} from '../../../lib/queries';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { PortableText } from '@portabletext/react';
import type { PortableTextBlock } from '@portabletext/types';
import type { PortableTextComponents } from '@portabletext/react';
import Sidebar from '../../../components/Sidebar';

interface Post {
  title: string;
  author?: string;
  imageUrl?: string;
  publishedAt: string;
  body: PortableTextBlock[];
}

// Define the shape of the props for the page
interface PostPageProps {
  params: Promise<{ slug: string }>;
}

// Define how each block, list, and mark should render
const ptComponents: PortableTextComponents = {
  block: {
    h2: ({ children }) => <h2 className="text-3xl font-serif font-bold mt-8 mb-4">{children}</h2>,
    h3: ({ children }) => <h3 className="text-2xl font-serif font-bold mt-6 mb-3">{children}</h3>,
    normal: ({ children }) => <p className="mb-4 text-lg leading-relaxed">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-primary pl-4 italic my-6 text-gray-600 dark:text-gray-400">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc ml-6 my-4 space-y-2">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal ml-6 my-4 space-y-2">{children}</ol>,
  },
  marks: {
    strong: ({ children }) => <strong>{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    link: ({ children, value }) => (
      <a
        href={value.href}
        className="text-primary hover:underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
  },
};

export async function generateStaticParams() {
  const slugs: string[] = await client.fetch(allPostSlugsQuery);
  return slugs.map((slug) => ({ slug }));
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default async function PostPage(props: PostPageProps) {
  const params = await props.params;
  const { slug } = params;

  const [post, categories, popular] = await Promise.all([
    client.fetch<Post>(postBySlugQuery, { slug }, { next: { tags: ['post'] } }),
    client.fetch(allCategoriesQuery, {}, { next: { tags: ['category'] } }),
    client.fetch(popularPostsQuery, {}, { next: { tags: ['post'] } }),
  ]);

  if (!post) {
    notFound();
  }

  return (
    <div className="flex flex-col-reverse lg:flex-row gap-12">
      <article className="lg:w-2/3">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 leading-tight">
            {post.title}
          </h1>
          {post.author && (
            <p className="text-gray-600 dark:text-gray-400">
              By <span className="font-semibold text-gray-800 dark:text-gray-200">{post.author}</span> on{' '}
              <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
            </p>
          )}
        </div>

        {post.imageUrl && (
          <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-8 shadow-lg bg-gray-50 dark:bg-gray-800">
            <Image
              src={post.imageUrl}
              alt={post.title}
              fill
              className="object-contain"
              priority
            />
          </div>
        )}

        {/* The wrapping div no longer needs the "prose" classes */}
        <div>
          <PortableText value={post.body} components={ptComponents} />
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-serif font-bold mb-6">Comments</h2>
          <p className="text-gray-500 dark:text-gray-400">
            Comments section coming soon.
          </p>
        </div>
      </article>

      <aside className="lg:w-1/3">
        <Sidebar categories={categories} popular={popular} />
      </aside>
    </div>
  );
}