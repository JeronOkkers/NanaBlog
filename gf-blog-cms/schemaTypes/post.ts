export default {
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    {name: 'title', type: 'string', title: 'Title'},
    {name: 'slug', type: 'slug', title: 'Slug', options: {source: 'title'}},
    {name: 'excerpt', type: 'text', title: 'Excerpt'},
    {name: 'mainImage', type: 'image', title: 'Main Image'},
    {
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'category'}]}],
    },
    {name: 'body', type: 'array', of: [{type: 'block'}]},
    {name: 'publishedAt', type: 'datetime', title: 'Publish date'},
  ],
}
