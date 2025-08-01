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
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
      {/* Main posts section */}
      <section className="lg:col-span-2 space-y-10">
        <h1 className="text-4xl font-serif font-bold text-gray-900">Latest Posts</h1>
        <PostList posts={posts} />
      </section>

      {/* Sidebar */}
      <aside>
        <Sidebar categories={categories} popular={popular} />
      </aside>
    </div>
  );
}