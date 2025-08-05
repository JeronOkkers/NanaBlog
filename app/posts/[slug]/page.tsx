// app/posts/[slug]/page.tsx
//post page test
import { client } from '../../../lib/sanity';
import { allCategoriesQuery, allPostSlugsQuery, popularPostsQuery, postBySlugQuery } from '../../../lib/queries';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { PortableText, PortableTextBlock } from '@portabletext/react';
import Sidebar from '../../../components/Sidebar';

interface Post {
  title: string;
  author?: string;
  imageUrl?: string;
  publishedAt: string;
  body: PortableTextBlock[];
}

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

export default async function PostPage(props: { params: Promise<{ slug: string }> }) {
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
          {/*REMOVED HARDCODED TEXT COLOR */}
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 leading-tight">
            {post.title}
          </h1>
          {post.author && (
            // ADDED DARK MODE TEXT COLORS
            (<p className="text-gray-600 dark:text-gray-400">By <span className="font-semibold text-gray-800 dark:text-gray-200">{post.author}</span>on{' '}
              <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
            </p>)
          )}
        </div>

        {post.imageUrl && (
          <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-8 shadow-lg">
            <Image
              src={post.imageUrl}
              alt={post.title}
              fill
              className="object-cover"
              priority={true}
            />
          </div>
        )}

        {/* ADDED dark:prose-invert TO HANDLE ALL TYPOGRAPHY STYLES */}
        <div className="prose prose-lg max-w-none prose-indigo dark:prose-invert">
          <PortableText value={post.body} />
        </div>

        {/* ADDED DARK MODE BORDER AND TEXT COLORS */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-serif font-bold mb-6">Comments</h2>
          <p className="text-gray-500 dark:text-gray-400">Comments section coming soon.</p>
        </div>
      </article>
      <aside className="lg:w-1/3">
        <Sidebar categories={categories} popular={popular} />
      </aside>
    </div>
  );
}