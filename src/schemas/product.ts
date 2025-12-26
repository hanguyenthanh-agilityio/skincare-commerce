import { Schema } from 'effect';

// Rich text (ingredients, benefits, usages)
export const RichTextChildSchema = Schema.Struct({
  text: Schema.String,
  type: Schema.Literal('text'),
});

export const RichTextBlockSchema = Schema.Struct({
  type: Schema.Literal('paragraph'),
  children: Schema.Array(RichTextChildSchema),
});

// Image formats (Strapi upload)
const ImageFormatSchema = Schema.Struct({
  url: Schema.String,
  width: Schema.Number,
  height: Schema.Number,
});

// Full Strapi image object
export const ProductImageSchema = Schema.Struct({
  id: Schema.Number,
  documentId: Schema.String,
  name: Schema.String,
  alternativeText: Schema.NullOr(Schema.String),
  width: Schema.Number,
  height: Schema.Number,
  url: Schema.String,
  formats: Schema.optional(
    Schema.Struct({
      thumbnail: Schema.optional(ImageFormatSchema),
      small: Schema.optional(ImageFormatSchema),
      medium: Schema.optional(ImageFormatSchema),
      large: Schema.optional(ImageFormatSchema),
    }),
  ),
});

//  Product reviews with rating validation
export const ReviewSchema = Schema.Struct({
  id: Schema.Number,
  documentId: Schema.String,
  comment: Schema.String,
  rating: Schema.Number.pipe(Schema.greaterThanOrEqualTo(1), Schema.lessThanOrEqualTo(5)),
  author: Schema.String,
});

//  Taxonomy (category, skin type)
export const TaxonomySchema = Schema.Struct({
  id: Schema.Number,
  documentId: Schema.String,
  name: Schema.String,
  slug: Schema.String,
});

// RAW Product (Strapi)
export const RawProductSchema = Schema.Struct({
  documentId: Schema.String,
  name: Schema.String,
  price: Schema.Number,

  description: Schema.optional(Schema.String),
  subTitle: Schema.optional(Schema.String),
  volume: Schema.optional(Schema.String),

  ingredients: Schema.optional(Schema.Array(RichTextBlockSchema)),
  benefits: Schema.optional(Schema.Array(RichTextBlockSchema)),
  usages: Schema.optional(Schema.Array(RichTextBlockSchema)),

  stock: Schema.optional(Schema.String),
  isFeatured: Schema.optional(Schema.NullOr(Schema.Boolean)),
  salesCount: Schema.optional(Schema.Number),
  skinFeel: Schema.optional(Schema.String),

  images: Schema.Array(ProductImageSchema),
  reviews: Schema.optional(Schema.Array(ReviewSchema)),

  skin_type: Schema.optional(TaxonomySchema),
  category: Schema.optional(TaxonomySchema),
});

// DECODED Product (UI-ready)
export const ProductSchema = Schema.transform(
  RawProductSchema,
  Schema.Struct({
    documentId: Schema.String,
    name: Schema.String,
    price: Schema.Number,

    description: Schema.optional(Schema.String),
    subTitle: Schema.optional(Schema.String),
    volume: Schema.optional(Schema.String),

    ingredients: Schema.optional(Schema.Array(RichTextBlockSchema)),
    benefits: Schema.optional(Schema.Array(RichTextBlockSchema)),
    usages: Schema.optional(Schema.Array(RichTextBlockSchema)),

    stock: Schema.Number,
    isFeatured: Schema.optional(Schema.NullOr(Schema.Boolean)),
    salesCount: Schema.optional(Schema.Number),
    skinFeel: Schema.optional(Schema.String),

    images: Schema.Array(ProductImageSchema),
    reviews: Schema.optional(Schema.Array(ReviewSchema)),

    skin_type: Schema.optional(TaxonomySchema),
    category: Schema.optional(TaxonomySchema),

    averageRating: Schema.Number,
    thumbnailUrl: Schema.NullOr(Schema.String),
  }),
  {
    decode: (product) => {
      // Calculate average rating
      const averageRating =
        product.reviews && product.reviews.length > 0
          ? product.reviews.reduce((s, r) => s + r.rating, 0) / product.reviews.length
          : 0;

      // Pick best thumbnail available
      const thumbnailUrl =
        product.images[0]?.formats?.thumbnail?.url ?? product.images[0]?.url ?? null;

      return {
        ...product,
        stock: product.stock ? Number(product.stock) : 0,
        volume: product.volume?.trim(),
        averageRating: Number(averageRating.toFixed(1)),
        thumbnailUrl,
      };
    },

    encode: (product) => ({
      ...product,
      stock: String(product.stock),
    }),
  },
);

// Rich text block TypeScript type
export type RichTextBlock = Schema.Schema.Type<typeof RichTextBlockSchema>;

// UI ready Product type
export type Product = Schema.Schema.Type<typeof ProductSchema>;

// List response
export const ProductListResponseSchema = Schema.Struct({
  data: Schema.Array(ProductSchema),
});
