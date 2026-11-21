import {TagIcon} from '@sanity/icons/Tag'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const product = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  icon: TagIcon,
  groups: [
    {name: 'details', title: 'Details', default: true},
    {name: 'pricing', title: 'Pricing'},
    {name: 'merchandising', title: 'Merchandising'},
  ],
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      group: 'details',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      group: 'details',
      options: {source: 'name', maxLength: 96},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'code',
      title: 'Product code',
      type: 'string',
      group: 'details',
      description: 'Unique code shown to customers when they order.',
      validation: (rule) =>
        rule.required().custom(async (code, context) => {
          if (!code) return true
          const documentId = context.document?._id
          const id = typeof documentId === 'string' ? documentId.replace(/^drafts\./, '') : ''
          const client = context.getClient({apiVersion: '2026-02-01'})
          const matches = await client.fetch(
            'count(*[_type == "product" && code == $code && _id != $id && _id != $draftId])',
            {code, id, draftId: id ? `drafts.${id}` : ''},
          )
          return matches === 0 || 'A product with this code already exists.'
        }),
    }),
    defineField({
      name: 'category',
      type: 'string',
      group: 'details',
      options: {
        list: [
          {title: 'Rings', value: 'Rings'},
          {title: 'Necklaces', value: 'Necklaces'},
          {title: 'Earrings', value: 'Earrings'},
          {title: 'Bracelets', value: 'Bracelets'},
          {title: 'Pendants', value: 'Pendants'},
          {title: 'Sets', value: 'Sets'},
          {title: 'Caps', value: 'Caps'},
          {title: 'Sunglasses', value: 'Sunglasses'},
          {title: 'Hair Accessories', value: 'Hair Accessories'},
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'images',
      title: 'Product images',
      type: 'array',
      group: 'details',
      description: 'The first image is used as the main product image.',
      of: [
        defineArrayMember({
          type: 'image',
          options: {hotspot: true},
          fields: [
            defineField({
              name: 'alt',
              title: 'Alternative text',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
          ],
        }),
      ],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'description',
      type: 'text',
      rows: 4,
      group: 'details',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'material',
      type: 'string',
      group: 'details',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'weight',
      type: 'number',
      group: 'details',
      description: 'Product weight in grams. Leave blank when it does not apply.',
      validation: (rule) => rule.min(0),
    }),
    defineField({
      name: 'priceOnRequest',
      title: 'Price on request',
      type: 'boolean',
      group: 'pricing',
      initialValue: false,
    }),
    defineField({
      name: 'price',
      title: 'Price (PKR)',
      type: 'number',
      group: 'pricing',
      hidden: ({parent}) => parent?.priceOnRequest === true,
      validation: (rule) =>
        rule.custom((value, context) => {
          if (context.document?.priceOnRequest === true) return true
          if (typeof value !== 'number') return 'Enter a price or mark it as price on request.'
          return Number.isInteger(value) && value >= 0
            ? true
            : 'Price must be a non-negative whole number.'
        }),
    }),
    defineField({
      name: 'salePrice',
      title: 'Sale price (PKR)',
      type: 'number',
      group: 'pricing',
      hidden: ({parent}) => parent?.priceOnRequest === true,
      validation: (rule) =>
        rule.custom((value, context) => {
          if (value === undefined || value === null) return true
          if (!Number.isInteger(value) || value < 0) {
            return 'Sale price must be a non-negative whole number.'
          }
          const price = context.document?.price
          return typeof price !== 'number' || value < price
            ? true
            : 'Sale price must be lower than the regular price.'
        }),
    }),
    defineField({
      name: 'inStock',
      title: 'In stock',
      type: 'boolean',
      group: 'merchandising',
      initialValue: true,
    }),
    defineField({
      name: 'featured',
      type: 'boolean',
      group: 'merchandising',
      initialValue: false,
    }),
    defineField({
      name: 'newArrival',
      title: 'New arrival',
      type: 'boolean',
      group: 'merchandising',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'code',
      media: 'images.0',
    },
  },
})
