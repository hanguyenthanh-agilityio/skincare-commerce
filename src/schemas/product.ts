import { Schema } from 'effect';

// Rich text (ingredients, benefits, usages)
export const RichTextChildSchema = Schema.Struct({
  type: Schema.Literal('text'),
  text: Schema.String,
});

// Rich text block (paragraph node)
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

// API Response

export const ProductListResponseSchema = Schema.Struct({
  data: Schema.Array(RawProductSchema),
});

// Types

export type RawProduct = Schema.Schema.Type<typeof RawProductSchema>;
export type RichTextChild = Readonly<Schema.Schema.Type<typeof RichTextChildSchema>>;
export type RichTextBlock = Readonly<Schema.Schema.Type<typeof RichTextBlockSchema>>;
