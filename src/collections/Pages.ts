import type { CollectionConfig } from 'payload'

export const Pages: CollectionConfig = {
  slug: 'pages',

  admin: {
    useAsTitle: 'title',
    group: 'Content',
    description: 'Static pages with flexible layouts',
    defaultColumns: ['title', 'slug', 'status', 'updatedAt'],
  },

  versions: {
    drafts: true,
    maxPerDoc: 5,
  },

  access: {
    read: ({ req: { user } }) => {
      if (user) return true
      return { status: { equals: 'published' } }
    },
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => user?.role === 'admin',
  },

  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
      admin: {
        position: 'sidebar',
      },
    },

    // Layout builder using blocks
    {
      name: 'layout',
      type: 'blocks',
      label: 'Page Layout',
      blocks: [
        // Hero Block
        {
          slug: 'hero',
          labels: {
            singular: 'Hero Section',
            plural: 'Hero Sections',
          },
          fields: [
            {
              name: 'heading',
              type: 'text',
              required: true,
            },
            {
              name: 'subheading',
              type: 'textarea',
            },
            {
              name: 'backgroundImage',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'cta',
              type: 'group',
              label: 'Call to Action',
              fields: [
                {
                  name: 'text',
                  type: 'text',
                },
                {
                  name: 'link',
                  type: 'text',
                },
              ],
            },
          ],
        },

        // Content Block
        {
          slug: 'content',
          labels: {
            singular: 'Content Block',
            plural: 'Content Blocks',
          },
          fields: [
            {
              name: 'content',
              type: 'richText',
            },
          ],
        },

        // Features Block
        {
          slug: 'features',
          labels: {
            singular: 'Features Section',
            plural: 'Features Sections',
          },
          fields: [
            {
              name: 'heading',
              type: 'text',
            },
            {
              name: 'features',
              type: 'array',
              fields: [
                {
                  name: 'icon',
                  type: 'text',
                  admin: {
                    description: 'Icon name or emoji',
                  },
                },
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'description',
                  type: 'textarea',
                },
              ],
            },
          ],
        },

        // Image Gallery Block
        {
          slug: 'gallery',
          labels: {
            singular: 'Image Gallery',
            plural: 'Image Galleries',
          },
          fields: [
            {
              name: 'heading',
              type: 'text',
            },
            {
              name: 'images',
              type: 'array',
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                },
                {
                  name: 'caption',
                  type: 'text',
                },
              ],
            },
          ],
        },

        // CTA Block
        {
          slug: 'cta',
          labels: {
            singular: 'Call to Action',
            plural: 'Call to Actions',
          },
          fields: [
            {
              name: 'heading',
              type: 'text',
              required: true,
            },
            {
              name: 'description',
              type: 'textarea',
            },
            {
              name: 'buttons',
              type: 'array',
              fields: [
                {
                  name: 'text',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'link',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'style',
                  type: 'select',
                  defaultValue: 'primary',
                  options: [
                    { label: 'Primary', value: 'primary' },
                    { label: 'Secondary', value: 'secondary' },
                    { label: 'Outline', value: 'outline' },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },

    // SEO
    {
      name: 'seo',
      type: 'group',
      label: 'SEO',
      fields: [
        {
          name: 'metaTitle',
          type: 'text',
        },
        {
          name: 'metaDescription',
          type: 'textarea',
          maxLength: 160,
        },
      ],
    },
  ],

  timestamps: true,
}
