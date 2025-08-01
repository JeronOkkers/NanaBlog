// lib/queries.ts
export const allPostsQuery = `*[_type=="post"] | order(publishedAt desc){
  _id,
  title,
  slug { current },
  excerpt,
  "imageUrl": mainImage.asset->url,
  publishedAt
}`;

export const allCategoriesQuery = `*[_type=="category"]{_id, title}`;

export const popularPostsQuery = `*[_type == "post"] | order(views desc)[0..2]{
  title,
  "slug": slug.current
}`;

export const allPostSlugsQuery = `*[_type=="post"].slug.current`;

export const postBySlugQuery = `*[_type=="post" && slug.current == $slug][0]{
  title,
  body,
  "imageUrl": mainImage.asset->url,
  publishedAt
}`;
