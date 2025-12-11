# Payload CMS Demo

A pure Payload CMS 3.x demo project for exploring and understanding how Payload works. Built with Next.js 15, React 19, and SQLite for easy local development.

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open browser
open http://localhost:3000
```

## URLs

| URL | Description |
|-----|-------------|
| http://localhost:3000 | Landing page |
| http://localhost:3000/admin | Admin dashboard |
| http://localhost:3000/api/graphql | GraphQL Playground |

## Project Structure

```
payload-demo/
├── src/
│   ├── payload.config.ts      # Main Payload configuration
│   ├── collections/           # Content type definitions
│   │   ├── Users.ts           # Users with authentication & roles
│   │   ├── Posts.ts           # Blog posts with versioning
│   │   ├── Categories.ts      # Hierarchical categories
│   │   ├── Media.ts           # File uploads with image sizes
│   │   └── Pages.ts           # Pages with layout builder
│   ├── app/
│   │   ├── (payload)/         # Payload admin routes
│   │   │   ├── admin/         # Admin panel
│   │   │   └── api/           # REST API
│   │   └── page.tsx           # Landing page
│   └── __tests__/             # Test files
├── vitest.config.ts           # Test configuration
├── next.config.ts             # Next.js configuration
└── package.json
```

## Collections

### Users
- Authentication enabled
- Roles: `admin`, `editor`, `viewer`
- Fields: name, email, role, avatar
- Access control based on roles

### Posts
- Versioning with drafts and autosave
- Fields: title, slug (auto-generated), excerpt, content (rich text), featured image
- Relationships: author (user), categories (many)
- Status: draft, published, archived
- SEO group: meta title, description, keywords
- Tags array
- Hooks: auto-set publishedAt on publish

### Categories
- Hierarchical (parent-child relationships)
- Fields: name, slug, description, color
- Self-referencing for nested categories

### Media
- Upload collection for images and PDFs
- Auto-generated image sizes:
  - thumbnail: 150x150
  - card: 400x300
  - hero: 1920x1080
- Fields: alt (required), caption, credits

### Pages
- Layout builder with blocks
- Versioning with drafts
- Available blocks:
  - **Hero**: heading, subheading, background image, CTA
  - **Content**: rich text content
  - **Features**: heading + feature items (icon, title, description)
  - **Gallery**: heading + image array
  - **CTA**: heading, description, buttons with styles

## Globals

### Site Settings
- Site name, description
- Logo upload
- Social links array (platform + URL)

### Navigation
- Main menu with internal/external links
- Conditional fields based on link type

## Key Payload Concepts Demonstrated

### 1. Field Types
- `text`, `textarea`, `richText`
- `select`, `radio`
- `upload` (file uploads)
- `relationship` (single and hasMany)
- `array` (repeatable fields)
- `group` (field grouping)
- `blocks` (layout builder)
- `date`

### 2. Access Control
- Function-based access control
- Role-based permissions
- Field-level access control
- Query-based filtering (e.g., only show published posts to public)

### 3. Hooks
- `beforeValidate`: Auto-generate slugs
- `beforeChange`: Auto-set dates
- `afterChange`: Logging/side effects

### 4. Admin Customization
- `useAsTitle`: Display field in admin lists
- `group`: Organize collections in sidebar
- `defaultColumns`: Configure list view
- `position: 'sidebar'`: Field placement
- `admin.condition`: Conditional field visibility

### 5. Versioning
- Draft mode
- Autosave
- Version history (maxPerDoc)

### 6. Relationships
- Single relationships (author)
- hasMany relationships (categories)
- Self-referencing (parent category)

## Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm test             # Run tests
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Run tests with coverage
npm run generate:types    # Generate TypeScript types
npm run generate:schema   # Generate database schema
```

## Environment Variables

```env
# Database (SQLite by default)
DATABASE_URI=file:./payload-demo.db

# Payload secret (change in production)
PAYLOAD_SECRET=your-secret-here

# Server URL
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
```

## Tech Stack

- **Payload CMS** 3.x - Headless CMS
- **Next.js** 15 - React framework
- **React** 19 - UI library
- **SQLite** - Database (via `@payloadcms/db-sqlite`)
- **Lexical** - Rich text editor
- **Vitest** - Testing framework
- **TypeScript** - Type safety

## Testing

Tests cover all collection configurations:
- Field definitions and types
- Access control functions
- Hooks configuration
- Upload settings
- Versioning options
- Block definitions

```bash
npm test
```

## First Time Setup

1. Start the dev server: `npm run dev`
2. Go to http://localhost:3000/admin
3. Create your first admin user
4. Explore the admin panel!

## API Endpoints

### REST API
- `GET /api/posts` - List posts
- `GET /api/posts/:id` - Get single post
- `POST /api/posts` - Create post (auth required)
- `PATCH /api/posts/:id` - Update post (auth required)
- `DELETE /api/posts/:id` - Delete post (auth required)

Same pattern applies to all collections.

### GraphQL
Access the GraphQL Playground at `/api/graphql`

## Resources

- [Payload CMS Documentation](https://payloadcms.com/docs)
- [Payload GitHub](https://github.com/payloadcms/payload)
- [Next.js Documentation](https://nextjs.org/docs)

## License

MIT

---

Built for SOLARIA AGENCY exploration and learning.
