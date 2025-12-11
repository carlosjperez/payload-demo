import type { CollectionConfig } from 'payload'

export const Posts: CollectionConfig = {
  slug: 'posts',

  admin: {
    useAsTitle: 'title',
    group: 'Content',
    description: 'Blog posts and articles',
    defaultColumns: ['title', 'status', 'author', 'publishedAt'],
    listSearchableFields: ['title', 'excerpt'],
  },

  // Versioning and drafts
  versions: {
    drafts: {
      autosave: {
        interval: 375, // Auto-save every 375ms
      },
    },
    maxPerDoc: 10, // Keep last 10 versions
  },

  access: {
    // Anyone can read published posts
    read: ({ req: { user } }) => {
      if (user) return true // Logged in users see all
      return {
        status: {
          equals: 'published',
        },
      }
    },
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => user?.role === 'admin',
  },

  fields: [
    // Main content
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: false, // Can enable for multi-language
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
      // Auto-generate slug from title
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (!value && data?.title) {
              return data.title
                .toLowerCase()
                .replace(/[^\w\s-]/g, '')
                .replace(/\s+/g, '-')
                .replace(/-+/g, '-')
                .trim()
            }
            return value
          },
        ],
      },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      admin: {
        description: 'Brief summary for listing pages',
      },
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
    },

    // Featured image
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        position: 'sidebar',
      },
    },

    // Relationships
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      // Auto-set to current user on create
      defaultValue: ({ user }) => user?.id,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
      admin: {
        position: 'sidebar',
      },
    },

    // Publishing
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
        { label: 'Archived', value: 'archived' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },

    // SEO Group
    {
      name: 'seo',
      type: 'group',
      label: 'SEO',
      admin: {
        description: 'Search engine optimization settings',
      },
      fields: [
        {
          name: 'metaTitle',
          type: 'text',
          label: 'Meta Title',
          admin: {
            description: 'Leave blank to use post title',
          },
        },
        {
          name: 'metaDescription',
          type: 'textarea',
          label: 'Meta Description',
          maxLength: 160,
        },
        {
          name: 'keywords',
          type: 'text',
          label: 'Keywords',
          admin: {
            description: 'Comma-separated keywords',
          },
        },
      ],
    },

    // Tags as array
    {
      name: 'tags',
      type: 'array',
      label: 'Tags',
      fields: [
        {
          name: 'tag',
          type: 'text',
        },
      ],
    },
  ],

  // Hooks - lifecycle events
  hooks: {
    beforeChange: [
      ({ data, operation }) => {
        // Set publishedAt when status changes to published
        if (operation === 'update' && data.status === 'published' && !data.publishedAt) {
          data.publishedAt = new Date().toISOString()
        }
        return data
      },
    ],
    afterChange: [
      ({ doc, operation }) => {
        console.log(`Post ${operation}: ${doc.title}`)
      },
    ],
  },

  timestamps: true,
}
