import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',

  admin: {
    useAsTitle: 'alt',
    group: 'Content',
    description: 'Images and files library',
  },

  // Upload configuration
  upload: {
    staticDir: 'media', // Where files are stored
    mimeTypes: ['image/*', 'application/pdf'], // Allowed file types
    imageSizes: [
      {
        name: 'thumbnail',
        width: 150,
        height: 150,
        position: 'centre',
      },
      {
        name: 'card',
        width: 400,
        height: 300,
        position: 'centre',
      },
      {
        name: 'hero',
        width: 1920,
        height: 1080,
        position: 'centre',
      },
    ],
    adminThumbnail: 'thumbnail',
  },

  access: {
    read: () => true, // Public access to media
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => user?.role === 'admin',
  },

  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      label: 'Alt Text',
      admin: {
        description: 'Description for accessibility',
      },
    },
    {
      name: 'caption',
      type: 'text',
    },
    {
      name: 'credits',
      type: 'text',
      admin: {
        description: 'Photo credits or source',
      },
    },
  ],

  timestamps: true,
}
