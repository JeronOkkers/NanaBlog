// components/Sidebar.tsx
import Link from 'next/link';

export default function Sidebar({ categories, popular }) {
  return (
    <div className="space-y-10">
      {/* Search */}
      <div className="bg-gray-100 p-4 rounded-lg">
        <input
          type="text"
          placeholder="Search posts"
          className="w-full px-3 py-2 rounded bg-gray-100 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-300"
        />
      </div>

      {/* Categories */}
      <div>
        <h3 className="text-xl font-serif font-bold mb-3">Categories</h3>
        <ul className="space-y-2">
          {categories.map((cat) => (
            <li key={cat._id}>
              <Link href={`/?category=${cat.title}`} className="hover:text-primary">
                {cat.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Popular Posts */}
      {popular.length > 0 && (
        <div>
          <h3 className="text-xl font-serif font-bold mb-3">Popular Posts</h3>
          <ul className="space-y-2">
            {popular.map((p, i) => (
              <li key={i}>
                <Link href={`/posts/${p.slug}`} className="hover:text-primary">
                  {p.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
