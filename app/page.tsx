// app/page.tsx
import { client } from '../lib/sanity';
import { allPostsQuery, allCategoriesQuery, popularPostsQuery } from '../lib/queries';
import PostList from '../components/PostList';
import Sidebar from '../components/Sidebar';

export default async function HomePage() {
  // Add tags to each Sanity fetch
  const [posts, categories, popular] = await Promise.all([
    client.fetch(allPostsQuery, {}, { next: { tags: ['post'] } }),
    client.fetch(allCategoriesQuery, {}, { next: { tags: ['category'] } }),
    client.fetch(popularPostsQuery, {}, { next: { tags: ['post'] } }),
  ]);

  return (
    <div className="flex flex-col-reverse lg:flex-row gap-12">
      {/* Main posts section */}
      <section className="lg:w-2/3 space-y-10">
        <h1 className="text-4xl font-serif font-bold text-gray-900">Latest Posts</h1>
        <PostList posts={posts} />
      </section>

      {/* Sidebar */}
      <aside className="lg:w-1/3">
        <Sidebar categories={categories} popular={popular} />
      </aside>
    </div>
  );
}