// app/posts/[slug]/page.tsx

import { client } from '../../../lib/sanity';
import { PortableText, PortableTextBlock } from '@portabletext/react';
import Image from 'next/image';
import { postBySlugQuery, allPostSlugsQuery } from '../../../lib/queries'; // Make sure this query is updated!
import { notFound } from 'next/navigation';

// 1. UPDATE THE POST INTERFACE
interface Post {
  title: string;
  imageUrl?: string; // Use the new 'imageUrl' field from our updated query
  body: PortableTextBlock[];
}

// NOTE: We don't need the separate ParamsType anymore
export default async function PostPage(
  props: {
    params: Promise<{ slug: string }>;
  }
) {
  const params = await props.params;

  const {
    slug
  } = params;

  // We can remove the `if (!params?.slug)` check because if slug is missing,
  // Next.js wouldn't be able to generate the page anyway.

  // 3. PASS THE DESTRUCTURED SLUG TO THE QUERY
  const post: Post = await client.fetch(postBySlugQuery, { slug });

  if (!post) {
    notFound();
  }

  // You can remove the console.log now
  // console.log('SANITY POST DATA:', JSON.stringify(post, null, 2));

  return (
    <article className="prose mx-auto py-8">
      <h1>{post.title}</h1>

      {/* 4. UPDATE THE JSX TO USE imageUrl */}
      {post.imageUrl && (
        <div className="relative w-full aspect-video rounded-lg overflow-hidden my-8 shadow-lg not-prose">
          <Image
            src={post.imageUrl}
            alt={post.title}
            fill
            className="object-contain"
            priority={true}
          />
        </div>
      )}
      <div className="mt-8">
        <PortableText value={post.body} />
      </div>
    </article>
  );
}

// You can probably leave your generateStaticParams function as is.
// But if you get another error, you might need to destructure there too:
// export async function generateStaticParams() {
//   const posts: { slug: string }[] = await client.fetch(allPostSlugsQuery);
//   return posts.map(({ slug }) => ({ slug }));
// }
// Next.js calls this at build time
export async function generateStaticParams(): Promise<ParamsType[]> {
  const slugs: string[] = await client.fetch(allPostSlugsQuery);
  return slugs.map((slug) => ({ slug }));
}