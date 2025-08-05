// gf-blog-cms/schemaTypes/post.ts
export default {
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: { source: 'title' },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'author' }],
      validation: (Rule) => Rule.required(),
    },
    { name: 'excerpt', type: 'text', title: 'Excerpt' },
    { name: 'mainImage', type: 'image', title: 'Main Image' },
    {
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'category' }] }],
    },
    // Portable Text (rich block editor)
    {
      name: 'body',
      type: 'blockContent',
      title: 'Rich Text Body',
    },
    // ADD THE NEW MARKDOWN FIELD
    {
      name: 'markdownContent',
      title: 'Markdown Content',
      type: 'markdown',
      description: 'GitHub-flavored Markdown with live preview',
    },
    { name: 'publishedAt', type: 'datetime', title: 'Publish date' },
  ],
};