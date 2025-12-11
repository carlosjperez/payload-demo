import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',

  // Authentication is enabled for this collection
  auth: true,

  // Admin panel configuration
  admin: {
    useAsTitle: 'email',
    group: 'Admin',
    description: 'Manage users who can access the admin panel',
  },

  // Access control - who can do what
  access: {
    // Only admins can read all users
    read: ({ req: { user } }) => {
      if (user?.role === 'admin') return true
      // Users can read their own profile
      return {
        id: {
          equals: user?.id,
        },
      }
    },
    // Only admins can create users
    create: ({ req: { user } }) => user?.role === 'admin',
    // Admins can update anyone, users can update themselves
    update: ({ req: { user } }) => {
      if (user?.role === 'admin') return true
      return {
        id: {
          equals: user?.id,
        },
      }
    },
    // Only admins can delete
    delete: ({ req: { user } }) => user?.role === 'admin',
  },

  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Full Name',
    },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'editor',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
        { label: 'Viewer', value: 'viewer' },
      ],
      // Only admins can change roles
      access: {
        update: ({ req: { user } }) => user?.role === 'admin',
      },
    },
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
    },
  ],

  // Timestamps are automatically added
  timestamps: true,
}
