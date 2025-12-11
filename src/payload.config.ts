import { buildConfig } from 'payload'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import sharp from 'sharp'
import path from 'path'
import { fileURLToPath } from 'url'

// Collections
import { Users } from './collections/Users'
import { Posts } from './collections/Posts'
import { Categories } from './collections/Categories'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  // Admin panel configuration
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: '- Payload Demo',
    },
    components: {
      // Custom components can be added here
    },
  },

  // Collections - These are your content types
  collections: [
    Users,
    Posts,
    Categories,
    Media,
    Pages,
  ],

  // Global data - Singleton content types
  globals: [
    {
      slug: 'site-settings',
      label: 'Site Settings',
      fields: [
        {
          name: 'siteName',
          type: 'text',
          required: true,
          defaultValue: 'My Payload Site',
        },
        {
          name: 'siteDescription',
          type: 'textarea',
        },
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'socialLinks',
          type: 'array',
          fields: [
            {
              name: 'platform',
              type: 'select',
              options: [
                { label: 'Facebook', value: 'facebook' },
                { label: 'Twitter', value: 'twitter' },
                { label: 'Instagram', value: 'instagram' },
                { label: 'LinkedIn', value: 'linkedin' },
              ],
            },
            {
              name: 'url',
              type: 'text',
            },
          ],
        },
      ],
    },
    {
      slug: 'navigation',
      label: 'Navigation',
      fields: [
        {
          name: 'mainMenu',
          type: 'array',
          label: 'Main Menu Items',
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
            },
            {
              name: 'link',
              type: 'group',
              fields: [
                {
                  name: 'type',
                  type: 'radio',
                  options: [
                    { label: 'Internal', value: 'internal' },
                    { label: 'External', value: 'external' },
                  ],
                  defaultValue: 'internal',
                },
                {
                  name: 'page',
                  type: 'relationship',
                  relationTo: 'pages',
                  admin: {
                    condition: (_, siblingData) => siblingData?.type === 'internal',
                  },
                },
                {
                  name: 'url',
                  type: 'text',
                  admin: {
                    condition: (_, siblingData) => siblingData?.type === 'external',
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ],

  // Editor configuration
  editor: lexicalEditor(),

  // Secret for JWT
  secret: process.env.PAYLOAD_SECRET || 'YOUR-SECRET-HERE-CHANGE-IN-PRODUCTION',

  // TypeScript output path
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },

  // Database adapter - SQLite for easy local development
  db: sqliteAdapter({
    client: {
      url: 'file:./payload-demo.db',
    },
  }),

  // Sharp for image processing
  sharp,

  // Plugins can be added here
  plugins: [],
})
